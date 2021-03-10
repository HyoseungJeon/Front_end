const path = require('path');
module.exports = {
  devServer:{
      proxy:{
        '/' :{
          target: 'https://localhost:8080/',
          ws: true,
          changeOrigin: true
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
