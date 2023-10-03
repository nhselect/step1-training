<template>
  <div>
    <div class="nhsuk-back-link">
      <a class="nhsuk-back-link__link" :href="'/roles/' + role.slug">
        <svg
          class="nhsuk-icon nhsuk-icon__chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          height="24"
          width="24"
        >
          <path
            d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"
          ></path>
        </svg>
        Back to training materials</a
      >
    </div>
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
    const roleParam = params.role || params.pathMatch

    // fetch role info content
    const role = await $content('roles/' + roleParam)
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
