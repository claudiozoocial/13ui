import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@ui-sdk/react/scroll-area"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { scrollAreaStyles } from "./scroll-area.styles"

interface ScrollAreaProps extends ComponentProps<typeof ScrollAreaPrimitive> {
  /**
   * Which ways it scrolls. "vertical", the default, fits the content to the width, so long lines
   * wrap or scroll inside their own block instead of widening the page.
   */
  scrollbars?: "vertical" | "horizontal" | "both"
}

function ScrollArea({ className, children, type = "hover", scrollbars = "vertical", ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive type={type} className={withClass(scrollAreaStyles.root, className)} {...props}>
      <ScrollAreaViewport className={scrollAreaStyles.viewport}>
        {/* UI SDK sets min-width: fit-content inline so content can scroll sideways; undo it for vertical-only. */}
        <ScrollAreaContent className={scrollbars === "vertical" ? "min-w-0!" : undefined}>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      {scrollbars !== "horizontal" && <ScrollBar orientation="vertical" />}
      {scrollbars !== "vertical" && <ScrollBar orientation="horizontal" />}
    </ScrollAreaPrimitive>
  )
}

function ScrollBar({ className, ...props }: ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      className={withClass(
        scrollAreaStyles.scrollbar,
        className,
      )}
      {...props}
    >
      <ScrollAreaThumb className={scrollAreaStyles.thumb} />
    </ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
