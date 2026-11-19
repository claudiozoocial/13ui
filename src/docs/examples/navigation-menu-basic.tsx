import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTopLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const products = [
  { title: "Workbench", description: "Panels, tabs and a dock for focused work." },
  { title: "Agents", description: "Run tasks in the background and review them." },
  { title: "Registry", description: "Install components with the shadcn CLI." },
]

const resources = [
  { title: "Docs", description: "Guides and component reference." },
  { title: "Changelog", description: "What changed in every release." },
]

export default function Example() {
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenuList>
        <NavigationMenuItem value="products">
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="grid w-80 gap-0.5">
            {products.map((item) => (
              <NavigationMenuLink key={item.title} href="#/docs/navigation-menu">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem value="resources">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent className="grid w-72 gap-0.5">
            {resources.map((item) => (
              <NavigationMenuLink key={item.title} href="#/docs/navigation-menu">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTopLink href="#/docs/navigation-menu" current>
            Pricing
          </NavigationMenuTopLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
