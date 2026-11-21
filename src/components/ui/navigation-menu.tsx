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
import { navigationMenuStyles } from "./navigation-menu.styles"

/** Site navigation: triggers that open panels of links, and plain links. Give it an aria-label. */
function NavigationMenu({ className, ...props }: ComponentProps<typeof NavigationMenuPrimitive>) {
  return <NavigationMenuPrimitive className={withClass("relative", className)} {...props} />
}

function NavigationMenuList({ className, ...props }: ComponentProps<typeof NavigationMenuListPrimitive>) {
  return (
    <NavigationMenuListPrimitive
      className={withClass(navigationMenuStyles.list, className)}
      {...props}
    />
  )
}

/** Opens its item's panel. The chevron is built in and turns while open. */
function NavigationMenuTrigger({ className, children, ...props }: ComponentProps<typeof NavigationMenuTriggerPrimitive>) {
  return (
    <NavigationMenuTriggerPrimitive className={withClass(cn(navigationMenuStyles.trigger, "group/nav-trigger"), className)} {...props}>
      {(state) => (
        <>
          {typeof children === "function" ? children(state) : children}
          <Icon
            icon={ArrowDown01Icon}
            className={navigationMenuStyles.triggerChevron}
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
        navigationMenuStyles.content,
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
        navigationMenuStyles.link,
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
      className={withClass(cn(navigationMenuStyles.trigger, "data-current:text-foreground"), className)}
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
