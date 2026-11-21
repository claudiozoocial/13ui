// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const appShellStyles = {
  root: "flex h-full flex-col bg-background text-foreground",
  mobileBar: "flex h-titlebar shrink-0 items-center gap-1 border-b border-border bg-sidebar px-2",
  mobileHeader: "min-w-0 flex-1 truncate px-1 text-ui font-medium",
  drawerBackdrop: "fixed inset-0 bg-black/30 dark:bg-black/50",
  drawerContent: "h-full w-[min(300px,85vw)] border-r border-border bg-sidebar shadow-popover outline-none",
}
