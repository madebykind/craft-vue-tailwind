const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@vue/airbnb", "plugin:vue/recommended", "plugin:prettier/recommended", "prettier/vue"],
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": 2,
    "no-console": isProduction ? 2 : 0,
    "no-debugger": isProduction ? 2 : 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
