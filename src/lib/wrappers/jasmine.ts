import { TestFramework, type Suite, type Test } from "../interfaces/inspect"
import type { RegisterMode } from "../interfaces/type-strings"
import { formatTodoTitleAsSkip } from "../utils/format-todo-title"
export class JasmineGlobal extends TestFramework {
    readonly which = "jest"
    constructor(
        private readonly _module: {
            it: any
            xit: any
            describe: any
            expect: any
        }
    ) {
        super(null)
    }
    _defineTest(test: Test) {
        const fixedFn = () => {
            test.fn?.(this._module.expect)
        }
        switch (test.mode) {
            case "pass":
                this._module.it(test.name, fixedFn)
            case "todo":
                this._module.xit(formatTodoTitleAsSkip(test.name), fixedFn)
            case "skip":
                this._module.xit(test.name, fixedFn)

            default:
                throw new Error(`Unknown test mode: ${test}`)
        }
    }

    _defineSuite(suite: Suite, overrideMode?: RegisterMode) {
        this._module.describe(suite.name, () => {
            suite.fn?.(suite)
        })
    }
}
