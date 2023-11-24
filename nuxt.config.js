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
    '@aceforth/nuxt-netlify',
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
    {
      src: '@nuxtjs/lunr-module',
      // These are the default options:
      options: {
        css: false,
        defaultLanguage: 'en',
        languages: false,
        path: 'search-index',
        ref: 'id',
        fields: [
          'title',
          'text',
          'tags',
          'role'
        ]
      }
    }
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false,
    fullTextSearchFields: ['title'],
  },

  generate: {
    routes: [
      '/non-clinical-centre-managers/user-guide',
    ],
  },

  netlify: {
    redirects: [
      { from: '/user-guide/:role', to: '/steps/:role/user-guide' },
      { from: '/user-guide/:role/*', to: '/steps/:role/user-guide/:splat' },
      { from: '/feedback/:role', to: '/steps/:role/feedback' },
      { from: '/process/:role', to: '/steps/:role/process' },
      { from: '/roles-and-responsibilities/:role', to: '/steps/:role/roles-and-responsibilities'},
      { from: '/roles/:role', to: '/steps/:role' },
      { from: '/non-clinical-centre-managers', to: '/steps/non-clinical-centre-managers/user-guide' },
      { from: '/:role', to: '/steps/:role' }
    ]
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const folders = document.dir.split('/').filter((i) => i !== '')
        document.folders = folders
        document.pid = folders[folders.length - 2]
        document.id = folders[folders.length - 1]

        if (document.folders[0] === 'user-guide') {
          document.role = document.folders[1]
        }
      }
    },
    async ready(nuxt) {
      const { $content } = require('@nuxt/content')
      const articles = await $content('/user-guide',{deep:true,text:true})
        .where({
          $and: [{
            role: {
              $ne: ''
            }
          },
          {
            text: {
              $len: {
                $gt: 1
              }
            }
          },
          {
            hideSearch: {
              $ne: true
            }
          }
        ]
        })
        .only([
          'title',
          'text',
          'tags',
          'dir',
          'role'
        ])
        .fetch()

      const roles = [...new Set(articles.map(a=>a.role))]

      const documentIndexes = articles.map((a,index)=>{
        return {
          document: {
            id: index + 1,
            title: a.title,
            text: a.text,
            tags: a.tags,
            role: a.role,
          },
          meta: {
            title: a.title,
            href: a.dir,
            role: a.role
          }
        }
      })

      documentIndexes.forEach((d) => {
        nuxt.callHook('lunr:document',{
          document: d.document,
          meta: d.meta
        })
      })

    }
  },

  privateRuntimeConfig: {
    posthogApiKey: process.env.POSTHOG_API_KEY,
    posthogProjectId: process.env.POSTHOG_PROJECT_ID,
  },

  vue: {
    config: {
      compilerOptions: {
        
      }
    }
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
