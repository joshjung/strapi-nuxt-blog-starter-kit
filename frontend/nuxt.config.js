var envPath = require('find-config')('.env', { module: true });

require('dotenv').config({ path: envPath });

console.log('-----------------------------------------------------------------');
console.log(`Loading from ${envPath}:`)
console.log(` IMAGE_BASE_URI: ${process.env.IMAGE_BASE_URI}`)
console.log(` STRAPI_BASE_URL: ${process.env.STRAPI_BASE_URL}`)
console.log(` NOTE: STRAPI_BASE_URL will default to http://localhost:1337 if not specified.`)
console.log('-----------------------------------------------------------------');

module.exports = {
  mode: 'universal',
  env: {
    IMAGE_BASE_URI: process.env.IMAGE_BASE_URI || ''
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.BLOG_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'og:title', name: 'og:title', content: process.env.BLOG_TITLE },
      { hid: 'og:image', name: 'og:image', content: 'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg' },
      { hid: 'og:image', name: 'og:description', content: process.env.BLOG_DESCRIPTION },
      { hid: 'og:image', name: 'og:url', content: 'https://www.' + process.env.BLOG_DOMAIN },
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/prism.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-css.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-javascript.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-c.min.js'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-markup.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism.min.css'}
    ]
  },
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Staatliches' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'uikit/dist/css/uikit.min.css',
    '@assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/uikit.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  apollo: {  
    clientConfigs: {
      default: {
        // NOTE: STRAPI_BASE_URL comes from the docker build NOT from the .env file!!!
        httpEndpoint: process.env.STRAPI_BASE_URL ? process.env.STRAPI_BASE_URL + '/graphql' : "http://localhost:1337/graphql"
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config) {
      config.devtool = '#source-map'
    }
  },
  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    injected: true,
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     true,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       true,        // Convert '\n' in paragraphs into <br>
    linkify:      false,        // Autoconvert URL-like text to links
  
    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,
  
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
  }
}
