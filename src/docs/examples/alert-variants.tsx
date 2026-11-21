import { Alert02Icon, AlertCircleIcon, CheckmarkCircle02Icon, InformationCircleIcon } from "@hugeicons/core-free-icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icon } from "@/components/ui/icon"

export default function Example() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert>
        <Icon icon={InformationCircleIcon} />
        <AlertTitle>Layouts are saved in this browser</AlertTitle>
        <AlertDescription>Open the workbench on another device and it starts from the default layout.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <Icon icon={CheckmarkCircle02Icon} />
        <AlertTitle>Deployed to production</AlertTitle>
        <AlertDescription>Version 0.1.0-beta.14 is live.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <Icon icon={Alert02Icon} />
        <AlertTitle>You're close to your monthly limit</AlertTitle>
        <AlertDescription>92% used. New sessions pause when you reach it.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <Icon icon={AlertCircleIcon} />
        <AlertTitle>The build failed</AlertTitle>
        <AlertDescription>src/components/dock/dock.tsx: Type error on line 42.</AlertDescription>
      </Alert>
    </div>
  )
}
