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
import { menuStyles } from "./menu.styles"

function MenuContent({ className, sideOffset = 4, ...props }: ComponentProps<typeof MenuContentPrimitive>) {
  return <MenuContentPrimitive sideOffset={sideOffset} className={withClass(menuStyles.popup, className)} {...props} />
}

function MenuSubContent({ className, ...props }: ComponentProps<typeof MenuSubContentPrimitive>) {
  return <MenuSubContentPrimitive className={withClass(menuStyles.popup, className)} {...props} />
}

/** Shows an item's shortcut keys. Items with a `shortcut` prop already render one. */
function MenuShortcut({ className, ...props }: ComponentProps<typeof MenuShortcutPrimitive>) {
  return <MenuShortcutPrimitive className={withClass("kbd ml-auto", className)} {...props} />
}

/** Runs an action. With `shortcut`, like "mod+s", it shows the platform's keys at its end as a key cap. */
function MenuItem({ className, ...props }: ComponentProps<typeof MenuItemPrimitive>) {
  return <MenuItemPrimitive className={withClass(menuStyles.item, className)} {...props} />
}

function MenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof MenuCheckboxItemPrimitive>) {
  return (
    <MenuCheckboxItemPrimitive className={withClass(cn(menuStyles.item, "pl-7 relative"), className)} {...props}>
      {(state) => (
        <>
          <MenuItemIndicator className={menuStyles.checkboxIndicator}>
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
    <MenuRadioItemPrimitive className={withClass(cn(menuStyles.item, "pl-7 relative"), className)} {...props}>
      {(state) => (
        <>
          <MenuItemIndicator className={menuStyles.radioIndicator}>
            <span className={menuStyles.radioDot} />
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
    <MenuSubTriggerPrimitive className={withClass(cn(menuStyles.item, "data-open:bg-accent"), className)} {...props}>
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
      className={withClass(menuStyles.groupLabel, className)}
      {...props}
    />
  )
}

function MenuSeparator({ className, ...props }: ComponentProps<typeof MenuSeparatorPrimitive>) {
  return <MenuSeparatorPrimitive className={withClass(menuStyles.separator, className)} {...props} />
}

/** Content that isn't an item, like the signed-in user at the top of an account menu. */
function MenuHeader({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div role="presentation" className={cn(menuStyles.header, className)}>
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
