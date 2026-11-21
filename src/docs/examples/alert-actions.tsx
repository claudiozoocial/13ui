import { AlertCircleIcon, Cancel01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { Alert, AlertAction, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export default function Example() {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert variant="destructive">
        <Icon icon={AlertCircleIcon} />
        <AlertTitle>Couldn't connect to the terminal</AlertTitle>
        <AlertDescription>The session ended after 30 minutes without activity.</AlertDescription>
        <AlertActions>
          <Button size="sm" variant="outline">
            Reconnect
          </Button>
          <Button size="sm" variant="ghost">
            View logs
          </Button>
        </AlertActions>
      </Alert>
      {open ? (
        <Alert>
          <Icon icon={InformationCircleIcon} />
          <AlertTitle>New: drag tabs to any edge</AlertTitle>
          <AlertDescription>Drop a tab on the border of the layout to dock it across the whole window.</AlertDescription>
          <AlertAction>
            <Button variant="ghost" size="icon-xs" aria-label="Dismiss" onClick={() => setOpen(false)}>
              <Icon icon={Cancel01Icon} />
            </Button>
          </AlertAction>
        </Alert>
      ) : (
        <Button variant="outline" size="sm" className="self-start" onClick={() => setOpen(true)}>
          Show the dismissed alert
        </Button>
      )}
      <Alert>
        <AlertTitle>Without an icon</AlertTitle>
        <AlertDescription>The text takes the full width.</AlertDescription>
      </Alert>
    </div>
  )
}
