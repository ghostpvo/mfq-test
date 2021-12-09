require('dotenv').config()
const siteApiHost = process.env.SITE_API_HOST || 'https://api.manufaqtury.s3.obvu.ru'
console.log(process.env.SITE_API_HOST)
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  env: {
    SITE_API_HOST: siteApiHost
  },
  server: {
    host: '0.0.0.0' // default: localhost
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/Global/Preloader/Preloader.vue',
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/api.js',
    '~/plugins/handlers.js',
    { src: '~/plugins/client.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/axios'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/apollo',
    'nuxt-express-module',
    'vue-scrollto/nuxt'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: siteApiHost + '/graphql'
      }
    }
  },
  styleResources: {
    scss: [
      '@/assets/scss/config.scss'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
