import { Label as LabelPrimitive } from "@ui-sdk/react/label"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

/** Names a control. Wrap a checkbox, switch or radio with its text, and pressing the text toggles it. */
function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive>) {
  return (
    <LabelPrimitive
      className={withClass(
        "inline-flex cursor-default select-none items-center gap-2 text-ui text-foreground has-data-disabled:text-subtle-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Label }
