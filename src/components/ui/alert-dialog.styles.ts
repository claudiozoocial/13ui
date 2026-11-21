// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const alertDialogStyles = {
  backdrop: "fixed inset-0 z-50 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/60",
  content: "fixed top-1/2 left-1/2 z-50 m-0 flex w-[min(440px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl border-0 bg-surface-raised p-5 text-foreground shadow-popover outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0 motion-reduce:transition-none",
  footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
  description: "text-sm text-muted-foreground",
}
