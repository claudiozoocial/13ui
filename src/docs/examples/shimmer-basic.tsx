import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shimmer } from "@/components/ui/shimmer"

export default function Example() {
  const [active, setActive] = useState(true)
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1 text-sm">
        <Shimmer active={active}>Searching 214 files</Shimmer>
        <Shimmer active={active} className="text-xs">
          Reading src/components/dock/model.ts
        </Shimmer>
      </div>
      <Button variant="outline" size="sm" onClick={() => setActive((a) => !a)}>
        {active ? "Finish" : "Start again"}
      </Button>
    </div>
  )
}
