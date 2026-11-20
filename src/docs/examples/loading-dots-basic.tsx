import { LoadingDots } from "@/components/ui/loading-dots"
import { Message } from "@/components/shell/message"

export default function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <Message from="user">Are you there?</Message>
      <Message from="assistant">
        <LoadingDots label="Assistant is typing" className="h-6 text-muted-foreground" />
      </Message>
    </div>
  )
}
