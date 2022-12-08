import posthogJs from 'posthog-js'
import { nextTick } from 'vue'

export default function ({ app: { router } }, inject) {
  // Init PostHog
  const posthog_api_key = process.env.POSTHOG_API_KEY
  posthogJs.init(posthog_api_key, {
    api_host: 'https://eu.posthog.com',
    autocapture: false,
    capture_pageview: false,
    persistence: 'memory',
    // loaded: () => posthog.identify('unique_id') // If you can already identify your user
  })

  // Inject PostHog into the application and make it available via this.$posthog (or app.$posthog)
  inject('posthog', posthogJs)

  // Make sure that pageviews are captured with each route change
  router.afterEach((to) => {
    nextTick(() => {
      /* Note: this might also be a good place to call posthog.register(...) in order to update your properties
      on each page view
      */
      posthogJs.capture('$pageview', {
        $current_url: to.fullPath,
      })
    })
  })
}
