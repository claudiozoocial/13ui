// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const comboboxStyles = {
  label: "text-xs font-medium text-muted-foreground",
  inputWrap: "relative flex w-full items-center",
  input: "h-control w-full min-w-0 rounded-md border border-input bg-surface pr-8 pl-2.5 text-ui text-foreground outline-none transition-colors placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:outline-none data-disabled:opacity-50 data-open:border-ring",
  clear: "absolute right-1 grid size-6 place-items-center rounded-sm text-muted-foreground outline-none hover:bg-muted [&_svg]:size-4",
  content: "z-50 m-0 flex max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) flex-col overflow-hidden rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
  list: "max-h-64 min-h-0 overflow-y-auto",
  item: "flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none data-disabled:opacity-50 data-highlighted:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
  itemText: "flex min-w-0 flex-1 items-center gap-2 truncate",
  groupLabel: "px-2 pb-1 pt-1.5 text-2xs font-medium text-subtle-foreground",
  empty: "text-center text-ui text-subtle-foreground data-empty:py-6",
}
