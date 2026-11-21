import {
  Tabs,
  TabsList as TabsListPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsTab as TabsTabPrimitive,
} from "@ui-sdk/react/tabs"
import type { ComponentProps } from "react"
import { withClass } from "@/lib/utils"
import { tabsStyles } from "./tabs.styles"

function TabsList({ className, ...props }: ComponentProps<typeof TabsListPrimitive>) {
  return (
    <TabsListPrimitive
      className={withClass(tabsStyles.list, className)}
      {...props}
    />
  )
}

function TabsTab({ className, ...props }: ComponentProps<typeof TabsTabPrimitive>) {
  return (
    <TabsTabPrimitive
      className={withClass(
        tabsStyles.tab,
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
