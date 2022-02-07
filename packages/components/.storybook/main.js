const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.tsx'],
  // https://github.com/storybookjs/storybook/issues/11146#issuecomment-645341199
  typescript: {
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
    },
  },
  // https://storybook.js.org/docs/react/configure/webpack#extending-storybooks-webpack-config
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
