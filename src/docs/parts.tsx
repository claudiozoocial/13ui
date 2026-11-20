import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { version } from "@/version"

function useCopy() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }
  return { copied, copy }
}

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : "Copy"}
      onClick={() => copy(text)}
      className={className}
    >
      <Icon icon={copied ? Tick02Icon : Copy01Icon} />
    </Button>
  )
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative rounded-lg border border-border bg-background", className)}>
      <CopyButton text={code} className="absolute top-2 right-2" />
      <pre className="max-h-[480px] overflow-auto p-4 pr-10 font-mono text-xs leading-5 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function BetaNotice() {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-sm">
      <span className="mt-0.5 h-fit rounded-full bg-primary px-2 py-0.5 text-2xs font-medium text-primary-foreground">
        Beta
      </span>
      <p className="text-muted-foreground">
        13UI {version} is a beta. Component APIs and the dock layout format may change between releases; check the{" "}
        <a href="#/docs/changelog" className="text-foreground underline underline-offset-2">
          changelog
        </a>{" "}
        before updating.
      </p>
    </div>
  )
}
