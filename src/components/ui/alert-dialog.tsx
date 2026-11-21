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
import { alertDialogStyles } from "./alert-dialog.styles"

/** The dialog panel, centered over a dimmed page. The backdrop is built in. */
function AlertDialogContent({ className, ...props }: ComponentProps<typeof AlertDialogContentPrimitive>) {
  return (
    <>
      <AlertDialogBackdrop className={alertDialogStyles.backdrop} />
      <AlertDialogContentPrimitive
        className={withClass(
          alertDialogStyles.content,
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
  return <div className={cn(alertDialogStyles.footer, className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: ComponentProps<typeof AlertDialogTitlePrimitive>) {
  return <AlertDialogTitlePrimitive className={withClass("text-base font-semibold", className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: ComponentProps<typeof AlertDialogDescriptionPrimitive>) {
  return (
    <AlertDialogDescriptionPrimitive className={withClass(alertDialogStyles.description, className)} {...props} />
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
