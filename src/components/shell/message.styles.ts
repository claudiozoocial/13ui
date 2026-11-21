// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const messageStyles = {
  userBubble: "max-w-[80%] rounded-xl bg-muted px-3.5 py-2 text-sm",
  assistantBody: "min-w-0 flex-1 space-y-2 text-sm leading-6",
  caret: "ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-caret bg-foreground motion-reduce:animate-none",
  reasoningSummary: "inline-flex h-7 cursor-default list-none items-center gap-1 rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
  reasoningChevron: "size-3.5 transition-transform group-open/reasoning:rotate-90 motion-reduce:transition-none",
  reasoningContent: "mt-1 border-l-2 border-border pl-3 text-ui leading-5 text-muted-foreground",
  toolCall: "group rounded-lg border border-border bg-surface text-ui open:pb-2",
  toolCallSummary: "flex h-control cursor-default list-none items-center gap-2 px-3 text-muted-foreground [&::-webkit-details-marker]:hidden",
  toolCallTitle: "truncate font-mono text-xs",
  toolCallContent: "px-3 font-mono text-xs text-muted-foreground",
}
