module.exports = {
  extends: [
    'prettier',
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
    '@typescript-eslint/array-type': ['warn', { default: 'array' }], // Array<T> => T[], ReadonlyArray<T> => readonly T[]
    'react/self-closing-comp': ['warn', { component: true, html: true }], // <div></div> => <div />
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
