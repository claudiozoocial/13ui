// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const navigationMenuStyles = {
  list: "flex items-center gap-0.5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  trigger: "flex h-control cursor-default select-none items-center gap-1 rounded-md px-3 text-ui font-medium text-muted-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent data-open:bg-accent data-open:text-foreground",
  triggerChevron: "size-3.5 text-subtle-foreground transition-transform duration-150 group-data-open/nav-trigger:rotate-180",
  content: "z-50 m-0 origin-(--transform-origin) rounded-lg border-0 bg-surface-raised p-1.5 text-ui text-foreground shadow-popover outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0 motion-reduce:transition-none",
  link: "flex cursor-default flex-col gap-0.5 rounded-md px-2.5 py-2 text-ui text-foreground no-underline outline-none transition-colors hover:bg-accent focus-visible:bg-accent data-current:bg-accent",
}
