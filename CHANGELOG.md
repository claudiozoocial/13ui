# Changelog

All notable changes to 13UI. Versions follow semver; while in beta, any release may change component APIs or the saved dock layout format.

## 0.1.0-beta.19 — 2026-11-20

- Buttons press down slightly (scale 0.97) while held, for feedback. Off with reduced motion.
- Reasoning and ToolCall open and close smoothly in browsers that can animate <details>; with reduced motion their content fades in instead.
- Composer's send and stop are one button whose icons cross-fade, instead of two buttons swapping.
- The theme adds two motion curves, ease-out and ease-in-out, available as the ease-out and ease-in-out utilities.

## 0.1.0-beta.18 — 2026-11-20

- Alert: in success and destructive alerts the title and description take the color too, on the plain background. Buttons inside keep their own colors.

## 0.1.0-beta.17 — 2026-11-20

- Alert: success and destructive alerts have the plain surface background; only the border and the icon take the color. Their text uses the normal colors.

## 0.1.0-beta.16 — 2026-11-20

- Alert: AlertActions now sit to the right of the text, centered. In an alert narrower than 28rem they move under it.

## 0.1.0-beta.15 — 2026-11-20

- New Alert: a message that stays on the page, with default, success, warning and destructive variants, an icon column, actions under the text and an optional control in the corner, like a dismiss button.

## 0.1.0-beta.14 — 2026-11-20

- Each component is a single file again: the class files added in beta.13 are gone, and buttonVariants and avatarVariants are back in button.tsx and avatar.tsx. Nothing looks different.

## 0.1.0-beta.13 — 2026-11-20

- Moved each component's classes into a separate *.styles.ts file. Reverted in beta.14.

## 0.1.0-beta.12 — 2026-11-19

- On the collapsed sidebar rail, each SidebarItem shows its label as a tooltip on the right. It defaults to the item's text; pass tooltip to change it, or tooltip={false} for none.
- Shimmer keeps its sweep with reduced motion: only the color moves, never the text. Loading Dots fade instead of bouncing.

## 0.1.0-beta.11 — 2026-11-19

- New home page at the site root: what 13UI is for, a live dock to try, what's inside, why use it, and how to start. The workbench moved to #/workbench.
- New Shimmer: text with a light sweeping across it for work in progress. With reduced motion it fades gently instead.
- New Spinner and Loading Dots for work of unknown length.
- Chat: new Reasoning, which shimmers "Thinking" and then reads "Thought for 4s" and folds the thoughts; new Caret for text that is still streaming; a running ToolCall shows a spinner and a shimmering title.
- Composer takes pending and onStop: sending waits while a reply comes in, and the send button becomes a stop button.
- The workbench chat answers: it thinks, streams the reply word by word, and can be stopped.

## 0.1.0-beta.10 — 2026-11-19

- AppShell: a sidebar saved as collapsed now loads as a clean icon rail. Before, it restored at rail width but drew the full sidebar squeezed inside it.

## 0.1.0-beta.9 — 2026-11-19

- The theme has three choices: System (follows the device and updates when it changes), Light and Dark. useTheme returns theme, resolved and setTheme, and every caller shares the same choice.
- In the workbench, the theme is a Theme submenu in the account menu. The docs sidebar no longer has its own toggle; the docs follow the same saved choice.
- No flash of the wrong theme on load.

## 0.1.0-beta.8 — 2026-11-19

- The Tokens page shows each section's CSS variables in a Code tab, and the whole theme file at the end.
- ScrollArea takes scrollbars ("vertical", "horizontal" or "both"). Vertical, the default, fits content to the width, so long lines no longer widen the page.
- "Radii" now reads "border radius" across the docs.

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
- Theme: zinc color tokens for light and dark, density sizes, type scale and border radius.
- Base components on UI SDK: button, input, textarea, separator, kbd, icon, tooltip, menu, tabs, scroll area, resizable and command palette.
- Dock: tab groups, resizable splits, drag tabs to another group or any edge, maximize, and a layout saved to localStorage.
- App shell with a collapsible sidebar, panel chrome, and chat blocks (composer, message, tool call).
- Documentation site with live examples, and a shadcn registry at 13ui.vercel.app/r.
- Icons from Hugeicons.
- Released under the MIT license.
