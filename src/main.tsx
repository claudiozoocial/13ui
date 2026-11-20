import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "@/components/ui/toast"
import { App } from "@/demo/App"
import { Docs } from "@/docs/Docs"
import { useHashRoute } from "@/lib/use-hash-route"
import "@/lib/use-theme"
import "@/styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

function Root() {
  const route = useHashRoute()
  return (
    <>
      {route.startsWith("docs") ? <Docs route={route} /> : <App />}
      <Toaster />
    </>
  )
}
