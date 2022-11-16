<template>
  <div>
    <h1>Glossary of terms</h1>
    <div class="nhsuk-u-reading-width">
      <p>
        This document provides descriptions of key terminology used throughout
        the Training package materials and DLS platform.
      </p>
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="example">
          What are you looking for?
        </label>
        <input
          id="example"
          v-model="filterText"
          class="nhsuk-input"
          name="example"
          type="text"
        />
        <p v-if="filterText.length > 0" class="nhsuk-u-font-weight-bold">
          Searching for {{ filterText }} has found
          {{ glossaryFiltered.length }} terms
        </p>
        <p v-else class="nhsuk-u-font-weight-bold">
          There are {{ glossaryFiltered.length }} terms in this glossary
        </p>
      </div>
      <GlossaryList :glossary="glossaryFiltered" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const glossary = await $content('glossary')
      .sortBy('title')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    return {
      glossary,
    }
  },
  data() {
    return {
      filterText: '',
    }
  },
  head: {
    title: 'Digitised Step 1 user guide - Glossary of Terms',
  },
  computed: {
    glossaryFiltered() {
      return this.glossary.filter((f) => {
        return f.title
          .toLowerCase()
          .includes(this.filterText.toLowerCase().trim())
      })
    },
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/input/input';
@import 'node_modules/nhsuk-frontend/packages/components/label/label';
</style>
