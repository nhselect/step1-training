<template>
  <div class="nhsuk-grid-row">
    <div class="nhsuk-grid-column-one-third step1-items__contents-list">
      <nav
        class="nhsuk-contents-list"
        role="navigation"
        aria-label="Training items in this package"
      >
        <h2 class="nhsuk-heading-m">Navigation:</h2>
        <ol class="nhsuk-contents-list__list">
          <li
            v-for="item in items"
            :key="item.title"
            class="nhsuk-contents-list__item"
          >
            <a class="nhsuk-contents-list__link" :href="'#' + item.slug">
              {{ item.title }}
            </a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <BackLink />
      <h1>
        <span class="nhsuk-caption-xl"> Training package for </span>
        {{ page.title }}
      </h1>
      <nuxt-content :document="page" />
      <hr />
      <p><strong>Please work through each of the resources below.</strong></p>

      <ul class="nhsuk-list">
        <TrainingItem
          v-for="(item, index) in items"
          :key="item.slug"
          :index="index"
          :item="item"
        />
      </ul>
      <DeclarationLink :items="checkItems" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const page = await $content('roles/' + slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const roles = await $content('roles').only(['title', 'slug']).fetch()

    let items = await $content('items')
      .where({
        roles: { $contains: slug },
      })
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    items = items.map((i) => {
      let updatedFormatted = ''
      let duplicateNotice = ''
      if (i.updated) {
        const updatedDate = new Date(i.updated)
        updatedFormatted = updatedDate.toLocaleDateString('en-GB')
      }

      if (i.roles.length > 1) {
        const alsoRoles = roles
          .filter((r) => i.roles.includes(r.slug))
          .map((r) => r.title)

        if (alsoRoles.length === i.roles.length) {
          duplicateNotice =
            'This material has the same content across all the role training packages'
        } else {
          duplicateNotice =
            'This material has the same content across the training packages for the roles: ' +
            alsoRoles.join(', ')
        }
      }

      // TO DO: check if updated date is < 2 weeks and if so need to highlight as newly updated

      return { ...i, updatedFormatted, duplicateNotice }
    })

    const checkItems = items.filter((i) => !i.optional).map((i) => i.title)

    return {
      slug,
      page,
      items,
      checkItems,
    }
  },
  head() {
    return {
      title: 'Digitised Step 1 user guide for ' + this.page.title + 's',
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';

@media (min-width: 48.0625em) {
  .step1-items__contents-list {
    position: sticky;
    top: 8px;
  }
}
</style>
