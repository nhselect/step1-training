export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/node_modules/nhsuk-frontend/dist/nhsuk.min.js', mode: 'client' },
    { src: '~/plugins/posthog', mode: 'client' },
  ],

  router: {
    prefetchLinks: false,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: [
      '~assets/scss/_variables.scss',
      'nhsuk-frontend/packages/core/all.scss',
      '~assets/scss/style.scss',
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    // 'nuxt-buefy',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
    fullTextSearchFields: ['title'],
  },

  generate: {
    routes: ['user-guide/non-clinical-centre-managers'],
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const folders = document.dir.split('/').filter((i) => i !== '')
        document.folders = folders
        document.pid = folders[folders.length - 2]
        document.id = folders[folders.length - 1]
      }
    },
  },

  privateRuntimeConfig: {
    posthogApiKey: process.env.POSTHOG_API_KEY,
    posthogProjectId: process.env.POSTHOG_PROJECT_ID,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
}
