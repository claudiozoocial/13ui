import { Message, ToolCall } from "@/components/shell/message"

export default function Example() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <Message from="user">Add a terminal panel at the bottom.</Message>
      <Message from="assistant">
        <p>Done, it is docked below the editor.</p>
        <ToolCall title="Edit src/workbench.tsx">+8 lines</ToolCall>
        <ToolCall title="Bash pnpm test" status="running" />
      </Message>
    </div>
  )
}
