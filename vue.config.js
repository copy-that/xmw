module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    // proxy: 'http://192.168.1.114:8825',
    // proxy: 'http://192.168.1.121:8825',
    proxy: 'http://47.105.104.41:8825'
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
