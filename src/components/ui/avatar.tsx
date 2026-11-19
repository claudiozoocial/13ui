import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from "@ui-sdk/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted align-middle", {
  variants: {
    size: {
      sm: "size-6 text-2xs",
      default: "size-8 text-xs",
      lg: "size-10 text-sm",
    },
  },
  defaultVariants: { size: "default" },
})

type AvatarProps = ComponentProps<typeof AvatarPrimitive> & VariantProps<typeof avatarVariants>

function Avatar({ className, size, ...props }: AvatarProps) {
  return <AvatarPrimitive className={withClass(avatarVariants({ size }), className)} {...props} />
}

function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarImagePrimitive>) {
  return <AvatarImagePrimitive className={withClass("size-full object-cover", className)} {...props} />
}

/** Shows until the image loads, or instead of it. Usually initials or an icon. */
function AvatarFallback({ className, ...props }: ComponentProps<typeof AvatarFallbackPrimitive>) {
  return (
    <AvatarFallbackPrimitive
      className={withClass(
        "grid size-full place-items-center bg-primary font-semibold text-primary-foreground select-none",
        className,
      )}
      {...props}
    />
  )
}

/** "John Lennon" → "JL". */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export { Avatar, AvatarFallback, AvatarImage, avatarVariants, initials }
