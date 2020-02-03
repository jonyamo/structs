import linkedList from "./linked-list"

describe("linkedList", () => {
  test("it sets and gets the head node properly", () => {
    const ll = linkedList()
    ;[10, 20].forEach(value => {
      ll.addToHead(value)
      expect(ll.getHead()).toBe(value)
    })
  })

  test("it sets and gets the tail node properly", () => {
    const ll = linkedList()
    ;[10, 20].forEach(value => {
      ll.addToTail(value)
      expect(ll.getTail()).toBe(value)
    })
  })

  test("it removes and resets the head node properly", () => {
    const ll = linkedList()

    ll.addToHead(10)
    ll.addToHead(20)

    expect(ll.removeHead()).toBe(20)
    expect(ll.getHead()).toBe(10)
    expect(ll.removeHead()).toBe(10)
    expect(ll.getHead()).toBeUndefined()
  })

  test("it removes and resets the tail node properly", () => {
    const ll = linkedList()

    ll.addToTail(10)
    ll.addToTail(20)

    expect(ll.removeTail()).toBe(20)
    expect(ll.getTail()).toBe(10)
    expect(ll.removeTail()).toBe(10)
    expect(ll.getTail()).toBeUndefined()
  })

  describe(".search", () => {
    const ll = linkedList()

    ll.addToHead(10)
    ll.addToHead(20)
    ll.addToHead(30)

    test("it returns the value if found", () => {
      expect(ll.search(30)).toBe(30)
    })

    test("it returns `undefined` if not found", () => {
      expect(ll.search(40)).toBeUndefined()
    })
  })

  describe(".indexOf", () => {
    const ll = linkedList()

    ll.addToHead(10)
    ll.addToHead(20)
    ll.addToHead(30)
    ll.addToHead(20)

    test("it returns an array of matching indexes", () => {
      expect(ll.indexOf(20)).toEqual([0, 2])
    })

    test("it returns -1 if no matching indexes found", () => {
      expect(ll.indexOf(40)).toBe(-1)
    })
  })
})
