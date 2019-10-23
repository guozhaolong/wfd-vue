const merge = require('webpack-merge');
module.exports = {
  // publicPath:'/wfd-vue/',
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: config => {
    config.output = merge(config.output,{
      libraryExport: 'default'
    });
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => {
        return merge(options, {
          limit: 10000
        })
      })
  },
  css: { extract: false },
  devServer:{
    port: 8000,
    hot: true,
    open: 'Google Chrome'
  }
};
