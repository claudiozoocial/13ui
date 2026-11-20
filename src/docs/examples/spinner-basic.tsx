import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function Example() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <span className="flex items-center gap-2 text-ui text-muted-foreground">
        <Spinner size="sm" label="" />
        Installing dependencies
      </span>
      <Button disabled>
        <Spinner size="sm" label="" />
        Saving
      </Button>
    </div>
  )
}
