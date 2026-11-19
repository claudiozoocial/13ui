import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import type { ComponentProps } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, withClass } from "@/lib/utils"

export function Sidebar({ className, ...props }: ComponentProps<"nav">) {
  return <nav data-slot="sidebar" className={cn("flex size-full min-w-0 flex-col", className)} {...props} />
}

export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex shrink-0 flex-col gap-0.5 p-2", className)} {...props} />
}

export function SidebarContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <ScrollArea className={cn("flex-1", className)}>
      <div className="flex flex-col gap-3 px-2 pb-2">{children}</div>
    </ScrollArea>
  )
}

export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex shrink-0 items-center gap-2 border-t border-border p-2", className)} {...props} />
}

export function SidebarGroup({ label, className, children, ...props }: ComponentProps<"div"> & { label?: string }) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-col gap-px", className)} {...props}>
      {label && <div className="px-2 pb-1 pt-1 text-2xs font-medium text-subtle-foreground">{label}</div>}
      {children}
    </div>
  )
}

type SidebarItemProps = ComponentProps<typeof ButtonPrimitive> & { active?: boolean }

export function SidebarItem({ className, active, ...props }: SidebarItemProps) {
  return (
    <ButtonPrimitive
      data-active={active ? "" : undefined}
      aria-current={active ? "page" : undefined}
      className={withClass(
        "flex h-control w-full min-w-0 cursor-default select-none items-center gap-2 rounded-md px-2 text-left text-ui text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground data-active:bg-accent data-active:text-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span]:truncate",
        className,
      )}
      {...props}
    />
  )
}
