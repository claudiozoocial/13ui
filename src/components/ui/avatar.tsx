import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from "@ui-sdk/react/avatar"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { avatarVariants } from "./avatar.styles"
import { avatarStyles } from "./avatar.styles"

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
        avatarStyles.fallback,
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
