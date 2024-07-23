import path from "path";

/** @type {import("jest").Config} */
const config = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["dist"],
    transform: {
        "^.+\\.tsx?$": ["@swc/jest"]
    },
    rootDir: ".",
    testMatch: ["<rootDir>/src/test/**/*.test.ts"],
    // Should be set via --coverage option
    collectCoverage: false,
    collectCoverageFrom: ["<rootDir>/src/lib/**/*.ts"],
    coverageDirectory: "<rootDir>/coverage",
    moduleNameMapper: {
        "^@lib/(.*)$": "<rootDir>/dist/cjs/$1",
        "^@lib$": "<rootDir>/dist/cjs"
    },

    globals: {
        defaults: {}
    }
};

export default config;
