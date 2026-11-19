import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createResizableController, Resizable, ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

export default function Example() {
  const [controller] = useState(createResizableController)
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => controller.collapse("nav")}>
          Collapse
        </Button>
        <Button variant="outline" size="sm" onClick={() => controller.expand("nav")}>
          Expand
        </Button>
      </div>
      <div className="h-48 overflow-hidden rounded-lg border border-border">
        <Resizable controller={controller}>
          <ResizablePanel id="nav" defaultSize="200px" minSize="160px" collapsible className="grid place-items-center bg-sidebar text-ui text-muted-foreground">
            Navigation
          </ResizablePanel>
          <ResizableHandle aria-label="Resize navigation" />
          <ResizablePanel className="grid place-items-center bg-surface text-ui text-muted-foreground">
            Drag the edge past halfway, or double-click it
          </ResizablePanel>
        </Resizable>
      </div>
    </div>
  )
}
