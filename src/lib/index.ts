import type { TestEnv } from "./interfaces/define.js"
import { frameworks } from "./loader/index.js"
import type { TestFrameworkName } from "./loader/types"
import { getGlobalTestFramework } from "./utils/get-global-framework.js"
import { wrapModule } from "./wrappers/wrap-module"

export default function findTestFramework(
    order?: TestFrameworkName[]
): TestEnv | null {
    const byTop = getGlobalTestFramework()
    if (byTop != false) {
        return wrapModule(globalThis, byTop)
    }
    order ??= []
    const unique = new Set(order)
    for (const name of ["ava", "mocha", "jest", "jasmine"] as const) {
        if (unique.has(name)) {
            continue
        }
        order.push(name)
    }
    const fws = order.map(name => {
        return wrapModule(frameworks[name], name)
    })
    return fws[0] ?? null
}
