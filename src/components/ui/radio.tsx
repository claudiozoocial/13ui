import { Radio as RadioPrimitive, RadioGroup as RadioGroupPrimitive, RadioIndicator } from "@ui-sdk/react/radio"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function RadioGroup({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive>) {
  return <RadioGroupPrimitive className={withClass("flex flex-col gap-2.5", className)} {...props} />
}

/** One choice in a RadioGroup. Its dot is built in. */
function Radio({ className, ...props }: ComponentProps<typeof RadioPrimitive>) {
  return (
    <RadioPrimitive
      className={withClass(
        "grid size-4 shrink-0 cursor-default place-items-center rounded-full border border-input bg-surface outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:border-primary data-disabled:border-border data-disabled:bg-muted",
        className,
      )}
      {...props}
    >
      <RadioIndicator className="size-2 rounded-full bg-primary" />
    </RadioPrimitive>
  )
}

export { Radio, RadioGroup }
