import { Radio as RadioPrimitive, RadioGroup as RadioGroupPrimitive, RadioIndicator } from "@ui-sdk/react/radio"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { radioStyles } from "./radio.styles"

function RadioGroup({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive>) {
  return <RadioGroupPrimitive className={withClass("flex flex-col gap-2.5", className)} {...props} />
}

/** One choice in a RadioGroup. Its dot is built in. */
function Radio({ className, ...props }: ComponentProps<typeof RadioPrimitive>) {
  return (
    <RadioPrimitive
      className={withClass(
        radioStyles.root,
        className,
      )}
      {...props}
    >
      <RadioIndicator className={radioStyles.dot} />
    </RadioPrimitive>
  )
}

export { Radio, RadioGroup }
