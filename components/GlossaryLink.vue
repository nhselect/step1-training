<template>
  <div>
  <a
    :href="url"
    target="_blank"
    class="nhsuk-link nhsuk-u-font-size-16"
  >
    <slot />
  </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>