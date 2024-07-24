import path from "path";

/** @type {import("jest").Config} */
const config = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["dist"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest",
            {
                tsconfig: "<rootDir>/src/test/tsconfig.json",
                transpileOnly: true
            }]
    },
    extensionsToTreatAsEsm: [".ts"],

    rootDir: ".",
    testMatch: ["<rootDir>/src/test/**/*.test.ts"],
    // Should be set via --coverage option
    collectCoverage: false,
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coverageDirectory: "<rootDir>/coverage",
    moduleNameMapper: {
        "^@lib/(.*)$": "<rootDir>/dist/esm/$1"
    }
};

export default config;
