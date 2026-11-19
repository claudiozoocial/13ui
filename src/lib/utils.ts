import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the theme's custom sizes, or it reads `text-ui` as a color and drops it.
const twMerge = extendTailwindMerge({
  extend: {
    theme: { text: ["2xs", "ui"], spacing: ["control", "control-sm", "titlebar", "tabbar"] },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type StateClassName<S> = string | ((state: S) => string | undefined) | undefined

/** Merges base classes into a ui-sdk className, which may be a function of the part's state. */
export function withClass<S>(base: string, className: StateClassName<S>): StateClassName<S> {
  if (typeof className === "function") return (state: S) => cn(base, className(state))
  return cn(base, className)
}
