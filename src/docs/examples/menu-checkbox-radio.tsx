import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu"

export default function Example() {
  const [density, setDensity] = useState("comfortable")
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
      <MenuContent align="start" className="min-w-52">
        <MenuGroup>
          <MenuGroupLabel>Show</MenuGroupLabel>
          <MenuCheckboxItem value="sidebar" defaultChecked>
            Sidebar
          </MenuCheckboxItem>
          <MenuCheckboxItem value="minimap">Minimap</MenuCheckboxItem>
          <MenuCheckboxItem value="status-bar" defaultChecked>
            Status bar
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuRadioGroup value={density} onValueChange={(value) => value && setDensity(String(value))}>
          <MenuGroupLabel>Density</MenuGroupLabel>
          <MenuRadioItem value="compact">Compact</MenuRadioItem>
          <MenuRadioItem value="comfortable">Comfortable</MenuRadioItem>
          <MenuRadioItem value="spacious">Spacious</MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  )
}
