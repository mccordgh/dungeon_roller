const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.npm_lifecycle_event === 'build';

let htmlConfig = {
  filename: 'index.html',
  template: 'index.html'
};

if (isProduction) {
  htmlConfig.inlineSource = '.(js)$'
}

let config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'script.js'
  },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
  plugins: [
    new HtmlWebpackPlugin(htmlConfig),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new CopyWebpackPlugin({
        patterns: [
            { from: 'src/resources/*', to: '' },
            { from: 'src/resources/champs/*', to: '' },
            { from: 'src/resources/enemies/*', to: '' },
            { from: 'src/resources/items/*', to: '' },
            { from: 'src/music/**', to: '' },
            // { from: 'src/sfx/*', to: '' },
        ],
    }),
  ],
};

// if(!isProduction) {
//   config.devtool = 'eval-source-map'
// } else {
//   config.plugins = config.plugins.concat([
// 		new CompressionPlugin({
// 			asset: "[path].gz[query]",
// 			algorithm: "gzip",
// 			test: /\.js$|\.html$/,
// 			threshold: 10240,
// 			minRatio: 0.8
// 		})
//   ])
// }

module.exports = config;
