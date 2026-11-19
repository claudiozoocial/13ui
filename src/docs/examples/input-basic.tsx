import { Input } from "@/components/ui/input"

export default function Example() {
  return (
    <div className="flex w-72 flex-col gap-2">
      <Input aria-label="Project name" placeholder="Project name" />
      <Input aria-label="Disabled" placeholder="Disabled" disabled />
    </div>
  )
}
