const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3006',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? './' : './'
// }
