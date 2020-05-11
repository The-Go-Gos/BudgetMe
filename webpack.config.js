const isDev = process.env.NODE_ENV === 'development'
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // Other plugins...

    // new WorkboxPlugin.GenerateSW({
    //   swDest: '../public/sw.js',
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: '../public/sw.js',
      swDest: 'serviceWorker.js'
    })
  ]
}
