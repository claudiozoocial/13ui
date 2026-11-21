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
    description: "Colors on Tailwind's zinc scale, density sizes, type scale and border radius, all in one CSS file. Switch any section to Code to see its variables.",
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
    slug: "alert-dialog",
    title: "Alert Dialog",
    group: "Components",
    description:
      "Asks for confirmation before an action, over a dimmed page. Each answer is an AlertDialogClose; value=\"confirm\" is the agreeing one.",
    install: ["alert-dialog"],
    examples: [{ name: "alert-dialog-basic", title: "Destructive confirmation" }],
    notes: ["onOpenChange receives details.returnValue: the value of the answer that closed it."],
  },
  {
    slug: "alert",
    title: "Alert",
    group: "Components",
    description:
      "A message that stays on the page, like a notice above a form or an error in a panel. For brief notifications that come and go, use Toast; to ask before acting, Alert Dialog.",
    install: ["alert"],
    examples: [
      { name: "alert-variants", title: "Variants" },
      { name: "alert-actions", title: "Actions and dismissing" },
    ],
    notes: [
      "Put an Icon first and the alert lines its text up beside it.",
      "Warning and destructive alerts use role=\"alert\", so screen readers announce them when they appear. Default and success use role=\"status\". Pass role to change it, or role=\"none\" for a message that's simply part of the page.",
      "AlertActions holds buttons under the text. AlertAction holds one control in the top-right corner, like a dismiss button.",
    ],
  },
  {
    slug: "toast",
    title: "Toast",
    group: "Components",
    description:
      "Brief notifications that stack in a corner. Call toast() from anywhere; render <Toaster /> once near your app's root.",
    install: ["toast"],
    examples: [{ name: "toast-basic", title: "Types, actions and promises" }],
    notes: [
      "toast.success, .error, .warning, .info and .loading set the icon. toast.promise follows a promise from loading to done.",
      "Hover the stack to fan it out. Swipe a toast toward the edge to dismiss it.",
      "Toaster takes side (top or bottom) and align (start, center or end).",
    ],
  },
  {
    slug: "menubar",
    title: "Menubar",
    group: "Components",
    description:
      "An application menu bar, like File, Edit, View. Put Menus inside; they join it, and arrow keys move between them.",
    install: ["menubar", "menu"],
    examples: [{ name: "menubar-basic", title: "File, Edit and View" }],
  },
  {
    slug: "navigation-menu",
    title: "Navigation Menu",
    group: "Components",
    description:
      "Site navigation: triggers that open panels of links, and plain links. For actions, use Menu instead.",
    install: ["navigation-menu"],
    examples: [{ name: "navigation-menu-basic", title: "Panels and a plain link" }],
    notes: ["current on a link marks the current page. Render your router's link with render={<Link … />}."],
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
    slug: "checkbox",
    title: "Checkbox",
    group: "Components",
    description:
      "Toggles an option on or off, or shows a mixed state for a partly checked set. Wrap it with its text in a Label.",
    install: ["checkbox", "label"],
    examples: [{ name: "checkbox-basic", title: "Group with a parent checkbox" }],
  },
  {
    slug: "radio",
    title: "Radio",
    group: "Components",
    description: "Picks one option from a few, all visible. Give each Radio a value inside a RadioGroup.",
    install: ["radio", "label"],
    examples: [{ name: "radio-basic", title: "With descriptions" }],
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
    slug: "shimmer",
    title: "Shimmer",
    group: "Components",
    description:
      "Text with a light sweeping across it, for work in progress like \"Thinking\" or \"Searching files\". Set active to false when the work ends and the text stays in place.",
    install: ["shimmer"],
    examples: [{ name: "shimmer-basic", title: "Active and finished" }],
    notes: ["It paints the text with a gradient, so it uses the muted and foreground colors of the theme. Only the color moves, never the text, so it keeps running with reduced motion."],
  },
  {
    slug: "spinner",
    title: "Spinner",
    group: "Components",
    description: "A spinning ring for work of unknown length. It takes the current text color.",
    install: ["spinner"],
    examples: [{ name: "spinner-basic", title: "Sizes, with text and in a button" }],
    notes: ["It announces \"Loading\" to screen readers. Pass label=\"\" when nearby text already says what is happening."],
  },
  {
    slug: "loading-dots",
    title: "Loading Dots",
    group: "Components",
    description: "Three pulsing dots, like someone typing. It takes the current text color.",
    install: ["loading-dots"],
    examples: [{ name: "loading-dots-basic", title: "Waiting for a reply" }],
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
    description:
      "The window frame: a full-height sidebar with the main area beside it, and no header. Navigation and actions live in the sidebar, which collapses to an icon rail. useAppShell() exposes its state.",
    install: ["app-shell"],
    examples: [{ name: "app-shell-basic", title: "With a sidebar" }],
    notes: [
      "Put SidebarToggle in the SidebarHeader. Collapsed, the sidebar becomes a 52px rail: span labels turn screen-reader-only, SidebarTitle and SidebarItemTrailing hide, and groups with hideOnRail disappear.",
      "On the rail, each SidebarItem shows its label as a tooltip. Pass tooltip to set different text, or tooltip={false} to leave it out.",
      "Responsive: below breakpoint (768px of viewport by default) the sidebar becomes a drawer that slides over the page. A slim bar with the sidebar button and mobileHeader opens it.",
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
    description:
      "Message input: Enter sends, Shift+Enter adds a line, and it grows with its content. While pending, sending waits; with onStop the send button becomes a stop button.",
    install: ["chat"],
    examples: [{ name: "composer-basic", title: "With actions" }],
  },
  {
    slug: "message",
    title: "Message",
    group: "Chat",
    description: "User and assistant messages, collapsible tool calls, and a Caret for text that is still streaming in.",
    install: ["chat"],
    examples: [
      { name: "message-basic", title: "Conversation" },
      { name: "message-streaming", title: "Thinking, streaming and stop" },
    ],
    notes: [
      "A running ToolCall shows a spinner and shimmers its title.",
      "Put Caret at the end of the text while it streams, and remove it when the reply is complete.",
    ],
  },
  {
    slug: "reasoning",
    title: "Reasoning",
    group: "Chat",
    description:
      "A model's reasoning, folded behind one line. While streaming, the line shimmers \"Thinking\"; once done it reads \"Thought for 4s\" and opens to show the thoughts.",
    install: ["chat"],
    examples: [{ name: "reasoning-basic", title: "Thinking, done and a custom label" }],
  },
]

export const groups = ["Foundations", "Components", "Layout", "Chat"] as const
