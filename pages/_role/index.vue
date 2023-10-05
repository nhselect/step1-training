<template>
  <div class="nhsuk-grid-row">
    <div class="nhsuk-grid-column-full">
      <div class="nhsuk-u-reading-width">
        <BackLink />
        <h1>
          <span class="nhsuk-caption-xl"> Training package for </span>
          {{ page.title }}
        </h1>
        <nuxt-content :document="page" />
        <hr />
        <div class="nhsuk-back-link" style="text-align: right">
          <a class="nhsuk-back-link__link" href="#maincontent">
            ^ Go back to top
          </a>
        </div>
        <h2 id="training-prereading">1. Pre-reading</h2>
        <h3>Essential:</h3>
        <ul class="nhsuk-list">
          <TrainingMaterialsItem
            v-for="(item, index) in essentialMaterials"
            :key="item.slug"
            :index="index"
            :item="item"
            :role="role"
          />
        </ul>
        <h3>Non-essential:</h3>
        <ul class="nhsuk-list">
          <TrainingMaterialsItem
            v-for="(item, index) in optionalMaterials"
            :key="item.slug"
            :index="index"
            :item="item"
            :role="role"
          />
        </ul>
        <hr />
        <div class="nhsuk-back-link" style="text-align: right">
          <a class="nhsuk-back-link__link" href="#maincontent">
            ^ Go back to top
          </a>
        </div>
        <DeclarationLink id="training-declaration" :items="checkItems" />
        <div v-if="userGuide">
          <hr />
          <div class="nhsuk-back-link" style="text-align: right">
            <a class="nhsuk-back-link__link" href="#maincontent">
              ^ Go back to top
            </a>
          </div>
          <h2 id="training-userguide">3. User guide:</h2>
          <div v-if="userGuide.link" class="nhsuk-action-link">
            <NuxtLink class="nhsuk-button" :to="`${role}${userGuide.link}`">
              Access the User Guide
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const role = params.role || 'index'
    const page = await $content('roles/' + role)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const roles = await $content('roles').only(['title', 'slug']).fetch()

    let items = await $content('items')
      .where({
        roles: { $contains: role },
        slug: { $ne: 'user-guide' }
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
          .map((r) => r.title)

        if (alsoRoles.length === i.roles.length) {
          duplicateNotice = 'This is the same across all training packages'
        }
      }

      // TO DO: check if updated date is < 2 weeks and if so need to highlight as newly updated

      return { ...i, updatedFormatted, duplicateNotice }
    })

    let userGuide = await $content('items')
      .where({
        roles: { $contains: role },
        slug: 'user-guide'
      })
      .only(['title', 'slug', 'roles', 'link'])
      .fetch()

    userGuide = userGuide.length > 0 ? userGuide.pop() : null
/*
    const userGuide = items
      .filter((i) => i.slug.indexOf('user-guide') === 0)
      .pop()
*/
    const essentialMaterials = items.filter(
      (i) => !i.optional
    )
    const optionalMaterials = items.filter(
      (i) => i.optional
    )

    const checkItems = items.filter((i) => !i.optional).map((i) => i.title)

    return {
      role,
      page,
      items,
      checkItems,
      userGuide,
      essentialMaterials,
      optionalMaterials,
    }
  },
  head() {
    return {
      title: 'Digitised proficiencies user guide for ' + this.page.title + 's',
    }
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';
@import 'node_modules/nhsuk-frontend/packages/components/action-link/action-link';
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
@import 'node_modules/nhsuk-frontend/packages/components/button/button';

.nuxt-content {
  ul,
  ol {
    margin-left: 20px;
  }
}

@media (min-width: 48.0625em) {
  .step1-items__contents-list {
    position: sticky;
    top: 8px;
  }
}
</style>
