import {
    Fixture as FixtureInterface,
    Suite as SuiteInterface,
    Test as TestInterface
} from "./define"
import type { RegisterMode } from "./type-strings"
export type TestFn = (expect: any) => void | Promise<void>
export class Test implements TestInterface {
    readonly type = "test" as const;
    *ancestors() {
        let parent: Fixture = this.parent
        while (parent && parent !== this.root) {
            yield parent
            parent = parent.parent
        }
    }
    get root() {
        return this.parent.root
    }
    constructor(
        readonly parent: Fixture,
        public name: string,
        public mode: RegisterMode,
        readonly fn?: (expect: any) => void | Promise<void>
    ) {}
}

abstract class FixtureBase implements FixtureInterface {
    readonly parent: Fixture
    constructor(parent: Fixture | null) {
        this.parent = parent ?? (this as any)
    }

    get root() {
        let parent = this.parent
        while (parent.type !== "global") {
            parent = parent.parent
        }
        return parent as TestFramework
    }
    test = Object.assign(
        (name: string, fn: TestFn) => {
            return this.root._defineTest(
                new Test(this as any, name, "pass", fn)
            )
        },
        {
            skip: (name: string, fn: TestFn) => {
                return this.root._defineTest(
                    new Test(this as any, name, "skip", fn)
                )
            },
            todo: (name: string, fn: TestFn) => {
                return this.root._defineTest(
                    new Test(this as any, name, "todo", fn)
                )
            }
        }
    )

    describe = Object.assign(
        (name: string, fn: SuiteFn) => {
            return this.root._defineSuite(
                new Suite(this as any, name, "pass", fn)
            )
        },
        {
            skip: (name: string, fn: SuiteFn) => {
                return this.root._defineSuite(
                    new Suite(this as any, name, "skip", fn)
                )
            },
            todo: (name: string, fn: SuiteFn) => {
                return this.root._defineSuite(
                    new Suite(this as any, name, "todo", fn)
                )
            }
        }
    )
}
export type SuiteFn = (suite: FixtureInterface) => void
export class Suite extends FixtureBase implements SuiteInterface {
    readonly type = "suite" as const

    constructor(
        readonly parent: Fixture,
        readonly name: string,
        public mode: RegisterMode,
        readonly fn?: SuiteFn
    ) {
        super(parent.root)
    }
}

export abstract class TestFramework extends FixtureBase {
    readonly type = "global" as const

    abstract _defineSuite(suite: Suite): void
    abstract _defineTest(test: Test): void
}

export type Fixture = Suite | TestFramework
