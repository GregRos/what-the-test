import type * as Jest from "@jest/globals"
import { TestFramework, type Suite, type Test } from "../interfaces/inspect.js"
import { formatTodoTitleAsSkip } from "../utils/format-todo-title.js"
export class JestGlobal extends TestFramework {
    readonly which = "jest"
    constructor(readonly _module: typeof Jest) {
        super(null)
    }

    _defineTest = {
        pass: (test: Test) => {
            this._module.test(test.name, async () => {
                return test.fn?.(this._module.expect)
            })
        },
        skip: (test: Test) => {
            this._module.test.skip(test.name, async () => {
                return test.fn?.(this._module.expect)
            })
        },
        todo: (test: Test) => {
            return this._module.test.todo(test.name)
        }
    }

    _defineSuite = {
        pass: (suite: Suite) => {
            this._module.describe(suite.name, () => {
                suite.fn?.(suite)
            })
        },
        skip: (suite: Suite) => {
            this._module.describe.skip(suite.name, () => {
                suite.fn?.(suite)
            })
        },
        todo: (suite: Suite) => {
            this._module.describe.skip(
                formatTodoTitleAsSkip(suite.name),
                () => {}
            )
        }
    }
}
