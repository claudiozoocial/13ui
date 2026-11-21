import {
  Command,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup,
  CommandGroupLabel as CommandGroupLabelPrimitive,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandItemIcon,
  CommandList as CommandListPrimitive,
} from "@ui-sdk/react/command"
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
} from "@ui-sdk/react/dialog"
import {
  Search01Icon,
} from "@hugeicons/core-free-icons"
import type { ComponentProps, ReactNode } from "react"
import { withClass } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { commandStyles } from "./command.styles"

function CommandInput({ className, ...props }: ComponentProps<typeof CommandInputPrimitive>) {
  return (
    <div className={commandStyles.inputWrap}>
      <Icon icon={Search01Icon} className={commandStyles.inputIcon} />
      <CommandInputPrimitive
        className={withClass(
          commandStyles.input,
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: ComponentProps<typeof CommandListPrimitive>) {
  return <CommandListPrimitive className={withClass(commandStyles.list, className)} {...props} />
}

function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandEmptyPrimitive>) {
  return (
    <CommandEmptyPrimitive className={withClass(commandStyles.empty, className)} {...props} />
  )
}

function CommandGroupLabel({ className, ...props }: ComponentProps<typeof CommandGroupLabelPrimitive>) {
  return (
    <CommandGroupLabelPrimitive
      className={withClass(commandStyles.groupLabel, className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: ComponentProps<typeof CommandItemPrimitive>) {
  return (
    <CommandItemPrimitive
      className={withClass(
        commandStyles.item,
        className,
      )}
      {...props}
    />
  )
}

interface CommandDialogProps extends ComponentProps<typeof Dialog> {
  title: string
  children: ReactNode
}

function CommandDialog({ title, children, ...props }: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogBackdrop className={commandStyles.dialogBackdrop} />
      <DialogContent className={commandStyles.dialogContent}>
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
}
