<template>
  <div class="nhsuk-warning-callout">
    <h3 class="nhsuk-warning-callout__label">
      <span role="text">
        <span class="nhsuk-u-visually-hidden">Note: </span>
        Specific to {{ framework }}
      </span>
    </h3>
    <p>This section is specific to the {{ framework }} framework, and is not relevant to other frameworks on the platform.</p>
  </div>
</template>

<script>
export default {
  props: {
    framework: {
      type: String
    },
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/warning-callout/warning-callout';
</style>
