<template>
  <li :class="[layer > 0 ? 'nhsuk-contents-list__item' : '', 'nav-layer-'+layer.toString()]">
    <span v-if="active === node.dir" class="nhsuk-contents-list__current">{{ node.title }}</span>
    <NuxtLink v-else class="nhsuk-contents-list__link" :to="node.dir">
      {{ node.title }}
    </NuxtLink>
    <ol class="nhsuk-contents-list__list" v-if="node.children && node.children.length">
      <node v-for="child in node.children" :node="child" :key="child.dir" :active="active" :layer="layer+1">
      </node>
    </ol>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object,
    active: String,
    layer: Number
  }
};
</script>