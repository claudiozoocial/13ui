import { Separator } from "@/components/ui/separator"

export default function Example() {
  return (
    <div className="w-72 text-ui">
      <div className="font-medium">13UI</div>
      <div className="text-muted-foreground">Panels for React</div>
      <Separator className="my-3" />
      <div className="flex items-center gap-3 text-muted-foreground">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Registry</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
    </div>
  )
}
