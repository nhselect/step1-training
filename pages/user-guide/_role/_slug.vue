<template>
  <div>
    <h1>User guide for {{role.title}}s</h1>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-one-third user-guide__contents">
        <UserGuideContents :role="role.slug" :active="slug" />
      </div>
      <div class="nhsuk-grid-column-two-thirds">
        <nuxt-content :document="page" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params, error }) {
      const slug = params.slug || 'index'

      const role = await $content('roles/'+params.role)
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'Role not recognised' })
        })

      const page = await $content('user-guide/'+params.slug)
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'No guides retrieved' })
        })

      return {
        slug,
        role,
        page
      }
    },
  }
</script>

<style lang="scss">
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
    @include nhsuk-responsive-padding(4);

    *:last-child {
      margin-bottom: 0
    }
  }
}
</style>