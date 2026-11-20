import { Reasoning } from "@/components/shell/message"

export default function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Reasoning streaming />
      <Reasoning duration={4}>
        The layout is a tree of splits. Moving a tab to an edge wraps the target group in a new split, so the
        other panels keep their sizes.
      </Reasoning>
      <Reasoning label="Searched 3 sources" defaultOpen>
        UI SDK docs, the Tailwind v4 theme guide and the shadcn registry schema.
      </Reasoning>
    </div>
  )
}
