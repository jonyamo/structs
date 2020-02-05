import hashTable from "./hash-table"

describe("hashTable", () => {
  test("it inserts and gets nodes properly", () => {
    const ht = hashTable(1)

    ht.insert("dean", "ween")
    ht.insert("gene", "ween")

    expect(ht.get("dean")).toBe("ween")
    expect(ht.get("gene")).toBe("ween")
  })

  test("it handles hash clashes", () => {
    const ht = hashTable(1)

    ht.insert("dean", "ween")
    ht.insert("naed", "neew")

    expect(ht.get("dean")).toBe("ween")
    expect(ht.get("naed")).toBe("neew")
  })

  test("it updates values properly", () => {
    const ht = hashTable(1)

    ht.insert("dean", "ween")
    ht.insert("dean", "neew")

    expect(ht.get("dean")).toBe("neew")
  })

  test("it returns all nodes", () => {
    const ht = hashTable(1)

    ht.insert("dean", "ween")
    ht.insert("gene", "ween")
    ht.insert("naed", "neew")

    expect(ht.getAll()).toEqual([
      { key: "dean", value: "ween" },
      { key: "gene", value: "ween" },
      { key: "naed", value: "neew" },
    ])
  })
})
