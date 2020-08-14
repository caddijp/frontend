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
