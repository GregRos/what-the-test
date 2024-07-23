import type * as Jest from "@jest/globals"
import { TestFramework, type Suite, type Test } from "../interfaces/inspect"
import { formatTodoTitleAsSkip } from "../utils/format-todo-title"
export class JestGlobal extends TestFramework {
    readonly which = "jest"
    constructor(readonly _module: typeof Jest) {
        super(null)
    }

    _defineTest(test: Test) {
        const fixedFn = () => {
            test.fn?.(this._module.expect)
        }
        switch (test.mode) {
            case "pass":
                this._module.test(test.name, fixedFn)
                break
            case "todo":
                this._module.test.todo(test.name)
                break
            case "skip":
                this._module.test.skip(test.name, fixedFn)
                break
            default:
                throw new Error(`Unknown test mode: ${test}`)
        }
    }

    _defineSuite(suite: Suite) {
        const suiteFn = () => {
            suite.fn?.(suite)
        }
        switch (suite.mode) {
            case "pass":
                return this._module.describe(suite.name, suiteFn)
            case "todo":
                return this._module.describe.skip(
                    formatTodoTitleAsSkip(suite.name),
                    suiteFn
                )
            case "skip":
                return this._module.describe.skip(suite.name, suiteFn)
            default:
                throw new Error(`Unknown suite mode: ${suite}`)
        }
    }
}
