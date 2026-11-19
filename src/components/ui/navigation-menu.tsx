import { ArrowDown01Icon } from "@hugeicons/core-free-icons"
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuContent as NavigationMenuContentPrimitive,
  NavigationMenuItem,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList as NavigationMenuListPrimitive,
  NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
} from "@ui-sdk/react/navigation-menu"
import type { ComponentProps } from "react"
import { Icon } from "@/components/ui/icon"
import { cn, withClass } from "@/lib/utils"

/** Site navigation: triggers that open panels of links, and plain links. Give it an aria-label. */
function NavigationMenu({ className, ...props }: ComponentProps<typeof NavigationMenuPrimitive>) {
  return <NavigationMenuPrimitive className={withClass("relative", className)} {...props} />
}

function NavigationMenuList({ className, ...props }: ComponentProps<typeof NavigationMenuListPrimitive>) {
  return (
    <NavigationMenuListPrimitive
      className={withClass("flex items-center gap-0.5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch", className)}
      {...props}
    />
  )
}

const triggerClass =
  "flex h-control cursor-default select-none items-center gap-1 rounded-md px-3 text-ui font-medium text-muted-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent data-open:bg-accent data-open:text-foreground"

/** Opens its item's panel. The chevron is built in and turns while open. */
function NavigationMenuTrigger({ className, children, ...props }: ComponentProps<typeof NavigationMenuTriggerPrimitive>) {
  return (
    <NavigationMenuTriggerPrimitive className={withClass(cn(triggerClass, "group/nav-trigger"), className)} {...props}>
      {(state) => (
        <>
          {typeof children === "function" ? children(state) : children}
          <Icon
            icon={ArrowDown01Icon}
            className="size-3.5 text-subtle-foreground transition-transform duration-150 group-data-open/nav-trigger:rotate-180"
          />
        </>
      )}
    </NavigationMenuTriggerPrimitive>
  )
}

/** A panel of links, shown as a popup under its trigger. */
function NavigationMenuContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof NavigationMenuContentPrimitive>) {
  return (
    <NavigationMenuContentPrimitive
      side={side}
      align={align}
      sideOffset={sideOffset}
      className={withClass(
        "z-50 m-0 origin-(--transform-origin) rounded-lg border-0 bg-surface-raised p-1.5 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

/**
 * A link, in a panel or on its own in the list. `current` marks the current page.
 * Render your router's link with `render`.
 */
function NavigationMenuLink({ className, ...props }: ComponentProps<typeof NavigationMenuLinkPrimitive>) {
  return (
    <NavigationMenuLinkPrimitive
      className={withClass(
        "flex cursor-default flex-col gap-0.5 rounded-md px-2.5 py-2 text-ui text-foreground no-underline outline-none transition-colors hover:bg-accent focus-visible:bg-accent data-current:bg-accent",
        className,
      )}
      {...props}
    />
  )
}

/** A link styled like a trigger, for top-level items with no panel. */
function NavigationMenuTopLink({ className, ...props }: ComponentProps<typeof NavigationMenuLinkPrimitive>) {
  return (
    <NavigationMenuLinkPrimitive
      className={withClass(cn(triggerClass, "data-current:text-foreground"), className)}
      {...props}
    />
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTopLink,
  NavigationMenuTrigger,
}
