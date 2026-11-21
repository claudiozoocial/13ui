import { ArrowUp02Icon, StopIcon } from "@hugeicons/core-free-icons"
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

  const stopping = pending && !!onStop

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
        <Button
          type={stopping ? "button" : "submit"}
          size="icon-sm"
          aria-label={stopping ? "Stop" : "Send"}
          disabled={!stopping && (!value.trim() || pending)}
          onClick={stopping ? onStop : undefined}
          className="grid"
        >
          {/* Both icons stay mounted and cross-fade, so the swap reads as one button changing state. */}
          <Icon
            icon={ArrowUp02Icon}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,scale] duration-150 ease-out motion-reduce:scale-100",
              stopping ? "scale-80 opacity-0" : "scale-100 opacity-100",
            )}
          />
          <Icon
            icon={StopIcon}
            className={cn(
              "col-start-1 row-start-1 fill-current transition-[opacity,scale] duration-150 ease-out motion-reduce:scale-100",
              stopping ? "scale-100 opacity-100" : "scale-80 opacity-0",
            )}
          />
        </Button>
      </div>
    </form>
  )
}
