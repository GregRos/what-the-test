// @ts-expect-error - package has bad type definitions
import tryImport from "semver-try-require"

async function getFrameworkModules<const Names extends string[]>(
    ...names: Names
): Promise<{
    [K in Names[number]]: object | false
}> {
    const entries = []
    for (const name of names) {
        const fw = await tryImport(name)
        entries.push([name, fw])
    }
    return Object.fromEntries(entries) as any
}

export const frameworks = await getFrameworkModules(
    "ava",
    "mocha",
    "jest",
    "jasmine"
)
