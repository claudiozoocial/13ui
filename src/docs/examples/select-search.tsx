import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectGroupLabel,
  SelectInput,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const regions = [
  { label: "Americas", items: ["Argentina", "Brazil", "Canada", "Chile", "Mexico", "United States"] },
  { label: "Europe", items: ["France", "Germany", "Italy", "Spain", "United Kingdom"] },
  { label: "Asia Pacific", items: ["Australia", "Japan", "Singapore", "South Korea"] },
]

export default function Example() {
  return (
    <div className="flex w-64 flex-col gap-1.5">
      <Select placeholder="Select a country">
        <SelectLabel>Country</SelectLabel>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          <SelectInput aria-label="Search countries" placeholder="Search countries…" />
          <SelectEmpty>No countries found.</SelectEmpty>
          <SelectList>
            {regions.map((region) => (
              <SelectGroup key={region.label}>
                <SelectGroupLabel>{region.label}</SelectGroupLabel>
                {region.items.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    </div>
  )
}
