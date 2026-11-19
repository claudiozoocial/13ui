import { Add01Icon, Settings02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button variant="outline">
        <Icon icon={Add01Icon} />
        With icon
      </Button>
      <Button variant="outline" size="icon" aria-label="Settings">
        <Icon icon={Settings02Icon} />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Settings">
        <Icon icon={Settings02Icon} />
      </Button>
      <Button variant="ghost" size="icon-xs" aria-label="Settings">
        <Icon icon={Settings02Icon} />
      </Button>
    </div>
  )
}
