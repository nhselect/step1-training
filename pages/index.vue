<template>
  <div>
    <h1>
      Digitised proficiencies
      <span class="nhsuk-caption-xl"> Training packages </span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-l">
        {{ homePage.title }}
      </p>
      <NuxtContent :document="homePage" />
    </div>
    <ul class="nhsuk-grid-row nhsuk-card-group">
      <li
        v-for="role in roles"
        :key="role.title"
        class="nhsuk-grid-column-one-third nhsuk-card-group__item"
      >
        <ElectCard clickable="true" :url="role.path" :title="role.title">
        </ElectCard>
      </li>
    </ul>
  </div>
</template>

<script>
import ElectCard from '../components/ElectCard.vue'

export default {
  components: {
    ElectCard,
  },
  async asyncData({ $content, params, error }) {
    const roles = await $content('roles')
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const homePage = await $content('home').fetch()

    return {
      roles,
      homePage,
    }
  },
  head: {
    title: 'Digitised proficiencies user guides',
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
    ],
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/skip-link/skip-link';
@import 'node_modules/nhsuk-frontend/packages/components/care-card/care-card';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/images/images';
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/inset-text/inset-text';
</style>
