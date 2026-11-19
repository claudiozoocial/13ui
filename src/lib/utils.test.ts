import { expect, test } from "vitest"
import { cn } from "./utils"

test("keeps custom font sizes next to text colors", () => {
  expect(cn("text-ui text-muted-foreground", "text-foreground")).toBe("text-ui text-foreground")
  expect(cn("text-2xs", "text-xs")).toBe("text-xs")
  expect(cn("h-control", "h-control-sm")).toBe("h-control-sm")
})
