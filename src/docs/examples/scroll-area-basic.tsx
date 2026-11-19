import { ScrollArea } from "@/components/ui/scroll-area"

const files = Array.from({ length: 40 }, (_, i) => `component-${String(i + 1).padStart(2, "0")}.tsx`)

export default function Example() {
  return (
    <ScrollArea className="h-56 w-64 rounded-md border border-border">
      <div className="p-1">
        {files.map((file) => (
          <div key={file} className="flex h-7 items-center rounded-sm px-2 font-mono text-xs text-muted-foreground hover:bg-muted">
            {file}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
