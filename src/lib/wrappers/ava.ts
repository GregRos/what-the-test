import { Suite, TestFramework, type Test } from "../interfaces/inspect.js"
export class AvaGlobal extends TestFramework {
    readonly which = "jest"
    constructor(
        readonly _module: {
            default: any
        }
    ) {
        super(null)
    }

    private _prepareTest(test: Test) {
        const overrideMode = [...test.ancestors()]
            .map(x => (x instanceof Suite ? x.mode : "pass"))
            .reverse()
            .find(x => x !== "pass")
        test.mode = overrideMode ?? test.mode
        const titlePrefix = [...test.ancestors()]
            .filter(x => x instanceof Suite)
            .map(x => x.name)
        const title = [...titlePrefix, test.name].join(" > ")
        test.name = title
    }

    _defineTest = {
        pass: (test: Test) => {
            this._prepareTest(test)
            this._module.default(test.name, async (t: any) => {
                const p = test.fn?.(t)
                if (p instanceof Promise) {
                    return p.then(() => t.pass())
                } else {
                    t.pass()
                }
            })
        },
        skip: (test: Test) => {
            this._prepareTest(test)
            this._module.default.skip(test.name, async (t: any) => {
                const p = test.fn?.(t)
                if (p instanceof Promise) {
                    return p.then(() => t.pass())
                } else {
                    t.pass()
                }
            })
        },
        todo: (test: Test) => {
            this._prepareTest(test)
            this._module.default.todo(test.name)
        }
    }

    _defineSuite = {
        pass(suite: Suite) {
            suite.fn?.(suite)
        },
        skip(suite: Suite) {
            suite.fn?.(suite)
        },
        todo(suite: Suite) {
            suite.fn?.(suite)
        }
    }
}
