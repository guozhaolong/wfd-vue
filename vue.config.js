const merge = require('webpack-merge');
module.exports = {
  // publicPath:'/wfd-vue/',
  productionSourceMap: false,
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') {
      config.externals = {
        "@antv/g6/src": {
          commonjs: "@antv/g6/src",
          commonjs2: "@antv/g6/src",
          amd: "@antv/g6/src",
          root: "antvG6"
        },
        "@antv/g6/src/util": {
          commonjs: "@antv/g6/src/util",
          commonjs2: "@antv/g6/src/util",
          amd: "@antv/g6/src/util",
          root: "Util"
        },
        "@antv/g6/src/shape/single-shape-mixin": {
          commonjs: "@antv/g6/src/shape/single-shape-mixin",
          commonjs2: "@antv/g6/src/shape/single-shape-mixin",
          amd: "@antv/g6/src/shape/single-shape-mixin",
          root: "SingleShapeMixin"
        },
        "@antv/g6/src/item/item": {
          commonjs: "@antv/g6/src/item/item",
          commonjs2: "@antv/g6/src/item/item",
          amd: "@antv/g6/src/item/item",
          root: "Item"
        },
        "lodash": {
          commonjs: "lodash",
          commonjs2: "lodash",
          amd: "lodash",
          root: "_"
        },
      };
    }
    config.output = merge(config.output,{
      libraryExport: 'default'
    });
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return merge(options, {
          limit: 10000 // default 10k
        })
      })
      .end();
  },
  css: { extract: false },
  devServer:{
    port: 8000,
    hot: true,
    open: 'Google Chrome'
  }
};
