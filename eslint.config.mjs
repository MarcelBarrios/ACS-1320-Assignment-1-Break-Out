import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-var": "error", // Prefer let/const over var
      "prefer-const": "error", // Use const where possible
      "eqeqeq": ["error", "always"], // Enforce strict equality
      "no-unused-vars": ["error", { vars: "all", args: "none" }], // Warn about unused variables
      "no-console": "warn", // Warn on console usage
      "semi": ["error", "always"], // Enforce semicolons
    },
  },
];
