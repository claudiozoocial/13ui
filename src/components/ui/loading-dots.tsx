import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface LoadingDotsProps extends ComponentProps<"span"> {
  /** Read by screen readers. Pass an empty string when nearby text already says what is happening. */
  label?: string
}

/** Three pulsing dots, like someone typing. Their color follows the text color. */
export function LoadingDots({ label = "Loading", className, ...props }: LoadingDotsProps) {
  return (
    <span
      data-slot="loading-dots"
      role={label ? "status" : undefined}
      aria-label={label || undefined}
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="size-1.5 animate-dot rounded-full bg-current opacity-30 motion-reduce:animate-breathe motion-reduce:opacity-70"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
  )
}
