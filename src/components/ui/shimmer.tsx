import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface ShimmerProps extends ComponentProps<"span"> {
  /** Runs the sweep. When false, the text shows plainly, so it can stay mounted as work finishes. */
  active?: boolean
}

/**
 * Text with a light sweeping across it, for work in progress: "Thinking", "Searching files".
 * With reduced motion the light doesn't move; the text gently fades in and out instead.
 */
export function Shimmer({ active = true, className, ...props }: ShimmerProps) {
  return (
    <span
      data-slot="shimmer"
      data-active={active ? "" : undefined}
      className={cn(
        active &&
          "animate-shimmer bg-[linear-gradient(90deg,var(--muted-foreground)_40%,var(--foreground)_50%,var(--muted-foreground)_60%)] bg-size-[250%_100%] bg-no-repeat bg-clip-text text-transparent motion-reduce:animate-breathe motion-reduce:bg-none motion-reduce:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}
