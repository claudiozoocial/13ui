import { describe, expect, test } from "vitest"
import { column, type DockNode, type DockState, dockReducer, dropPositionAt, group, openPanels, row } from "./model"

const shape = (node: DockNode): string =>
  node.type === "group" ? `[${node.panels.join(",")}]` : `${node.orientation[0]}(${node.children.map(shape).join(" ")})`

function setup(): DockState {
  return { root: row([group(["chat"]), column([group(["diff", "files"]), group(["terminal"])])]), maximized: null }
}

const groupIdOf = (state: DockState, panel: string) => {
  let id = ""
  const visit = (n: DockNode) => {
    if (n.type === "group" && n.panels.includes(panel)) id = n.id
    if (n.type === "split") n.children.forEach(visit)
  }
  visit(state.root)
  return id
}

describe("dockReducer move", () => {
  test("into a group's center adds a tab and selects it", () => {
    const s = setup()
    const next = dockReducer(s, { type: "move", panelId: "terminal", target: groupIdOf(s, "chat"), position: "center" })
    expect(shape(next.root)).toBe("h([chat,terminal] [diff,files])")
    expect(next.root.type === "split" && next.root.children[0].type === "group" && next.root.children[0].active).toBe("terminal")
  })

  test("to an edge across the split's direction wraps the target once", () => {
    const s = setup()
    const next = dockReducer(s, { type: "move", panelId: "diff", target: groupIdOf(s, "chat"), position: "bottom" })
    expect(shape(next.root)).toBe("h(v([chat] [diff]) v([files] [terminal]))")
    expect(openPanels(next.root).sort()).toEqual(["chat", "diff", "files", "terminal"])
  })

  test("to an edge along the split's direction inserts a sibling", () => {
    const s = setup()
    const next = dockReducer(s, { type: "move", panelId: "terminal", target: groupIdOf(s, "chat"), position: "left" })
    expect(shape(next.root)).toBe("h([terminal] [chat] [diff,files])")
    if (next.root.type === "split") expect(next.root.sizes.reduce((a, b) => a + b)).toBeCloseTo(100)
  })

  test("splitting a lone panel against its own group does nothing", () => {
    const s = setup()
    const next = dockReducer(s, { type: "move", panelId: "chat", target: groupIdOf(s, "chat"), position: "right" })
    expect(next).toBe(s)
  })

  test("reorders within the same group", () => {
    const s = setup()
    const next = dockReducer(s, { type: "move", panelId: "files", target: groupIdOf(s, "files"), position: "center", index: 0 })
    expect(shape(next.root)).toBe("h([chat] v([files,diff] [terminal]))")
  })

  test("docks against the whole layout's edge", () => {
    const s = setup()
    const next = dockReducer(s, { type: "move", panelId: "terminal", target: "root", position: "bottom" })
    expect(shape(next.root)).toBe("v(h([chat] [diff,files]) [terminal])")
  })
})

describe("dockReducer close and open", () => {
  test("closing the last tab removes the group and unwraps the split", () => {
    const next = dockReducer(setup(), { type: "close", panelId: "terminal" })
    expect(shape(next.root)).toBe("h([chat] [diff,files])")
  })

  test("closing every panel leaves an empty root group", () => {
    let s = setup()
    for (const id of ["chat", "diff", "files", "terminal"]) s = dockReducer(s, { type: "close", panelId: id })
    expect(shape(s.root)).toBe("[]")
  })

  test("opening a closed panel adds it; opening an open one selects it", () => {
    const closed = dockReducer(setup(), { type: "close", panelId: "files" })
    const reopened = dockReducer(closed, { type: "open", panelId: "files", position: "right" })
    expect(openPanels(reopened.root)).toContain("files")
    const selected = dockReducer(setup(), { type: "open", panelId: "files" })
    expect(shape(selected.root)).toBe(shape(setup().root))
  })

  test("maximize clears when its group goes away", () => {
    const s = setup()
    const max = dockReducer(s, { type: "toggleMaximize", groupId: groupIdOf(s, "terminal") })
    expect(max.maximized).not.toBeNull()
    expect(dockReducer(max, { type: "close", panelId: "terminal" }).maximized).toBeNull()
  })
})

test("dropPositionAt picks the nearest edge band, else center", () => {
  const rect = { left: 0, top: 0, width: 400, height: 200 }
  expect(dropPositionAt(rect, 200, 100)).toBe("center")
  expect(dropPositionAt(rect, 10, 100)).toBe("left")
  expect(dropPositionAt(rect, 390, 100)).toBe("right")
  expect(dropPositionAt(rect, 200, 5)).toBe("top")
  expect(dropPositionAt(rect, 200, 195)).toBe("bottom")
})
