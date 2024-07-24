import type * as Ava from "ava"

import { Suite, TestFramework, type Test } from "../interfaces/inspect"
export class AvaGlobal extends TestFramework {
    readonly which = "jest"
    constructor(readonly _module: typeof Ava) {
        super(null)
    }

    _defineTest(test: Test) {
        const fixedFn = (t: any) => {
            test.fn?.(t)
            t.pass()
        }
        const overrideMode = [...test.ancestors()]
            .map(x => (x instanceof Suite ? x.mode : "pass"))
            .reverse()
            .find(x => x !== "pass")
        const mode = overrideMode ?? test.mode
        switch (mode) {
            case "pass":
                this._module.default(test.name, fixedFn)
            case "todo":
                this._module.default.todo(test.name)
            case "skip":
                this._module.default.skip(test.name, fixedFn)

            default:
                throw new Error(`Unknown test mode: ${test}`)
        }
    }

    _defineSuite(suite: Suite) {
        suite.fn?.(suite)
    }
}
