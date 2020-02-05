import { Value } from "./types"

export interface HashNode {
  key: string
  value: Value
  next?: HashNode
}

export interface HashTable {
  insert: (key: string, value: Value) => void
  get: (key: string) => Value | null
  getAll: () => HashNode[]
}

const hashNode = (key: string, value: string, next?: HashNode): HashNode => ({
  key,
  value,
  next,
})

const hashTable = (size: number): HashTable => {
  const buckets = new Array(size)

  const getHash = (key: string): number => {
    let id = 0

    for (let i = 0; i < key.length; i++) {
      id += key.charCodeAt(i)
    }

    return id % size
  }

  return {
    insert: (key: string, value: string): void => {
      const hash = getHash(key)

      if (!buckets[hash]) {
        buckets[hash] = hashNode(key, value)
        return
      }

      if (buckets[hash].key === key) {
        buckets[hash].value = value
        return
      }

      let currentNode = buckets[hash]

      while (currentNode.next) {
        if (currentNode.next.key === key) {
          currentNode.next.value = value
          return
        }
        currentNode = currentNode.next
      }

      currentNode.next = hashNode(key, value)
    },
    get: (key: string): string | null => {
      const hash = getHash(key)

      if (!buckets[hash]) return null

      let currentNode = buckets[hash]
      while (currentNode) {
        if (currentNode.key === key) return currentNode.value
        currentNode = currentNode.next
      }
      return null
    },
    getAll: (): HashNode[] => {
      const nodes = []

      for (let i = 0; i < size; i++) {
        let currentNode = buckets[i]
        while (currentNode) {
          nodes.push({ key: currentNode.key, value: currentNode.value })
          currentNode = currentNode.next
        }
      }

      return nodes
    },
  }
}

export default hashTable
