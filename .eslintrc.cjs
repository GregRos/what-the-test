module.exports = {
    root: true,
    extends: ["@gregros/eslint-config"],
    parserOptions: {
        project: [
            "src/lib/tsconfig.esm.json",
            "src/test/tsconfig.json",
            "src/loader/tsconfig.esm.json",
            "src/loader/tsconfig.cjs.json",
        ],
        sourceType: "module",
    }
};
