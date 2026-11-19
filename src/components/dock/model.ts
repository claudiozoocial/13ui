export type DockOrientation = "horizontal" | "vertical"
export type DropEdge = "left" | "right" | "top" | "bottom"
export type DropPosition = "center" | DropEdge

export interface DockGroup {
  type: "group"
  id: string
  panels: string[]
  active: string | null
}

export interface DockSplit {
  type: "split"
  id: string
  orientation: DockOrientation
  children: DockNode[]
  /** Percentages, one per child, adding up to 100. */
  sizes: number[]
}

export type DockNode = DockGroup | DockSplit

export interface DockState {
  root: DockNode
  /** A group shown alone, filling the whole dock. */
  maximized: string | null
}

let counter = 0
export function dockId(prefix: string) {
  counter += 1
  return `${prefix}-${counter.toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

export function group(panels: string[], active: string | null = panels[0] ?? null): DockGroup {
  return { type: "group", id: dockId("g"), panels, active }
}

export function split(orientation: DockOrientation, children: DockNode[], sizes?: number[]): DockSplit {
  return {
    type: "split",
    id: dockId("s"),
    orientation,
    children,
    sizes: sizes ?? children.map(() => 100 / children.length),
  }
}

export function row(children: DockNode[], sizes?: number[]) {
  return split("horizontal", children, sizes)
}

export function column(children: DockNode[], sizes?: number[]) {
  return split("vertical", children, sizes)
}

export function walk(node: DockNode, visit: (node: DockNode) => void) {
  visit(node)
  if (node.type === "split") for (const child of node.children) walk(child, visit)
}

export function findNode(root: DockNode, id: string): DockNode | null {
  let found: DockNode | null = null
  walk(root, (node) => {
    if (node.id === id) found = node
  })
  return found
}

export function findGroupOf(root: DockNode, panelId: string): DockGroup | null {
  let found: DockGroup | null = null
  walk(root, (node) => {
    if (node.type === "group" && node.panels.includes(panelId)) found = node
  })
  return found
}

export function firstGroup(root: DockNode): DockGroup {
  return root.type === "group" ? root : firstGroup(root.children[0])
}

export function openPanels(root: DockNode): string[] {
  const ids: string[] = []
  walk(root, (node) => {
    if (node.type === "group") ids.push(...node.panels)
  })
  return ids
}

function mapNode(node: DockNode, fn: (node: DockNode) => DockNode): DockNode {
  const next = fn(node)
  if (next.type !== "split") return next
  const children = next.children.map((child) => mapNode(child, fn))
  return children.every((child, i) => child === next.children[i]) ? next : { ...next, children }
}

function scaleTo100(sizes: number[]) {
  const total = sizes.reduce((a, b) => a + b, 0) || 1
  return sizes.map((size) => (size / total) * 100)
}

/** Drops empty groups, unwraps single-child splits and flattens splits nested in the same direction. */
export function normalize(node: DockNode, isRoot = true): DockNode | null {
  if (node.type === "group") return node.panels.length > 0 || isRoot ? node : null

  const children: DockNode[] = []
  const sizes: number[] = []
  node.children.forEach((child, i) => {
    const next = normalize(child, false)
    if (!next) return
    if (next.type === "split" && next.orientation === node.orientation) {
      next.children.forEach((grandchild, j) => {
        children.push(grandchild)
        sizes.push((next.sizes[j] / 100) * node.sizes[i])
      })
    } else {
      children.push(next)
      sizes.push(node.sizes[i])
    }
  })

  if (children.length === 0) return isRoot ? group([]) : null
  if (children.length === 1) return children[0]
  return { ...node, children, sizes: scaleTo100(sizes) }
}

function withRoot(state: DockState, root: DockNode | null): DockState {
  const nextRoot = (root && normalize(root)) ?? group([])
  const maximized = state.maximized && findNode(nextRoot, state.maximized) ? state.maximized : null
  return { root: nextRoot, maximized }
}

function detach(root: DockNode, panelId: string): DockNode {
  return mapNode(root, (node) => {
    if (node.type !== "group" || !node.panels.includes(panelId)) return node
    const index = node.panels.indexOf(panelId)
    const panels = node.panels.filter((id) => id !== panelId)
    const active = node.active === panelId ? (panels[Math.min(index, panels.length - 1)] ?? null) : node.active
    return { ...node, panels, active }
  })
}

const edgeOrientation = (edge: DropEdge): DockOrientation =>
  edge === "left" || edge === "right" ? "horizontal" : "vertical"
const edgeIsBefore = (edge: DropEdge) => edge === "left" || edge === "top"

function insertBeside(root: DockNode, targetId: string, newNode: DockNode, edge: DropEdge): DockNode {
  const orientation = edgeOrientation(edge)
  const before = edgeIsBefore(edge)

  if (root.id === targetId) {
    const children = before ? [newNode, root] : [root, newNode]
    return split(orientation, children, before ? [30, 70] : [70, 30])
  }

  // mapNode descends into the split this creates, which still holds the target; insert only once.
  let inserted = false
  return mapNode(root, (node) => {
    if (inserted || node.type !== "split") return node
    const index = node.children.findIndex((child) => child.id === targetId)
    if (index === -1) return node
    inserted = true
    const target = node.children[index]

    if (node.orientation === orientation) {
      const half = node.sizes[index] / 2
      const children = [...node.children]
      const sizes = [...node.sizes]
      children.splice(before ? index : index + 1, 0, newNode)
      sizes.splice(index, 1, half, half)
      return { ...node, children, sizes }
    }

    const wrapped = split(orientation, before ? [newNode, target] : [target, newNode])
    const children = [...node.children]
    children[index] = wrapped
    return { ...node, children }
  })
}

export type DockAction =
  | { type: "activate"; panelId: string }
  | { type: "close"; panelId: string }
  | { type: "closeGroup"; groupId: string }
  | {
      type: "move"
      panelId: string
      /** A group id, or "root" to dock against the edge of the whole layout. */
      target: string
      position: DropPosition
      index?: number
    }
  | { type: "open"; panelId: string; target?: string; position?: DropPosition }
  | { type: "resize"; splitId: string; sizes: number[] }
  | { type: "toggleMaximize"; groupId: string }
  | { type: "reset"; state: DockState }

export function dockReducer(state: DockState, action: DockAction): DockState {
  switch (action.type) {
    case "activate": {
      const owner = findGroupOf(state.root, action.panelId)
      if (!owner || owner.active === action.panelId) return state
      return {
        ...state,
        root: mapNode(state.root, (node) => (node.id === owner.id ? { ...owner, active: action.panelId } : node)),
      }
    }

    case "close":
      return withRoot(state, detach(state.root, action.panelId))

    case "closeGroup": {
      const target = findNode(state.root, action.groupId)
      if (!target || target.type !== "group") return state
      return withRoot(
        state,
        mapNode(state.root, (node) => (node.id === target.id ? { ...target, panels: [], active: null } : node)),
      )
    }

    case "open": {
      if (findGroupOf(state.root, action.panelId)) return dockReducer(state, { type: "activate", panelId: action.panelId })
      const target = action.target ?? firstGroup(state.root).id
      return dockReducer(state, { type: "move", panelId: action.panelId, target, position: action.position ?? "center" })
    }

    case "move": {
      const { panelId, target, position } = action
      const source = findGroupOf(state.root, panelId)
      const targetGroup = target === "root" ? null : findNode(state.root, target)
      if (target !== "root" && (!targetGroup || targetGroup.type !== "group")) return state

      if (source && targetGroup?.id === source.id && position !== "center" && source.panels.length === 1) return state

      // Detach first but keep the emptied group until the end, so a target that was the source still exists.
      let root = source ? detach(state.root, panelId) : state.root

      if (position === "center" && targetGroup) {
        root = mapNode(root, (node) => {
          if (node.id !== targetGroup.id || node.type !== "group") return node
          const panels = [...node.panels]
          const index = action.index ?? panels.length
          panels.splice(Math.max(0, Math.min(index, panels.length)), 0, panelId)
          return { ...node, panels, active: panelId }
        })
      } else {
        const edge = position === "center" ? "right" : position
        root = insertBeside(root, target === "root" ? root.id : target, group([panelId]), edge)
      }
      return withRoot(state, root)
    }

    case "resize":
      return {
        ...state,
        root: mapNode(state.root, (node) =>
          node.id === action.splitId && node.type === "split" ? { ...node, sizes: action.sizes } : node,
        ),
      }

    case "toggleMaximize":
      return { ...state, maximized: state.maximized === action.groupId ? null : action.groupId }

    case "reset":
      return action.state
  }
}

/** Resolves which zone of a rectangle a point falls in: an outer band for each edge, the middle for center. */
export function dropPositionAt(rect: Pick<DOMRect, "left" | "top" | "width" | "height">, x: number, y: number, band = 0.25): DropPosition {
  const rx = (x - rect.left) / rect.width
  const ry = (y - rect.top) / rect.height
  const distances: [DropPosition, number][] = [
    ["left", rx],
    ["right", 1 - rx],
    ["top", ry],
    ["bottom", 1 - ry],
  ]
  const [edge, distance] = distances.reduce((a, b) => (b[1] < a[1] ? b : a))
  return distance < band ? edge : "center"
}

export function isDockState(value: unknown): value is DockState {
  return typeof value === "object" && value !== null && "root" in value && typeof (value as DockState).root === "object"
}
