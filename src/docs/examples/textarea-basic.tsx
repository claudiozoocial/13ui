import { Textarea } from "@/components/ui/textarea"

export default function Example() {
  return (
    <div className="w-80 rounded-md border border-input bg-surface p-2 focus-within:border-ring">
      <Textarea aria-label="Notes" placeholder="Write a note…" rows={3} />
    </div>
  )
}
