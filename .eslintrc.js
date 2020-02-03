module.exports = {
  plugins: ["@typescript-eslint", "jest", "promise", "unicorn"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "unicorn/prevent-abbreviations": "off",
  },
}
