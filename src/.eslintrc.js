module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.babel.js',
      },
    },
    react: {
      pragma: 'React',
      version: '16.6',
    },
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/',
          '**/*.stories.jsx',
        ],
      },
    ],
  },
};
