import { SidebarLeft01Icon } from "@hugeicons/core-free-icons"
import { Drawer, DrawerBackdrop, DrawerContent, DrawerTitle } from "@ui-sdk/react/drawer"
import { createContext, type ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  createResizableController,
  Resizable,
  ResizableHandle,
  ResizablePanel,
  type ResizableController,
} from "@/components/ui/resizable"
import { Tooltip, TooltipContent, TooltipShortcut, TooltipTrigger } from "@/components/ui/tooltip"
import { useMediaQuery } from "@/lib/use-media-query"
import { cn } from "@/lib/utils"
import { appShellStyles } from "./app-shell.styles"

interface AppShellContextValue {
  sidebar: ResizableController
  /** True while the desktop sidebar is collapsed to its icon rail. */
  collapsed: boolean
  /** True below the breakpoint, where the sidebar is a drawer over the page. */
  isMobile: boolean
  /** Whether the sidebar is showing: expanded on desktop, open as a drawer on mobile. */
  sidebarOpen: boolean
  toggleSidebar: () => void
  /** Closes the drawer on mobile. Does nothing on desktop, where the sidebar stays put. */
  closeSidebar: () => void
}

const AppShellContext = createContext<AppShellContextValue | null>(null)

export function useAppShell() {
  const context = useContext(AppShellContext)
  if (!context) throw new Error("useAppShell must be used inside <AppShell>")
  return context
}

/** Like useAppShell, but returns null outside an AppShell instead of throwing. */
export function useOptionalAppShell() {
  return useContext(AppShellContext)
}

const SIDEBAR_ID = "app-shell-sidebar"

interface AppShellProps {
  /** Runs the full height of the window, beside the main area. */
  sidebar: ReactNode
  children: ReactNode
  /** On mobile, shown beside the sidebar button in the slim bar above the main area, like a page title. */
  mobileHeader?: ReactNode
  /** Saves the sidebar width under this key. */
  autoSaveId?: string
  /** Below this viewport width, in pixels, the sidebar becomes a drawer. */
  breakpoint?: number
  /** Names the sidebar drawer for screen readers. */
  sidebarLabel?: string
  /** Toggles the sidebar with Command+B, or Ctrl+B outside Apple platforms. */
  shortcut?: boolean
  className?: string
}

/**
 * A window frame: a full-height sidebar with the main area beside it, and no header.
 * On wide screens the sidebar resizes and collapses to an icon rail; on narrow ones it is a
 * drawer that slides over the page, opened from a slim bar holding the sidebar button.
 */
export function AppShell({
  sidebar,
  children,
  mobileHeader,
  autoSaveId,
  breakpoint = 768,
  sidebarLabel = "Sidebar",
  shortcut = true,
  className,
}: AppShellProps) {
  const [controller] = useState(createResizableController)
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isMobile = useMediaQuery(`(max-width: ${breakpoint - 1}px)`)

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false)
  }, [isMobile])

  // A saved layout can restore the sidebar collapsed without a layout change event,
  // so read the real state once the panels mount, before the first paint.
  useLayoutEffect(() => {
    if (isMobile) return
    const sync = () => setCollapsed(controller.isCollapsed(SIDEBAR_ID))
    sync()
    const frame = requestAnimationFrame(sync)
    return () => cancelAnimationFrame(frame)
  }, [controller, isMobile])

  const toggleSidebar = () => {
    if (isMobile) setDrawerOpen((open) => !open)
    else if (controller.isCollapsed(SIDEBAR_ID)) controller.expand(SIDEBAR_ID)
    else controller.collapse(SIDEBAR_ID)
  }

  const toggleRef = useRef(toggleSidebar)
  toggleRef.current = toggleSidebar
  useEffect(() => {
    if (!shortcut) return
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "b") {
        event.preventDefault()
        toggleRef.current()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [shortcut])

  const value: AppShellContextValue = {
    sidebar: controller,
    collapsed: !isMobile && collapsed,
    isMobile,
    sidebarOpen: isMobile ? drawerOpen : !collapsed,
    toggleSidebar,
    closeSidebar: () => setDrawerOpen(false),
  }

  return (
    <AppShellContext.Provider value={value}>
      <div
        data-slot="app-shell"
        data-mobile={isMobile ? "" : undefined}
        className={cn(appShellStyles.root, className)}
      >
        {isMobile ? (
          <>
            <div
              data-slot="app-shell-mobile-bar"
              className={appShellStyles.mobileBar}
            >
              <SidebarToggle />
              <div className={appShellStyles.mobileHeader}>{mobileHeader}</div>
            </div>
            <div className="min-h-0 flex-1">{children}</div>
            <Drawer side="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerBackdrop className={appShellStyles.drawerBackdrop} />
              <DrawerContent className={appShellStyles.drawerContent}>
                <DrawerTitle className="sr-only">{sidebarLabel}</DrawerTitle>
                {sidebar}
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <Resizable
            controller={controller}
            autoSaveId={autoSaveId}
            onLayoutChange={() => setCollapsed(controller.isCollapsed(SIDEBAR_ID))}
            className="min-h-0 flex-1"
          >
            <ResizablePanel
              id={SIDEBAR_ID}
              defaultSize="260px"
              minSize="200px"
              maxSize="420px"
              collapsible
              collapsedSize="52px"
              className="bg-sidebar"
            >
              {sidebar}
            </ResizablePanel>
            <ResizableHandle aria-label="Resize sidebar" />
            <ResizablePanel minSize="360px">{children}</ResizablePanel>
          </Resizable>
        )}
      </div>
    </AppShellContext.Provider>
  )
}

export function SidebarToggle({ className }: { className?: string }) {
  const { toggleSidebar, sidebarOpen, isMobile } = useAppShell()
  const label = sidebarOpen ? "Hide sidebar" : isMobile ? "Open sidebar" : "Show sidebar"
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={className}
            onClick={toggleSidebar}
            aria-pressed={sidebarOpen}
          />
        }
      >
        <Icon icon={SidebarLeft01Icon} />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {label}
        <TooltipShortcut>⌘B</TooltipShortcut>
      </TooltipContent>
    </Tooltip>
  )
}
