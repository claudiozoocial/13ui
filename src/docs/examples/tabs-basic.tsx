import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

export default function Example() {
  return (
    <Tabs defaultValue="preview" className="w-80">
      <TabsList aria-label="View">
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="code">Code</TabsTab>
        <TabsTab value="logs">Logs</TabsTab>
      </TabsList>
      <TabsPanel value="preview" className="pt-3 text-ui text-muted-foreground">The rendered app.</TabsPanel>
      <TabsPanel value="code" className="pt-3 text-ui text-muted-foreground">The source code.</TabsPanel>
      <TabsPanel value="logs" className="pt-3 text-ui text-muted-foreground">The server output.</TabsPanel>
    </Tabs>
  )
}
