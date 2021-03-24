const path = require('path');
module.exports = {
  devServer:{
      proxy:{
        '/api' :{
          target: 'http://192.168.0.215:8080/',
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
