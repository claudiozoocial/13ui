import {
  BubbleChatIcon,
  ComputerTerminal01Icon,
  FileDiffIcon,
  FolderTreeIcon,
  Globe02Icon,
  Search01Icon,
  Settings02Icon,
  SidebarLeft01Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@/components/ui/icon"

const icons = [
  { name: "BubbleChatIcon", icon: BubbleChatIcon },
  { name: "ComputerTerminal01Icon", icon: ComputerTerminal01Icon },
  { name: "FileDiffIcon", icon: FileDiffIcon },
  { name: "FolderTreeIcon", icon: FolderTreeIcon },
  { name: "Globe02Icon", icon: Globe02Icon },
  { name: "Search01Icon", icon: Search01Icon },
  { name: "Settings02Icon", icon: Settings02Icon },
  { name: "SidebarLeft01Icon", icon: SidebarLeft01Icon },
]

export default function Example() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
      {icons.map(({ name, icon }) => (
        <div key={name} className="flex flex-col items-center gap-2 rounded-md border border-border p-3">
          <Icon icon={icon} className="size-5" />
          <span className="max-w-full truncate text-2xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}
