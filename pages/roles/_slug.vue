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
          />
        </ul>
        <h3>Non-essential:</h3>
        <ul class="nhsuk-list">
          <TrainingMaterialsItem
            v-for="(item, index) in optionalMaterials"
            :key="item.slug"
            :index="index"
            :item="item"
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
            <a class="nhsuk-button" :href="userGuide.link" target="_blank">
              Access the User Guide
            </a>
            <!--<a class="nhsuk-action-link__link" :href="userGuide.link" target="_blank">
              <svg
                class="nhsuk-icon nhsuk-icon__arrow-right-circle"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                width="36"
                height="36"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"
                ></path>
              </svg>
              <span class="nhsuk-action-link__text">{{
                userGuide.action ? userGuide.action : 'View resource'
              }}</span>
            </a>-->
          </div>
        </div>
      </div>
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
          duplicateNotice = 'This is the same across all training packages'
        } else {
          duplicateNotice =
            'This is the same across all the following training packages: ' +
            alsoRoles.join(', ')
        }
      }

      // TO DO: check if updated date is < 2 weeks and if so need to highlight as newly updated

      return { ...i, updatedFormatted, duplicateNotice }
    })

    const userGuide = items
      .filter((i) => i.slug.indexOf('user-guide-') === 0)
      .pop()

    const essentialMaterials = items.filter(
      (i) => !i.optional && !i.slug.includes('user-guide-')
    )
    const optionalMaterials = items.filter(
      (i) => i.optional && !i.slug.includes('user-guide-')
    )

    const checkItems = items.filter((i) => !i.optional).map((i) => i.title)

    return {
      slug,
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
      title: 'Digitised Step 1 user guide for ' + this.page.title + 's',
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
