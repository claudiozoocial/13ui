import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs"
import {
  ArrowExpand01Icon,
  ArrowShrink01Icon,
  Cancel01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons"
import {
  createContext,
  type DragEvent,
  Fragment,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"
import { Resizable, ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import {
  type DockAction,
  type DockGroup,
  type DockNode,
  type DockSplit,
  type DockState,
  type DropPosition,
  dockReducer,
  dropPositionAt,
  firstGroup,
  isDockState,
  openPanels,
} from "./model"
import { Icon } from "@/components/ui/icon"

export interface DockPanelDef {
  title: string
  icon?: ReactNode
  content: ReactNode
  /** Defaults to true. */
  closable?: boolean
  /** Smallest size the panel's group can shrink to, like "200px". */
  minSize?: `${number}px`
}

export type DockPanels = Record<string, DockPanelDef>

export interface DockApi {
  state: DockState
  dispatch: (action: DockAction) => void
  open: (panelId: string, options?: { target?: string; position?: DropPosition }) => void
  close: (panelId: string) => void
  activate: (panelId: string) => void
  isOpen: (panelId: string) => boolean
  reset: () => void
}

interface UseDockOptions {
  initial: DockState | (() => DockState)
  /** Saves the layout to localStorage under this key and restores it on load. */
  storageKey?: string
}

function readStored(key: string | undefined): DockState | null {
  if (!key) return null
  try {
    const raw = localStorage.getItem(key)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    return isDockState(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function useDock({ initial, storageKey }: UseDockOptions): DockApi {
  const initialRef = useRef(initial)
  const [state, dispatch] = useReducer(dockReducer, undefined, () => {
    const fallback = typeof initialRef.current === "function" ? initialRef.current() : initialRef.current
    return readStored(storageKey) ?? fallback
  })

  useEffect(() => {
    if (!storageKey) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      // Storage can be full or blocked; the layout still works for this visit.
    }
  }, [state, storageKey])

  return useMemo<DockApi>(() => {
    const open = new Set(openPanels(state.root))
    return {
      state,
      dispatch,
      open: (panelId, options) => dispatch({ type: "open", panelId, ...options }),
      close: (panelId) => dispatch({ type: "close", panelId }),
      activate: (panelId) => dispatch({ type: "activate", panelId }),
      isOpen: (panelId) => open.has(panelId),
      reset: () => {
        const fresh = typeof initialRef.current === "function" ? initialRef.current() : initialRef.current
        dispatch({ type: "reset", state: fresh })
      },
    }
  }, [state])
}

interface DragInfo {
  panelId: string
}

interface DockContextValue {
  dock: DockApi
  panels: DockPanels
  drag: DragInfo | null
  setDrag: (drag: DragInfo | null) => void
  hosts: Map<string, HTMLDivElement>
  /** True when the dock is too narrow for splits and shows every panel as one row of tabs. */
  stacked: boolean
}

const DockContext = createContext<DockContextValue | null>(null)

function useDockContext() {
  const context = useContext(DockContext)
  if (!context) throw new Error("Dock parts must be rendered inside <Dock>")
  return context
}

const DRAG_MIME = "application/x-dock-panel"

interface DockProps {
  dock: DockApi
  panels: DockPanels
  className?: string
  /** Shown when every panel is closed. */
  empty?: ReactNode
  /**
   * Below this width, in pixels, the dock stacks every panel into one tab group, without splits or
   * dragging. It measures its own width, so it also stacks inside a narrow container. The saved
   * layout is kept and returns when the dock is wide again. Pass 0 to never stack.
   */
  stackBelow?: number
}

/**
 * Renders a dock layout. Each panel's content mounts once into its own host element
 * and is moved between groups, so its state survives drags, splits and tab switches.
 */
export function Dock({ dock, panels, className, empty, stackBelow = 640 }: DockProps) {
  const [drag, setDrag] = useState<DragInfo | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [stacked, setStacked] = useState(false)
  const [stackActive, setStackActive] = useState<string | null>(null)

  useEffect(() => {
    const element = rootRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setStacked(entry.contentRect.width < stackBelow))
    observer.observe(element)
    return () => observer.disconnect()
  }, [stackBelow])
  const hostsRef = useRef(new Map<string, HTMLDivElement>())
  const hosts = hostsRef.current

  const open = openPanels(dock.state.root)
  for (const id of open) {
    if (!hosts.has(id)) {
      const host = document.createElement("div")
      host.className = "size-full"
      host.dataset.dockHost = id
      hosts.set(id, host)
    }
  }
  for (const id of [...hosts.keys()]) if (!open.includes(id)) hosts.delete(id)

  useEffect(() => {
    if (!drag) return
    const end = () => setDrag(null)
    window.addEventListener("dragend", end)
    window.addEventListener("drop", end)
    return () => {
      window.removeEventListener("dragend", end)
      window.removeEventListener("drop", end)
    }
  }, [drag])

  const context = useMemo<DockContextValue>(
    () => ({ dock, panels, drag, setDrag, hosts, stacked }),
    [dock, panels, drag, hosts, stacked],
  )
  const { root, maximized } = dock.state
  const maximizedNode = maximized ? findGroup(root, maximized) : null
  const isEmpty = root.type === "group" && root.panels.length === 0
  const stackGroup: DockGroup = {
    type: "group",
    id: "dock-stack",
    panels: open,
    active: stackActive && open.includes(stackActive) ? stackActive : (maximizedNode?.active ?? firstGroup(root).active ?? open[0] ?? null),
  }

  return (
    <DockContext.Provider value={context}>
      <div
        ref={rootRef}
        data-slot="dock"
        data-dragging={drag ? "" : undefined}
        data-stacked={stacked ? "" : undefined}
        className={cn("relative flex size-full min-h-0 min-w-0 bg-background", className)}
      >
        {isEmpty ? (
          <div className="grid size-full place-items-center text-ui text-subtle-foreground">
            {empty ?? "No panels open"}
          </div>
        ) : stacked ? (
          <DockGroupView node={stackGroup} onActivate={setStackActive} />
        ) : maximizedNode ? (
          <DockGroupView node={maximizedNode} />
        ) : (
          <DockNodeView node={root} />
        )}
        {drag && !isEmpty && !stacked && <RootDropEdges />}
      </div>
      {open.map((id) => {
        const host = hosts.get(id)
        const def = panels[id]
        return host && def ? <Fragment key={id}>{createPortal(def.content, host)}</Fragment> : null
      })}
    </DockContext.Provider>
  )
}

function findGroup(node: DockNode, id: string): DockGroup | null {
  if (node.type === "group") return node.id === id ? node : null
  for (const child of node.children) {
    const found = findGroup(child, id)
    if (found) return found
  }
  return null
}

function DockNodeView({ node }: { node: DockNode }) {
  return node.type === "group" ? <DockGroupView node={node} /> : <DockSplitView node={node} />
}

function minSizeOf(node: DockNode, panels: DockPanels): `${number}px` {
  if (node.type === "group") {
    const px = node.panels.map((id) => Number.parseInt(panels[id]?.minSize ?? "160", 10))
    return `${Math.max(120, ...px)}px`
  }
  return "120px"
}

function DockSplitView({ node }: { node: DockSplit }) {
  const { dock, panels } = useDockContext()
  // Remounting when the children change hands the group a fresh layout instead of patching its old one.
  const key = node.children.map((child) => child.id).join("|")

  return (
    <Resizable
      key={key}
      orientation={node.orientation}
      defaultLayout={node.sizes}
      onLayoutCommit={(sizes) => dock.dispatch({ type: "resize", splitId: node.id, sizes })}
    >
      {node.children.map((child, i) => (
        <Fragment key={child.id}>
          {i > 0 && <ResizableHandle aria-label="Resize panels" />}
          <ResizablePanel id={child.id} minSize={minSizeOf(child, panels)}>
            <DockNodeView node={child} />
          </ResizablePanel>
        </Fragment>
      ))}
    </Resizable>
  )
}

function DockGroupView({ node, onActivate }: { node: DockGroup; onActivate?: (panelId: string) => void }) {
  const { dock, panels, drag, setDrag, stacked } = useDockContext()
  const [dropZone, setDropZone] = useState<DropPosition | null>(null)
  const [tabDropIndex, setTabDropIndex] = useState<number | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const isMaximized = dock.state.maximized === node.id

  useEffect(() => {
    if (!drag) {
      setDropZone(null)
      setTabDropIndex(null)
    }
  }, [drag])

  const onBodyDragOver = (event: DragEvent) => {
    if (!drag || !bodyRef.current) return
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = "move"
    setTabDropIndex(null)
    const zone = dropPositionAt(bodyRef.current.getBoundingClientRect(), event.clientX, event.clientY)
    const alone = node.panels.length === 1 && node.panels[0] === drag.panelId
    setDropZone(alone ? null : zone)
  }

  const onBodyDrop = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (drag && dropZone) dock.dispatch({ type: "move", panelId: drag.panelId, target: node.id, position: dropZone })
    setDrag(null)
  }

  const tabIndexAt = (x: number) => {
    const tabs = [...(listRef.current?.querySelectorAll<HTMLElement>("[data-dock-tab]") ?? [])].filter(
      (tab) => tab.dataset.dockTab !== drag?.panelId,
    )
    const index = tabs.findIndex((tab) => {
      const rect = tab.getBoundingClientRect()
      return x < rect.left + rect.width / 2
    })
    return index === -1 ? tabs.length : index
  }

  const onTabsDragOver = (event: DragEvent) => {
    if (!drag) return
    event.preventDefault()
    event.stopPropagation()
    event.dataTransfer.dropEffect = "move"
    setDropZone(null)
    setTabDropIndex(tabIndexAt(event.clientX))
  }

  const onTabsDrop = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (drag) {
      dock.dispatch({
        type: "move",
        panelId: drag.panelId,
        target: node.id,
        position: "center",
        index: tabIndexAt(event.clientX),
      })
    }
    setDrag(null)
  }

  const visibleTabs = node.panels.filter((id) => id !== drag?.panelId)

  return (
    <Tabs
      value={node.active}
      onValueChange={(value) => {
        if (!value) return
        onActivate?.(String(value))
        dock.activate(String(value))
      }}
      data-dock-group={node.id}
      className="flex size-full min-h-0 flex-col bg-surface"
    >
      <div
        data-slot="dock-tabbar"
        className="flex h-tabbar shrink-0 items-stretch border-b border-border bg-background"
        onDragOver={onTabsDragOver}
        onDragLeave={() => setTabDropIndex(null)}
        onDrop={onTabsDrop}
      >
        <TabsList
          ref={listRef}
          aria-label="Panels"
          className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none]"
        >
          {node.panels.map((id) => {
            const def = panels[id]
            const dropBefore = tabDropIndex !== null && visibleTabs[tabDropIndex] === id
            return (
              <DockTab
                key={id}
                id={id}
                def={def}
                dropBefore={dropBefore}
                dragging={drag?.panelId === id}
                onClose={() => dock.close(id)}
              />
            )
          })}
          {tabDropIndex !== null && tabDropIndex >= visibleTabs.length && (
            <span aria-hidden className="my-1.5 w-0.5 shrink-0 rounded-full bg-ring" />
          )}
        </TabsList>
        <div className={cn("flex shrink-0 items-center gap-0.5 px-1.5", stacked && "hidden")}>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={isMaximized ? "Restore group" : "Maximize group"}
            onClick={() => dock.dispatch({ type: "toggleMaximize", groupId: node.id })}
          >
            {isMaximized ? <Icon icon={ArrowShrink01Icon} /> : <Icon icon={ArrowExpand01Icon} />}
          </Button>
          <Menu
            onAction={(value) => {
              const active = node.active
              if (value === "close-group") dock.dispatch({ type: "closeGroup", groupId: node.id })
              else if (active && (value === "right" || value === "bottom"))
                dock.dispatch({ type: "move", panelId: active, target: node.id, position: value })
            }}
          >
            <MenuTrigger render={<Button variant="ghost" size="icon-xs" aria-label="Group options" />}>
              <Icon icon={MoreHorizontalIcon} />
            </MenuTrigger>
            <MenuContent align="end">
              <MenuItem value="right" disabled={node.panels.length < 2}>
                Split right
              </MenuItem>
              <MenuItem value="bottom" disabled={node.panels.length < 2}>
                Split down
              </MenuItem>
              <MenuSeparator />
              <MenuItem value="close-group" destructive>
                Close group
              </MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </div>

      <div
        ref={bodyRef}
        data-slot="dock-body"
        className="relative min-h-0 flex-1"
        onDragOver={onBodyDragOver}
        onDragLeave={(event) => {
          if (!bodyRef.current?.contains(event.relatedTarget as Node | null)) setDropZone(null)
        }}
        onDrop={onBodyDrop}
      >
        {node.panels.map((id) => (
          <TabsPanel key={id} value={id} className="absolute inset-0 outline-none">
            {node.active === id && <PanelHost panelId={id} />}
          </TabsPanel>
        ))}
        {drag && <div className="absolute inset-0 z-20" />}
        {dropZone && <DropIndicator position={dropZone} />}
      </div>
    </Tabs>
  )
}

function DockTab({
  id,
  def,
  dropBefore,
  dragging,
  onClose,
}: {
  id: string
  def: DockPanelDef | undefined
  dropBefore: boolean
  dragging: boolean
  onClose: () => void
}) {
  const { setDrag, stacked } = useDockContext()
  const closable = def?.closable !== false

  return (
    <div
      data-dock-tab={id}
      className={cn(
        "group/tab relative flex shrink-0 items-stretch",
        dragging && "opacity-40",
        dropBefore && "before:absolute before:inset-y-1.5 before:-left-px before:z-10 before:w-0.5 before:rounded-full before:bg-ring",
      )}
    >
      <TabsTab
        value={id}
        draggable={!stacked}
        onDragStart={(event: DragEvent<HTMLButtonElement>) => {
          event.dataTransfer.effectAllowed = "move"
          event.dataTransfer.setData(DRAG_MIME, id)
          event.dataTransfer.setData("text/plain", def?.title ?? id)
          // Chrome cancels a drag whose source changes during dragstart, so update after it.
          setTimeout(() => setDrag({ panelId: id }))
        }}
        onAuxClick={(event: React.MouseEvent) => {
          if (event.button === 1 && closable) onClose()
        }}
        className={cn(
          "relative flex max-w-56 cursor-default select-none items-center gap-1.5 border-r border-border pl-3 text-ui text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:-outline-offset-2 data-selected:bg-surface data-selected:text-foreground data-selected:after:absolute data-selected:after:inset-x-0 data-selected:after:-bottom-px data-selected:after:h-px data-selected:after:bg-surface [&_svg]:size-3.5 [&_svg]:shrink-0",
          closable ? "pr-7" : "pr-3",
        )}
      >
        {def?.icon}
        <span className="truncate">{def?.title ?? id}</span>
      </TabsTab>
      {closable && (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Close ${def?.title ?? id}`}
          tabIndex={-1}
          onClick={onClose}
          className="absolute top-1/2 right-1 size-5 -translate-y-1/2 opacity-0 group-hover/tab:opacity-100 group-has-data-selected/tab:opacity-100 focus-visible:opacity-100"
        >
          <Icon icon={Cancel01Icon} />
        </Button>
      )}
    </div>
  )
}

function PanelHost({ panelId }: { panelId: string }) {
  const { hosts } = useDockContext()
  const ref = useCallback(
    (element: HTMLDivElement | null) => {
      const host = hosts.get(panelId)
      if (element && host && host.parentElement !== element) element.appendChild(host)
    },
    [hosts, panelId],
  )
  return <div ref={ref} data-slot="dock-panel" className="size-full overflow-hidden" />
}

const indicatorClass: Record<DropPosition, string> = {
  center: "inset-1.5",
  left: "inset-y-1.5 left-1.5 w-[calc(50%-6px)]",
  right: "inset-y-1.5 right-1.5 w-[calc(50%-6px)]",
  top: "inset-x-1.5 top-1.5 h-[calc(50%-6px)]",
  bottom: "inset-x-1.5 bottom-1.5 h-[calc(50%-6px)]",
}

function DropIndicator({ position, className }: { position: DropPosition; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-30 rounded-md border border-drop-border bg-drop transition-all duration-100",
        indicatorClass[position],
        className,
      )}
    />
  )
}

const rootEdges = ["left", "right", "top", "bottom"] as const

/** Thin strips along the dock's outer edges for docking a panel against the whole layout. */
function RootDropEdges() {
  const { dock, drag, setDrag } = useDockContext()
  const [hover, setHover] = useState<(typeof rootEdges)[number] | null>(null)

  const stripClass = {
    left: "inset-y-0 left-0 w-2",
    right: "inset-y-0 right-0 w-2",
    top: "inset-x-0 top-0 h-2",
    bottom: "inset-x-0 bottom-0 h-2",
  }
  const previewClass = {
    left: "inset-y-1.5 left-1.5 w-1/4",
    right: "inset-y-1.5 right-1.5 w-1/4",
    top: "inset-x-1.5 top-1.5 h-1/4",
    bottom: "inset-x-1.5 bottom-1.5 h-1/4",
  }

  return (
    <>
      {rootEdges.map((edge) => (
        <div
          key={edge}
          className={cn("absolute z-40", stripClass[edge])}
          onDragOver={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setHover(edge)
          }}
          onDragLeave={() => setHover(null)}
          onDrop={(event) => {
            event.preventDefault()
            event.stopPropagation()
            if (drag) dock.dispatch({ type: "move", panelId: drag.panelId, target: "root", position: edge })
            setHover(null)
            setDrag(null)
          }}
        />
      ))}
      {hover && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-30 rounded-md border border-drop-border bg-drop",
            previewClass[hover],
          )}
        />
      )}
    </>
  )
}
