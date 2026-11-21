import {
  Alert02Icon,
  AlertCircleIcon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"
import {
  createToaster,
  Toast as ToastPrimitive,
  ToastAction as ToastActionPrimitive,
  ToastClose as ToastClosePrimitive,
  ToastDescription as ToastDescriptionPrimitive,
  ToastRegion,
  type ToastRegionProps,
  ToastTitle as ToastTitlePrimitive,
  toast,
} from "@ui-sdk/react/toast"
import type { ComponentProps } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn, withClass } from "@/lib/utils"

// The stack's positions and motion live in the theme, under [data-slot="toast"]: they read the
// CSS variables UI SDK sets on each toast, which utility classes can't express.

function Toast({ className, ...props }: ComponentProps<typeof ToastPrimitive>) {
  return (
    <ToastPrimitive
      className={withClass(
        "group/toast flex items-start gap-2.5 rounded-lg border border-border bg-surface-raised p-3 text-ui text-foreground shadow-popover",
        className,
      )}
      {...props}
    />
  )
}

/** The icon for the toast's type: success, error, warning, info or loading. Shows nothing for default. */
function ToastIcon() {
  return (
    <span className="mt-px hidden shrink-0 group-data-[type=error]/toast:block group-data-[type=info]/toast:block group-data-[type=loading]/toast:block group-data-[type=success]/toast:block group-data-[type=warning]/toast:block [&_svg]:hidden [&_svg]:size-4">
      <Icon icon={CheckmarkCircle02Icon} className="text-success group-data-[type=success]/toast:block" />
      <Icon icon={AlertCircleIcon} className="text-destructive group-data-[type=error]/toast:block" />
      <Icon icon={Alert02Icon} className="text-foreground group-data-[type=warning]/toast:block" />
      <Icon icon={InformationCircleIcon} className="text-muted-foreground group-data-[type=info]/toast:block" />
      <Icon
        icon={Loading03Icon}
        className="animate-spin text-muted-foreground group-data-[type=loading]/toast:block motion-reduce:animate-none"
      />
    </span>
  )
}

function ToastTitle({ className, ...props }: ComponentProps<typeof ToastTitlePrimitive>) {
  return <ToastTitlePrimitive className={withClass("font-medium empty:hidden", className)} {...props} />
}

function ToastDescription({ className, ...props }: ComponentProps<typeof ToastDescriptionPrimitive>) {
  return (
    <ToastDescriptionPrimitive className={withClass("text-xs text-muted-foreground empty:hidden", className)} {...props} />
  )
}

function ToastAction({ className, ...props }: ComponentProps<typeof ToastActionPrimitive>) {
  return (
    <ToastActionPrimitive
      className={withClass(cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-auto empty:hidden"), className)}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: ComponentProps<typeof ToastClosePrimitive>) {
  return (
    <ToastClosePrimitive
      aria-label="Dismiss"
      className={withClass(cn(buttonVariants({ variant: "ghost", size: "icon-xs" }), "-mt-0.5 -mr-1 shrink-0"), className)}
      {...props}
    >
      <Icon icon={Cancel01Icon} />
    </ToastClosePrimitive>
  )
}

/**
 * Shows the toasts from `toast()`. Render it once near your app's root. Toasts stack in a corner,
 * fan out on hover, and can be swiped away.
 */
function Toaster({ side = "bottom", align = "end", ...props }: Omit<ToastRegionProps, "children">) {
  return (
    <ToastRegion side={side} align={align} {...props}>
      {() => (
        <Toast>
          <ToastIcon />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <ToastTitle />
            <ToastDescription />
          </div>
          <ToastAction />
          <ToastClose />
        </Toast>
      )}
    </ToastRegion>
  )
}

export {
  createToaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  Toaster,
  ToastIcon,
  ToastRegion,
  ToastTitle,
  toast,
}
