module.exports = {
  extends: [
    'plugin:react/recommended',
    'prettier/react',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  globals: {
    process: 'readonly',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0, // for tests
    'react/display-name': 0, // for tests
    'react/prop-types': 0,
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx', '*.test.js', '*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
}
