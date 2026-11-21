import { Separator as SeparatorPrimitive } from "@ui-sdk/react/separator"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function Separator({ className, ...props }: ComponentProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      className={withClass(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
