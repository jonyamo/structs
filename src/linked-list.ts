import { Nullable, Value } from "./types"

export interface ListNode {
  value: Value
  next: Nullable<ListNode>
  prev: Nullable<ListNode>
}

export interface LinkedList {
  getHead: () => Value
  getTail: () => Value
  addToHead: (value: Value) => void
  addToTail: (value: Value) => void
  removeHead: () => Value
  removeTail: () => Value
  search: <T>(value: T) => T | undefined
  indexOf: (value: Value) => number[] | -1
}

const listNode = (
  value: Value,
  next: Nullable<ListNode>,
  prev: Nullable<ListNode>,
): ListNode => ({
  value,
  next,
  prev,
})

const linkedList = (): LinkedList => {
  let head: Nullable<ListNode> = null
  let tail: Nullable<ListNode> = null

  return {
    getHead: () => head?.value,
    getTail: () => tail?.value,
    addToHead: value => {
      const node = listNode(value, head, null)
      if (head) head.prev = node
      else tail = node
      head = node
    },
    addToTail: value => {
      const node = listNode(value, null, tail)
      if (tail) tail.next = node
      else head = node
      tail = node
    },
    removeHead: () => {
      if (!head) return null
      const value = head.value
      head = head.next
      if (head) head.prev = null
      else tail = null
      return value
    },
    removeTail: () => {
      if (!tail) return null
      const value = tail.value
      tail = tail.prev
      if (tail) tail.next = null
      else head = null
      return value
    },
    search: value => {
      let currentNode = head
      while (currentNode) {
        if (currentNode.value === value) return value
        currentNode = currentNode.next
      }
      return
    },
    indexOf: value => {
      const indexes = []
      let currentIndex = 0
      let currentNode = head
      while (currentNode) {
        if (currentNode.value === value) indexes.push(currentIndex)
        currentIndex++
        currentNode = currentNode.next
      }
      return indexes.length !== 0 ? indexes : -1
    },
  }
}

export default linkedList
