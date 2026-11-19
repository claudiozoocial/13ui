import { Label } from "@/components/ui/label"
import { Radio, RadioGroup } from "@/components/ui/radio"

const plans = [
  { value: "hobby", label: "Hobby", hint: "For side projects" },
  { value: "pro", label: "Pro", hint: "For teams shipping every day" },
  { value: "enterprise", label: "Enterprise", hint: "Talk to sales", disabled: true },
]

export default function Example() {
  return (
    <RadioGroup defaultValue="pro" aria-label="Plan" className="gap-3">
      {plans.map((plan) => (
        <Label key={plan.value} className="items-start">
          <Radio value={plan.value} disabled={plan.disabled} className="mt-px" />
          <span className="flex flex-col">
            <span>{plan.label}</span>
            <span className="text-xs text-muted-foreground">{plan.hint}</span>
          </span>
        </Label>
      ))}
    </RadioGroup>
  )
}
