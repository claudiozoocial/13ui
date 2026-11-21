// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const resizableStyles = {
  root: "flex size-full data-[orientation=vertical]:flex-col",
  panel: "relative min-h-0 min-w-0 overflow-hidden",
  handle: "relative z-10 shrink-0 bg-border outline-none transition-colors after:absolute after:transition-colors data-[orientation=horizontal]:w-px data-[orientation=horizontal]:cursor-col-resize data-[orientation=horizontal]:after:inset-y-0 data-[orientation=horizontal]:after:-left-px data-[orientation=horizontal]:after:w-[3px] data-[orientation=vertical]:h-px data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:after:inset-x-0 data-[orientation=vertical]:after:-top-px data-[orientation=vertical]:after:h-[3px] data-hovering:after:bg-ring/60 data-dragging:after:bg-ring focus-visible:after:bg-ring data-disabled:cursor-default",
}
