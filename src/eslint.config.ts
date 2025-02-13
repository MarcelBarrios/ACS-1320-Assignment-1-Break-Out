import globals from "globals";

export default {
  languageOptions: {
    globals: globals.browser,
  },
  rules: {
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "no-unused-vars": ["error", { vars: "all", args: "none" }],
    "no-console": "warn",
    "semi": ["error", "always"],
  },
};
