import {
  Tabs,
  TabsList as TabsListPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsTab as TabsTabPrimitive,
} from "@ui-sdk/react/tabs"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"

function TabsList({ className, ...props }: ComponentProps<typeof TabsListPrimitive>) {
  return (
    <TabsListPrimitive
      className={withClass("inline-flex items-center gap-0.5 rounded-md bg-muted p-0.5", className)}
      {...props}
    />
  )
}

function TabsTab({ className, ...props }: ComponentProps<typeof TabsTabPrimitive>) {
  return (
    <TabsTabPrimitive
      className={withClass(
        "inline-flex h-6 cursor-default select-none items-center gap-1.5 rounded-sm px-2 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground data-disabled:opacity-50 data-selected:bg-surface data-selected:text-foreground data-selected:shadow-sm [&_svg]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

function TabsPanel({ className, ...props }: ComponentProps<typeof TabsPanelPrimitive>) {
  return <TabsPanelPrimitive className={withClass("outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsPanel, TabsTab }
