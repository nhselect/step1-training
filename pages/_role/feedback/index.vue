<template>
  <div>
    <BackLink :backUrl="`/${role.slug}`">
      Back to training materials
    </BackLink>
    <h1>
      Feedback required
      <span class="nhsuk-caption-xl">{{ role.title }}</span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-s nhsuk-u-secondary-text-color">
        Last changed: {{ page.updatedAt | formatDate }}
      </p>
      <nuxt-content :document="page" />
    </div>
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
  scrollToTop: true,
  async asyncData({ $content, params, error }) {
    // fetch role info content
    const role = await $content('roles/' + params.role)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    // fetch current page content
    const page = await $content('feedback/feedback')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    return {
      role,
      page
    }
  },
  head() {
    return {
      title:
        'Digitised proficiencies - Feedback required',
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';

.user-guide__contents {
  border-right: 1px solid $color_nhsuk-grey-4;
}

.nuxt-content {
  img {
    outline: 2px solid $color_nhsuk-blue;
    outline-offset: -2px;
    max-width: 100%;
  }

  blockquote {
    border: 4px solid $color_nhsuk-pink;
    @include nhsuk-responsive-margin(4, 'bottom');
    @include nhsuk-responsive-padding(4);

    *:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
