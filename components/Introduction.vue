<template>
  <div>
    <p class="nhsuk-body-l">As a {{ role }}, you'll need to complete the following:</p>
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BackLink extends Vue {
  @Prop({ required:true }) readonly role!: string
}
</script>>
