import { CreditCardIcon, Logout01Icon, Settings02Icon, UserCircleIcon } from "@hugeicons/core-free-icons"
import { useState } from "react"
import { AccountMenu } from "@/components/shell/account-menu"
import { Icon } from "@/components/ui/icon"
import { MenuItem, MenuSeparator } from "@/components/ui/menu"

export default function Example() {
  const [last, setLast] = useState<string | null>(null)
  return (
    <div className="flex w-64 flex-col gap-2">
      <div className="rounded-lg border border-border bg-sidebar p-1.5">
        <AccountMenu name="John Lennon" email="john@example.com" onAction={(value) => setLast(value)}>
          <MenuItem value="account">
            <Icon icon={UserCircleIcon} />
            My account
          </MenuItem>
          <MenuItem value="settings">
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
        </AccountMenu>
      </div>
      <p className="text-xs text-muted-foreground">{last ? `Chose: ${last}` : "Press the account to open it"}</p>
    </div>
  )
}
