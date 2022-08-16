<template>
  <div>
    <a class="nhsuk-skip-link" href="#maincontent">Skip to main content</a>
    <LtlcHeader />
    <div class="nhsuk-width-container">
      <main id="maincontent" class="nhsuk-main-wrapper" role="main">
        <Nuxt />
      </main>
    </div>
    <LtlcFooter />
  </div>
</template>

<script>
import LtlcHeader from '~/components/LtlcHeader.vue'
import LtlcFooter from '~/components/LtlcFooter.vue'

export default {
  components: {
    LtlcHeader,
    LtlcFooter,
  },
  head: {
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
      {
        type: 'text/javascript',
        innerHTML: "document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');"
      }
    ],
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/skip-link/skip-link';

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
