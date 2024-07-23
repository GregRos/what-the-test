import type { TestEnv } from "./interfaces/define.js"
import { frameworks } from "./loader/index.js"
import type { TestFrameworkName } from "./loader/types"
import { getGlobalTestFramework } from "./utils/get-global-framework.js"
import { wrapModule } from "./wrappers/wrap-module"
export type {
    EnvFn,
    EnvFnFn,
    Fixture,
    Suite,
    SuiteFnFn,
    Test,
    TestElement,
    TestEnv,
    TestFnFn
} from "./interfaces/define.js"
export type { TestFrameworkName }
const fwNames = ["ava", "mocha", "jest", "jasmine"] as const
export function findTestFramework(order?: TestFrameworkName[]): TestEnv | null {
    const byTop = getGlobalTestFramework()
    if (byTop != false) {
        return wrapModule(globalThis, byTop)
    }
    order ??= []
    const unique = new Set(order)
    for (const name of fwNames) {
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

export function getTestFramework(name: TestFrameworkName): TestEnv | null {
    if (!fwNames.includes(name)) {
        throw new Error(`Unknown test framework identifier '${name}'`)
    }
    return wrapModule(frameworks[name], name)
}
