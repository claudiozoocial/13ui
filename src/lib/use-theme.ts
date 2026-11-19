import { useEffect, useState } from "react"

const KEY = "13ui:theme"

function initialDark() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) return saved === "dark"
  } catch {
    // Blocked storage falls back to the system setting.
  }
  return matchMedia("(prefers-color-scheme: dark)").matches
}

export function useTheme() {
  const [dark, setDark] = useState(initialDark)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem(KEY, dark ? "dark" : "light")
    } catch {
      // Not saved; the toggle still works for this visit.
    }
  }, [dark])
  return { dark, toggle: () => setDark((d) => !d) }
}
