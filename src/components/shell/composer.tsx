import { ArrowUp02Icon, StopIcon } from "@hugeicons/core-free-icons"
import { type FormEvent, type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import { composerStyles } from "./composer.styles"

interface ComposerProps {
  onSubmit: (text: string) => void
  placeholder?: string
  /** Controls on the left of the bottom row, like attach or model pickers. */
  actions?: ReactNode
  /** True while a reply is coming in. Sending waits, and with onStop the send button becomes a stop button. */
  pending?: boolean
  onStop?: () => void
  className?: string
}

export function Composer({
  onSubmit,
  placeholder = "Write a message…",
  actions,
  pending = false,
  onStop,
  className,
}: ComposerProps) {
  const [value, setValue] = useState("")

  const submit = (event?: FormEvent) => {
    event?.preventDefault()
    const text = value.trim()
    if (!text || pending) return
    onSubmit(text)
    setValue("")
  }

  return (
    <form
      data-slot="composer"
      data-pending={pending ? "" : undefined}
      onSubmit={submit}
      className={cn(
        composerStyles.root,
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
        className={composerStyles.textarea}
      />
      <div className="flex items-center gap-1">
        <div className={composerStyles.actions}>{actions}</div>
        {pending && onStop ? (
          <Button type="button" size="icon-sm" aria-label="Stop" onClick={onStop}>
            <Icon icon={StopIcon} className="fill-current" />
          </Button>
        ) : (
          <Button type="submit" size="icon-sm" aria-label="Send" disabled={!value.trim() || pending}>
            <Icon icon={ArrowUp02Icon} />
          </Button>
        )}
      </div>
    </form>
  )
}
