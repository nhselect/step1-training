<template>
  <div class="nhsuk-u-reading-width">
    <BackLink :backUrl="`/${framework}/${role}`">
      Back to training materials
    </BackLink>
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
  async asyncData({ $content, params, error }) {
    const slug = params.slug
    const role = params.role
    const framework = params.framework || 'steps'
    const page = await $content('articles/' + slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    return {
      slug,
      page,
      role,
      framework
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
</style>
