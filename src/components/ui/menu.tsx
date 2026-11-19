import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import {
  Menu,
  MenuCheckboxItem as MenuCheckboxItemPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem as MenuRadioItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuShortcut as MenuShortcutPrimitive,
  MenuSub,
  MenuSubContent as MenuSubContentPrimitive,
  MenuSubTrigger as MenuSubTriggerPrimitive,
  MenuTrigger,
} from "@ui-sdk/react/menu"
import type { ComponentProps, ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { cn, withClass } from "@/lib/utils"

const popupClass =
  "z-50 m-0 min-w-44 origin-(--transform-origin) overflow-y-auto rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 max-h-(--available-height) data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none"

const itemClass =
  "flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none data-disabled:opacity-50 data-highlighted:bg-accent data-destructive:text-destructive [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground data-destructive:[&_svg]:text-destructive [&_[data-slot=menu-shortcut]]:kbd [&_[data-slot=menu-shortcut]]:ml-auto"

function MenuContent({ className, sideOffset = 4, ...props }: ComponentProps<typeof MenuContentPrimitive>) {
  return <MenuContentPrimitive sideOffset={sideOffset} className={withClass(popupClass, className)} {...props} />
}

function MenuSubContent({ className, ...props }: ComponentProps<typeof MenuSubContentPrimitive>) {
  return <MenuSubContentPrimitive className={withClass(popupClass, className)} {...props} />
}

/** Shows an item's shortcut keys. Items with a `shortcut` prop already render one. */
function MenuShortcut({ className, ...props }: ComponentProps<typeof MenuShortcutPrimitive>) {
  return <MenuShortcutPrimitive className={withClass("kbd ml-auto", className)} {...props} />
}

/** Runs an action. With `shortcut`, like "mod+s", it shows the platform's keys at its end as a key cap. */
function MenuItem({ className, ...props }: ComponentProps<typeof MenuItemPrimitive>) {
  return <MenuItemPrimitive className={withClass(itemClass, className)} {...props} />
}

function MenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof MenuCheckboxItemPrimitive>) {
  return (
    <MenuCheckboxItemPrimitive className={withClass(cn(itemClass, "pl-7 relative"), className)} {...props}>
      {(state) => (
        <>
          <MenuItemIndicator className="absolute left-2 grid size-4 place-items-center [&_svg]:text-foreground">
            <Icon icon={Tick02Icon} />
          </MenuItemIndicator>
          {typeof children === "function" ? children(state) : children}
        </>
      )}
    </MenuCheckboxItemPrimitive>
  )
}

function MenuRadioItem({ className, children, ...props }: ComponentProps<typeof MenuRadioItemPrimitive>) {
  return (
    <MenuRadioItemPrimitive className={withClass(cn(itemClass, "pl-7 relative"), className)} {...props}>
      {(state) => (
        <>
          <MenuItemIndicator className="absolute left-2 grid size-4 place-items-center">
            <span className="size-1.5 rounded-full bg-foreground" />
          </MenuItemIndicator>
          {typeof children === "function" ? children(state) : children}
        </>
      )}
    </MenuRadioItemPrimitive>
  )
}

/** Opens a nested menu. The arrow at its end is added for you. */
function MenuSubTrigger({ className, children, ...props }: ComponentProps<typeof MenuSubTriggerPrimitive>) {
  return (
    <MenuSubTriggerPrimitive className={withClass(cn(itemClass, "data-open:bg-accent"), className)} {...props}>
      {(state) => (
        <>
          {typeof children === "function" ? children(state) : children}
          <Icon icon={ArrowRight01Icon} className="ml-auto" />
        </>
      )}
    </MenuSubTriggerPrimitive>
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

/** Content that isn't an item, like the signed-in user at the top of an account menu. */
function MenuHeader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div role="presentation" className={cn("flex items-center gap-2 px-2 py-1.5", className)}>
      {children}
    </div>
  )
}

export {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuHeader,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
}
