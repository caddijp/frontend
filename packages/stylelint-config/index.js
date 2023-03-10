module.exports = {
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
    'stylelint-config-styled-components',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'value-keyword-case': null,
    'prettier/prettier': true,
    'no-descending-specificity': null,
  },
  customSyntax: '@stylelint/postcss-css-in-js',
};
