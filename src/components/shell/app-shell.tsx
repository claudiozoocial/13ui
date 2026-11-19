import {
  SidebarLeft01Icon,
} from "@hugeicons/core-free-icons"
import { type ComponentProps, createContext, type ReactNode, useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  createResizableController,
  Resizable,
  ResizableHandle,
  ResizablePanel,
  type ResizableController,
} from "@/components/ui/resizable"
import { Tooltip, TooltipContent, TooltipShortcut, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

interface AppShellContextValue {
  sidebar: ResizableController
  collapsed: boolean
  toggleSidebar: () => void
}

const AppShellContext = createContext<AppShellContextValue | null>(null)

export function useAppShell() {
  const context = useContext(AppShellContext)
  if (!context) throw new Error("useAppShell must be used inside <AppShell>")
  return context
}

const SIDEBAR_ID = "app-shell-sidebar"

interface AppShellProps {
  sidebar: ReactNode
  titleBar?: ReactNode
  children: ReactNode
  /** Saves the sidebar width under this key. */
  autoSaveId?: string
  className?: string
}

/** A window frame: a title bar across the top, a collapsible sidebar and the main area beside it. */
export function AppShell({ sidebar, titleBar, children, autoSaveId, className }: AppShellProps) {
  const [controller] = useState(createResizableController)
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    if (controller.isCollapsed(SIDEBAR_ID)) controller.expand(SIDEBAR_ID)
    else controller.collapse(SIDEBAR_ID)
  }

  return (
    <AppShellContext.Provider value={{ sidebar: controller, collapsed, toggleSidebar }}>
      <div data-slot="app-shell" className={cn("flex h-full flex-col bg-background text-foreground", className)}>
        {titleBar}
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
            className="bg-sidebar"
          >
            {sidebar}
          </ResizablePanel>
          <ResizableHandle aria-label="Resize sidebar" />
          <ResizablePanel minSize="360px">{children}</ResizablePanel>
        </Resizable>
      </div>
    </AppShellContext.Provider>
  )
}

export function SidebarToggle({ className }: { className?: string }) {
  const { toggleSidebar, collapsed } = useAppShell()
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={className}
            onClick={toggleSidebar}
            aria-pressed={!collapsed}
          />
        }
      >
        <Icon icon={SidebarLeft01Icon} />
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {collapsed ? "Show sidebar" : "Hide sidebar"}
        <TooltipShortcut>⌘B</TooltipShortcut>
      </TooltipContent>
    </Tooltip>
  )
}

export function TitleBar({ className, children, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="title-bar"
      className={cn(
        "flex h-titlebar shrink-0 select-none items-center gap-1 border-b border-border bg-sidebar px-2",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export function TitleBarTitle({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("min-w-0 flex-1 truncate px-2 text-ui font-medium", className)} {...props} />
}
