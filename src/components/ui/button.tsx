import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { buttonVariants } from "./button.styles"

type ButtonProps = ComponentProps<typeof ButtonPrimitive> & VariantProps<typeof buttonVariants>

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={withClass(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
