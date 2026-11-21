// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const toastStyles = {
  root: "group/toast flex items-start gap-2.5 rounded-lg border border-border bg-surface-raised p-3 text-ui text-foreground shadow-popover",
  iconWrap: "mt-px hidden shrink-0 group-data-[type=error]/toast:block group-data-[type=info]/toast:block group-data-[type=loading]/toast:block group-data-[type=success]/toast:block group-data-[type=warning]/toast:block [&_svg]:hidden [&_svg]:size-4",
  iconSuccess: "text-success group-data-[type=success]/toast:block",
  iconError: "text-destructive group-data-[type=error]/toast:block",
  iconWarning: "text-foreground group-data-[type=warning]/toast:block",
  iconInfo: "text-muted-foreground group-data-[type=info]/toast:block",
  iconLoading: "animate-spin text-muted-foreground group-data-[type=loading]/toast:block motion-reduce:animate-none",
  description: "text-xs text-muted-foreground empty:hidden",
  content: "flex min-w-0 flex-1 flex-col gap-0.5",
}
