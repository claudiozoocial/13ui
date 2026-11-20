import {
  BookOpen01Icon,
  BubbleChatIcon,
  ComputerTerminal01Icon,
  CreditCardIcon,
  DashboardSquare01Icon,
  FileDiffIcon,
  FolderTreeIcon,
  Globe02Icon,
  HelpCircleIcon,
  Logout01Icon,
  Moon02Icon,
  PlusSignIcon,
  RotateLeft01Icon,
  Search01Icon,
  Settings02Icon,
  UnfoldMoreIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"
import { useEffect, useMemo, useRef, useState } from "react"
import { Dock, type DockApi, type DockPanels, useDock } from "@/components/dock/dock"
import { column, group, row } from "@/components/dock/model"
import { AppShell, SidebarToggle } from "@/components/shell/app-shell"
import { Composer } from "@/components/shell/composer"
import { Caret, Message, Reasoning, ToolCall } from "@/components/shell/message"
import { Panel, PanelBody, PanelToolbar } from "@/components/shell/panel"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarItemTrailing,
  SidebarTitle,
} from "@/components/shell/sidebar"
import { Avatar, AvatarFallback, initials } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
} from "@/components/ui/command"
import { Icon } from "@/components/ui/icon"
import { Kbd } from "@/components/ui/kbd"
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/ui/menu"
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs"
import { type Theme, useTheme } from "@/lib/use-theme"

const initialLayout = () => ({
  root: row(
    [
      group(["chat"]),
      column([group(["diff", "files"]), group(["terminal"])], [62, 38]),
    ],
    [55, 45],
  ),
  maximized: null,
})

const user = { name: "John Lennon", email: "john@example.com" }

const sessions = [
  "Panel design system",
  "Migrate auth to OAuth",
  "Fix the CI build",
  "Pricing landing page",
  "Refactor the store",
]

