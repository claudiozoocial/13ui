import { ArrowDown01Icon, Search01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import {
  Select as SelectPrimitive,
  SelectContent as SelectContentPrimitive,
  SelectEmpty as SelectEmptyPrimitive,
  SelectGroup,
  SelectGroupLabel as SelectGroupLabelPrimitive,
  SelectInput as SelectInputPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectItemIndicator,
  SelectLabel as SelectLabelPrimitive,
  SelectList as SelectListPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  type SelectProps,
  SelectValue,
} from "@ui-sdk/react/select"
import { type ComponentProps, createContext, type RefObject, useContext, useRef } from "react"
import { Icon } from "@/components/ui/icon"
import { withClass } from "@/lib/utils"

const ContentRefContext = createContext<RefObject<HTMLDivElement | null> | null>(null)

/**
 * A pointer press opens the list with focus on the selected item, so typing would jump between
 * items instead of searching. When the list has a SelectInput, focus it on open however it opened.
 */
function Select<T = string, Multiple extends boolean | undefined = false>({
  onOpenChange,
  ...props
}: SelectProps<T, Multiple>) {
  const contentRef = useRef<HTMLDivElement>(null)
  const rootProps = {
    ...props,
    onOpenChange: (open, details) => {
      onOpenChange?.(open, details)
      if (!open) return
      requestAnimationFrame(() =>
        contentRef.current?.querySelector<HTMLInputElement>('[data-slot="select-input"]')?.focus(),
      )
    },
  } as SelectProps<T, Multiple>
  return (
    <ContentRefContext.Provider value={contentRef}>
      <SelectPrimitive<T, Multiple> {...rootProps} />
    </ContentRefContext.Provider>
  )
}

function SelectLabel({ className, ...props }: ComponentProps<typeof SelectLabelPrimitive>) {
  return <SelectLabelPrimitive className={withClass("text-xs font-medium text-muted-foreground", className)} {...props} />
}

function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectTriggerPrimitive>) {
  return (
    <SelectTriggerPrimitive
      className={withClass(
        "flex h-control w-full min-w-0 cursor-default select-none items-center justify-between gap-2 rounded-md border border-input bg-surface px-2.5 text-left text-ui text-foreground outline-none transition-colors hover:bg-muted focus-visible:border-ring data-disabled:opacity-50 data-open:border-ring data-placeholder:text-subtle-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          <span className="flex min-w-0 flex-1 items-center gap-2 truncate">
            {typeof children === "function" ? children(state) : children}
          </span>
          <Icon icon={ArrowDown01Icon} className="text-muted-foreground" />
        </>
      )}
    </SelectTriggerPrimitive>
  )
}

function SelectContent({ className, sideOffset = 4, ...props }: ComponentProps<typeof SelectContentPrimitive>) {
  const contentRef = useContext(ContentRefContext)
  return (
    <SelectContentPrimitive
      ref={contentRef}
      sideOffset={sideOffset}
      className={withClass(
        "z-50 m-0 flex max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) flex-col overflow-hidden rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

/** A search field inside the popup. Put the items in a SelectList so the field stays put while they scroll. */
function SelectInput({ className, ...props }: ComponentProps<typeof SelectInputPrimitive>) {
  return (
    <div className="-mx-1 -mt-1 mb-1 flex h-9 shrink-0 items-center gap-2 border-b border-border px-2.5">
      <Icon icon={Search01Icon} className="size-4 shrink-0 text-subtle-foreground" />
      <SelectInputPrimitive
        className={withClass(
          "h-full w-full min-w-0 bg-transparent text-ui text-foreground outline-none placeholder:text-subtle-foreground focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function SelectList({ className, ...props }: ComponentProps<typeof SelectListPrimitive>) {
  return <SelectListPrimitive className={withClass("min-h-0 flex-1 overflow-y-auto", className)} {...props} />
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectItemPrimitive>) {
  return (
    <SelectItemPrimitive
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
          <SelectItemIndicator className="ml-auto text-foreground">
            <Icon icon={Tick02Icon} />
          </SelectItemIndicator>
        </>
      )}
    </SelectItemPrimitive>
  )
}

function SelectGroupLabel({ className, ...props }: ComponentProps<typeof SelectGroupLabelPrimitive>) {
  return (
    <SelectGroupLabelPrimitive
      className={withClass("px-2 pb-1 pt-1.5 text-2xs font-medium text-subtle-foreground", className)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectSeparatorPrimitive>) {
  return <SelectSeparatorPrimitive className={withClass("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

function SelectEmpty({ className, ...props }: ComponentProps<typeof SelectEmptyPrimitive>) {
  return (
    <SelectEmptyPrimitive
      className={withClass("text-center text-ui text-subtle-foreground data-empty:py-6", className)}
      {...props}
    />
  )
}

export {
  Select,
  type SelectProps,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectGroupLabel,
  SelectInput,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
