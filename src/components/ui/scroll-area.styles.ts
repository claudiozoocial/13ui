// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const scrollAreaStyles = {
  root: "relative min-h-0 overflow-hidden",
  viewport: "size-full overscroll-contain outline-none",
  scrollbar: "flex touch-none p-0.5 opacity-0 transition-opacity duration-150 select-none data-visible:opacity-100 data-[orientation=horizontal]:inset-x-0 data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:inset-y-0 data-[orientation=vertical]:right-0 data-[orientation=vertical]:w-2.5",
  thumb: "flex-1 rounded-full bg-border-strong",
}