export function App() {
  const dock = useDock({ initial: initialLayout, storageKey: "13ui:layout" })
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    document.title = "Workbench · 13UI"
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const panels = useMemo<DockPanels>(
    () => ({
      chat: { title: "Chat", icon: <Icon icon={BubbleChatIcon} />, content: <ChatPanel />, closable: false, minSize: "320px" },
      diff: { title: "Diff", icon: <Icon icon={FileDiffIcon} />, content: <DiffPanel /> },
      files: { title: "Files", icon: <Icon icon={FolderTreeIcon} />, content: <FilesPanel /> },
      terminal: { title: "Terminal", icon: <Icon icon={ComputerTerminal01Icon} />, content: <TerminalPanel /> },
      browser: { title: "Browser", icon: <Icon icon={Globe02Icon} />, content: <BrowserPanel /> },
    }),
    [],
  )

  const panelCommands = Object.entries(panels).map(([id, def]) => ({ id, ...def }))

  return (
    <AppShell
      autoSaveId="13ui:shell"
      sidebarLabel="Navigation"
      mobileHeader="Panel design system"
      sidebar={
        <AppSidebar
          dock={dock}
          panelCommands={panelCommands}
          onSearch={() => setPaletteOpen(true)}
        />
      }
    >
      <Dock dock={dock} panels={panels} />
      <CommandDialog title="Command palette" open={paletteOpen} onOpenChange={setPaletteOpen}>
        <Command
          onAction={(value) => {
            if (value === "reset") dock.reset()
            else dock.open(String(value))
            setPaletteOpen(false)
          }}
        >
          <CommandInput aria-label="Search commands" placeholder="Open a panel or run a command…" />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Panels</CommandGroupLabel>
              {panelCommands.map((panel) => (
                <CommandItem key={panel.id} value={panel.id}>
                  <CommandItemIcon>{panel.icon}</CommandItemIcon>
                  {panel.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup>
              <CommandGroupLabel>Layout</CommandGroupLabel>
              <CommandItem value="reset">
                <CommandItemIcon>
                  <Icon icon={RotateLeft01Icon} />
                </CommandItemIcon>
                Reset layout
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </AppShell>
  )
}

interface AppSidebarProps {
  dock: DockApi
  panelCommands: { id: string; title: string; icon?: React.ReactNode }[]
  onSearch: () => void
}

function AppSidebar({ dock, panelCommands, onSearch }: AppSidebarProps) {
  const [active, setActive] = useState(sessions[0])
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar aria-label="Navigation">
      <SidebarHeader>
        <SidebarTitle>13UI</SidebarTitle>
        <SidebarToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarItem className="text-foreground">
            <Icon icon={PlusSignIcon} />
            <span>New session</span>
          </SidebarItem>
          <SidebarItem onClick={onSearch}>
            <Icon icon={Search01Icon} />
            <span>Search</span>
            <SidebarItemTrailing>
              <Kbd>⌘K</Kbd>
            </SidebarItemTrailing>
          </SidebarItem>
          <Menu onAction={(id) => dock.open(id, { position: "right" })}>
            <MenuTrigger render={<SidebarItem closesSidebar={false} />}>
              <Icon icon={DashboardSquare01Icon} />
              <span>Panels</span>
            </MenuTrigger>
            <MenuContent side="right" align="start">
              {panelCommands.map((panel) => (
                <MenuItem key={panel.id} value={panel.id}>
                  {panel.icon}
                  {panel.title}
                  {dock.isOpen(panel.id) && <span className="ml-auto text-2xs text-subtle-foreground">open</span>}
                </MenuItem>
              ))}
              <MenuSeparator />
              <MenuItem value="__reset" onSelect={() => dock.reset()}>
                <Icon icon={RotateLeft01Icon} />
                Reset layout
              </MenuItem>
            </MenuContent>
          </Menu>
          <SidebarItem render={<a href="#/docs/introduction" />}>
            <Icon icon={BookOpen01Icon} />
            <span>Docs</span>
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup label="Recent" hideOnRail>
          {sessions.map((session) => (
            <SidebarItem key={session} active={session === active} onClick={() => setActive(session)}>
              <span>{session}</span>
            </SidebarItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuTrigger render={<SidebarItem closesSidebar={false} className="h-11 text-foreground" />}>
            <Avatar size="sm">
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-2xs text-muted-foreground">{user.email}</span>
            </span>
            <SidebarItemTrailing>
              <Icon icon={UnfoldMoreIcon} />
            </SidebarItemTrailing>
          </MenuTrigger>
          <MenuContent side="top" align="start" className="w-(--anchor-width) min-w-56">
            <MenuHeader>
              <Avatar size="sm">
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-2xs text-muted-foreground">{user.email}</span>
              </div>
            </MenuHeader>
            <MenuSeparator />
            <MenuItem value="account">
              <Icon icon={UserCircleIcon} />
              My account
            </MenuItem>
            <MenuItem value="settings" shortcut="mod+,">
              <Icon icon={Settings02Icon} />
              Settings
            </MenuItem>
            <MenuItem value="billing">
              <Icon icon={CreditCardIcon} />
              Billing
            </MenuItem>
            <MenuSub>
              <MenuSubTrigger>
                <Icon icon={Moon02Icon} />
                Theme
              </MenuSubTrigger>
              <MenuSubContent className="min-w-36">
                <MenuRadioGroup value={theme} onValueChange={(value) => value && setTheme(value as Theme)}>
                  <MenuRadioItem value="system">System</MenuRadioItem>
                  <MenuRadioItem value="light">Light</MenuRadioItem>
                  <MenuRadioItem value="dark">Dark</MenuRadioItem>
                </MenuRadioGroup>
              </MenuSubContent>
            </MenuSub>
            <MenuItem value="help">
              <Icon icon={HelpCircleIcon} />
              Help
            </MenuItem>
            <MenuSeparator />
            <MenuItem value="logout">
              <Icon icon={Logout01Icon} />
              Log out
            </MenuItem>
          </MenuContent>
        </Menu>
      </SidebarFooter>
    </Sidebar>
  )
}

interface ChatMessage {
  id: number
  from: "user" | "assistant"
  text: string
  /** Assistant only: still thinking, and seconds spent once done. */
  thinking?: boolean
  thoughtFor?: number
  streaming?: boolean
  thoughts?: string
  tool?: string
  toolResult?: string
}

const replies = [
  {
    thoughts: "The user wants this panel to sit beside the editor. Open it to the right of the active group.",
    text: "Opened it to the right of the editor. Drag its tab to any edge if you want it somewhere else; the layout is saved as you go.",
    tool: "dock.open(\"browser\", { position: \"right\" })",
  },
  {
    thoughts: "Two panels share one group. Splitting them makes both visible at once.",
    text: "Split them into two columns so you can see both. Double-click a tab to maximize it, and again to restore the layout.",
  },
  {
    thoughts: "A narrow window stacks every panel into one row of tabs, so nothing gets squeezed.",
    text: "Below 640px the dock turns into a single row of tabs. Widen the window and your saved layout comes back exactly as it was.",
  },
]

function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: "user", text: "I want a design system for interfaces with movable panels." },
    {
      id: 2,
      from: "assistant",
      text: "Done. Drag any tab to another group, or to an edge to split it. The edges of the whole layout accept panels too.",
      thoughtFor: 3,
      thoughts: "Panels need to move between groups, so the layout is a tree of splits and tab groups.",
      tool: "Write src/components/dock/dock.tsx",
      toolResult: "+412 lines",
    },
  ])
  const [pending, setPending] = useState(false)
  const timers = useRef<number[]>([])
  const turn = useRef(0)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" })
  }, [messages])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const update = (id: number, patch: Partial<ChatMessage>) =>
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, ...patch } : m)))

  const stop = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setMessages((list) => list.map((m) => (m.thinking || m.streaming ? { ...m, thinking: false, streaming: false } : m)))
    setPending(false)
  }

  const send = (text: string) => {
    const reply = replies[turn.current++ % replies.length]
    const id = Date.now()
    setPending(true)
    setMessages((list) => [
      ...list,
      { id: id - 1, from: "user", text },
      { id, from: "assistant", text: "", thinking: true, thoughts: reply.thoughts, tool: reply.tool },
    ])
    const words = reply.text.split(" ")
    const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    later(1800, () => update(id, { thinking: false, thoughtFor: 2, streaming: true }))
    words.forEach((_, i) => later(1800 + (i + 1) * 45, () => update(id, { text: words.slice(0, i + 1).join(" ") })))
    later(1800 + words.length * 45 + 200, () => {
      update(id, { streaming: false })
      setPending(false)
      timers.current = []
    })
  }

  return (
    <Panel>
      <PanelBody className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-5 py-6">
          {messages.map((message) =>
            message.from === "user" ? (
              <Message key={message.id} from="user">
                {message.text}
              </Message>
            ) : (
              <Message key={message.id} from="assistant">
                {(message.thinking || message.thoughtFor != null) && (
                  <Reasoning streaming={message.thinking} duration={message.thoughtFor}>
                    {message.thoughts}
                  </Reasoning>
                )}
                {message.text && (
                  <p>
                    {message.text}
                    {message.streaming && <Caret />}
                  </p>
                )}
                {message.tool && !message.thinking && (
                  <ToolCall title={message.tool} status={message.streaming ? "running" : "done"}>
                    {message.toolResult}
                  </ToolCall>
                )}
              </Message>
            ),
          )}
          <div ref={end} />
        </div>
      </PanelBody>
      <div className="mx-auto w-full max-w-2xl shrink-0 px-3 pb-3 sm:px-6 sm:pb-4">
        <Composer
          onSubmit={send}
          pending={pending}
          onStop={stop}
          actions={
            <Button variant="ghost" size="icon-sm" aria-label="Attach">
              <Icon icon={PlusSignIcon} />
            </Button>
          }
        />
      </div>
    </Panel>
  )
}

