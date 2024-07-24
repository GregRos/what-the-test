import { TestFramework, type Suite, type Test } from "../interfaces/inspect.js"
import { formatTodoTitleAsSkip } from "../utils/format-todo-title.js"
export class MochaGlobal extends TestFramework {
    readonly which = "jest"
    constructor(readonly _module: { test: any; describe: any }) {
        super(null)
    }

    _defineTest = {
        pass: (test: Test) => {
            this._module.test(test.name, async () => {
                return test.fn?.({} as any)
            })
        },
        skip: (test: Test) => {
            this._module.test.skip(test.name, async () => {
                return test.fn?.({} as any)
            })
        },
        todo: (test: Test) => {
            this._module.test.skip(
                formatTodoTitleAsSkip(test.name),
                async () => {
                    return test.fn?.({} as any)
                }
            )
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
