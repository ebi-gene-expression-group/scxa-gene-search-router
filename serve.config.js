const path = require(`path`)

const history = require('connect-history-api-fallback');
const convert = require('koa-connect');


module.exports = require(`./webpack.config.js`)
module.exports.mode = `development`
module.exports.devtool = `source-map`
// Must match module.exports.serve.dev.publicPath or bad things may happen
module.exports.output.publicPath = `/dist/`

module.exports.serve = {
  content: path.resolve(__dirname, `html`),
  devMiddleware: {
    publicPath: `/dist/`
  },
  // Make route request back to local port
  add: (app, middleware, options) => {
	app.use(convert(history()));
  },

  port: 9000
}
