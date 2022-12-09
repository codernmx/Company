module.exports = {
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    port: 9000,
    proxy: {
      '/zcbg/': {
        target: 'https://test.mayixinke.com/zcbg',   //测试环境,
        // target: 'https://cssc.mayixinke.com/zcbgzs',  // 正式环境
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/zcbg/': ''
        }
      },
    },

  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = '官网';
        return args;
      })
  }
}
