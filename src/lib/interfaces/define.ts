import type { TestFrameworkName } from "../loader/types"
import type { SuiteFn, TestFn } from "./inspect"

export interface TestFnFn {
    (name: string, fn: TestFn): void
    skip(name: string, fn: TestFn): void
    todo(name: string, fn: TestFn): void
}

export interface SuiteFnFn {
    (name: string, fn: SuiteFn): void
    skip(name: string, fn: SuiteFn): void
    todo(name: string, fn: SuiteFn): void
}

export interface Fixture {
    test: TestFnFn

    describe: SuiteFnFn
}
export interface TestElement {}
export interface Test extends TestElement {}
export interface Suite extends Fixture {}

export interface TestEnv extends Fixture {
    readonly which: TestFrameworkName
}

export type EnvFn = (env: TestEnv) => void

export type EnvFnFn = (envFn: (env: TestEnv | null) => void) => void
