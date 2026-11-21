import { Menubar as MenubarPrimitive } from "@ui-sdk/react/menubar"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

/**
 * An application menu bar: put Menus inside, and they join it. Arrow keys move between menus,
 * and once one is open, hovering another opens it. Use the Menu parts for the contents.
 */
function Menubar({ className, ...props }: ComponentProps<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      className={withClass(
        "inline-flex h-control items-center gap-0.5 rounded-md border border-border bg-surface p-0.5 [&_[data-slot=menu-trigger]]:flex [&_[data-slot=menu-trigger]]:h-full [&_[data-slot=menu-trigger]]:cursor-default [&_[data-slot=menu-trigger]]:select-none [&_[data-slot=menu-trigger]]:items-center [&_[data-slot=menu-trigger]]:rounded-sm [&_[data-slot=menu-trigger]]:px-2.5 [&_[data-slot=menu-trigger]]:text-ui [&_[data-slot=menu-trigger]]:outline-none [&_[data-slot=menu-trigger]]:hover:bg-accent [&_[data-slot=menu-trigger]]:focus-visible:bg-accent [&_[data-slot=menu-trigger]]:data-open:bg-accent",
        className,
      )}
      {...props}
    />
  )
}

export { Menubar }
