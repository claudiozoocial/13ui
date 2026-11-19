import { Kbd } from "@/components/ui/kbd"

export default function Example() {
  return (
    <div className="flex items-center gap-4 text-ui text-muted-foreground">
      <span className="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
      <span>Open the palette</span>
    </div>
  )
}
