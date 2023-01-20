<template>
  <span v-if="roles">
    <template v-for="(role, index) in rolesActive"><template :class="'process-role--'+role">{{ roleName(role) }}</template>{{ index < rolesActive.length-1 ? index < rolesActive.length-2 ? ', ': or ? ' or ': ' and ' : '' }}</template>
  </span>
</template>

<script>
export default {
  props: {
    roles: Object,
    or: Boolean,
    you: Boolean
  },
  computed: {
    rolesActive() {
      if (this.roles) {
        const roles = Object.entries(this.roles)
        return roles.filter((r) => r[1] === true).map((r) => r[0])
      }
      return ''
    }
  },
  data() {
    return {
       roleArray: {
        'nccentremanager': 'Non-clinical Centre Manager',
        'implementationlead': 'Implementation Lead',
        'firstcentremanager': 'first Clinical Centre Manager',
        'centremanager': 'Clinical Centre Manager',
        'administrator': 'Centre Administrator',
        'educator': 'Educator/Manager',
        'assessor': 'Assessor',
        'learner': 'Learner',
        'new': 'new Delegate'
      }
    }
  },
  methods: {
    roleName(role) {
      return this.roleArray[role]
    }
  }
}
</script>