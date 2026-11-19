import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/ui/menu"

export default function Example() {
  const [last, setLast] = useState("nothing")
  return (
    <div className="flex items-center gap-3">
      <Menu onAction={(value) => setLast(value)}>
        <MenuTrigger render={<Button variant="outline" />}>Edit</MenuTrigger>
        <MenuContent align="start">
          <MenuItem value="undo" shortcut="mod+z">
            Undo
          </MenuItem>
          <MenuItem value="redo" shortcut="mod+shift+z">
            Redo
          </MenuItem>
          <MenuSeparator />
          <MenuSub>
            <MenuSubTrigger>Find</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem value="find" shortcut="mod+f">
                Find…
              </MenuItem>
              <MenuItem value="replace" shortcut="mod+alt+f">
                Replace…
              </MenuItem>
            </MenuSubContent>
          </MenuSub>
          <MenuSub>
            <MenuSubTrigger>Transform</MenuSubTrigger>
            <MenuSubContent>
              <MenuItem value="uppercase">Uppercase</MenuItem>
              <MenuItem value="lowercase">Lowercase</MenuItem>
            </MenuSubContent>
          </MenuSub>
        </MenuContent>
      </Menu>
      <span className="text-ui text-muted-foreground">Last action: {last}</span>
    </div>
  )
}
