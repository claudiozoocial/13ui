import { useSyncExternalStore } from "react"

export type Theme = "system" | "light" | "dark"

const KEY = "13ui:theme"
const media = typeof window === "undefined" ? undefined : matchMedia("(prefers-color-scheme: dark)")
const listeners = new Set<() => void>()

function read(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === "light" || saved === "dark") return saved
  } catch {
    // Blocked storage falls back to the system setting.
  }
  return "system"
}

let theme: Theme = typeof window === "undefined" ? "system" : read()

function apply() {
  const dark = theme === "dark" || (theme === "system" && !!media?.matches)
  document.documentElement.classList.toggle("dark", dark)
}

function setTheme(next: Theme) {
  theme = next
  try {
    if (next === "system") localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, next)
  } catch {
    // Not saved; the choice still applies for this visit.
  }
  apply()
  for (const listener of listeners) listener()
}

if (typeof window !== "undefined") {
  apply()
  media?.addEventListener("change", () => {
    if (theme !== "system") return
    apply()
    for (const listener of listeners) listener()
  })
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/**
 * The color theme: "system" follows the device setting, "light" and "dark" override it.
 * `resolved` is what is showing now. The choice is shared by every caller and saved.
 */
export function useTheme() {
  const current = useSyncExternalStore(subscribe, () => theme, () => "system" as Theme)
  const systemDark = useSyncExternalStore(
    subscribe,
    () => !!media?.matches,
    () => false,
  )
  const resolved: "light" | "dark" = current === "system" ? (systemDark ? "dark" : "light") : current
  return { theme: current, resolved, setTheme }
}
