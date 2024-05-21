const path = require('path');
var webpack = require('webpack')
const BabelEnginePlugin = require('babel-engine-plugin');

module.exports = (env, argv) => ({
  entry: ['@babel/polyfill', './frontend/index.js'],
  output: {
    path: path.resolve('.'),
    filename: 'static/frontend.js'
  },
  devtool: (argv.mode === 'production' ? '' : 'source-map'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
             loader: 'babel-loader'
          },
          {
             loader: 'eslint-loader',
             options: {
               configFile: path.resolve(__dirname, '.eslintrc')
             }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: (argv.mode !== 'production')
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: 'static/fonts/[name].[ext]',
            }
          },
        ]
    },
      {
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true // true outputs JSX tags
          }
        }
      ]
   }
]
},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'HTTPSDK_PORT': JSON.stringify(process.env.HTTPSDK_PORT === undefined ? 8080 : process.env.HTTPSDK_PORT)
      }
    }),
    new BabelEnginePlugin({
      presets: ['env']
    })
  ],
  resolve: {
    alias: {
      '~fonts': path.resolve(__dirname, 'static/fonts')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, ''),
    overlay: true,
    historyApiFallback: true
  },
  stats: {
    all: false,
    context: '/frontend/src/',
    errors: true,
    errorDetails: true,
    hash: true,
    warnings: true,
    warningsFilter: ["doesn't specify the targeted Node.js version in its package.json `engines` field"]
  }

});
