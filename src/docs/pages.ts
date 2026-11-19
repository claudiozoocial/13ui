export interface DocExample {
  name: string
  title: string
}

export interface DocPage {
  slug: string
  title: string
  group: "Foundations" | "Components" | "Layout" | "Chat"
  description: string
  /** Registry items to install, without the @13ui/ prefix. */
  install?: string[]
  examples?: DocExample[]
  notes?: string[]
}

export const pages: DocPage[] = [
  {
    slug: "introduction",
    title: "Introduction",
    group: "Foundations",
    description:
      "Components for panel-based interfaces: panels resize, collapse, move between groups and dock to any edge. Built with React 19, Tailwind v4 and UI SDK.",
  },
  {
    slug: "changelog",
    title: "Changelog",
    group: "Foundations",
    description: "Every release of 13UI and what changed in it.",
  },
  {
    slug: "tokens",
    title: "Tokens",
    group: "Foundations",
    description: "Colors on Tailwind's zinc scale, density sizes, type scale and radii, all in one CSS file.",
    install: ["theme"],
  },
  {
    slug: "icons",
    title: "Icons",
    group: "Foundations",
    description: "Hugeicons with a 1.75 stroke, hidden from screen readers. Size them with size-* or from the parent.",
    install: ["icon"],
    examples: [{ name: "icon-basic", title: "System icons" }],
    notes: ["Find more icons at hugeicons.com and import them from @hugeicons/core-free-icons."],
  },
  {
    slug: "button",
    title: "Button",
    group: "Components",
    description: "Runs an action. When onClick returns a promise, the button stays pending until it settles.",
    install: ["button"],
    examples: [
      { name: "button-variants", title: "Variants" },
      { name: "button-sizes", title: "Sizes and icons" },
      { name: "button-pending", title: "Pending" },
    ],
  },
  {
    slug: "input",
    title: "Input",
    group: "Components",
    description: "A single-line text field.",
    install: ["input"],
    examples: [{ name: "input-basic", title: "Basic" }],
  },
  {
    slug: "textarea",
    title: "Textarea",
    group: "Components",
    description: "Multi-line text with no border of its own, so it can sit inside other containers.",
    install: ["textarea"],
    examples: [{ name: "textarea-basic", title: "Inside a container" }],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    group: "Components",
    description: "Names or describes a control. Best for icon-only buttons.",
    install: ["tooltip"],
    examples: [{ name: "tooltip-basic", title: "With a keyboard shortcut" }],
  },
  {
    slug: "menu",
    title: "Menu",
    group: "Components",
    description:
      "A general dropdown menu, opened from any trigger: actions with shortcuts, checkboxes, radio groups, submenus and groups. onAction receives the chosen item's value.",
    install: ["menu"],
    examples: [
      { name: "menu-basic", title: "Groups and a destructive action" },
      { name: "menu-shortcuts", title: "Shortcuts and submenus" },
      { name: "menu-checkbox-radio", title: "Checkboxes and radio groups" },
      { name: "menu-account", title: "Account menu, composed from Menu and Avatar" },
    ],
    notes: [
      "Any element can open it: pass it to MenuTrigger with render, like render={<Button variant=\"outline\" />}.",
      "A shortcut prop like \"mod+s\" shows ⌘S on Apple platforms and Ctrl+S elsewhere. Your app still handles the keys.",
      "MenuHeader holds content that isn't an item, like the signed-in user.",
    ],
  },
  {
    slug: "avatar",
    title: "Avatar",
    group: "Components",
    description: "A user's image, with a fallback such as initials while it loads or if it fails.",
    install: ["avatar"],
    examples: [{ name: "avatar-basic", title: "Sizes, initials and image" }],
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Components",
    description: "Switches between views in the same space.",
    install: ["tabs"],
    examples: [{ name: "tabs-basic", title: "Segmented" }],
  },
  {
    slug: "select",
    title: "Select",
    group: "Components",
    description:
      "Pick one option from a dropdown. Add SelectInput inside the content to search the options, with groups and an empty state.",
    install: ["select"],
    examples: [
      { name: "select-basic", title: "Basic" },
      { name: "select-search", title: "With search and groups" },
    ],
  },
  {
    slug: "combobox",
    title: "Combobox",
    group: "Components",
    description: "A text field that filters a list as you type, for long lists where typing is faster than scrolling.",
    install: ["combobox"],
    examples: [{ name: "combobox-basic", title: "Filter as you type" }],
  },
  {
    slug: "command",
    title: "Command",
    group: "Components",
    description: "A search field over a list of commands. Inside CommandDialog it becomes a command palette.",
    install: ["command"],
    examples: [
      { name: "command-basic", title: "Inline" },
      { name: "command-dialog", title: "Palette in a dialog" },
    ],
  },
  {
    slug: "scroll-area",
    title: "Scroll Area",
    group: "Components",
    description: "Scrolling with thin scrollbars that show on hover.",
    install: ["scroll-area"],
    examples: [{ name: "scroll-area-basic", title: "Long list" }],
  },
  {
    slug: "separator",
    title: "Separator",
    group: "Components",
    description: "Divides content, horizontally or vertically.",
    install: ["separator"],
    examples: [{ name: "separator-basic", title: "Horizontal and vertical" }],
  },
  {
    slug: "kbd",
    title: "Kbd",
    group: "Components",
    description: "Shows a key or a shortcut.",
    install: ["kbd"],
    examples: [{ name: "kbd-basic", title: "Shortcut" }],
  },
  {
    slug: "resizable",
    title: "Resizable",
    group: "Layout",
    description:
      "Panels you resize by dragging the edge or with the keyboard. Sizes take %, px or rem, with minimums, maximums and collapsing.",
    install: ["resizable"],
    examples: [
      { name: "resizable-basic", title: "Nested" },
      { name: "resizable-collapsible", title: "Collapsible, with a controller" },
    ],
  },
  {
    slug: "dock",
    title: "Dock",
    group: "Layout",
    description:
      "The full IDE-style layout: tab groups, drag tabs to another group or to an edge to split, maximize, and a saved layout.",
    install: ["dock"],
    examples: [{ name: "dock-basic", title: "Drag a tab to another group or an edge" }],
    notes: [
      "useDock({ initial, storageKey }) saves the layout to localStorage when you pass storageKey.",
      'dock.open(id, { position: "right" }) opens or focuses a panel; there are also close, activate, isOpen and reset.',
      "Each panel's content mounts once and keeps its state when you move it.",
      "Responsive: below stackBelow (640px by default) of its own width, the dock shows every panel as one row of tabs, without splits or dragging. The saved layout returns when it's wide again. Narrow this page to see it.",
    ],
  },
  {
    slug: "app-shell",
    title: "App Shell",
    group: "Layout",
    description: "The window frame: title bar, collapsible sidebar and main area. useAppShell() exposes the toggle.",
    install: ["app-shell"],
    examples: [{ name: "app-shell-basic", title: "With a sidebar" }],
    notes: [
      "Responsive: below breakpoint (768px of viewport by default) the sidebar becomes a drawer that slides over the page, opened by SidebarToggle.",
      "SidebarItem closes the drawer when pressed, for navigation. Pass closesSidebar={false} to items that open something in place, like a menu trigger.",
      "Command+B (Ctrl+B elsewhere) toggles the sidebar. Pass shortcut={false} to turn it off.",
    ],
  },
  {
    slug: "panel",
    title: "Panel",
    group: "Layout",
    description: "The inside of a dock panel: an optional toolbar over a scrolling body.",
    install: ["app-shell"],
    examples: [{ name: "panel-basic", title: "With a toolbar" }],
  },
  {
    slug: "composer",
    title: "Composer",
    group: "Chat",
    description: "Message input: Enter sends, Shift+Enter adds a line, and it grows with its content.",
    install: ["chat"],
    examples: [{ name: "composer-basic", title: "With actions" }],
  },
  {
    slug: "message",
    title: "Message",
    group: "Chat",
    description: "User and assistant messages, plus collapsible tool calls.",
    install: ["chat"],
    examples: [{ name: "message-basic", title: "Conversation" }],
  },
]

export const groups = ["Foundations", "Components", "Layout", "Chat"] as const
