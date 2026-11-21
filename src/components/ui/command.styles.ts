// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const commandStyles = {
  inputWrap: "flex h-11 items-center gap-2 border-b border-border px-3",
  inputIcon: "size-4 shrink-0 text-subtle-foreground",
  input: "h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle-foreground focus-visible:outline-none",
  list: "max-h-80 overflow-y-auto p-1",
  empty: "text-center text-ui text-subtle-foreground data-empty:py-8 data-loading:py-8",
  groupLabel: "px-2 pb-1 pt-2 text-2xs font-medium text-subtle-foreground",
  item: "flex h-control cursor-default select-none items-center gap-2 rounded-md px-2 text-ui outline-none data-disabled:opacity-50 data-highlighted:bg-accent [&_svg]:size-4 [&_svg]:text-muted-foreground",
  dialogBackdrop: "fixed inset-0 z-50 bg-black/20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/50",
  dialogContent: "fixed top-[18%] left-1/2 z-50 m-0 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-xl border-0 bg-surface-raised p-0 text-foreground shadow-popover outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0",
}
