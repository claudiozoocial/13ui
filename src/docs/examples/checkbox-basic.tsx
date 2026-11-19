import { useState } from "react"
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const options = [
  { value: "email", label: "Email" },
  { value: "push", label: "Push notifications" },
  { value: "sms", label: "SMS", disabled: true },
]

export default function Example() {
  const [value, setValue] = useState<string[]>(["email"])
  const all = value.length === 2
  const some = value.length === 1
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox
          checked={all ? true : some ? "indeterminate" : false}
          onCheckedChange={(checked) => setValue(checked ? ["email", "push"] : [])}
        />
        Notify me by every channel
      </Label>
      <CheckboxGroup value={value} onValueChange={setValue} aria-label="Channels" className="pl-6">
        {options.map((option) => (
          <Label key={option.value}>
            <Checkbox value={option.value} disabled={option.disabled} />
            {option.label}
          </Label>
        ))}
      </CheckboxGroup>
    </div>
  )
}
