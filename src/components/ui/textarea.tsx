import { Textarea as TextareaPrimitive } from "@ui-sdk/react/textarea"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function Textarea({ className, ...props }: ComponentProps<typeof TextareaPrimitive>) {
  return (
    <TextareaPrimitive
      className={withClass(
        "w-full min-w-0 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-subtle-foreground focus-visible:outline-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
