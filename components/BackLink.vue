<template>
  <div class="nhsuk-back-link">
    <a class="nhsuk-back-link__link" :href="back_url">
      <svg class="nhsuk-icon nhsuk-icon__chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" height="24" width="24">
        <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
      </svg>
      Go back</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BackLink extends Vue {
  @Prop({ required:false, default: '/' }) readonly back_url!: string
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/back-link/back-link';
</style>
