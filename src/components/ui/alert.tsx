import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "@container relative grid w-full grid-cols-[0_1fr_auto] items-start gap-y-0.5 rounded-lg border px-3.5 py-3 text-ui has-[>svg]:grid-cols-[26px_1fr_auto] has-data-[slot=alert-action]:pr-11 [&>svg]:row-span-2 [&>svg]:mt-px [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground [&>svg]:text-muted-foreground",
        success:
          "border-success/40 bg-surface text-foreground [&>svg]:text-success *:data-[slot=alert-title]:text-success *:data-[slot=alert-description]:text-success/80",
        warning: "border-border-strong bg-muted text-foreground [&>svg]:text-foreground",
        destructive:
          "border-destructive/40 bg-surface text-foreground [&>svg]:text-destructive *:data-[slot=alert-title]:text-destructive *:data-[slot=alert-description]:text-destructive/80",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>

/**
 * A message that stays on the page, like a notice above a form or a warning in a panel. Put an
 * Icon first to get the icon column. Warning and destructive alerts are announced to screen
 * readers as they appear; the others are polite. Pass role to change that.
 */
function Alert({ className, variant, role, ...props }: AlertProps) {
  const urgent = variant === "warning" || variant === "destructive"
  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      role={role ?? (urgent ? "alert" : "status")}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("col-start-2 font-medium", className)} {...props} />
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-2 text-pretty text-muted-foreground [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-1", className)}
      {...props}
    />
  )
}

/**
 * Buttons beside the text, like "Retry" or "Review changes". When the alert is narrower than
 * 28rem they move under the text.
 */
function AlertActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-actions"
      className={cn(
        "col-start-3 row-span-2 row-start-1 ml-4 flex shrink-0 items-center gap-2 self-center @max-md:col-start-2 @max-md:row-span-1 @max-md:row-start-auto @max-md:ml-0 @max-md:mt-2 @max-md:flex-wrap @max-md:self-start",
        className,
      )}
      {...props}
    />
  )
}

/** One control in the top-right corner, usually a button that dismisses the alert. */
function AlertAction({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-action" className={cn("absolute top-2 right-2", className)} {...props} />
}

export { Alert, AlertAction, AlertActions, AlertDescription, AlertTitle, alertVariants }
