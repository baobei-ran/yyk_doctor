const debug = process.env.NODE_ENV !== 'production'

module.exports = { 
  publicPath: '/', 
  outputDir: "dist", 
  assetsDir: "assets", 
  lintOnSave: false, 
  runtimeCompiler: true, 
  transpileDependencies: [], 
  productionSourceMap: false, 
  configureWebpack: config => { 
    if (debug){ // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map';
    } else {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: config =>{
    // config.entry('main').add('babel-polyfill') // main是入口js文件
    if (!debug) {
      config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
      // 用cdn方式引入
      config.externals({
        'vue': 'Vue',
        'vue-router': 'VueRouter',
      })
    }
  },
  parallel: require("os").cpus().length > 1,
  pluginOptions: { // 第三方插件配置
  },
  pwa:{ // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: false,
    port: 8081,
    https: false,
    hotOnly: false,
    proxy:{ 
      "/api": { 
        target: "http://test99.yunyikang.cn",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: app => {}
  }
}