import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@ui-sdk/react/scroll-area"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  type = "hover",
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive>) {
  return (
    <ScrollAreaPrimitive type={type} className={withClass("relative min-h-0 overflow-hidden", className)} {...props}>
      <ScrollAreaViewport className="size-full overscroll-contain outline-none">
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollAreaPrimitive>
  )
}

function ScrollBar({ className, ...props }: ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      className={withClass(
        "flex touch-none p-0.5 opacity-0 transition-opacity duration-150 select-none data-visible:opacity-100 data-[orientation=horizontal]:inset-x-0 data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:inset-y-0 data-[orientation=vertical]:right-0 data-[orientation=vertical]:w-2.5",
        className,
      )}
      {...props}
    >
      <ScrollAreaThumb className="flex-1 rounded-full bg-border-strong" />
    </ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
