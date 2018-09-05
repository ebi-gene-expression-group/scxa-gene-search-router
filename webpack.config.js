const CleanWebpackPlugin = require(`clean-webpack-plugin`)

module.exports = {

  entry: {
    myComponent: [`babel-polyfill`, `whatwg-fetch`, `./html/render.js`]
  },

  plugins: [
    new CleanWebpackPlugin([`dist`])
  ],

  output: {
    library: `[name]`,
    filename: `[name].bundle.js`
  },

  optimization: {
    splitChunks: {
      chunks: `all`,
      minSize: 1,
      cacheGroups: {
        facetedSearch: {
          test: /[\\/]src[\\/]/,
          name: `myComponent`,
          priority: -20
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendors`,
          priority: -10
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\//,
        use: `babel-loader`
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
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
