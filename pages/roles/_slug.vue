<template>
  <div class="nhsuk-grid-row">
    <div class="nhsuk-grid-column-one-third step1-items__contents-list">
      <nav class="nhsuk-contents-list" role="navigation" aria-label="Pages in this guide">
        <h2 class="nhsuk-u-visually-hidden">Content</h2>
        <ol class="nhsuk-contents-list__list">
          <li 
            v-for="item in items"
            :key="item.title"
            class="nhsuk-contents-list__item"
          >
            <a class="nhsuk-contents-list__link" :href="'#'+item.slug">
              {{ item.title }}
            </a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="nhsuk-grid-column-two-thirds">
      <h1>
        <span class="nhsuk-caption-xl">
          Training package for
        </span>
        {{ page.title }}s
      </h1>
      <nuxt-content :document="page" />
      <hr />
      <p>Please work through each of the resources below.</p>

      <ul class="nhsuk-list">
        <li
          v-for="(item, index) in items" :key="item.title"
          :id="item.slug"
          class="step1-item"
        >
          <div class="nhsuk-card nhsuk-u-margin-bottom-4">
            <div class="nhsuk-card__content">
              <h2 class="nhsuk-card__heading nhsuk-heading-m">
                <span class="step1-item__index nhsuk-u-font-size-32">{{ index+1 }}</span> {{ item.title }}
              </h2>
                <p class="step1-updated nhsuk-tag nhsuk-tag--grey nhsuk-u-font-size-14">
                  Updated <strong>{{ item.updatedFormatted }}</strong>
                </p>
              <nuxt-content :document="item" />
              <div class="nhsuk-action-link">
                <a class="nhsuk-action-link__link" :href="item.link">
                  <svg class="nhsuk-icon nhsuk-icon__arrow-right-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="36" height="36">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"></path>
                  </svg>
                  <span class="nhsuk-action-link__text">View resource</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <DeclarationLink />
    </div>
  </div>
</template>

<script>
import { update } from 'immutable';

export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || "index";
    const page = await $content('roles/' + slug)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "Page not found" });
      });

    let items = await $content('items').where({
      roles: { $contains: slug }
    })
      .sortBy('order')
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "No items retrieved" });
      });

    items = items.map((i) => {
      let updatedFormatted = new Date(i.updated).toLocaleDateString('en-GB')
      return { ...i, updatedFormatted }
    })

    return {
      page, items
    };
  }
};
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';

.step1-item {
  > summary {
    > * {
      display: block;
    }

    .step1-updated {
      font-weight: normal;
    }
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