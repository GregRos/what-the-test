import type { TestFrameworkName } from "../loader/types.js"
import { AvaGlobal } from "./ava.js"
import { JasmineGlobal } from "./jasmine.js"
import { JestGlobal } from "./jest.js"
import { MochaGlobal } from "./mocha.js"
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