const diffLines = [
  { kind: " ", text: "export function Dock({ dock, panels }: DockProps) {" },
  { kind: "-", text: "  const [drag, setDrag] = useState(false)" },
  { kind: "+", text: "  const [drag, setDrag] = useState<DragInfo | null>(null)" },
  { kind: "+", text: "  const hostsRef = useRef(new Map<string, HTMLDivElement>())" },
  { kind: " ", text: "  const open = openPanels(dock.state.root)" },
  { kind: " ", text: "" },
  { kind: "-", text: "  return <Split node={root} />" },
  { kind: "+", text: "  return <DockNodeView node={root} />" },
  { kind: " ", text: "}" },
]

function DiffPanel() {
  return (
    <Panel>
      <PanelToolbar>
        <span className="truncate font-mono text-xs text-foreground">src/components/dock/dock.tsx</span>
        <span className="ml-auto text-xs text-success">+3</span>
        <span className="text-xs text-destructive">−2</span>
      </PanelToolbar>
      <PanelBody>
        <pre className="py-2 font-mono text-xs leading-5">
          {diffLines.map((line, i) => (
            <div
              key={i}
              className={
                line.kind === "+"
                  ? "bg-success/10 px-3"
                  : line.kind === "-"
                    ? "bg-destructive/10 px-3"
                    : "px-3"
              }
            >
              <span className="mr-3 inline-block w-3 text-subtle-foreground select-none">{line.kind}</span>
              {line.text}
            </div>
          ))}
        </pre>
      </PanelBody>
    </Panel>
  )
}

