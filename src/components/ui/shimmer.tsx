import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { shimmerStyles } from "./shimmer.styles"

interface ShimmerProps extends ComponentProps<"span"> {
  /** Runs the sweep. When false, the text shows plainly, so it can stay mounted as work finishes. */
  active?: boolean
}

/**
 * Text with a light sweeping across it, for work in progress: "Thinking", "Searching files".
 * It keeps running with reduced motion: only the color moves, never the text.
 */
export function Shimmer({ active = true, className, ...props }: ShimmerProps) {
  return (
    <span
      data-slot="shimmer"
      data-active={active ? "" : undefined}
      className={cn(
        active &&
          shimmerStyles.active,
        className,
      )}
      {...props}
    />
  )
}
