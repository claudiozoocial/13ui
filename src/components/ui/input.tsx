import { Input as InputPrimitive } from "@ui-sdk/react/input"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { inputStyles } from "./input.styles"

function Input({ className, ...props }: ComponentProps<typeof InputPrimitive>) {
  return (
    <InputPrimitive
      className={withClass(
        inputStyles.root,
        className,
      )}
      {...props}
    />
  )
}

export { Input }
