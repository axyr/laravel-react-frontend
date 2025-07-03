module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
        ecmaVersion: "2020",
    },
    ignorePatterns: ["dist/*", "node_modules/*"],
    plugins: ["@typescript-eslint", "import"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended"
    ],
    rules: {
        "import/no-unused-modules": "off",
    },
};