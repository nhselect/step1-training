<template>
  <div class="nhsuk-u-reading-width">
    <BackLink v-if="backPath" :backUrl="backPath">Back to training materials</BackLink>
    <h1>{{ page.title }}</h1>
    <p class="nhsuk-body-s nhsuk-u-secondary-text-color">
      Last changed: {{ page.updatedAt | formatDate }}
    </p>
    <nuxt-content :document="page" />
    <BackLink v-if="backPath" :backUrl="backPath">Back to training materials</BackLink>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(dateStr)),
  },
  async asyncData({ from, $content, params, error }) {
    const slug = params.slug || 'index'
    const page = await $content('articles/' + slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const backPath = from ? from.path : null

    return {
      slug,
      page,
      backPath
    }
  },
  head() {
    return {
      title: 'Digitised proficiencies user guide for ' + this.page.title + 's',
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
</style>
