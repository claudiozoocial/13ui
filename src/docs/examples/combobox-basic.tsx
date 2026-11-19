import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = ["Astro", "Next.js", "Nuxt", "Remix", "SolidStart", "SvelteKit", "Vite"]

export default function Example() {
  return (
    <div className="flex w-64 flex-col gap-1.5">
      <Combobox>
        <ComboboxLabel>Framework</ComboboxLabel>
        <ComboboxInput placeholder="Search frameworks…" />
        <ComboboxContent>
          <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
