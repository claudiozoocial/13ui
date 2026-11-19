import { Add01Icon } from "@hugeicons/core-free-icons"
import { AppShell, SidebarToggle, TitleBar, TitleBarTitle } from "@/components/shell/app-shell"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarItem } from "@/components/shell/sidebar"
import { Icon } from "@/components/ui/icon"

export default function Example() {
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border border-border">
      <AppShell
        titleBar={
          <TitleBar>
            <SidebarToggle />
            <TitleBarTitle>My app</TitleBarTitle>
          </TitleBar>
        }
        sidebar={
          <Sidebar aria-label="Navigation">
            <SidebarHeader>
              <SidebarItem>
                <Icon icon={Add01Icon} />
                <span>New session</span>
              </SidebarItem>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup label="Recent">
                <SidebarItem active>
                  <span>Design system</span>
                </SidebarItem>
                <SidebarItem>
                  <span>Pricing landing page</span>
                </SidebarItem>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        }
      >
        <div className="grid size-full place-items-center text-ui text-muted-foreground">Main area</div>
      </AppShell>
    </div>
  )
}
