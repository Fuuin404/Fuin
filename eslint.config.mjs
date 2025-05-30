import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import next from "@next/eslint-plugin-next";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [".next/**", "node_modules/**", "dist/**", "build/**"],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        _N_E: "readonly",
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@next/next": next,
      "@typescript-eslint": ts,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      ...ts.configs["recommended"].rules,
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-undef": "off",
      "no-empty": "warn",
      "no-redeclare": "warn",
      "no-useless-escape": "warn",
      "no-cond-assign": "warn",
    },
    settings: {
      react: { version: "detect" },
      next: { rootDir: process.cwd() },
    },
  },
  {
    files: ["app/**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
];
