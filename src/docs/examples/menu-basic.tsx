import { Copy01Icon, Delete02Icon, Edit02Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Menu, MenuContent, MenuGroup, MenuGroupLabel, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"

export default function Example() {
  const [last, setLast] = useState("nothing")
  return (
    <div className="flex items-center gap-3">
      <Menu onAction={(value) => setLast(value)}>
        <MenuTrigger render={<Button variant="outline" size="icon" aria-label="Actions" />}>
          <Icon icon={MoreHorizontalIcon} />
        </MenuTrigger>
        <MenuContent align="start">
          <MenuGroup>
            <MenuGroupLabel>Session</MenuGroupLabel>
            <MenuItem value="renombrar">
              <Icon icon={Edit02Icon} />
              Rename
            </MenuItem>
            <MenuItem value="duplicar">
              <Icon icon={Copy01Icon} />
              Duplicate
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem value="eliminar" destructive>
            <Icon icon={Delete02Icon} />
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
      <span className="text-ui text-muted-foreground">Last action: {last}</span>
    </div>
  )
}
