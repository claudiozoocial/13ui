import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxGroup as CheckboxGroupPrimitive,
  CheckboxIndicator,
} from "@ui-sdk/react/checkbox"
import type { ComponentProps } from "react"
import { Icon } from "@/components/ui/icon"
import { withClass } from "@/lib/utils"

/** A box that toggles on and off, or shows a mixed state with `indeterminate`. Its check is built in. */
function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive>) {
  return (
    <CheckboxPrimitive
      className={withClass(
        "group/checkbox grid size-4 shrink-0 cursor-default place-items-center rounded-[4px] border border-input bg-surface text-primary-foreground outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary data-disabled:border-border data-disabled:bg-muted data-disabled:data-checked:bg-subtle-foreground data-disabled:data-checked:border-subtle-foreground",
        className,
      )}
      {...props}
    >
      <CheckboxIndicator className="grid place-items-center [&_svg]:size-3">
        <Icon icon={Tick02Icon} strokeWidth={2.5} className="group-data-indeterminate/checkbox:hidden" />
        <Icon icon={MinusSignIcon} strokeWidth={2.5} className="hidden group-data-indeterminate/checkbox:block" />
      </CheckboxIndicator>
    </CheckboxPrimitive>
  )
}

function CheckboxGroup({ className, ...props }: ComponentProps<typeof CheckboxGroupPrimitive>) {
  return <CheckboxGroupPrimitive className={withClass("flex flex-col gap-2.5", className)} {...props} />
}

export { Checkbox, CheckboxGroup }
