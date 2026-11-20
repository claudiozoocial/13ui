import {
  ArrowRight01Icon,
  BubbleChatIcon,
  CodeIcon,
  DashboardSquare01Icon,
  GithubIcon,
  LayoutTwoColumnIcon,
  PaintBoardIcon,
  SidebarLeft01Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { isPrerelease, version } from "@/version"
import { BetaNotice, CodeBlock } from "./parts"
import DockPreview from "./examples/dock-basic"
import { pages } from "./pages"

const componentCount = pages.filter((p) => p.examples?.length && p.group !== "Foundations").length

const features: { icon: typeof CodeIcon; title: string; body: ReactNode; href: string }[] = [
  {
    icon: LayoutTwoColumnIcon,
    title: "Docking",
    body: "Tab groups you drag to another group or to any edge to split. Maximize, close, reopen, and a layout saved between visits. Panels keep their state when they move.",
    href: "#/docs/dock",
  },
  {
    icon: SidebarLeft01Icon,
    title: "App shell",
    body: "A full-height sidebar beside the main area. It resizes, collapses to an icon rail with ⌘B, and becomes a drawer on phones.",
    href: "#/docs/app-shell",
  },
  {
    icon: BubbleChatIcon,
    title: "Chat",
    body: "A composer with stop, messages, reasoning that shimmers while it thinks, tool calls with live status, and a caret for streaming text.",
    href: "#/docs/message",
  },
  {
    icon: CodeIcon,
    title: `${componentCount} components`,
    body: "Menus with shortcuts, a command palette, select with search, combobox, toasts, alert dialog, tabs, checkbox, radio and more.",
    href: "#/docs/button",
  },
  {
    icon: SmartPhone01Icon,
    title: "Responsive",
    body: "On narrow screens the dock stacks into one row of tabs and the sidebar slides in as a drawer. The saved layout comes back when there's room.",
    href: "#/docs/dock",
  },
  {
    icon: PaintBoardIcon,
    title: "One theme file",
    body: "Colors on Tailwind's zinc scale, sizes tuned for dense tools, light, dark and system modes. Change a variable, change everything.",
    href: "#/docs/tokens",
  },
]

const reasons = [
  {
    title: "The layout is a component",
    body: "General UI kits give you buttons and dialogs, and leave the hardest part of a tool to you: the panels. Docking libraries solve the panels but bring their own look and don't speak Tailwind. 13UI is both in one system, styled the same way.",
  },
  {
    title: "You own the code",
    body: "Components install through the shadcn CLI, which copies the source into your project. No package to wait on, nothing to override: edit the file.",
  },
  {
    title: "Behavior you don't write",
    body: "Keyboard navigation, focus, ARIA, popups, resizing and collapsing come from UI SDK, a headless library. 13UI adds the styling and the pieces it doesn't have, like the dock.",
  },
  {
    title: "Made for all-day tools",
    body: "13px interface text, 32px controls and quiet zinc colors fit a lot on screen without feeling cramped.",
  },
]

const stack = [
  { name: "React 19", href: "https://react.dev" },
  { name: "Tailwind CSS v4", href: "https://tailwindcss.com" },
  { name: "UI SDK", href: "https://ui-sdk.dev" },
  { name: "Hugeicons", href: "https://hugeicons.com" },
  { name: "shadcn CLI", href: "https://ui.shadcn.com/docs/cli" },
]

export function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-16 px-4 pt-10 pb-24 sm:px-8 sm:pt-16">
      <header className="flex flex-col gap-5">
        <a
          href="#/docs/changelog"
          className="w-fit rounded-full border border-border px-2.5 py-0.5 font-mono text-2xs text-muted-foreground hover:bg-accent"
        >
          v{version}
          {isPrerelease && " · beta"}
        </a>
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Components for apps built from panels
        </h1>
        <p className="max-w-2xl text-base text-pretty text-muted-foreground">
          Chat beside the code, a terminal under the editor, a preview dragged to the side. 13UI is a design system
          for tools where the layout is part of the product, like AI assistants, editors and dashboards: panels
          resize, collapse, move between groups and dock to any edge.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button render={<a href="#/docs/introduction" />}>
            Get started
            <Icon icon={ArrowRight01Icon} />
          </Button>
          <Button variant="outline" render={<a href="#/workbench" />}>
            <Icon icon={DashboardSquare01Icon} />
            Open the workbench
          </Button>
          <Button
            variant="ghost"
            render={<a href="https://github.com/claudiozoocial/13ui" target="_blank" rel="noopener" />}
          >
            <Icon icon={GithubIcon} />
            GitHub
          </Button>
        </div>
      </header>

      <section aria-labelledby="try-it" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h2 id="try-it" className="text-base font-semibold">
            Try it here
          </h2>
          <p className="text-xs text-muted-foreground">Drag a tab onto another group, or to an edge.</p>
        </div>
        <DockPreview />
      </section>

      <section aria-labelledby="what" className="flex flex-col gap-4">
        <h2 id="what" className="text-base font-semibold">
          What's inside
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title}>
              <a
                href={feature.href}
                className="flex h-full flex-col gap-2 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
              >
                <Icon icon={feature.icon} className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">{feature.title}</span>
                <span className="text-ui leading-5 text-muted-foreground">{feature.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why" className="flex flex-col gap-4">
        <h2 id="why" className="text-base font-semibold">
          Why 13UI
        </h2>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col gap-1">
              <dt className="text-sm font-medium">{reason.title}</dt>
              <dd className="text-sm leading-6 text-muted-foreground">{reason.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="stack" className="flex flex-col gap-3">
        <h2 id="stack" className="text-base font-semibold">
          Built on
        </h2>
        <ul className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="flex h-control items-center rounded-md border border-border px-3 text-ui transition-colors hover:bg-muted"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="start" className="flex flex-col gap-3">
        <h2 id="start" className="text-base font-semibold">
          Start in a minute
        </h2>
        <p className="text-sm text-muted-foreground">
          Add the registry to <code className="font-mono text-xs">components.json</code>, then install what you need:
        </p>
        <CodeBlock code="npx shadcn add @13ui/theme @13ui/app-shell @13ui/dock" />
        <a href="#/docs/introduction" className="w-fit text-sm underline underline-offset-2">
          Full setup
        </a>
      </section>

      {isPrerelease && <BetaNotice />}

      <footer className="border-t border-border pt-6 text-xs text-muted-foreground">
        MIT license. Designed and built by{" "}
        <a
          href="https://claudiocastillo.design/"
          target="_blank"
          rel="noopener"
          className="text-foreground underline-offset-2 hover:underline"
        >
          Claudio Castillo
        </a>
        .
      </footer>
    </div>
  )
}
