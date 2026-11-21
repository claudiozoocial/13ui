import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { spinnerStyles } from "./spinner.styles"

interface SpinnerProps extends ComponentProps<"svg"> {
  size?: "sm" | "default" | "lg"
  /** Read by screen readers. Pass an empty string when nearby text already says what is loading. */
  label?: string
}

const sizes = { sm: "size-3.5", default: "size-4", lg: "size-6" }

/** A spinning ring for work of unknown length. Its color follows the text color. */
export function Spinner({ size = "default", label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      viewBox="0 0 16 16"
      fill="none"
      role={label ? "status" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn(spinnerStyles.root, sizes[size], className)}
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M14.25 8A6.25 6.25 0 0 0 8 1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
