import {
  Tooltip as TooltipPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipShortcut as TooltipShortcutPrimitive,
  TooltipTrigger,
} from "@ui-sdk/react/tooltip"
import { type ComponentProps, useEffect, useState } from "react"
import { withClass } from "@/lib/utils"
import { tooltipStyles } from "./tooltip.styles"

/**
 * Closes when the pointer leaves the window. Browsers skip the trigger's pointerleave when the
 * pointer exits through a window edge, which would otherwise leave an edge tooltip open.
 */
function Tooltip({ open: openProp, defaultOpen, onOpenChange, ...props }: ComponentProps<typeof TooltipPrimitive>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false)
  const controlled = openProp !== undefined
  const open = controlled ? openProp : uncontrolledOpen

  useEffect(() => {
    if (!open || controlled) return
    const close = () => setUncontrolledOpen(false)
    document.documentElement.addEventListener("mouseleave", close)
    return () => document.documentElement.removeEventListener("mouseleave", close)
  }, [open, controlled])

  return (
    <TooltipPrimitive
      open={open}
      onOpenChange={(next, details) => {
        if (!controlled) setUncontrolledOpen(next)
        onOpenChange?.(next, details)
      }}
      {...props}
    />
  )
}

function TooltipContent({
  className,
  sideOffset = 6,
  ...props
}: ComponentProps<typeof TooltipContentPrimitive>) {
  return (
    <TooltipContentPrimitive
      sideOffset={sideOffset}
      className={withClass(
        tooltipStyles.content,
        className,
      )}
      {...props}
    />
  )
}

function TooltipShortcut({ className, ...props }: ComponentProps<typeof TooltipShortcutPrimitive>) {
  return (
    <TooltipShortcutPrimitive
      className={withClass(tooltipStyles.shortcut, className)}
      {...props}
    />
  )
}

export { Tooltip, TooltipContent, TooltipShortcut, TooltipTrigger }
