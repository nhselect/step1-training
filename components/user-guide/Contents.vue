<template>
  <div v-if="contents.length > 0">
    <h3>Navigation:</h3>
    <nav
      class="step1-user-guide-nav"
      role="navigation"
      aria-label="Pages in this user guide"
    >
      <ol>
        <UserGuideContentTree
          v-for="page in contents"
          :key="page.dir"
          :node="page"
          :active="active"
          :layer="0"
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
    framework: {
      type: String,
      required: true
    },
    contents: {
      type: Array,
      required: true,
    },
  },
  fetchKey() {
    return this.role
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';

.nhsuk-contents-list__item {
  font-size: 0.8em;
}

.step1-user-guide-nav > ol > li > a {
  display: inline;
  font-weight: 600;
}

li > ol {
  margin: 0;
}
</style>
