# Changelog

All notable changes to 13UI. Versions follow semver; while in beta, any release may change component APIs or the saved dock layout format.

## 0.1.0-beta.7 — 2026-11-19

- New Alert Dialog for confirmations, with a built-in backdrop and answers styled as buttons.
- New Toast: call toast() from anywhere, with success, error, warning, info, loading and promise toasts, actions, a stack that fans out on hover, and swipe to dismiss. Render <Toaster /> once.
- New Menubar for application menus, built from Menu.
- New Navigation Menu for site navigation with panels of links.
- New Checkbox (with a mixed state and groups), Radio and Label.

## 0.1.0-beta.6 — 2026-11-19

- Fixed menu shortcuts: an item with a shortcut showed an unstyled copy from UI SDK next to an empty one. It now shows one shortcut, styled as a key cap.
- New kbd utility in the theme. Kbd, menu shortcuts and sidebar shortcuts all use it, so every shortcut looks the same.

## 0.1.0-beta.5 — 2026-11-19

- AppShell has no header: the sidebar runs the full height with the main area beside it. Breaking: the titleBar prop, TitleBar and TitleBarTitle are removed; put navigation and actions in the sidebar.
- Collapsing the sidebar leaves a 52px icon rail instead of hiding it, so the toggle stays in reach. Labels stay readable to screen readers.
- New SidebarTitle, SidebarItemTrailing and SidebarGroup hideOnRail for the rail. SidebarHeader now holds a title and the toggle in one row.
- On mobile, a slim bar with the sidebar button and the new mobileHeader prop opens the drawer.
- The workbench and docs moved Search, Panels, Docs, Workbench and the theme into the sidebar.

## 0.1.0-beta.4 — 2026-11-19

- Responsive layout. On narrow screens the AppShell sidebar becomes a drawer that slides over the page; set the width with breakpoint.
- The Dock stacks every panel into one row of tabs when its own width is below stackBelow (640px by default), and restores the saved split layout when it widens again.
- AppShell handles Command+B (Ctrl+B elsewhere) itself; turn it off with shortcut={false}.
- SidebarItem closes the mobile drawer when pressed, unless closesSidebar={false}.
- New useMediaQuery hook.
- The docs and the workbench adapt to phone widths.
- The docs introduction links to React, Tailwind CSS, UI SDK, Hugeicons and the shadcn CLI.

## 0.1.0-beta.3 — 2026-11-19

- Menu is now a general dropdown: shortcuts shown from the shortcut prop, checkbox and radio items, submenus with their arrow built in, and MenuHeader for non-item content.
- New Avatar component with sizes, an image and a fallback, plus an initials helper.
- Removed Account Menu. Build it from Menu, Avatar and SidebarItem instead; the Menu docs show how. If you installed @13ui/account-menu, keep your copy or switch to the composed version.

## 0.1.0-beta.2 — 2026-11-19

- New Select component, with an optional search field, groups and an empty state inside the dropdown.
- New Combobox component that filters a list as you type.
- New Account Menu for the sidebar footer: avatar, name and email, opening a menu for account, settings and log out.
- Tooltips now close when the pointer leaves the window, so a tooltip on a button at the window edge no longer stays open.

## 0.1.0-beta.1 — 2026-11-19

- First beta release.
- Theme: zinc color tokens for light and dark, density sizes, type scale and radii.
- Base components on UI SDK: button, input, textarea, separator, kbd, icon, tooltip, menu, tabs, scroll area, resizable and command palette.
- Dock: tab groups, resizable splits, drag tabs to another group or any edge, maximize, and a layout saved to localStorage.
- App shell with a collapsible sidebar, panel chrome, and chat blocks (composer, message, tool call).
- Documentation site with live examples, and a shadcn registry at 13ui.vercel.app/r.
- Icons from Hugeicons.
- Released under the MIT license.
