import {
  Menu,
  MenuContent as MenuContentPrimitive,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuTrigger,
} from "@ui-sdk/react/menu"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function MenuContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof MenuContentPrimitive>) {
  return (
    <MenuContentPrimitive
      sideOffset={sideOffset}
      className={withClass(
        "z-50 m-0 min-w-44 origin-(--transform-origin) overflow-y-auto rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 max-h-(--available-height) data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function MenuItem({ className, ...props }: ComponentProps<typeof MenuItemPrimitive>) {
  return (
    <MenuItemPrimitive
      className={withClass(
        "flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none data-disabled:opacity-50 data-highlighted:bg-accent data-destructive:text-destructive [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function MenuGroupLabel({ className, ...props }: ComponentProps<typeof MenuGroupLabelPrimitive>) {
  return (
    <MenuGroupLabelPrimitive
      className={withClass("px-2 pb-1 pt-1.5 text-2xs font-medium text-subtle-foreground", className)}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: ComponentProps<typeof MenuSeparatorPrimitive>) {
  return <MenuSeparatorPrimitive className={withClass("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

export {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
}
