import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "@/demo/App"
import { Docs } from "@/docs/Docs"
import { useHashRoute } from "@/lib/use-hash-route"
import "@/styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

function Root() {
  const route = useHashRoute()
  return route.startsWith("docs") ? <Docs route={route} /> : <App />
}
