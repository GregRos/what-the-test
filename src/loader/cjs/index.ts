import tryRequire from "semver-try-require"

function getFrameworkModules<const Names extends string[]>(
    ...names: Names
): {
    [K in Names[number]]: object | false
} {
    const entries = []
    for (const name of names) {
        // @ts-expect-error package has broken types
        const fw = tryRequire(name)
        entries.push([name, fw])
    }
    return Object.fromEntries(entries) as any
}

export const frameworks = getFrameworkModules("ava", "mocha", "jest", "jasmine")
