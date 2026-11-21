// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const selectStyles = {
  label: "text-xs font-medium text-muted-foreground",
  trigger: "flex h-control w-full min-w-0 cursor-default select-none items-center justify-between gap-2 rounded-md border border-input bg-surface px-2.5 text-left text-ui text-foreground outline-none transition-colors hover:bg-muted focus-visible:border-ring data-disabled:opacity-50 data-open:border-ring data-placeholder:text-subtle-foreground [&_svg]:size-4 [&_svg]:shrink-0",
  triggerValue: "flex min-w-0 flex-1 items-center gap-2 truncate",
  content: "z-50 m-0 flex max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) flex-col overflow-hidden rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
  inputWrap: "-mx-1 -mt-1 mb-1 flex h-9 shrink-0 items-center gap-2 border-b border-border px-2.5",
  inputIcon: "size-4 shrink-0 text-subtle-foreground",
  input: "h-full w-full min-w-0 bg-transparent text-ui text-foreground outline-none placeholder:text-subtle-foreground focus-visible:outline-none",
  list: "min-h-0 flex-1 overflow-y-auto",
  item: "flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none data-disabled:opacity-50 data-highlighted:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
  itemText: "flex min-w-0 flex-1 items-center gap-2 truncate",
  groupLabel: "px-2 pb-1 pt-1.5 text-2xs font-medium text-subtle-foreground",
  separator: "-mx-1 my-1 h-px bg-border",
  empty: "text-center text-ui text-subtle-foreground data-empty:py-6",
}
