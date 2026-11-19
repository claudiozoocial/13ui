import { BubbleChatIcon, ComputerTerminal01Icon, FileDiffIcon, FolderTreeIcon } from "@hugeicons/core-free-icons"
import { Dock, type DockPanels, useDock } from "@/components/dock/dock"
import { column, group, row } from "@/components/dock/model"
import { Icon } from "@/components/ui/icon"

function Placeholder({ label }: { label: string }) {
  return <div className="grid size-full place-items-center text-ui text-muted-foreground">{label}</div>
}

const panels: DockPanels = {
  chat: { title: "Chat", icon: <Icon icon={BubbleChatIcon} />, content: <Placeholder label="Chat" />, closable: false },
  diff: { title: "Diff", icon: <Icon icon={FileDiffIcon} />, content: <Placeholder label="Diff" /> },
  files: { title: "Files", icon: <Icon icon={FolderTreeIcon} />, content: <Placeholder label="Files" /> },
  terminal: { title: "Terminal", icon: <Icon icon={ComputerTerminal01Icon} />, content: <Placeholder label="Terminal" /> },
}

export default function Example() {
  const dock = useDock({
    initial: () => ({
      root: row([group(["chat"]), column([group(["diff", "files"]), group(["terminal"])])], [50, 50]),
      maximized: null,
    }),
  })
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border border-border">
      <Dock dock={dock} panels={panels} />
    </div>
  )
}
