import { Menubar as MenubarPrimitive } from "@ui-sdk/react/menubar"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { menubarStyles } from "./menubar.styles"

/**
 * An application menu bar: put Menus inside, and they join it. Arrow keys move between menus,
 * and once one is open, hovering another opens it. Use the Menu parts for the contents.
 */
function Menubar({ className, ...props }: ComponentProps<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      className={withClass(
        menubarStyles.root,
        className,
      )}
      {...props}
    />
  )
}

export { Menubar }
