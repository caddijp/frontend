module.exports = {
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'no-var': 2,
    'prefer-const': 2,
    'prefer-destructuring': 1,
    'no-console': 1,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    process: 'readonly',
  },
  env: {
    es6: true,
    commonjs: true,
  },
};
