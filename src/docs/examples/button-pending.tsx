import { Button } from "@/components/ui/button"

export default function Example() {
  // Returning a promise keeps the button pending (data-pending) until it settles.
  return <Button onClick={() => new Promise((resolve) => setTimeout(resolve, 1500))}>Save</Button>
}
