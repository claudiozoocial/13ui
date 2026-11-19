import { Add01Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Composer } from "@/components/shell/composer"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export default function Example() {
  const [sent, setSent] = useState<string[]>([])
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      {sent.length > 0 && <p className="text-xs text-muted-foreground">Sent: {sent.at(-1)}</p>}
      <Composer
        onSubmit={(text) => setSent((list) => [...list, text])}
        actions={
          <Button variant="ghost" size="icon-sm" aria-label="Attach">
            <Icon icon={Add01Icon} />
          </Button>
        }
      />
    </div>
  )
}
