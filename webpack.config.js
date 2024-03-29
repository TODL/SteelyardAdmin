// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin     = require('extract-text-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'Steelyard Admin',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};
var npmRoot = __dirname + '/node_modules';
var appDir = __dirname + '/src';
var cwd = process.cwd();
/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,
  // cache: false,
  recordsPath: path.resolve('.webpack.json'),

  // our angular app
  entry: { 'polyfills': './src/polyfills.ts', 'main': './src/main.ts' },

  // Config for our build files
  output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [path.resolve(cwd)],
    // ensure loader extensions match
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async') // ensure .async.ts etc also works
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ root('node_modules/rxjs') ]` fixed with rxjs 5 beta.2 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      // Support Angular 2 async routes via .async.ts
      { test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e|async)\.ts$/ ] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      // { test: /\.css$/,   loader: 'raw-loader' },
      { test: /^(?!.*\.min\.css$).*\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')},
      { test: /\.scss$/, loaders: ['style-loader',
        ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
        'sass-loader' +
        '?outputStyle=expanded&' +
        'root='+appDir+'&' +
        '&includePaths[]'+npmRoot + '&' +
        '&includePaths[]'+appDir
      ]},
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,    loader: 'file-loader?mimetype=application/font-woff&name=[path][name].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,         loader: 'file-loader?mimetype=application/x-font-ttf&name=[path][name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?\??$/,      loader: 'file-loader?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]' },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,         loader: 'file-loader?mimetype=application/font-otf&name=[path][name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,         loader: 'url-loader'   },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ root('src/index.html') ] }

      // if you add a loader include the resolve file extension above
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: 'polyfills', filename: 'polyfills.bundle.js', minChunks: Infinity }),
    new ExtractTextPlugin('styles.css'),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    })
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    contentBase: path.resolve(cwd, 'dist'),
    publicPath: '/'
  },
  // we need this due to problems with es6-shim
  node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
  args = args || [];
  if (!Array.isArray(args)) { args = [args] }
  return extensions.reduce(function(memo, val) {
    return memo.concat(val, args.map(function(prefix) {
      return prefix + val
    }));
  }, ['']);
}
function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}
