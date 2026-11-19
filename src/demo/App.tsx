import {
  BookOpen01Icon,
  BubbleChatIcon,
  CreditCardIcon,
  HelpCircleIcon,
  Logout01Icon,
  Settings02Icon,
  UserCircleIcon,
  ComputerTerminal01Icon,
  DashboardSquare01Icon,
  FileDiffIcon,
  FolderTreeIcon,
  Globe02Icon,
  Moon02Icon,
  PlusSignIcon,
  RotateLeft01Icon,
  Search01Icon,
  Sun03Icon,
} from "@hugeicons/core-free-icons"
import { useEffect, useMemo, useState } from "react"
import { Dock, type DockPanels, useDock } from "@/components/dock/dock"
import { column, group, row } from "@/components/dock/model"
import { AccountMenu } from "@/components/shell/account-menu"
import { AppShell, SidebarToggle, TitleBar, TitleBarTitle, useAppShell } from "@/components/shell/app-shell"
import { Composer } from "@/components/shell/composer"
import { Message, ToolCall } from "@/components/shell/message"
import { Panel, PanelBody, PanelToolbar } from "@/components/shell/panel"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarItem } from "@/components/shell/sidebar"
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
import { Kbd } from "@/components/ui/kbd"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs"
import { useTheme } from "@/lib/use-theme"
import { Icon } from "@/components/ui/icon"

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
  const { dark, toggle: toggleTheme } = useTheme()

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
      titleBar={
        <TitleBar>
          <SidebarToggle />
          <TitleBarTitle>Panel design system</TitleBarTitle>
          <Button variant="ghost" size="sm" onClick={() => setPaletteOpen(true)} className="text-muted-foreground">
            <Icon icon={Search01Icon} />
            Search
            <Kbd>⌘K</Kbd>
          </Button>
          <Menu onAction={(id) => dock.open(id, { position: "right" })}>
            <MenuTrigger render={<Button variant="ghost" size="sm" />}>
              <Icon icon={DashboardSquare01Icon} />
              Panels
            </MenuTrigger>
            <MenuContent align="end">
              {panelCommands.map((panel) => (
                <MenuItem key={panel.id} value={panel.id}>
                  {panel.icon}
                  {panel.title}
                  {dock.isOpen(panel.id) && <span className="ml-auto text-2xs text-subtle-foreground">open</span>}
                </MenuItem>
              ))}
            </MenuContent>
          </Menu>
          <Button variant="ghost" size="sm" render={<a href="#/docs" />}>
            <Icon icon={BookOpen01Icon} />
            Docs
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Reset layout" onClick={dock.reset}>
            <Icon icon={RotateLeft01Icon} />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle theme" onClick={toggleTheme}>
            {dark ? <Icon icon={Sun03Icon} /> : <Icon icon={Moon02Icon} />}
          </Button>
        </TitleBar>
      }
      sidebar={<AppSidebar />}
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

function AppSidebar() {
  const [active, setActive] = useState(sessions[0])
  const { sidebar } = useAppShell()
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault()
        if (sidebar.isCollapsed("app-shell-sidebar")) sidebar.expand("app-shell-sidebar")
        else sidebar.collapse("app-shell-sidebar")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sidebar])

  return (
    <Sidebar aria-label="Sessions">
      <SidebarHeader>
        <SidebarItem className="text-foreground">
          <Icon icon={PlusSignIcon} />
          <span>New session</span>
        </SidebarItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Recent">
          {sessions.map((session) => (
            <SidebarItem key={session} active={session === active} onClick={() => setActive(session)}>
              <span>{session}</span>
            </SidebarItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-1.5">
        <AccountMenu name="John Lennon" email="john@example.com">
          <MenuItem value="account">
            <Icon icon={UserCircleIcon} />
            My account
          </MenuItem>
          <MenuItem value="settings">
            <Icon icon={Settings02Icon} />
            Settings
          </MenuItem>
          <MenuItem value="billing">
            <Icon icon={CreditCardIcon} />
            Billing
          </MenuItem>
          <MenuItem value="help">
            <Icon icon={HelpCircleIcon} />
            Help
          </MenuItem>
          <MenuSeparator />
          <MenuItem value="logout">
            <Icon icon={Logout01Icon} />
            Log out
          </MenuItem>
        </AccountMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function ChatPanel() {
  const [messages, setMessages] = useState<{ id: number; from: "user" | "assistant"; text: string }[]>([
    { id: 1, from: "user", text: "I want a design system for interfaces with movable panels." },
    {
      id: 2,
      from: "assistant",
      text: "Done. Drag any tab to another group, or to an edge to split it. The edges of the whole layout accept panels too.",
    },
  ])

  return (
    <Panel>
      <PanelBody className="px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-5 py-6">
          {messages.map((message) => (
            <Message key={message.id} from={message.from}>
              <p>{message.text}</p>
              {message.id === 2 && <ToolCall title="Write src/components/dock/dock.tsx">+412 lines</ToolCall>}
            </Message>
          ))}
        </div>
      </PanelBody>
      <div className="mx-auto w-full max-w-2xl shrink-0 px-6 pb-4">
        <Composer
          onSubmit={(text) => setMessages((list) => [...list, { id: Date.now(), from: "user", text }])}
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
