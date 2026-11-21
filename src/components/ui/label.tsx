import { Label as LabelPrimitive } from "@ui-sdk/react/label"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { labelStyles } from "./label.styles"

/** Names a control. Wrap a checkbox, switch or radio with its text, and pressing the text toggles it. */
function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive>) {
  return (
    <LabelPrimitive
      className={withClass(
        labelStyles.root,
        className,
      )}
      {...props}
    />
  )
}

export { Label }
