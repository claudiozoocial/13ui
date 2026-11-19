import { Add01Icon, BookOpen01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { AppShell, SidebarToggle } from "@/components/shell/app-shell"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarItemTrailing,
  SidebarTitle,
} from "@/components/shell/sidebar"
import { Icon } from "@/components/ui/icon"

export default function Example() {
  return (
    <div className="h-96 w-full overflow-hidden rounded-lg border border-border">
      <AppShell
        shortcut={false}
        mobileHeader="My app"
        sidebar={
          <Sidebar aria-label="Navigation">
            <SidebarHeader>
              <SidebarTitle>My app</SidebarTitle>
              <SidebarToggle />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarItem>
                  <Icon icon={Add01Icon} />
                  <span>New session</span>
                </SidebarItem>
                <SidebarItem>
                  <Icon icon={Search01Icon} />
                  <span>Search</span>
                  <SidebarItemTrailing>⌘K</SidebarItemTrailing>
                </SidebarItem>
                <SidebarItem>
                  <Icon icon={BookOpen01Icon} />
                  <span>Docs</span>
                </SidebarItem>
              </SidebarGroup>
              <SidebarGroup label="Recent" hideOnRail>
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
        <div className="grid size-full place-items-center text-ui text-muted-foreground">
          Collapse the sidebar to its icon rail with the button at its top
        </div>
      </AppShell>
    </div>
  )
}
