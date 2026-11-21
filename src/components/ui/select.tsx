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
import { selectStyles } from "./select.styles"

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
  return <SelectLabelPrimitive className={withClass(selectStyles.label, className)} {...props} />
}

function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectTriggerPrimitive>) {
  return (
    <SelectTriggerPrimitive
      className={withClass(
        selectStyles.trigger,
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          <span className={selectStyles.triggerValue}>
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
        selectStyles.content,
        className,
      )}
      {...props}
    />
  )
}

/** A search field inside the popup. Put the items in a SelectList so the field stays put while they scroll. */
function SelectInput({ className, ...props }: ComponentProps<typeof SelectInputPrimitive>) {
  return (
    <div className={selectStyles.inputWrap}>
      <Icon icon={Search01Icon} className={selectStyles.inputIcon} />
      <SelectInputPrimitive
        className={withClass(
          selectStyles.input,
          className,
        )}
        {...props}
      />
    </div>
  )
}

function SelectList({ className, ...props }: ComponentProps<typeof SelectListPrimitive>) {
  return <SelectListPrimitive className={withClass(selectStyles.list, className)} {...props} />
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectItemPrimitive>) {
  return (
    <SelectItemPrimitive
      className={withClass(
        selectStyles.item,
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          <span className={selectStyles.itemText}>
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
      className={withClass(selectStyles.groupLabel, className)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectSeparatorPrimitive>) {
  return <SelectSeparatorPrimitive className={withClass(selectStyles.separator, className)} {...props} />
}

function SelectEmpty({ className, ...props }: ComponentProps<typeof SelectEmptyPrimitive>) {
  return (
    <SelectEmptyPrimitive
      className={withClass(selectStyles.empty, className)}
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
