// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const dockStyles = {
  root: "relative flex size-full min-h-0 min-w-0 bg-background",
  empty: "grid size-full place-items-center text-ui text-subtle-foreground",
  group: "flex size-full min-h-0 flex-col bg-surface",
  tabbar: "flex h-tabbar shrink-0 items-stretch border-b border-border bg-background",
  tabList: "flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none]",
  tabDropEnd: "my-1.5 w-0.5 shrink-0 rounded-full bg-ring",
  groupActions: "flex shrink-0 items-center gap-0.5 px-1.5",
  tabPanel: "absolute inset-0 outline-none",
  tab: "group/tab relative flex shrink-0 items-stretch",
  tabDropBefore: "before:absolute before:inset-y-1.5 before:-left-px before:z-10 before:w-0.5 before:rounded-full before:bg-ring",
  tabTrigger: "relative flex max-w-56 cursor-default select-none items-center gap-1.5 border-r border-border pl-3 text-ui text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:-outline-offset-2 data-selected:bg-surface data-selected:text-foreground data-selected:after:absolute data-selected:after:inset-x-0 data-selected:after:-bottom-px data-selected:after:h-px data-selected:after:bg-surface [&_svg]:size-3.5 [&_svg]:shrink-0",
  tabClose: "absolute top-1/2 right-1 size-5 -translate-y-1/2 opacity-0 group-hover/tab:opacity-100 group-has-data-selected/tab:opacity-100 focus-visible:opacity-100",
  panelHost: "size-full overflow-hidden",
  dropIndicator: "pointer-events-none absolute z-30 rounded-md border border-drop-border bg-drop transition-all duration-100",
  rootEdgePreviewBase: "pointer-events-none absolute z-30 rounded-md border border-drop-border bg-drop",
  /** Where a dragged tab will land inside a group. */
  dropZone: {
    center: "inset-1.5",
    left: "inset-y-1.5 left-1.5 w-[calc(50%-6px)]",
    right: "inset-y-1.5 right-1.5 w-[calc(50%-6px)]",
    top: "inset-x-1.5 top-1.5 h-[calc(50%-6px)]",
    bottom: "inset-x-1.5 bottom-1.5 h-[calc(50%-6px)]",
  },
  /** Drop strips along the dock's outer edges, and the preview each one shows. */
  rootEdgeStrip: {
    left: "inset-y-0 left-0 w-2",
    right: "inset-y-0 right-0 w-2",
    top: "inset-x-0 top-0 h-2",
    bottom: "inset-x-0 bottom-0 h-2",
  },
  rootEdgePreview: {
    left: "inset-y-1.5 left-1.5 w-1/4",
    right: "inset-y-1.5 right-1.5 w-1/4",
    top: "inset-x-1.5 top-1.5 h-1/4",
    bottom: "inset-x-1.5 bottom-1.5 h-1/4",
  },
}
