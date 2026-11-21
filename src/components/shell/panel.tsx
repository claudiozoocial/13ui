import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

/** The inside of a dock panel: an optional toolbar over a scrolling body. */
export function Panel({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="panel" className={cn("flex size-full min-h-0 flex-col bg-surface", className)} {...props} />
}

export function PanelToolbar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-toolbar"
      className={cn("flex h-9 shrink-0 items-center gap-1 border-b border-border px-2 text-ui text-muted-foreground", className)}
      {...props}
    />
  )
}

export function PanelBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="panel-body" className={cn("min-h-0 flex-1 overflow-auto", className)} {...props} />
}
