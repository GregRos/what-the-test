import type { TestFrameworkName } from "../loader/types"

declare const expect: any
declare const jasmine: any
declare const describe: any, it: any, xit: any, xdescribe: any
const isJest = () => {
    return (
        ![0, undefined].includes(process.env.JEST_WORKER_ID as any) ||
        (typeof expect !== "undefined" && "addSnapshotSerializer" in expect)
    )
}
const isAva = () => {
    return ![0, undefined].includes(process.env.AVA_PATH as any)
}

const isJasmine = () => {
    return typeof jasmine !== "undefined"
}

const isMocha = () => {
    return (
        typeof describe !== "undefined" &&
        typeof it !== "undefined" &&
        typeof xit !== "undefined" &&
        typeof xdescribe !== "undefined"
    )
}

export function getGlobalTestFramework(): TestFrameworkName | false {
    if (isJest()) {
        return "jest"
    }
    if (isAva()) {
        return "ava"
    }
    if (isJasmine()) {
        return "jasmine"
    }
    if (isMocha()) {
        return "mocha"
    }
    return false
}