const tree = ["src/", "  components/", "    dock/", "      dock.tsx", "      model.ts", "    shell/", "    ui/", "  demo/", "registry.json"]

function FilesPanel() {
  return (
    <Panel>
      <PanelBody className="py-1">
        {tree.map((entry) => (
          <div key={entry} className="flex h-7 items-center px-3 font-mono text-xs whitespace-pre text-muted-foreground hover:bg-muted">
            {entry}
          </div>
        ))}
      </PanelBody>
    </Panel>
  )
}

function TerminalPanel() {
  const [lines, setLines] = useState(["$ pnpm dev", "  VITE ready in 312 ms", "  ➜  Local: http://localhost:5173/"])
  const [input, setInput] = useState("")
  return (
    <Panel className="bg-background">
      <PanelBody className="p-3 font-mono text-xs leading-5">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre text-muted-foreground">
            {line}
          </div>
        ))}
        <form
          className="flex"
          onSubmit={(event) => {
            event.preventDefault()
            setLines((list) => [...list, `$ ${input}`])
            setInput("")
          }}
        >
          <span className="mr-1 text-muted-foreground">$</span>
          <input
            aria-label="Command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 bg-transparent outline-none focus-visible:outline-none"
          />
        </form>
      </PanelBody>
    </Panel>
  )
}

function BrowserPanel() {
  const [view, setView] = useState<"desktop" | "mobile">("desktop")
  return (
    <Panel>
      <PanelToolbar>
        <div className="flex h-6 flex-1 items-center rounded-md bg-muted px-2 font-mono text-xs">localhost:5173</div>
        <Tabs value={view} onValueChange={(value) => value && setView(value as typeof view)}>
          <TabsList aria-label="Viewport">
            <TabsTab value="desktop">Desktop</TabsTab>
            <TabsTab value="mobile">Mobile</TabsTab>
          </TabsList>
        </Tabs>
      </PanelToolbar>
      <PanelBody className="grid place-items-center bg-muted p-4">
        <div
          className="grid h-full place-items-center rounded-lg border border-border bg-surface text-ui text-subtle-foreground"
          style={{ width: view === "mobile" ? 320 : "100%" }}
        >
          Preview
        </div>
      </PanelBody>
    </Panel>
  )
}
