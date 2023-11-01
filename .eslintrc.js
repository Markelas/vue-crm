module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard",
    "plugin:vue/strongly-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: "latest"
  },
  plugins: [
    "prettier",
    "vue",
    "@typescript-eslint"
  ],
  rules: {
    "space-before-function-paren": ["error", "never"],
    "no-useless-constructor": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-var-requires": "off",
    indent: [
      "error",
      2
    ],
    "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
    "linebreak-style": ["off"],
    quotes: [
      "error",
      "double"
    ],
    semi: [
      "error",
      "always"
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: 1
      }
    ],
    "vue/first-attribute-linebreak": ["error", {
      singleline: "beside",
      multiline: "below"
    }],
    "vue/component-tags-order": ["error", {
      order: ["template", "script", "style"]
    }],
    "vue/no-use-v-if-with-v-for": ["error", {
      allowUsingIterationVar: false
    }],
    "vue/order-in-components": ["error", {
      order: [
        "el",
        "name",
        "key",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        ["provide", "inject"],
        "ROUTER_GUARDS",
        "layout",
        "middleware",
        "validate",
        "scrollToTop",
        "transition",
        "loading",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "emits",
        "setup",
        "asyncData",
        "data",
        "fetch",
        "head",
        "computed",
        "watch",
        "watchQuery",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }]
  }
}

// parser: "vue-eslint-parser",
//   parserOptions: {
//   parser: "@typescript-eslint/parser",
//     sourceType: "module",
//     ecmaVersion: 'latest',
// },
