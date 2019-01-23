const pkg = require('./package')
const webpack = require('webpack')
let NODE_BASEURL = 'http://192.168.9.232', NODE_IMGSERVERURL = 'http://192.168.9.236:8999/', NODE_WEBSOCKETURL = 'ws://192.168.9.232:8082', NODE_WEBSOCKETHTTPURL = 'http://192.168.9.232:8082';
// const HappyPack = require('happypack')
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/buybit.ico' },
    ],
    // script: 
    //   { src: 'https://s13.cnzz.com/z_stat.php?id=1273759983&web_id=1273759983' }
    // ],
  },

  env: {
    baseUrl: NODE_BASEURL,// api接口ip地址
    imgServerUrl: NODE_IMGSERVERURL,// 图片的服务器地址 正式线上图片地址image.buybit.com
    webSocketUrl: NODE_WEBSOCKETURL,// socket ws接口ip地址
    webSocketHttpUrl: NODE_WEBSOCKETHTTPURL,// socket api接口ip地址
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#52a860',
    height: '3px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/bubble.css',
    '~assets/css/core.css',
    '~assets/css/snow.css',
    '~assets/css/main.css',
    '~assets/css/media.css',
    '~assets/icon/iconfont.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  router: {
    middleware: ['i18n']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/localStorage', ssr: false },
    { src: '~plugins/axios', ssr: false },
    { src: '~plugins/authentication', ssr: false },
    { src: '~plugins/websocket', ssr: false },
    { src: '~plugins/VueClipboard', ssr: false },
    '~plugins/i18n.js',
    '~plugins/filters.js',
    '~plugins/numeral',
    '~plugins/commonFn',
    '~plugins/Bus',
    '~plugins/GlobalComponents'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    // your settings here
    scss: [
      './assets/css/mixins.scss',
    ],
    stylus: [
      './assets/css/main.css',
    ]
  },

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    // vendor: ['axios', 'element-ui'],
    /*
    ** You can extend webpack config here
    */
    // plugins: [
    //   /*
    //   ** Webpack 优化
    //   */
    //   // 限制最小的分块大小
    //   new webpack.optimize.MinChunkSizePlugin({minChunkSize: 15000}),
    //   new HappyPack({
    //     //用id来标识 happypack处理那里类文件
    //     id: 'happyBabel',
    //     //如何处理  用法和loader 的配置一样
    //     loaders: [{
    //       loader: 'babel-loader?cacheDirectory=true',
    //     },{
    //       loader: 'vue-loader?cacheDirectory=true',
    //     },{
    //       loader: 'vue-style-loader?cacheDirectory=true',
    //     },{
    //       loader: 'postcss-loader?cacheDirectory=true',
    //     },{
    //       loader: 'sass-loader?cacheDirectory=true',
    //     },{
    //       loader: 'style-resources-loader?cacheDirectory=true',
    //     },{
    //       loader: 'url-loader?cacheDirectory=true',
    //     }],
    //     //共享进程池
    //     threadPool: happyThreadPool,
    //     //允许 HappyPack 输出日志
    //     verbose: true,
    //   })
    // ],
    extractCSS: true,
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000, // 10KO
          name: 'img/[name].[hash].[ext]'
        }
      }
    ],
  }
}
