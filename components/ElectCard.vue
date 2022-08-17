<template>
  <div class="nhsuk-card" :class="clickable ? 'nhsuk-card--clickable' : ''">
    <div class="nhsuk-card__content">
      <h2 class="nhsuk-card__heading nhsuk-heading-m">
        <a class="nhsuk-card__link" :href="url">{{ title }}</a>
      </h2>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BackLink extends Vue {
  @Prop({ required: true }) readonly title!: string
  @Prop({ required: false, default: false }) readonly clickable!: boolean
  @Prop({ required: false, default: '#' }) readonly url!: string
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
</style>
