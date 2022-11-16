<template>
  <div>
    <dl class="nhsuk-summary-list">
      <div
        v-for="term in glossary"
        :key="term.title"
        class="nhsuk-summary-list__row"
      >
        <dt class="nhsuk-summary-list__key">
          {{ term.title }}
        </dt>
        <dd class="nhsuk-summary-list__value">
          <nuxt-content :document="term" />
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    glossary: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/summary-list/summary-list';
</style>
