<template>
  <ul>
    <li v-for="role in roles" :key="role.slug">
      <NuxtLink :to="'/feedback/'+role.slug">Feedback required for {{ role.title }}s</NuxtLink>
    </li>
  </ul>
</template>

<script>
  export default {
    async asyncData({ $content, params, error }) {
      const roles = await $content('roles')
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