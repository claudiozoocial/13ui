import {
  ArrowUp02Icon,
} from "@hugeicons/core-free-icons"
import { type FormEvent, type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

interface ComposerProps {
  onSubmit: (text: string) => void
  placeholder?: string
  /** Controls on the left of the bottom row, like attach or model pickers. */
  actions?: ReactNode
  className?: string
}

export function Composer({ onSubmit, placeholder = "Write a message…", actions, className }: ComposerProps) {
  const [value, setValue] = useState("")

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    const text = value.trim()
    if (!text) return
    onSubmit(text)
    setValue("")
  }

  return (
    <form
      data-slot="composer"
      onSubmit={submit}
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-surface-raised p-2.5 shadow-[0_1px_2px_var(--shadow-color)] transition-colors focus-within:border-border-strong",
        className,
      )}
    >
      <Textarea
        aria-label="Message"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
        onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault()
            submit()
          }
        }}
        placeholder={placeholder}
        rows={2}
        className="max-h-60 min-h-11 px-1 [field-sizing:content]"
      />
      <div className="flex items-center gap-1">
        <div className="flex flex-1 items-center gap-1">{actions}</div>
        <Button type="submit" size="icon-sm" aria-label="Send" disabled={!value.trim()}>
          <Icon icon={ArrowUp02Icon} />
        </Button>
      </div>
    </form>
  )
}
