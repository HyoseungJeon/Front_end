const path = require('path');
module.exports = {
  devServer:{
      proxy:{
        '/api' :{
          target: 'http://3.34.106.255:3306',
          changeOrigin: true,
            pathRewrite: {
              '^/api': ''
          }
        },
      }
    },
    configureWebpack: {
      resolve: {
          alias: {
              '~': path.join(__dirname, '/src')
          }
      }
  }
}
