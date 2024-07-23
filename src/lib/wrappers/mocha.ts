import { TestFramework, type Suite, type Test } from "../interfaces/inspect"
import { formatTodoTitleAsSkip } from "../utils/format-todo-title"
export class MochaGlobal extends TestFramework {
    readonly which = "jest"
    constructor(readonly _module: { test: any; describe: any }) {
        super(null)
    }

    _defineTest(test: Test) {
        const fixedFn = () => {
            test.fn?.({} as any)
        }
        switch (test.mode) {
            case "pass":
                this._module.test(test.name, fixedFn)
            case "todo":
                this._module.test.skip(
                    formatTodoTitleAsSkip(test.name),
                    fixedFn
                )
            case "skip":
                this._module.test.skip(test.name, fixedFn)
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
                    `TODO: ${suite.name}`,
                    suiteFn
                )
            case "skip":
                return this._module.describe.skip(suite.name, suiteFn)
            default:
                throw new Error(`Unknown suite mode: ${suite}`)
        }
    }
}
