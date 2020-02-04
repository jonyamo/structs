import binarySearchTree, { BinarySearchTree, Order } from "./binary-search-tree"

const noop = (): void => {
  // do nothing
}

const collect = <T>(acc: T[]): Function => (v: T): void => {
  acc.push(v)
}

describe("binarySearchTree", () => {
  let bst: BinarySearchTree

  beforeAll(() => {
    bst = binarySearchTree()
    bst.insert(50)
    bst.insert(30)
    bst.insert(70)
    bst.insert(100)
    bst.insert(60)
    bst.insert(59)
    bst.insert(20)
    bst.insert(45)
    bst.insert(35)
    bst.insert(85)
    bst.insert(105)
    bst.insert(10)
  })

  describe(".contains", () => {
    it("should throw if the tree is empty", () => {
      expect(() => binarySearchTree().contains(10)).toThrowError(
        "Tree is empty",
      )
    })

    it("should return true when the given val exists in the tree", () => {
      expect(bst.contains(59)).toBe(true)
    })

    it("should return false when the given val does not exist in the tree", () => {
      expect(bst.contains(57)).toBe(false)
    })
  })

  describe(".bfs", () => {
    it("should throw if the tree is empty", () => {
      expect(() => binarySearchTree().bfs(noop)).toThrowError("Tree is empty")
    })

    it("should apply fn to each node breadth-first", () => {
      const vals: number[] = []
      bst.bfs(collect(vals))
      expect(vals).toEqual([50, 30, 70, 20, 45, 60, 100, 10, 35, 59, 85, 105])
    })
  })

  describe(".dfs", () => {
    ;[
      {
        order: "pre-order",
        expected: [50, 30, 20, 10, 45, 35, 70, 60, 59, 100, 85, 105],
      },
      {
        order: "in-order",
        expected: [10, 20, 30, 35, 45, 50, 59, 60, 70, 85, 100, 105],
      },
      {
        order: "post-order",
        expected: [10, 20, 35, 45, 30, 59, 60, 85, 105, 100, 70, 50],
      },
    ].forEach(({ order, expected }) => {
      it("should throw if the tree is empty", () => {
        expect(() => binarySearchTree().dfs(noop, order as Order)).toThrowError(
          "Tree is empty",
        )
      })

      it(`should apply fn to each node depth-first, ${order}`, () => {
        const vals: number[] = []
        bst.dfs(collect(vals), order as Order)
        expect(vals).toEqual(expected)
      })
    })
  })

  describe(".min", () => {
    it("should throw if the tree is empty", () => {
      expect(() => binarySearchTree().min()).toThrowError("Tree is empty")
    })

    it("returns the minimum value in the tree", () => {
      expect(bst.min()).toBe(10)
    })
  })

  describe(".max", () => {
    it("should throw if the tree is empty", () => {
      expect(() => binarySearchTree().max()).toThrowError("Tree is empty")
    })

    it("returns the maximum value in the tree", () => {
      expect(bst.max()).toBe(105)
    })
  })
})
