import type { ComponentProps, ReactNode } from "react"
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

export function ToolCall({ title, status = "done", children }: { title: string; status?: "running" | "done" | "error"; children?: ReactNode }) {
  return (
    <details className="group rounded-lg border border-border bg-surface text-ui open:pb-2">
      <summary className="flex h-control cursor-default list-none items-center gap-2 px-3 text-muted-foreground [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            status === "running" && "animate-pulse bg-muted-foreground",
            status === "done" && "bg-success",
            status === "error" && "bg-destructive",
          )}
        />
        <span className="truncate font-mono text-xs">{title}</span>
      </summary>
      {children && <div className="px-3 font-mono text-xs text-muted-foreground">{children}</div>}
    </details>
  )
}
