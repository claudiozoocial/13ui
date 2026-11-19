import { Search01Icon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icon } from "@/components/ui/icon"
import { Kbd } from "@/components/ui/kbd"

export default function Example() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Icon icon={Search01Icon} />
        Search
        <Kbd>⌘K</Kbd>
      </Button>
      <CommandDialog title="Command palette" open={open} onOpenChange={setOpen}>
        <Command onAction={() => setOpen(false)}>
          <CommandInput aria-label="Search commands" placeholder="Open a panel or run a command…" />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandList>
            <CommandItem value="new">New session</CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
            <CommandItem value="reset">Reset layout</CommandItem>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
