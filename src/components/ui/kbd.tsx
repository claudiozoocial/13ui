import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "kbd",
        className,
      )}
      {...props}
    />
  )
}

export { Kbd }
