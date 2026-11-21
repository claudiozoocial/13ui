import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-3.5 py-3 text-ui has-[>svg]:grid-cols-[16px_1fr] has-[>svg]:gap-x-2.5 has-data-[slot=alert-action]:pr-11 [&>svg]:row-span-2 [&>svg]:mt-px [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-surface text-foreground [&>svg]:text-muted-foreground",
        success: "border-success/30 bg-success/5 text-foreground [&>svg]:text-success",
        warning: "border-border-strong bg-muted text-foreground [&>svg]:text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/5 text-foreground [&>svg]:text-destructive *:data-[slot=alert-title]:text-destructive *:data-[slot=alert-description]:text-destructive/80",
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

/** Buttons under the text, like "Retry" or "Review changes". */
function AlertActions({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-actions" className={cn("col-start-2 mt-2 flex flex-wrap gap-2", className)} {...props} />
}

/** One control in the top-right corner, usually a button that dismisses the alert. */
function AlertAction({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-action" className={cn("absolute top-2 right-2", className)} {...props} />
}

export { Alert, AlertAction, AlertActions, AlertDescription, AlertTitle, alertVariants }
