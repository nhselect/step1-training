<template>
  <ul>
    <li v-for="role in roles" :key="role.slug">
      <NuxtLink :to="'user-guide/'+role.slug+'/logging-in-to-your-profile'">User guide for {{ role.title }}s</NuxtLink>
    </li>
  </ul>
</template>

<script>
  export default {
    async asyncData({ $content, params, error }) {
      const roles = await $content('roles')
        .where({
          slug: {
            $ne: 'implementationlead'
          }
        })
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'Roles not recognised' })
        })

      return {
        roles
      }
    },
  }
</script>