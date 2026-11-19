import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import type { ComponentProps, ReactNode } from "react"
import { useOptionalAppShell } from "@/components/shell/app-shell"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, withClass } from "@/lib/utils"

// In an AppShell, a collapsed desktop sidebar becomes a narrow icon rail. Parts below style the
// rail with group-data-collapsed/sidebar: labels turn screen-reader-only and items center their icon.
export function Sidebar({ className, ...props }: ComponentProps<"nav">) {
  const shell = useOptionalAppShell()
  return (
    <nav
      data-slot="sidebar"
      data-collapsed={shell?.collapsed ? "" : undefined}
      className={cn("group/sidebar flex size-full min-w-0 flex-col", className)}
      {...props}
    />
  )
}

/** The top of the sidebar, like the product name beside the sidebar toggle. */
export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex h-titlebar shrink-0 items-center gap-1 px-2",
        `group-data-collapsed/sidebar:justify-center group-data-collapsed/sidebar:px-0`,
        className,
      )}
      {...props}
    />
  )
}

/** Text hidden while the sidebar is a rail, like the product name. */
export function SidebarTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-w-0 flex-1 items-center gap-2 px-1 text-ui font-semibold", `group-data-collapsed/sidebar:hidden`, className)}
      {...props}
    />
  )
}

export function SidebarContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className={cn("flex flex-col gap-3 px-2 pb-2", `group-data-collapsed/sidebar:px-1.5`)}>{children}</div>
    </ScrollArea>
  )
}

export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex shrink-0 flex-col gap-px border-t border-border p-2", `group-data-collapsed/sidebar:px-1.5`, className)}
      {...props}
    />
  )
}

interface SidebarGroupProps extends ComponentProps<"div"> {
  label?: string
  /** Hides the whole group while the sidebar is a rail, for items without icons, like recent documents. */
  hideOnRail?: boolean
}

export function SidebarGroup({ label, hideOnRail, className, children, ...props }: SidebarGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-col gap-px", hideOnRail && `group-data-collapsed/sidebar:hidden`, className)}
      {...props}
    >
      {label && (
        <div className={cn("px-2 pb-1 pt-1 text-2xs font-medium text-subtle-foreground", `group-data-collapsed/sidebar:hidden`)}>{label}</div>
      )}
      {children}
    </div>
  )
}

type SidebarItemProps = ComponentProps<typeof ButtonPrimitive> & {
  active?: boolean
  /**
   * Whether pressing it closes the sidebar drawer on mobile. Defaults to true, for navigation.
   * Pass false for items that open something in place, like a menu trigger.
   */
  closesSidebar?: boolean
}

/**
 * A row in the sidebar: an icon and a label in a span. Render it as a link with
 * `render={<a href="…" />}`. On the rail, span labels become screen-reader-only.
 */
export function SidebarItem({ className, active, closesSidebar = true, onClick, ...props }: SidebarItemProps) {
  const shell = useOptionalAppShell()
  return (
    <ButtonPrimitive
      onClick={(event, details) => {
        const result = onClick?.(event, details)
        if (closesSidebar && shell?.isMobile) shell.closeSidebar()
        return result
      }}
      data-active={active ? "" : undefined}
      aria-current={active ? "page" : undefined}
      className={withClass(
        cn(
          "flex h-control w-full min-w-0 cursor-default select-none items-center gap-2 rounded-md px-2 text-left text-ui text-muted-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-foreground data-active:bg-accent data-active:text-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span]:truncate",
          `group-data-collapsed/sidebar:justify-center group-data-collapsed/sidebar:px-0 group-data-collapsed/sidebar:[&>span:not([data-slot=avatar])]:sr-only group-data-collapsed/sidebar:[&>[data-sidebar-trailing]]:hidden`,
        ),
        className,
      )}
      {...props}
    />
  )
}

/** Something at the end of an item, like a shortcut or a chevron. Hidden on the rail. */
export function SidebarItemTrailing({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-sidebar-trailing=""
      className={cn("ml-auto flex shrink-0 items-center text-2xs text-subtle-foreground", className)}
      {...props}
    />
  )
}
