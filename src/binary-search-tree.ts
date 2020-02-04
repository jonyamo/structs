import { Nullable } from "./types"

export interface TreeNode {
  value: number
  left: Nullable<TreeNode>
  right: Nullable<TreeNode>
}

export type Order = "pre-order" | "in-order" | "post-order"

export interface BinarySearchTree {
  insert: (value: number) => void
  contains: (value: number) => boolean
  bfs: (fn: Function) => void
  dfs: (fn: Function, order: Order) => void
  min: () => number
  max: () => number
}

const treeNode = (value: number): TreeNode => ({
  value,
  left: null,
  right: null,
})

const binarySearchTree = (): BinarySearchTree => {
  let root: Nullable<TreeNode> = null

  const insertNode = (node: TreeNode, newNode: TreeNode): void => {
    const edge = newNode.value < node.value ? "left" : "right"
    if (node[edge] === null) node[edge] = newNode
    else insertNode(node[edge] as TreeNode, newNode)
  }

  const containsVal = (node: TreeNode, val: number): boolean => {
    if (node.value === val) return true
    const edge = val < node.value ? "left" : "right"
    return node[edge] === null
      ? false
      : containsVal(node[edge] as TreeNode, val)
  }

  const dfs = (
    node: TreeNode,
    fn: Function,
    order: Order = "in-order",
  ): void => {
    if (order === "pre-order") fn(node.value)
    if (node.left) dfs(node.left, fn, order)
    if (order === "in-order") fn(node.value)
    if (node.right) dfs(node.right, fn, order)
    if (order === "post-order") fn(node.value)
  }

  const maybe = (fn: Function) => {
    if (root === null) {
      throw new Error("Tree is empty")
    }
    return fn()
  }

  return {
    insert: value => {
      const newNode = treeNode(value)
      if (root === null) root = newNode
      else insertNode(root, newNode)
    },
    contains: value => maybe(() => containsVal(root as TreeNode, value)),
    bfs: fn =>
      maybe(() => {
        const queue: TreeNode[] = [root as TreeNode]
        while (queue.length) {
          const node = queue.shift()
          if (node) {
            fn(node.value)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
          }
        }
      }),
    dfs: (fn, order = "in-order") =>
      maybe(() => dfs(root as TreeNode, fn, order)),
    min: () =>
      maybe(() => {
        let currentNode = root as TreeNode
        while (currentNode.left) currentNode = currentNode.left
        return currentNode.value
      }),
    max: () =>
      maybe(() => {
        let currentNode = root as TreeNode
        while (currentNode.right) currentNode = currentNode.right
        return currentNode.value
      }),
  }
}

export default binarySearchTree
