import { Input as InputPrimitive } from "@ui-sdk/react/input"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function Input({ className, ...props }: ComponentProps<typeof InputPrimitive>) {
  return (
    <InputPrimitive
      className={withClass(
        "h-control w-full min-w-0 rounded-md border border-input bg-surface px-2.5 text-ui text-foreground outline-none transition-colors placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
