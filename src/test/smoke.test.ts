import { findTestFramework } from "@lib"

it("running from jest", () => {
    const tfw = findTestFramework()
    expect(tfw).not.toBeNull()
    expect(tfw?.which).toBe("jest")
})

const tfw = findTestFramework()!

tfw.describe("suite", s => {
    s.describe("inner suite", s => {
        s.test("inner test", e => {
            e(true).toBe(true)
        })
        s.test.skip("should be skipped", e => {
            e(false).toBe(true)
        })
        s.test.skip("should be skipped 2", e => {
            e(false).toBe(true)
        })
        s.test.todo("should be todo", e => {
            e(false).toBe(true)
        })
    })
})

tfw.test.skip("should be skipped", e => {
    e(false).toBe(true)
})

tfw.test.todo("should be todo", e => {
    e(false).toBe(true)
})

tfw.test("should pass", e => {
    e(true).toBe(true)
})
