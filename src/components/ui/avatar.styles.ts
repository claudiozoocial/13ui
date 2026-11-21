import { cva } from "class-variance-authority"

// Framework-free: plain class strings, so any version of 13UI can share them.
export const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted align-middle", {
  variants: {
    size: {
      sm: "size-6 text-2xs",
      default: "size-8 text-xs",
      lg: "size-10 text-sm",
    },
  },
  defaultVariants: { size: "default" },
})

export const avatarStyles = {
  fallback: "grid size-full place-items-center bg-primary font-semibold text-primary-foreground select-none",
}
