<template>
  <li :class="[layer > 0 ? 'nhsuk-contents-list__item' : '', 'nav-layer-'+layer.toString()]">
    <span v-if="active === node.dir" class="nhsuk-contents-list__current">
      {{ node.title }} <span v-if="isNew" class="nhsuk-tag nhsuk-tag--pink elect-guide-updated">Updated</span>
    </span>
    <NuxtLink v-else class="nhsuk-contents-list__link" :to="node.dir">
      {{ node.title }} <span v-if="isNew" class="nhsuk-tag nhsuk-tag--pink elect-guide-updated">Updated</span>
    </NuxtLink>
    <ol class="nhsuk-contents-list__list" v-if="node.children && node.children.length">
      <node v-for="child in node.children" :node="child" :key="child.dir" :active="active" :layer="layer+1">
      </node>
    </ol>
  </li>
</template>

<script>
import { isNewExpression } from '@babel/types';

export default {
  name: "node",
  props: {
    node: Object,
    active: String,
    layer: Number
  },
  computed: {
    isNew() {
      const lastUpdated = new Date(this.node.updatedAt)
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - 7)

      return lastUpdated > lastWeek
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/nhsuk-frontend/packages/components/tag/tag";

.elect-guide-updated {
  font-size: 0.8em;
}
</style>