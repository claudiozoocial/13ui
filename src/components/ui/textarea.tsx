import { Textarea as TextareaPrimitive } from "@ui-sdk/react/textarea"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { textareaStyles } from "./textarea.styles"

function Textarea({ className, ...props }: ComponentProps<typeof TextareaPrimitive>) {
  return (
    <TextareaPrimitive
      className={withClass(
        textareaStyles.root,
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
