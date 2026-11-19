# Changelog

All notable changes to 13UI. Versions follow semver; while in beta, any release may change component APIs or the saved dock layout format.

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
