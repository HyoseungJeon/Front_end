const path = require('path');
module.exports = {
  devServer:{
      proxy:{
        '/' :{
          target: 'http://192.168.0.215:8080/',
          ws: true,
          changeOrigin: true,
          "secure": false
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
