module.exports = (api) => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '74',
          safari: '10',
          ios: '10',
        },
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: !api.env('production'),
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-function-bind',
  ];

  return {
    presets,
    plugins,
  };
};
