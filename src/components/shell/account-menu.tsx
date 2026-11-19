import { UnfoldMoreIcon } from "@hugeicons/core-free-icons"
import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import type { ComponentProps, ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { Menu, MenuContent, MenuTrigger } from "@/components/ui/menu"
import { cn } from "@/lib/utils"

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

export function Avatar({ name, src, className }: { name: string; src?: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-2xs font-semibold text-primary-foreground",
        className,
      )}
    >
      {src ? <img src={src} alt="" className="size-full object-cover" /> : initialsOf(name)}
    </span>
  )
}

interface AccountMenuProps extends Omit<ComponentProps<typeof Menu>, "children"> {
  name: string
  email?: string
  avatar?: string
  /** MenuItems, groups and separators shown in the menu. */
  children: ReactNode
  className?: string
}

/**
 * The signed-in user at the foot of a sidebar. Pressing it opens a menu above it,
 * for account, settings and sign out. Handle choices with `onAction`.
 */
export function AccountMenu({ name, email, avatar, children, className, ...props }: AccountMenuProps) {
  return (
    <Menu {...props}>
      <MenuTrigger
        render={
          <ButtonPrimitive
            className={cn(
              "flex h-11 w-full min-w-0 cursor-default select-none items-center gap-2 rounded-md px-2 text-left outline-none transition-colors hover:bg-accent data-open:bg-accent",
              className,
            )}
          />
        }
      >
        <Avatar name={name} src={avatar} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-ui font-medium text-foreground">{name}</span>
          {email && <span className="truncate text-2xs text-muted-foreground">{email}</span>}
        </span>
        <Icon icon={UnfoldMoreIcon} className="size-4 shrink-0 text-muted-foreground" />
      </MenuTrigger>
      <MenuContent side="top" align="start" className="w-(--anchor-width) min-w-56">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar name={name} src={avatar} />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-ui font-medium">{name}</span>
            {email && <span className="truncate text-2xs text-muted-foreground">{email}</span>}
          </div>
        </div>
        <div role="presentation" className="-mx-1 my-1 h-px bg-border" />
        {children}
      </MenuContent>
    </Menu>
  )
}
