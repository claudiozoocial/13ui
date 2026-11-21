# 13UI

By [Claudio Castillo](https://claudiocastillo.design/). Home, docs and workbench at [13ui.vercel.app](https://13ui.vercel.app).

> **Beta** — 13UI is at 0.1.0-beta.8. APIs and the dock layout format may change; see [CHANGELOG.md](CHANGELOG.md).

A design system for panel-based interfaces, like an IDE or an AI assistant app: panels resize, collapse, move between groups and dock to any edge. Built with [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com) and [UI SDK](https://ui-sdk.dev) for behavior (keyboard, focus, ARIA, resizing). Icons are [Hugeicons](https://hugeicons.com). It ships as a [shadcn](https://ui.shadcn.com) registry: components are copied into your project.

## Development

```bash
pnpm install
pnpm dev            # home at http://localhost:5173, docs at /#/docs, workbench at /#/workbench
pnpm test           # dock model tests
pnpm typecheck
pnpm registry:build # writes public/r/*.json
```

Pushes to `main` deploy to [13ui.vercel.app](https://13ui.vercel.app) through Vercel's GitHub integration; pull requests get preview deployments.

## What's included

| Item | What it is |
| --- | --- |
| `theme` | Tokens on Tailwind's zinc scale, light and dark, density sizes (`h-control`, `h-tabbar`, `text-ui`…), border radius, shadows |
| `icon` | Hugeicons wrapper with the system's stroke width |
| `button`, `input`, `textarea`, `separator`, `kbd`, `tooltip`, `menu`, `tabs`, `scroll-area`, `resizable`, `command`, `select`, `combobox`, `avatar`, `label`, `checkbox`, `radio`, `alert-dialog`, `toast`, `menubar`, `navigation-menu`, `shimmer`, `spinner`, `loading-dots` | Base components on UI SDK, styled with Tailwind |
| `dock` | Docking engine: resizable splits, tab groups, drag tabs to another group or an edge, maximize, layout saved to localStorage |
| `app-shell` | Full-height sidebar beside the main area, no header; collapses to an icon rail (⌘B) and becomes a drawer on mobile. Sidebar parts and panel chrome |
| `chat` | Composer with stop, message, reasoning, tool call and streaming caret |
| `workbench` | A full example: the app at `/#/workbench` |

## Install in another project

The registry is live at https://13ui.vercel.app/r. In your project's `components.json`:

```json
{ "registries": { "@13ui": "https://13ui.vercel.app/r/{name}.json" } }
```

```bash
npx shadcn add @13ui/theme @13ui/dock @13ui/app-shell
```

Then use `src/styles/13ui.css` as your global CSS. It already includes `@import "tailwindcss"`.

## Using the dock

```tsx
import { Dock, useDock } from "@/components/dock/dock"
import { column, group, row } from "@/components/dock/model"

const initial = () => ({
  root: row([group(["chat"]), column([group(["diff", "files"]), group(["terminal"])], [60, 40])], [55, 45]),
  maximized: null,
})

function Workbench() {
  const dock = useDock({ initial, storageKey: "app:layout" })
  return (
    <Dock
      dock={dock}
      panels={{
        chat: { title: "Chat", content: <Chat />, closable: false, minSize: "320px" },
        diff: { title: "Diff", content: <Diff /> },
        files: { title: "Files", content: <Files /> },
        terminal: { title: "Terminal", content: <Terminal /> },
      }}
    />
  )
}
```

- `dock.open(id, { position: "right" })` opens or focuses a panel. There are also `close`, `activate`, `isOpen`, `reset`, and `dispatch` for any model action.
- Each panel's content mounts once and moves through a portal, so it keeps its state when dragged, split or switched.
- The model (`model.ts`) is pure and tested: you can store the layout on your backend instead of localStorage.

## Structure

```
src/styles/globals.css      tokens and theme
src/components/ui/          base components (UI SDK + Tailwind)
src/components/dock/        dock model and view
src/components/shell/       app shell, sidebar, panel, chat
src/docs/                   documentation site and live examples
src/demo/App.tsx            example workbench
registry.json               shadcn registry definition
```

Each component keeps its classes in a `*.styles.ts` file beside it, like `menu.tsx` and `menu.styles.ts`. Those files hold only class strings and `cva` variants, with no React, so other framework versions can share them. Change a component's look there; the `.tsx` file holds structure and behavior.

## License

MIT © [Claudio Castillo](https://claudiocastillo.design/). See [LICENSE](LICENSE).
