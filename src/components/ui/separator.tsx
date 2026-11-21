import { Separator as SeparatorPrimitive } from "@ui-sdk/react/separator"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { separatorStyles } from "./separator.styles"

function Separator({ className, ...props }: ComponentProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      className={withClass(
        separatorStyles.root,
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
