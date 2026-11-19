import {
  CreditCardIcon,
  Logout01Icon,
  Settings02Icon,
  UnfoldMoreIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"
import { SidebarItem } from "@/components/shell/sidebar"
import { Avatar, AvatarFallback, initials } from "@/components/ui/avatar"
import { Icon } from "@/components/ui/icon"
import { Menu, MenuContent, MenuHeader, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"

const user = { name: "John Lennon", email: "john@example.com" }

// An account menu is a Menu whose trigger is the signed-in user, opening upward from a sidebar footer.
export default function Example() {
  return (
    <div className="w-64 rounded-lg border border-border bg-sidebar p-1.5">
      <Menu>
        <MenuTrigger render={<SidebarItem closesSidebar={false} className="h-11 text-foreground" />}>
          <Avatar size="sm">
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-2xs text-muted-foreground">{user.email}</span>
          </span>
          <Icon icon={UnfoldMoreIcon} className="ml-auto text-muted-foreground" />
        </MenuTrigger>
        <MenuContent side="top" align="start" className="w-(--anchor-width)">
          <MenuHeader>
            <Avatar size="sm">
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-2xs text-muted-foreground">{user.email}</span>
            </div>
          </MenuHeader>
          <MenuSeparator />
          <MenuItem value="account">
            <Icon icon={UserCircleIcon} />
            My account
          </MenuItem>
          <MenuItem value="settings" shortcut="mod+,">
            <Icon icon={Settings02Icon} />
            Settings
          </MenuItem>
          <MenuItem value="billing">
            <Icon icon={CreditCardIcon} />
            Billing
          </MenuItem>
          <MenuSeparator />
          <MenuItem value="logout">
            <Icon icon={Logout01Icon} />
            Log out
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}
