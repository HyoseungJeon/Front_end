const path = require('path');
module.exports = {
  devServer:{
      proxy:{
        '/' :{
          target: 'https://8f4211e6-5c5d-480f-aa28-63ed7a4f405b.mock.pstmn.io',
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
