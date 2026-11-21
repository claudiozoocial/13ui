import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxGroup as CheckboxGroupPrimitive,
  CheckboxIndicator,
} from "@ui-sdk/react/checkbox"
import type { ComponentProps } from "react"
import { Icon } from "@/components/ui/icon"
import { withClass } from "@/lib/utils"
import { checkboxStyles } from "./checkbox.styles"

/** A box that toggles on and off, or shows a mixed state with `indeterminate`. Its check is built in. */
function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive>) {
  return (
    <CheckboxPrimitive
      className={withClass(
        checkboxStyles.root,
        className,
      )}
      {...props}
    >
      <CheckboxIndicator className={checkboxStyles.indicator}>
        <Icon icon={Tick02Icon} strokeWidth={2.5} className="group-data-indeterminate/checkbox:hidden" />
        <Icon icon={MinusSignIcon} strokeWidth={2.5} className={checkboxStyles.indeterminate} />
      </CheckboxIndicator>
    </CheckboxPrimitive>
  )
}

function CheckboxGroup({ className, ...props }: ComponentProps<typeof CheckboxGroupPrimitive>) {
  return <CheckboxGroupPrimitive className={withClass("flex flex-col gap-2.5", className)} {...props} />
}

export { Checkbox, CheckboxGroup }
