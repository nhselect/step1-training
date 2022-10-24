<template>
  <div class="nhsuk-grid-row">
    <div class="nhsuk-grid-column-one-third step1-items__contents-list">
      <nav
        class="nhsuk-contents-list"
        role="navigation"
        aria-label="Training items in this package"
      >
        <h2 class="nhsuk-heading-m">Content:</h2>
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
        <li
          v-for="(item, index) in items"
          :id="item.slug"
          :key="item.title"
          class="step1-item"
        >
          <div class="nhsuk-card nhsuk-u-margin-bottom-4">
            <div class="nhsuk-card__content">
              <h2 class="nhsuk-card__heading nhsuk-heading-m">
                <span class="step1-item__index nhsuk-u-font-size-32">{{
                  index + 1
                }}</span>
                {{ item.title }}
              </h2>
              <p
                v-if="item.updated"
                class="step1-updated nhsuk-tag nhsuk-tag--green nhsuk-u-font-size-14"
              >
                Updated <strong>{{ item.updatedFormatted }}</strong>
              </p>
              <p
                v-else
                class="step1-updated nhsuk-tag nhsuk-tag--grey nhsuk-u-font-size-14"
              >
                Under development
              </p>
              <p v-if="item.duplicateNotice" class="nhsuk-tag nhsuk-tag--blue nhsuk-u-font-size-14">
                {{ item.duplicateNotice }}
              </p>
              <nuxt-content :document="item" />
              <div
                v-if="item.link"
                class="nhsuk-action-link"
                >
                <a
                  class="nhsuk-action-link__link"
                  :href="item.link"
                  target="_blank"
                >
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
                    item.action ? item.action : 'View resource'
                  }}</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <DeclarationLink :items="checkItems" />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Digitised Step 1 user guide for "+this.page.title+"s"
    }
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const page = await $content('roles/'+slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    const roles = await $content('roles').only(['title','slug']).fetch()

    let items = await $content('items')
      .where({
        roles: { $contains: slug },
      })
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'No items retrieved' })
      })

    items = items.map((i) => {
      let updatedFormatted = ''
      let duplicateNotice = ''
      if (i.updated) {
        let updatedDate = new Date(i.updated)
        updatedFormatted = updatedDate.toLocaleDateString('en-GB')
      }

      if (i.roles.length > 1) {
        let alsoRoles = roles.filter((r) => i.roles.includes(r.slug)).map((r) => r.title)

        if (alsoRoles.length === i.roles.length) {
          duplicateNotice = 'This material has the same content across all the role training packages'
        }
        else {
          duplicateNotice = 'This material has the same content across the training packages for the roles: ' + alsoRoles.join(', ')
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
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';
@import 'node_modules/nhsuk-frontend/packages/components/action-link/action-link';

.step1-item {
  > summary {
    > * {
      display: block;
    }

    .step1-updated {
      font-weight: normal;
    }
  }

  .step1-also-roles {
      margin-right: 2px;
      margin-bottom: 2px;
      padding: 2px 4px;
    }

  .step1-item__index {
    color: $color_nhsuk-blue;
    margin-right: 0.3em;
  }
}

@media (min-width: 48.0625em) {
  .step1-items__contents-list {
    position: sticky;
    top: 8px;
  }
}
</style>
