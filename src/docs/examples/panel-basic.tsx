import { Panel, PanelBody, PanelToolbar } from "@/components/shell/panel"

export default function Example() {
  return (
    <div className="h-56 w-full overflow-hidden rounded-lg border border-border">
      <Panel>
        <PanelToolbar>
          <span className="font-mono text-xs text-foreground">src/app.tsx</span>
          <span className="ml-auto text-xs text-success">+12</span>
          <span className="text-xs text-destructive">−3</span>
        </PanelToolbar>
        <PanelBody className="p-3 font-mono text-xs leading-5 text-muted-foreground">
          export function App() {"{"}
          <br />
          {"  "}return {"<Workbench />"}
          <br />
          {"}"}
        </PanelBody>
      </Panel>
    </div>
  )
}
