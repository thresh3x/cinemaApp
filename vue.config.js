const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置反向代理
  devServer: {
    proxy: {
      '/thresh': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/thresh': ''
        }
      }
    }
  }
})
