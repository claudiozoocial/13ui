import {
  Copy01Icon,
  DashboardSquare01Icon,
  Moon02Icon,
  Sun03Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { type ComponentType, type ReactNode, useEffect, useRef, useState } from "react"
import { AppShell, SidebarToggle, TitleBar } from "@/components/shell/app-shell"
import { Sidebar, SidebarContent, SidebarGroup, SidebarItem } from "@/components/shell/sidebar"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/use-theme"
import { type DocPage, groups, pages } from "./pages"

const modules = import.meta.glob<{ default: ComponentType }>("./examples/*.tsx", { eager: true })
const sources = import.meta.glob<string>("./examples/*.tsx", { eager: true, query: "?raw", import: "default" })

const exampleName = (path: string) => path.replace("./examples/", "").replace(".tsx", "")
const examples = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    exampleName(path),
    { Component: mod.default, source: sources[path]?.trimEnd() ?? "" },
  ]),
)

export function Docs({ route }: { route: string }) {
  const { dark, toggle } = useTheme()
  const slug = route.split("/")[1] || "introduction"
  const page = pages.find((p) => p.slug === slug) ?? pages[0]

  useEffect(() => {
    document.title = `${page.title} · 13UI`
  }, [page])

  return (
    <AppShell
      autoSaveId="13ui:docs-shell"
      titleBar={
        <TitleBar>
          <SidebarToggle />
          <a href="#/docs" className="px-2 text-ui font-semibold">
            13UI
          </a>
          <span className="text-ui text-subtle-foreground">Docs</span>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" render={<a href="#/" />}>
            <Icon icon={DashboardSquare01Icon} />
            Workbench
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle theme" onClick={toggle}>
            <Icon icon={dark ? Sun03Icon : Moon02Icon} />
          </Button>
        </TitleBar>
      }
      sidebar={
        <Sidebar aria-label="Documentation">
          <SidebarContent className="pt-2">
            {groups.map((group) => (
              <SidebarGroup key={group} label={group}>
                {pages
                  .filter((p) => p.group === group)
                  .map((p) => (
                    <SidebarItem
                      key={p.slug}
                      active={p.slug === page.slug}
                      onClick={() => {
                        location.hash = `#/docs/${p.slug}`
                      }}
                    >
                      <span>{p.title}</span>
                    </SidebarItem>
                  ))}
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
      }
    >
      <ScrollArea key={page.slug} className="size-full bg-surface">
        <article className="mx-auto flex max-w-3xl flex-col gap-8 px-8 pt-10 pb-24">
          <header className="flex flex-col gap-2">
            <p className="text-xs font-medium text-subtle-foreground">{page.group}</p>
            <h1 className="text-2xl font-semibold tracking-tight">{page.title}</h1>
            <p className="text-sm text-muted-foreground">{page.description}</p>
          </header>

          {page.install && <Install items={page.install} />}
          {page.slug === "introduction" && <Introduction />}
          {page.slug === "tokens" && <Tokens />}

          {page.examples?.map((example) => {
            const entry = examples[example.name]
            return entry ? (
              <ExampleBlock key={example.name} title={example.title} source={entry.source}>
                <entry.Component />
              </ExampleBlock>
            ) : null
          })}

          {page.notes && (
            <Section title="Notes">
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground">
                {page.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </Section>
          )}

          <PageNav page={page} />
        </article>
      </ScrollArea>
    </AppShell>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function useCopy() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }
  return { copied, copy }
}

function CopyButton({ text, className }: { text: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : "Copy"}
      onClick={() => copy(text)}
      className={className}
    >
      <Icon icon={copied ? Tick02Icon : Copy01Icon} />
    </Button>
  )
}

function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative rounded-lg border border-border bg-background", className)}>
      <CopyButton text={code} className="absolute top-2 right-2" />
      <pre className="max-h-[480px] overflow-auto p-4 pr-10 font-mono text-xs leading-5 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Install({ items }: { items: string[] }) {
  const command = `npx shadcn add ${items.map((item) => `@13ui/${item}`).join(" ")}`
  return (
    <Section title="Installation">
      <CodeBlock code={command} />
    </Section>
  )
}

function ExampleBlock({ title, source, children }: { title: string; source: string; children: ReactNode }) {
  return (
    <Section title={title}>
      <Tabs defaultValue="preview" className="flex flex-col gap-2">
        <TabsList aria-label={`${title}: view`} className="self-start">
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsList>
        <TabsPanel value="preview">
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-border bg-background p-8">
            {children}
          </div>
        </TabsPanel>
        <TabsPanel value="code">
          <CodeBlock code={source} />
        </TabsPanel>
      </Tabs>
    </Section>
  )
}

function PageNav({ page }: { page: DocPage }) {
  const index = pages.indexOf(page)
  const prev = pages[index - 1]
  const next = pages[index + 1]
  return (
    <nav aria-label="Pages" className="flex justify-between border-t border-border pt-6">
      {prev ? (
        <Button variant="outline" render={<a href={`#/docs/${prev.slug}`} />}>
          ← {prev.title}
        </Button>
      ) : (
        <span />
      )}
      {next && (
        <Button variant="outline" render={<a href={`#/docs/${next.slug}`} />}>
          {next.title} →
        </Button>
      )}
    </nav>
  )
}

const setup = `{
  "registries": {
    "@13ui": "https://13ui.vercel.app/r/{name}.json"
  }
}`

function Introduction() {
  return (
    <>
      <Section title="How it works">
        <p className="text-sm leading-6 text-muted-foreground">
          Like shadcn, components aren't installed as a dependency: the CLI copies the code into your project and it's
          yours. Behavior (keyboard, focus, accessibility, dragging and resizing) comes from UI SDK; styles are Tailwind
          on zinc tokens; icons are Hugeicons.
        </p>
      </Section>
      <Section title="1. Point your project at the registry">
        <p className="text-sm text-muted-foreground">
          In your project's <code className="font-mono text-xs">components.json</code>:
        </p>
        <CodeBlock code={setup} />
      </Section>
      <Section title="2. Install the theme">
        <CodeBlock code="npx shadcn add @13ui/theme" />
        <p className="text-sm text-muted-foreground">
          It copies <code className="font-mono text-xs">src/styles/13ui.css</code>. Import it as your global CSS; it
          already includes <code className="font-mono text-xs">@import "tailwindcss"</code>.
        </p>
      </Section>
      <Section title="3. Add components">
        <CodeBlock code="npx shadcn add @13ui/dock @13ui/app-shell" />
        <p className="text-sm text-muted-foreground">
          Every page in these docs has its own command. Dependencies between components install automatically.
        </p>
      </Section>
    </>
  )
}

const colorTokens = [
  { name: "background", light: "zinc-50", dark: "zinc-950" },
  { name: "surface", light: "white", dark: "zinc-900" },
  { name: "sidebar", light: "zinc-50", dark: "zinc-950" },
  { name: "foreground", light: "zinc-950", dark: "zinc-50" },
  { name: "muted", light: "zinc-100", dark: "zinc-800" },
  { name: "muted-foreground", light: "zinc-500", dark: "zinc-400" },
  { name: "subtle-foreground", light: "zinc-400", dark: "zinc-500" },
  { name: "accent", light: "zinc-100", dark: "zinc-800" },
  { name: "border", light: "zinc-200", dark: "zinc-800" },
  { name: "border-strong", light: "zinc-300", dark: "zinc-700" },
  { name: "ring", light: "zinc-400", dark: "zinc-500" },
  { name: "primary", light: "zinc-900", dark: "zinc-50" },
  { name: "primary-foreground", light: "zinc-50", dark: "zinc-900" },
  { name: "destructive", light: "red-600", dark: "red-500" },
  { name: "success", light: "emerald-600", dark: "emerald-500" },
]

const sizeTokens = [
  { name: "h-titlebar", value: "40px", use: "Title bar" },
  { name: "h-tabbar", value: "34px", use: "Dock tab bar" },
  { name: "h-control", value: "32px", use: "Buttons, inputs, sidebar items" },
  { name: "h-control-sm", value: "28px", use: "Small buttons, menu items" },
  { name: "rounded-md", value: "8px", use: "Controls and containers" },
  { name: "rounded-xl", value: "16px", use: "Composer, dialogs" },
]

const typeTokens = [
  { name: "text-2xs", value: "11 / 16", sample: "Group label" },
  { name: "text-xs", value: "12 / 16", sample: "Code and secondary text" },
  { name: "text-ui", value: "13 / 18", sample: "Base interface text" },
  { name: "text-sm", value: "14 / 20", sample: "Messages and content" },
  { name: "text-base", value: "15 / 24", sample: "Section headings" },
]

function Tokens() {
  return (
    <>
      <Section title="Color">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {colorTokens.map((token) => (
            <div key={token.name} className="flex items-center gap-3 rounded-lg border border-border p-2">
              <div
                className="size-9 shrink-0 rounded-md border border-border"
                style={{ background: `var(--${token.name})` }}
              />
              <div className="min-w-0">
                <div className="font-mono text-xs">{token.name}</div>
                <div className="text-2xs text-muted-foreground">
                  {token.light} · {token.dark} in dark
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Sizes">
        <TokenTable rows={sizeTokens.map((t) => [t.name, t.value, t.use])} headers={["Class", "Value", "Use"]} />
      </Section>
      <Section title="Typography">
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {typeTokens.map((t) => (
            <div key={t.name} className="flex items-baseline gap-4 px-3 py-2.5">
              <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{t.name}</span>
              <span className="w-16 shrink-0 text-xs text-subtle-foreground">{t.value}</span>
              <span className={cn("truncate", t.name)}>{t.sample}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

function TokenTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-ui">
        <thead className="bg-muted text-xs text-muted-foreground">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={cell} className={cn("px-3 py-2", i === 0 && "font-mono text-xs")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
