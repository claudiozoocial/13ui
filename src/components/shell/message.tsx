import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import type { ComponentProps, ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { Shimmer } from "@/components/ui/shimmer"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

interface MessageProps extends ComponentProps<"div"> {
  from: "user" | "assistant"
  avatar?: ReactNode
}

export function Message({ from, avatar, className, children, ...props }: MessageProps) {
  if (from === "user") {
    return (
      <div data-slot="message" data-from="user" className={cn("flex justify-end", className)} {...props}>
        <div className="max-w-[80%] rounded-xl bg-muted px-3.5 py-2 text-sm">{children}</div>
      </div>
    )
  }
  return (
    <div data-slot="message" data-from="assistant" className={cn("flex gap-3", className)} {...props}>
      {avatar && <div className="mt-0.5 shrink-0">{avatar}</div>}
      <div className="min-w-0 flex-1 space-y-2 text-sm leading-6">{children}</div>
    </div>
  )
}

/** A blinking cursor to put at the end of text that is still streaming in. */
export function Caret({ className }: { className?: string }) {
  return (
    <span
      data-slot="caret"
      aria-hidden
      className={cn(
        "ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-caret bg-foreground motion-reduce:animate-none",
        className,
      )}
    />
  )
}

interface ReasoningProps {
  /** True while the model is thinking: the label shimmers. */
  streaming?: boolean
  /** Seconds spent thinking, shown once done as "Thought for 4s". */
  duration?: number
  /** Replaces the default label. */
  label?: ReactNode
  defaultOpen?: boolean
  children?: ReactNode
  className?: string
}

/** A model's reasoning, folded behind a line that shimmers while it thinks. */
export function Reasoning({ streaming = false, duration, label, defaultOpen, children, className }: ReasoningProps) {
  const text = label ?? (streaming ? "Thinking" : duration != null ? `Thought for ${duration}s` : "Thoughts")
  return (
    <details data-slot="reasoning" open={defaultOpen} className={cn("group/reasoning text-ui", className)}>
      <summary className="inline-flex h-7 cursor-default list-none items-center gap-1 rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        <Shimmer active={streaming}>{text}</Shimmer>
        {children && (
          <Icon
            icon={ArrowRight01Icon}
            className="size-3.5 transition-transform group-open/reasoning:rotate-90 motion-reduce:transition-none"
          />
        )}
      </summary>
      {children && (
        <div className="mt-1 border-l-2 border-border pl-3 text-ui leading-5 text-muted-foreground">{children}</div>
      )}
    </details>
  )
}

export function ToolCall({
  title,
  status = "done",
  children,
}: {
  title: string
  status?: "running" | "done" | "error"
  children?: ReactNode
}) {
  return (
    <details data-slot="tool-call" data-status={status} className="group rounded-lg border border-border bg-surface text-ui">
      <summary className="flex h-control cursor-default list-none items-center gap-2 px-3 text-muted-foreground [&::-webkit-details-marker]:hidden">
        {status === "running" ? (
          <Spinner size="sm" label="" />
        ) : (
          <span
            aria-hidden
            className={cn("size-1.5 rounded-full", status === "done" ? "bg-success" : "bg-destructive")}
          />
        )}
        <Shimmer active={status === "running"} className="truncate font-mono text-xs">
          {title}
        </Shimmer>
      </summary>
      {children && <div className="px-3 pb-2 font-mono text-xs text-muted-foreground">{children}</div>}
    </details>
  )
}
