import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import {
  Combobox,
  ComboboxContent as ComboboxContentPrimitive,
  ComboboxEmpty as ComboboxEmptyPrimitive,
  ComboboxGroup,
  ComboboxGroupLabel as ComboboxGroupLabelPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxItem as ComboboxItemPrimitive,
  ComboboxItemIndicator,
  ComboboxLabel as ComboboxLabelPrimitive,
  ComboboxList as ComboboxListPrimitive,
  ComboboxTrigger,
} from "@ui-sdk/react/combobox"
import type { ComponentProps } from "react"
import { Icon } from "@/components/ui/icon"
import { withClass } from "@/lib/utils"
import { comboboxStyles } from "./combobox.styles"

function ComboboxLabel({ className, ...props }: ComponentProps<typeof ComboboxLabelPrimitive>) {
  return <ComboboxLabelPrimitive className={withClass(comboboxStyles.label, className)} {...props} />
}

/** The text field, with a button at its end that opens the list. */
function ComboboxInput({ className, ...props }: ComponentProps<typeof ComboboxInputPrimitive>) {
  return (
    <div className={comboboxStyles.inputWrap}>
      <ComboboxInputPrimitive
        className={withClass(
          comboboxStyles.input,
          className,
        )}
        {...props}
      />
      <ComboboxTrigger
        aria-label="Show options"
        className={comboboxStyles.clear}
      >
        <Icon icon={ArrowDown01Icon} />
      </ComboboxTrigger>
    </div>
  )
}

function ComboboxContent({ className, sideOffset = 4, ...props }: ComponentProps<typeof ComboboxContentPrimitive>) {
  return (
    <ComboboxContentPrimitive
      sideOffset={sideOffset}
      className={withClass(
        comboboxStyles.content,
        className,
      )}
      {...props}
    />
  )
}

function ComboboxList({ className, ...props }: ComponentProps<typeof ComboboxListPrimitive>) {
  return <ComboboxListPrimitive className={withClass(comboboxStyles.list, className)} {...props} />
}

function ComboboxItem({ className, children, ...props }: ComponentProps<typeof ComboboxItemPrimitive>) {
  return (
    <ComboboxItemPrimitive
      className={withClass(
        comboboxStyles.item,
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          <span className={comboboxStyles.itemText}>
            {typeof children === "function" ? children(state) : children}
          </span>
          <ComboboxItemIndicator className="ml-auto text-foreground">
            <Icon icon={Tick02Icon} />
          </ComboboxItemIndicator>
        </>
      )}
    </ComboboxItemPrimitive>
  )
}

function ComboboxGroupLabel({ className, ...props }: ComponentProps<typeof ComboboxGroupLabelPrimitive>) {
  return (
    <ComboboxGroupLabelPrimitive
      className={withClass(comboboxStyles.groupLabel, className)}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: ComponentProps<typeof ComboboxEmptyPrimitive>) {
  return (
    <ComboboxEmptyPrimitive
      className={withClass(comboboxStyles.empty, className)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
}
