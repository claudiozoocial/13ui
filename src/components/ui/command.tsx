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

function CommandInput({ className, ...props }: ComponentProps<typeof CommandInputPrimitive>) {
  return (
    <div className="flex h-11 items-center gap-2 border-b border-border px-3">
      <Icon icon={Search01Icon} className="size-4 shrink-0 text-subtle-foreground" />
      <CommandInputPrimitive
        className={withClass(
          "h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle-foreground focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: ComponentProps<typeof CommandListPrimitive>) {
  return <CommandListPrimitive className={withClass("max-h-80 overflow-y-auto p-1", className)} {...props} />
}

function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandEmptyPrimitive>) {
  return (
    <CommandEmptyPrimitive className={withClass("text-center text-ui text-subtle-foreground data-empty:py-8 data-loading:py-8", className)} {...props} />
  )
}

function CommandGroupLabel({ className, ...props }: ComponentProps<typeof CommandGroupLabelPrimitive>) {
  return (
    <CommandGroupLabelPrimitive
      className={withClass("px-2 pb-1 pt-2 text-2xs font-medium text-subtle-foreground", className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: ComponentProps<typeof CommandItemPrimitive>) {
  return (
    <CommandItemPrimitive
      className={withClass(
        "flex h-control cursor-default select-none items-center gap-2 rounded-md px-2 text-ui outline-none data-disabled:opacity-50 data-highlighted:bg-accent [&_svg]:size-4 [&_svg]:text-muted-foreground",
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
      <DialogBackdrop className="fixed inset-0 z-50 bg-black/20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/50" />
      <DialogContent className="fixed top-[18%] left-1/2 z-50 m-0 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-xl border-0 bg-surface-raised p-0 text-foreground shadow-popover outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0">
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
