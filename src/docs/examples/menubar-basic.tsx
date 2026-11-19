import { useState } from "react"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/ui/menu"
import { Menubar } from "@/components/ui/menubar"

export default function Example() {
  const [last, setLast] = useState("nothing")
  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar aria-label="Application">
        <Menu onAction={setLast}>
          <MenuTrigger>File</MenuTrigger>
          <MenuContent align="start">
            <MenuItem value="new-session" shortcut="mod+n">
              New session
            </MenuItem>
            <MenuItem value="open" shortcut="mod+o">
              Open…
            </MenuItem>
            <MenuSeparator />
            <MenuSub>
              <MenuSubTrigger>Export</MenuSubTrigger>
              <MenuSubContent>
                <MenuItem value="export-md">Markdown</MenuItem>
                <MenuItem value="export-pdf">PDF</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuContent>
        </Menu>
        <Menu onAction={setLast}>
          <MenuTrigger>Edit</MenuTrigger>
          <MenuContent align="start">
            <MenuItem value="undo" shortcut="mod+z">
              Undo
            </MenuItem>
            <MenuItem value="redo" shortcut="mod+shift+z">
              Redo
            </MenuItem>
          </MenuContent>
        </Menu>
        <Menu>
          <MenuTrigger>View</MenuTrigger>
          <MenuContent align="start">
            <MenuCheckboxItem value="sidebar" defaultChecked>
              Sidebar
            </MenuCheckboxItem>
            <MenuCheckboxItem value="terminal">Terminal</MenuCheckboxItem>
          </MenuContent>
        </Menu>
      </Menubar>
      <span className="text-ui text-muted-foreground">Last action: {last}</span>
    </div>
  )
}
