import {
  Resizable as ResizablePrimitive,
  ResizableHandle as ResizableHandlePrimitive,
  ResizablePanel as ResizablePanelPrimitive,
} from "@ui-sdk/react/resizable"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function Resizable({ className, ...props }: ComponentProps<typeof ResizablePrimitive>) {
  return (
    <ResizablePrimitive
      className={withClass("flex size-full data-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }: ComponentProps<typeof ResizablePanelPrimitive>) {
  return <ResizablePanelPrimitive className={withClass("relative min-h-0 min-w-0 overflow-hidden", className)} {...props} />
}

/** A hairline divider whose hit area is wider than what it draws. */
function ResizableHandle({ className, ...props }: ComponentProps<typeof ResizableHandlePrimitive>) {
  return (
    <ResizableHandlePrimitive
      className={withClass(
        "relative z-10 shrink-0 bg-border outline-none transition-colors after:absolute after:transition-colors data-[orientation=horizontal]:w-px data-[orientation=horizontal]:cursor-col-resize data-[orientation=horizontal]:after:inset-y-0 data-[orientation=horizontal]:after:-left-px data-[orientation=horizontal]:after:w-[3px] data-[orientation=vertical]:h-px data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:-top-px data-[orientation=vertical]:after:h-[3px] data-hovering:after:bg-ring/60 data-dragging:after:bg-ring focus-visible:after:bg-ring data-disabled:cursor-default",
        className,
      )}
      {...props}
    />
  )
}

export { createResizableController, type ResizableController } from "@ui-sdk/react/resizable"
export { Resizable, ResizableHandle, ResizablePanel }
