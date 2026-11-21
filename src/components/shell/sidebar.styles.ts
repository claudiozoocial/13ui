// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const sidebarStyles = {
  root: "group/sidebar flex size-full min-w-0 flex-col",
  header: "flex h-titlebar shrink-0 items-center gap-1 px-2",
  headerRail: "group-data-collapsed/sidebar:justify-center group-data-collapsed/sidebar:px-0",
  title: "flex min-w-0 flex-1 items-center gap-2 px-1 text-ui font-semibold",
  content: "flex flex-col gap-3 px-2 pb-2",
  footer: "flex shrink-0 flex-col gap-px border-t border-border p-2",
  groupLabel: "px-2 pb-1 pt-1 text-2xs font-medium text-subtle-foreground",
  item: "flex h-control w-full min-w-0 cursor-default select-none items-center gap-2 rounded-md px-2 text-left text-ui text-muted-foreground no-underline outline-none transition-colors hover:bg-accent hover:text-foreground data-active:bg-accent data-active:text-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span]:truncate",
  itemRail: "group-data-collapsed/sidebar:justify-center group-data-collapsed/sidebar:px-0 group-data-collapsed/sidebar:[&>span:not([data-slot=avatar])]:sr-only group-data-collapsed/sidebar:[&>[data-sidebar-trailing]]:hidden",
  itemTrailing: "ml-auto flex shrink-0 items-center text-2xs text-subtle-foreground",
}
