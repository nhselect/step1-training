<template>
  <nav class="nhsuk-breadcrumb" aria-label="Breadcrumb">
    <div class="nhsuk-width-container">
      <ol class="nhsuk-breadcrumb__list">
        <li
          v-for="link in links"
          :key="link.url"
          class="nhsuk-breadcrumb__item"
        >
          <NuxtLink class="nhsuk-breadcrumb__link" :to="link.url">
            {{ link.title }}</NuxtLink
          >
        </li>
      </ol>
      <p v-if="last" class="nhsuk-breadcrumb__back">
        <NuxtLink class="nhsuk-breadcrumb__backlink" :to="last.url"
          >Back to {{ last.title }}</NuxtLink
        >
      </p>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    links() {
      return this.breadcrumbs.slice(0, this.breadcrumbs.length - 1)
    },
    last() {
      return this.breadcrumbs[this.breadcrumbs.length - 2]
    },
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/breadcrumb/breadcrumb';

nav.nhsuk-breadcrumb {
  background: none;
}
</style>
