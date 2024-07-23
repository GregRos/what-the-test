import type { TestFrameworkName } from "../loader/types"
import { AvaGlobal } from "./ava"
import { JasmineGlobal } from "./jasmine"
import { JestGlobal } from "./jest"
import { MochaGlobal } from "./mocha"
export function wrapModule(module: any, wrapper: TestFrameworkName) {
    switch (wrapper) {
        case "ava":
            return new AvaGlobal(module)
        case "mocha":
            return new MochaGlobal(module)
        case "jest":
            return new JestGlobal(module)
        case "jasmine":
            return new JasmineGlobal(module)
        default:
            throw new Error(`Unknown test framework: ${wrapper}`)
    }
}
