import {
  Resizable as ResizablePrimitive,
  ResizableHandle as ResizableHandlePrimitive,
  ResizablePanel as ResizablePanelPrimitive,
} from "@ui-sdk/react/resizable"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { resizableStyles } from "./resizable.styles"

function Resizable({ className, ...props }: ComponentProps<typeof ResizablePrimitive>) {
  return (
    <ResizablePrimitive
      className={withClass(resizableStyles.root, className)}
      {...props}
    />
  )
}

function ResizablePanel({ className, ...props }: ComponentProps<typeof ResizablePanelPrimitive>) {
  return <ResizablePanelPrimitive className={withClass(resizableStyles.panel, className)} {...props} />
}

/** A hairline divider whose hit area is wider than what it draws. */
function ResizableHandle({ className, ...props }: ComponentProps<typeof ResizableHandlePrimitive>) {
  return (
    <ResizableHandlePrimitive
      className={withClass(
        resizableStyles.handle,
        className,
      )}
      {...props}
    />
  )
}

export { createResizableController, type ResizableController } from "@ui-sdk/react/resizable"
export { Resizable, ResizableHandle, ResizablePanel }
