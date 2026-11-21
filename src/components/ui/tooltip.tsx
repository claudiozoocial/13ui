import {
  Tooltip as TooltipPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipShortcut as TooltipShortcutPrimitive,
  TooltipTrigger,
} from "@ui-sdk/react/tooltip"
import { type ComponentProps, useEffect, useState } from "react"
import { withClass } from "@/lib/utils"

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
        "z-50 flex origin-(--transform-origin) items-center gap-2 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-instant:transition-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function TooltipShortcut({ className, ...props }: ComponentProps<typeof TooltipShortcutPrimitive>) {
  return (
    <TooltipShortcutPrimitive
      className={withClass("text-2xs text-primary-foreground/60", className)}
      {...props}
    />
  )
}

export { Tooltip, TooltipContent, TooltipShortcut, TooltipTrigger }
