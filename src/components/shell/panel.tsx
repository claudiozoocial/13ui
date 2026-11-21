import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { panelStyles } from "./panel.styles"

/** The inside of a dock panel: an optional toolbar over a scrolling body. */
export function Panel({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="panel" className={cn(panelStyles.root, className)} {...props} />
}

export function PanelToolbar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-toolbar"
      className={cn(panelStyles.toolbar, className)}
      {...props}
    />
  )
}

export function PanelBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="panel-body" className={cn(panelStyles.body, className)} {...props} />
}
