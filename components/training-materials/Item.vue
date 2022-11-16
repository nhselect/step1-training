<template>
  <li :id="item.slug" :key="item.title" class="step1-item">
    <!-- <div class="nhsuk-card nhsuk-u-margin-bottom-4">
      <div class="nhsuk-card__content">-->
    <details class="nhsuk-details nhsuk-expander">
      <summary class="nhsuk-details__summary">
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
      </summary>
      <div class="nhsuk-details__text">
        <p
          v-if="item.duplicateNotice"
          class="nhsuk-tag nhsuk-tag--blue nhsuk-u-font-size-14"
        >
          {{ item.duplicateNotice }}
        </p>
        <nuxt-content :document="item" />
        <div v-if="item.link" class="nhsuk-action-link">
          <a class="nhsuk-action-link__link" :href="item.link" target="_blank">
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
    </details>
    <!-- </div>
    </div>-->
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ITrainingItem } from '~/interfaces'

@Component
export default class TrainingMaterialsItem extends Vue {
  @Prop({ required: true }) readonly index!: number
  @Prop({ required: true }) readonly item!: ITrainingItem
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/action-link/action-link';

.step1-item {
  summary {
    .step1-updated {
      font-weight: normal;
      margin-bottom: 0;
    }
  }

  .step1-also-roles {
    margin-right: 2px;
    margin-bottom: 2px;
    padding: 2px 4px;
  }

  .step1-item__index {
    color: $nhsuk-secondary-text-color;
    margin-right: 0.3em;
  }
}
</style>
