import { BubbleChatIcon, ComputerTerminal01Icon, Globe02Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
} from "@/components/ui/command"
import { Icon } from "@/components/ui/icon"

const items = [
  { value: "chat", label: "Open chat", icon: BubbleChatIcon },
  { value: "terminal", label: "Open terminal", icon: ComputerTerminal01Icon },
  { value: "browser", label: "Open browser", icon: Globe02Icon },
]

export default function Example() {
  const [ran, setRan] = useState<string | null>(null)
  return (
    <div className="w-96">
      <div className="overflow-hidden rounded-lg border border-border bg-surface-raised">
        <Command onAction={(value) => setRan(String(value))}>
          <CommandInput aria-label="Search commands" placeholder="Search…" />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Panels</CommandGroupLabel>
              {items.map((item) => (
                <CommandItem key={item.value} value={item.value}>
                  <CommandItemIcon>
                    <Icon icon={item.icon} />
                  </CommandItemIcon>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{ran ? `Ran: ${ran}` : "Pick a command"}</p>
    </div>
  )
}
