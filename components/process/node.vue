<template>
  <div
    class="nhsuk-card step1-process__node"
    :class="{ 'step1-process__node--required': required }"
    >
    <!--
    <div v-if="actionBy.length > 0" class="step1-process__node--action">
      <div
        class="nhsuk-tag"
        :class="!required ? 'nhsuk-tag--grey' : ''"
        >
        Action needed by:
      
        <span
          v-for="role in actionBy"
          :key="role"
          class="nhsuk-tag"
          :class="'nhsuk-tag--'+roleTagColour(role)"
          >
          {{ roleName(role) }}
        </span>
      </div>
    </div>
    -->
    <div class="nhsuk-card__content">
      <slot />
    </div>
    <div class="step1-process__arrow">
      <font-awesome-layers class="fa-lg">
        <!--<font-awesome-icon icon="fa-solid fa-circle" transform="grow-30" />-->
        <font-awesome-icon icon="fa-sharp fa-arrow-down" transform="grow-16" />
      </font-awesome-layers>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { faArrowDown, faCircle } from '@fortawesome/sharp-solid-svg-icons'

library.add(faArrowDown, faCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

Vue.config.productionTip = false

export default {
  props: {
    step: String,
    required: Boolean,
    roles: {
      type: Array,
      default(rawProps) {
        return []
      },
    },
    actionBy: {
      type: Array,
      default(rawProps) {
        return []
      },
    },
  },
  methods: {
    roleName(roleString) {
      const roles = {
        'nccentremanager': 'Non-clinical Centre Manager',
        'implementationlead': 'Implementation Lead',
        'firstcentremanager': 'First Clinical Centre Manager',
        'centremanager': 'Clinical Centre Manager',
        'administrator': 'Centre Administrator',
        'educator': 'Educator/Manager',
        'assessor': 'Assessor',
        'learner': 'Learner'
      }
      return roles[roleString]
    },
    roleTagColour(roleString) {
      const colours = {
        'nccm': 'grey',
        'im': 'green',
        'ccm': 'blue',
        'ca': 'purple',
        'em': 'pink',
        'as': 'yellow',
        'le': 'orange'
      }
      if (this.roles.includes(roleString)) {
        return 'blue'
      }
      return 'grey'
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';

.step1-process__node {
  position: relative;

  .step1-process__node--action {
    position: absolute;
    left: -(nhsuk-spacing(2));
    top: -(nhsuk-spacing(3));
  }

  .step1-process__step {
    padding: 8px 32px;
    font-size: 24px;
    line-height: 24px;
    text-align: left;
    font-weight: $nhsuk-font-bold;
    color: #fff;
    background-color: $color-nhsuk_grey-4;
  }

  .step1-process__arrow {
    position: absolute;
    bottom: -20px;
    left: calc(50% - 15px);

    .fa-arrow-down {
      color: $color-nhsuk_grey-4;
    }
  }

  &.step1-process__node--required {
    border-color: $color-nhsuk_blue;

    .step1-process__step {
      background-color: $color-nhsuk_blue;
    }

    .step1-process__arrow .fa-arrow-down {
      color: $color-nhsuk_blue;
    }
  }

  &:last-child {
    .step1-process__arrow {
      display: none;
    }
  }
  
}
</style>