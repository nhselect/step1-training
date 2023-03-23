<template>
  <div>
    <h1>{{ overview.title }}</h1>
    <div class="nhsuk-u-reading-width">
      <NuxtContent :document="overview" />
    </div>
    <div class="step1-roles__container nhsuk-u-margin-bottom-9">
      <template
        v-for="(role, index) in roles"
      >
        <details
          :id="role.slug"
          :key="role.slug"
          class="nhsuk-details nhsuk-expander step1-roles__item nhsuk-u-margin-bottom-2 nhsuk-u-margin-top-2"
          :class="[
            'step1-roles-color__' + role.color,
            { 'align-right' : role.alignRight }
            ]"
          v-on:toggle="toggleOpens"
          >
          <summary class="nhsuk-details__summary">
            <h2 class="nhsuk-details__summary-text nhsuk-heading-m nhsuk-u-margin-bottom-0">
              {{ role.title }}
            </h2>
          </summary>
          <div class="nhsuk-details__text nhsuk-u-padding-top-4">
            <NuxtContent :document="role" />
          </div>
        </details>
        <div
          v-if="index < roles.length - 1"
          class="step1-roles__arrows"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M212.6 454.6L190 477.3l-22.6-22.6-144-144L.7 288 46 242.8l22.6 22.6L158 354.8 158 64l0-32 64 0 0 32 0 290.7 89.4-89.4L334 242.8 379.3 288l-22.6 22.6-144 144z"/></svg>
        </div>
      </template>
    </div>
    <div class="step1-functionalities__container">
      <h2>
        {{ overview.functionalityTitle }}
      </h2>
      <div class="table-filters">
        <p class="nhsuk-body-s">
          Click a role to highlight the relevant access on the platform
        </p>
        <button
          v-for="role in roles"
          :key="`toggle__${role.slug}`"
          @click.prevent="hoverRole = (hoverRole !== role.slug) ? role.slug : ''"
          :class="[
            'nhsuk-button',
            'toggle--button',
            'step1-roles-color__' + role.color,
            {
              'toggle--active' : hoverRole === role.slug
            }
          ]"
        >
          {{ role.title }}
        </button>
      </div>
      <table
        class="nhsuk-table"
        :class="{
          'toggle--active': hoverRole !== ''
        }"
        >
        <caption class="nhsuk-table__caption nhsuk-u-visually-hidden">
          {{ overview.functionalityTitle }}
        </caption>
        <thead role="rowgroup" class="nhsuk-table__head">
          <tr role="row">
            <th role="columnheader" scope="col">
              Function
            </th>
            <th role="columnheader" scope="col">
              Has full access and expected to use
            </th>
            <th role="columnheader" scope="col">
              Has partial access but not expected to use
            </th>
          </tr>
        </thead>
        <tbody
          class="nhsuk-table__body"
        >
          <tr
            v-for="(func, funcIndex) in overview.functionalities"
            :key="funcIndex"
            class="nhsuk-table__row"
            :class="{
              'row--active' : (func.hasFull && func.hasFull.includes(hoverRole)) || (func.hasPartial && func.hasPartial.includes(hoverRole))
            }"
          >
            <td class="nhsuk-table__cell">
              {{ func.title }}
            </td>
            <td
              v-if="func.hasFull && func.hasFull.length > 0"
              class="nhsuk-table__cell">
              <span
                v-for="role in func.hasFull"
                :key="`${funcIndex}__${role}`"
                class="nhsuk-tag"
                :class="[
                  'step1-roles-color__' + roleColor(role) || '',
                  {
                    'role--active' : hoverRole === role
                  }
                ]"
                >
                {{ roleTitle(role) }}
              </span>
            </td>
            <td
              v-if="func.hasPartial && func.hasPartial.length > 0"
              class="nhsuk-table__cell">
              <span
                v-for="role in func.hasPartial"
                :key="`${funcIndex}__${role}`"
                class="nhsuk-tag"
                :class="[
                  'step1-roles-color__' + roleColor(role) || '',
                  {
                    'role--active' : hoverRole === role
                  }
                ]"
                >
                {{ roleTitle(role) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openRole: '',
      hoverRole: ''
    }
  },
  async asyncData({ $content, params, error }) {
    const roles = await $content('platform-roles/roles')
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Roles not recognised' })
      })
    
    const overview = await $content('platform-roles/overview').fetch()

    const roleSlugs = roles.map(r => r.slug)

    return {
      overview,
      roles,
      roleSlugs
    }
  },
  methods: {
    toggleOpens: function(event) {
      if (event.target.open) {
        this.roleSlugs.forEach((r) => {
          if (r !== event.target.id) {
            const roleDetails = document.getElementById(r)

            if (roleDetails) {
              roleDetails.open = false;
            }
          }
          
        })
      }
      else {

      }
    },
    roleColor: function(roleSlug) {
      const role = this.roles.find((r) => {
        return r.slug === roleSlug
      })

      return role ? role.color : ''
    },
    roleTitle: function(roleSlug) {
      const role = this.roles.find((r) => {
        return r.slug === roleSlug
      })

      return role ? role.title : ''
    },
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
@import 'node_modules/nhsuk-frontend/packages/components/tables/tables';

.step1-roles__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step1-roles__item {
  width: 80%;
  
  @include mq( $until: tablet ) {
    min-width: 100%;
  }

  &.align-right {
    margin-left: auto;
  }

  .nhsuk-details__summary-text::before {
    background: url("data:image/svg+xml,%3Csvg class='nhsuk-icon nhsuk-icon__plus' xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23ffffff' %3E%3C/circle%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M12 8v8M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A") left -2px center no-repeat;
  }

  &[open] {
    .nhsuk-details__summary-text::before {
      background: url("data:image/svg+xml,%3Csvg class='nhsuk-icon nhsuk-icon__minus' xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' aria-hidden='true'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23fff'%3E%3C/circle%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M8 12h8'%3E%3C/path%3E%3C/svg%3E%0A") left -2px center no-repeat
    }
  }
}

.step1-roles__arrows {
  svg {
    height: 40px;
  }
}

.toggle--button {
  padding: nhsuk-spacing(1) nhsuk-spacing(2);
  margin-right: nhsuk-spacing(2);

  @include nhsuk-typography-responsive(16);

  &.toggle--active {
    outline: 4px solid $color_nhsuk-yellow;
    outline-offset: 2px;
  }
}

table {
  .nhsuk-tag {
    font-size: 0.75rem;
    margin: nhsuk-spacing(1);
  }
}

table.toggle--active {
  tr:not(.row--active) {
    td:nth-child(1) {
      opacity: 0.2;
    }
  }

  .nhsuk-tag:not(.role--active) {
    opacity: 0.2;
  }
}

.step1-roles-color__ {

  .nhsuk-icon {
    fill: #fff;
  }

  &aqua-green {
    summary.nhsuk-details__summary {
      background-color: $color_nhsuk-aqua-green;
      
      h2.nhsuk-details__summary-text {
        color: #fff;
      }
    }

    &.nhsuk-tag, &.toggle--button {
      background-color: $color_nhsuk-aqua-green;
      border-color: $color_nhsuk-aqua-green;
    }
  }

  &blue {
    summary.nhsuk-details__summary {
      background-color: $color_nhsuk-blue;
      
      h2.nhsuk-details__summary-text {
        color: #fff;
      }
    }

    &.nhsuk-tag, &.toggle--button {
      background-color: $color_nhsuk-blue;
      border-color: $color_nhsuk-blue;
    }
  }

  &grey-2 {    
    summary.nhsuk-details__summary {
      background-color: $color_nhsuk-grey-2;
      
      h2.nhsuk-details__summary-text {
        color: #fff;
      }
    }

    &.nhsuk-tag, &.toggle--button {
      background-color: $color_nhsuk-grey-2;
      border-color: $color_nhsuk-grey-2;
    }
  }
  
  &light-blue {
    summary.nhsuk-details__summary {
      background-color: $color_nhsuk-light-blue;
      
      h2.nhsuk-details__summary-text {
        color: #fff;
      }
    }

    &.nhsuk-tag, &.toggle--button {
      background-color: $color_nhsuk-light-blue;
      border-color: $color_nhsuk-light-blue;
    }
  }

  &pink {
    summary.nhsuk-details__summary {
      background-color: $color_nhsuk-pink;
      
      h2.nhsuk-details__summary-text {
        color: #fff;
      }
    }

    &.nhsuk-tag, &.toggle--button {
      background-color: $color_nhsuk-pink;
      border-color: $color_nhsuk-pink;
    }
  }
}

</style>
