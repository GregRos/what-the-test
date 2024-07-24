import { TestFramework, type Suite, type Test } from "../interfaces/inspect"
import { formatTodoTitleAsSkip } from "../utils/format-todo-title"
export class JasmineGlobal extends TestFramework {
    readonly which = "jest"
    constructor(
        private readonly _module: {
            it: any
            xit: any
            describe: any
            expect: any
            xdescribe: any
        }
    ) {
        super(null)
    }

    _defineTest = {
        pass: (test: Test) => {
            return this._module.it(test.name, async () => {
                return test.fn?.(this._module.expect)
            })
        },
        skip: (test: Test) => {
            return this._module.xit(test.name, async () => {
                return test.fn?.(this._module.expect)
            })
        },
        todo: (test: Test) => {
            return this._module.xit(
                formatTodoTitleAsSkip(test.name),
                async () => {
                    return test.fn?.(this._module.expect)
                }
            )
        }
    }
    _defineSuite = {
        pass: (suite: Suite) => {
            return this._module.describe(suite.name, () => {
                return suite.fn?.(suite)
            })
        },
        skip: (suite: Suite) => {
            return this._module.xdescribe(suite.name, () => {
                return suite.fn?.(suite)
            })
        },
        todo: (suite: Suite) => {
            return this._module.xdescribe(
                formatTodoTitleAsSkip(suite.name),
                () => {
                    return suite.fn?.(suite)
                }
            )
        }
    }
}
