import webpack from 'webpack';
import path from 'path';

// publicフォルダの絶対パスでoutput.pathを指定する
// webpack-dev-server使うためには、output.pathを絶対パスにする必要があるため
const outputPath = path.join(__dirname, './');

export default (env, args) => {
  const isProduction = args && args.mode === 'production';
  const devtool = !isProduction && 'inline-source-map';
  const sourceMap = !isProduction;
  const rules = [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  }, {
    test: /.scss?$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: '@import "styles/variables/_index.scss";',
          includePaths: [path.resolve(__dirname, 'src/')],
        },
      }],
    exclude: /node_modules/,
  }, {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { sourceMap },
      }],
  }, {
    test: /\.inline.svg$/,
    use: [
      'babel-loader',
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [{
              removeViewBox: false,
            }],
          },
        },
      },
    ],
    exclude: /node_modules/,
  }, {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
    use: [{
      loader: 'url-loader',
      options: { limit: 100000 },
    }],
    exclude: /\.inline.svg$/,
  }];

  if (!isProduction) {
    rules.push({
      enforce: 'pre',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: path.join(__dirname, 'src/.eslintrc.js'),
        },
      }],
    });
  }

  const plugins = [
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];

  return {
    devtool,
    entry: {
      'public/js/app': ['./src/entries/app.jsx'],
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        name: 'public/js/vendor',
        chunks: 'all',
      },
    },
    module: { rules },
    resolve: {
      modules: ['node_modules'],
      alias: {
        '~': path.join(__dirname, './src'),
        '@@': path.join(__dirname, './src'),
      },
      extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    plugins,
  };
};
