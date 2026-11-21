// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const menuStyles = {
  popup: "z-50 m-0 min-w-44 origin-(--transform-origin) overflow-y-auto rounded-lg border-0 bg-surface-raised p-1 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-100 max-h-(--available-height) data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none",
  item: "flex h-control-sm cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none data-disabled:opacity-50 data-highlighted:bg-accent data-destructive:text-destructive [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground data-destructive:[&_svg]:text-destructive [&_[data-slot=menu-shortcut]]:kbd [&_[data-slot=menu-shortcut]]:ml-auto",
  checkboxIndicator: "absolute left-2 grid size-4 place-items-center [&_svg]:text-foreground",
  radioIndicator: "absolute left-2 grid size-4 place-items-center",
  radioDot: "size-1.5 rounded-full bg-foreground",
  groupLabel: "px-2 pb-1 pt-1.5 text-2xs font-medium text-subtle-foreground",
  separator: "-mx-1 my-1 h-px bg-border",
  header: "flex items-center gap-2 px-2 py-1.5",
}
