import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import type { ComponentProps, ReactNode } from "react"
import { Icon } from "@/components/ui/icon"
import { Shimmer } from "@/components/ui/shimmer"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { messageStyles } from "./message.styles"

interface MessageProps extends ComponentProps<"div"> {
  from: "user" | "assistant"
  avatar?: ReactNode
}

export function Message({ from, avatar, className, children, ...props }: MessageProps) {
  if (from === "user") {
    return (
      <div data-slot="message" data-from="user" className={cn("flex justify-end", className)} {...props}>
        <div className={messageStyles.userBubble}>{children}</div>
      </div>
    )
  }
  return (
    <div data-slot="message" data-from="assistant" className={cn("flex gap-3", className)} {...props}>
      {avatar && <div className="mt-0.5 shrink-0">{avatar}</div>}
      <div className={messageStyles.assistantBody}>{children}</div>
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
        messageStyles.caret,
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
      <summary className={messageStyles.reasoningSummary}>
        <Shimmer active={streaming}>{text}</Shimmer>
        {children && (
          <Icon
            icon={ArrowRight01Icon}
            className={messageStyles.reasoningChevron}
          />
        )}
      </summary>
      {children && (
        <div className={messageStyles.reasoningContent}>{children}</div>
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
    <details data-slot="tool-call" data-status={status} className={messageStyles.toolCall}>
      <summary className={messageStyles.toolCallSummary}>
        {status === "running" ? (
          <Spinner size="sm" label="" />
        ) : (
          <span
            aria-hidden
            className={cn("size-1.5 rounded-full", status === "done" ? "bg-success" : "bg-destructive")}
          />
        )}
        <Shimmer active={status === "running"} className={messageStyles.toolCallTitle}>
          {title}
        </Shimmer>
      </summary>
      {children && <div className={messageStyles.toolCallContent}>{children}</div>}
    </details>
  )
}
