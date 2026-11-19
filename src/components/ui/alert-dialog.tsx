import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose as AlertDialogClosePrimitive,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogTrigger,
} from "@ui-sdk/react/alert-dialog"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn, withClass } from "@/lib/utils"

/** The dialog panel, centered over a dimmed page. The backdrop is built in. */
function AlertDialogContent({ className, ...props }: ComponentProps<typeof AlertDialogContentPrimitive>) {
  return (
    <>
      <AlertDialogBackdrop className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/60" />
      <AlertDialogContentPrimitive
        className={withClass(
          "fixed top-1/2 left-1/2 z-50 m-0 flex w-[min(440px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border-0 bg-surface-raised p-5 text-foreground shadow-popover outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0 motion-reduce:transition-none",
          className,
        )}
        {...props}
      />
    </>
  )
}

function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: ComponentProps<typeof AlertDialogTitlePrimitive>) {
  return <AlertDialogTitlePrimitive className={withClass("text-base font-semibold", className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: ComponentProps<typeof AlertDialogDescriptionPrimitive>) {
  return (
    <AlertDialogDescriptionPrimitive className={withClass("text-sm text-muted-foreground", className)} {...props} />
  )
}

/**
 * An answer that closes the dialog, styled as a button. `value="confirm"` is the agreeing answer;
 * give it `variant="destructive"` for a dangerous action.
 */
function AlertDialogClose({
  className,
  variant = "outline",
  size,
  ...props
}: ComponentProps<typeof AlertDialogClosePrimitive> & VariantProps<typeof buttonVariants>) {
  return <AlertDialogClosePrimitive className={withClass(buttonVariants({ variant, size }), className)} {...props} />
}

export {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}
