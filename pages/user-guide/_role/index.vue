<template>
  <div>
    <h1>User guide for {{role.title}}s</h1>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-one-third">
        <UserGuideContents :role="role.slug" />
      </div>
      <div class="nhsuk-grid-column-two-thirds">
        <h2>Index page</h2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params, error }) {
      const role = await $content('roles/'+params.role)
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'Role not recognised' })
        })

      return {
        role
      }
    },
  }
</script>