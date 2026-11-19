import { Resizable, ResizableHandle, ResizablePanel } from "@/components/ui/resizable"

export default function Example() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-lg border border-border">
      <Resizable>
        <ResizablePanel defaultSize={30} minSize="120px" className="grid place-items-center bg-sidebar text-ui text-muted-foreground">
          Files
        </ResizablePanel>
        <ResizableHandle aria-label="Resize files" />
        <ResizablePanel>
          <Resizable orientation="vertical">
            <ResizablePanel defaultSize={65} className="grid place-items-center bg-surface text-ui text-muted-foreground">
              Editor
            </ResizablePanel>
            <ResizableHandle aria-label="Resize terminal" />
            <ResizablePanel className="grid place-items-center bg-background text-ui text-muted-foreground">
              Terminal
            </ResizablePanel>
          </Resizable>
        </ResizablePanel>
      </Resizable>
    </div>
  )
}
