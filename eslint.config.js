import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["dist/", "node_modules/"],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2022,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        HTMLElement: "readonly",
        MouseEvent: "readonly",
        TouchEvent: "readonly",
      },
    },
    plugins: {
      vue,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs.recommended.rules,
    },
  },
];
