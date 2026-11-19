import { Add01Icon, SidebarLeft01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Tooltip, TooltipContent, TooltipShortcut, TooltipTrigger } from "@/components/ui/tooltip"

export default function Example() {
  return (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <Icon icon={SidebarLeft01Icon} />
        </TooltipTrigger>
        <TooltipContent>
          Hide sidebar
          <TooltipShortcut>⌘B</TooltipShortcut>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon" />}>
          <Icon icon={Add01Icon} />
        </TooltipTrigger>
        <TooltipContent side="bottom">New session</TooltipContent>
      </Tooltip>
    </div>
  )
}
