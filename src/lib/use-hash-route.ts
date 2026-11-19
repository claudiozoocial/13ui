import { useEffect, useState } from "react"

export function useHashRoute() {
  const [route, setRoute] = useState(() => location.hash.replace(/^#\/?/, ""))
  useEffect(() => {
    const onChange = () => setRoute(location.hash.replace(/^#\/?/, ""))
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return route
}
