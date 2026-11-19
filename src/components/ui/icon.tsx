import { HugeiconsIcon, type HugeiconsIconProps, type IconSvgElement } from "@hugeicons/react"

/** A Hugeicons icon, hidden from screen readers. Size it with `size-*` or a parent's `[&_svg]:size-*`. */
function Icon({ strokeWidth = 1.75, ...props }: HugeiconsIconProps) {
  return <HugeiconsIcon aria-hidden strokeWidth={strokeWidth} {...props} />
}

export { Icon, type IconSvgElement }
