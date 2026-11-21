import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import { Children, type ComponentProps, isValidElement, type ReactNode } from "react"
import { useOptionalAppShell } from "@/components/shell/app-shell"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn, withClass } from "@/lib/utils"
import { sidebarStyles } from "./sidebar.styles"

// In an AppShell, a collapsed desktop sidebar becomes a narrow icon rail. Parts below style the
// rail with group-data-collapsed/sidebar: labels turn screen-reader-only and items center their icon.
export function Sidebar({ className, ...props }: ComponentProps<"nav">) {
  const shell = useOptionalAppShell()
  return (
    <nav
      data-slot="sidebar"
      data-collapsed={shell?.collapsed ? "" : undefined}
      className={cn(sidebarStyles.root, className)}
      {...props}
    />
  )
}

/** The top of the sidebar, like the product name beside the sidebar toggle. */
export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        sidebarStyles.header,
        sidebarStyles.headerRail,
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
      className={cn(sidebarStyles.title, `group-data-collapsed/sidebar:hidden`, className)}
      {...props}
    />
  )
}

export function SidebarContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className={cn(sidebarStyles.content, `group-data-collapsed/sidebar:px-1.5`)}>{children}</div>
    </ScrollArea>
  )
}

export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(sidebarStyles.footer, `group-data-collapsed/sidebar:px-1.5`, className)}
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
        <div className={cn(sidebarStyles.groupLabel, `group-data-collapsed/sidebar:hidden`)}>{label}</div>
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
  /**
   * Shown beside the item on the icon rail, where its label is hidden. Defaults to the item's
   * text, leaving out SidebarItemTrailing. Pass false for no tooltip.
   */
  tooltip?: ReactNode | false
}

/** The visible text of an item's children, without trailing parts like shortcuts. */
function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child)
      if (!isValidElement<{ children?: ReactNode; "data-sidebar-trailing"?: string }>(child)) return ""
      if (child.type === SidebarItemTrailing || child.props["data-sidebar-trailing"] !== undefined) return ""
      return textOf(child.props.children)
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * A row in the sidebar: an icon and a label in a span. Render it as a link with
 * `render={<a href="…" />}`. On the rail, span labels become screen-reader-only and the
 * label shows as a tooltip instead.
 */
export function SidebarItem({
  className,
  active,
  closesSidebar = true,
  tooltip,
  onClick,
  children,
  ...props
}: SidebarItemProps) {
  const shell = useOptionalAppShell()
  const item = (
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
          sidebarStyles.item,
          sidebarStyles.itemRail,
        ),
        className,
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )

  const label = tooltip === false ? null : (tooltip ?? (typeof children === "function" ? "" : textOf(children)))
  if (!shell?.collapsed || !label) return item

  return (
    <Tooltip>
      <TooltipTrigger render={item} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

/** Something at the end of an item, like a shortcut or a chevron. Hidden on the rail. */
export function SidebarItemTrailing({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-sidebar-trailing=""
      className={cn(sidebarStyles.itemTrailing, className)}
      {...props}
    />
  )
}
