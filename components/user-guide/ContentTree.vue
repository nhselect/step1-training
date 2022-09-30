<template>
  <li class="nhsuk-contents-list__item">
    <span v-if="active === node.dir" class="nhsuk-contents-list__current">{{ node.title }}</span>
    <a v-else class="nhsuk-contents-list__link" :href="node.dir">
      {{ node.title }}
    </a>
    <ol class="nhsuk-contents-list__list" v-if="node.children && node.children.length">
      <node v-for="child in node.children" :node="child" :key="child.dir" :active="active">
      </node>
    </ol>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object,
    active: String
  }
};
</script>