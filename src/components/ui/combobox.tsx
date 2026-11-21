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

function ComboboxLabel({ className, ...props }: ComponentProps<typeof ComboboxLabelPrimitive>) {
  return <ComboboxLabelPrimitive className={withClass("text-xs font-medium text-muted-foreground", className)} {...props} />
}

/** The text field, with a button at its end that opens the list. */
function ComboboxInput({ className, ...props }: ComponentProps<typeof ComboboxInputPrimitive>) {
  return (
    <div className="relative flex w-full items-center">
      <ComboboxInputPrimitive
        className={withClass(
          "h-control w-full min-w-0 rounded-md border border-input bg-surface pr-8 pl-2.5 text-ui text-foreground outline-none transition-colors placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none data-disabled:opacity-50 data-open:border-ring",
          className,
        )}
        {...props}
      />
      <ComboboxTrigger
        aria-label="Show options"
        className="absolute right-1 grid size-6 place-items-center rounded-sm text-muted-foreground outline-none hover:bg-muted [&_svg]:size-4"
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
        "z-50 m-0 flex max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) flex-col overflow-hidden rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function ComboboxList({ className, ...props }: ComponentProps<typeof ComboboxListPrimitive>) {
  return <ComboboxListPrimitive className={withClass("max-h-64 min-h-0 overflow-y-auto", className)} {...props} />
}

function ComboboxItem({ className, children, ...props }: ComponentProps<typeof ComboboxItemPrimitive>) {
  return (
    <ComboboxItemPrimitive
      className={withClass(
        "flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none data-disabled:opacity-50 data-highlighted:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
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
      className={withClass("px-2 pb-1 pt-1.5 text-2xs font-medium text-subtle-foreground", className)}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: ComponentProps<typeof ComboboxEmptyPrimitive>) {
  return (
    <ComboboxEmptyPrimitive
      className={withClass("text-center text-ui text-subtle-foreground data-empty:py-6", className)}
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
