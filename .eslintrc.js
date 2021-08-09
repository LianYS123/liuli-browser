module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["react-app"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    global: {
      React: "React"
    }
  },
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": 0,
    "no-console": "warn"
  },
};
