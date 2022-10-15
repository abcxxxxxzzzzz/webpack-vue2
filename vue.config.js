const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '301域名管理后台'
      return args
    })
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 更换ip
    host: '127.0.0.1',
 
    // 更换端口号
    port: 8000,
 
    // 代理访问
    proxy: {
      'api': {
        target: 'http://127.0.0.1/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})


