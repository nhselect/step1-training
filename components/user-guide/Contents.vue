<template>
  <div>
    <h3>Contents</h3>
    <nav
      class="nhsuk-contents-list"
      role="navigation"
      aria-label="Pages in this user guide"
    >
      <ol class="nhsuk-contents-list__list">
        <UserGuideContentTree
          v-for="page in contents"
          :key="page.dir"
          :node="page"
          :active="active"
        >
        </UserGuideContentTree>
      </ol>
    </nav>
  </div>
</template>

<script>
  export default {
    props: {
      active: {
        type: String,
        required: false,
        default: '',
      },
      role: {
        type: String,
        required: true,
      },
      contents: {
        type: Array,
        required: true
      }
    },
    fetchKey() { return this.role },
  }
</script>

<style lang="scss">
@import "node_modules/nhsuk-frontend/packages/components/contents-list/contents-list";

.nhsuk-contents-list__item {
  font-size: 0.8em;
}

li>ol {
  margin: 0;
}
</style>