<template>
  <div>
    <BackLink :backUrl="`/${role}`">
      Back to training materials
    </BackLink>
    <h1>{{ overview.title }}</h1>
    <div class="nhsuk-u-reading-width">
      <NuxtContent :document="overview" />
    </div>
    <div class="step1-roles__container nhsuk-u-margin-bottom-9">
      <div class="step1-roles__container--admin nhsuk-u-padding-3">
        <h3>Admin roles:</h3>
        <template
          v-for="(role, index) in adminRoles"
        >
          <div 
            class="step1-roles__item"
            :class="[
                { 'align-right' : role.alignRight }
              ]">
            <div
              v-if="index < roles.length - 1 && role.alignRight"
              class="step1-roles__arrows step1-arrow__left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M175 495l17 17 17-17L345 359l17-17L328 308.1l-17 17-95 95L216 24l0-24L168 0l0 24 0 396.1-95-95-17-17L22.1 342.1l17 17L175 495z"/></svg>
            </div>
            <details
              :id="role.slug"
              :key="role.slug"
              class="nhsuk-details nhsuk-expander nhsuk-u-margin-bottom-2 nhsuk-u-margin-top-2"
              :class="[
                'step1-roles-color__' + role.color,
                ]"
              v-on:toggle="toggleOpens"
              >
              <summary class="nhsuk-details__summary">
                <h2 class="nhsuk-details__summary-text nhsuk-heading-m nhsuk-u-margin-bottom-0">
                  {{ role.title }}
                  <span v-if="role.isOptional" class="nhsuk-tag step1-role__optional--tag">
                    Optional
                  </span>
                </h2>
              </summary>
              <div class="nhsuk-details__text nhsuk-u-padding-top-4">
                <NuxtContent :document="role" />
              </div>
            </details>
          </div>
          <div
            v-if="index < roles.length - 1"
            class="step1-roles__arrows"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 365.3l22.6-22.6 160-160L429.3 160 384 114.7l-22.6 22.6L224 274.7 86.6 137.4 64 114.7 18.7 160l22.6 22.6 160 160L224 365.3z"/></svg>
          </div>
        </template>
      </div>
      <div class="nhsuk-u-padding-3">
        <template
          v-for="(role, index) in nonAdminRoles"
        >
          <div 
            class="step1-roles__item"
            :class="[
                { 'align-right' : role.alignRight }
              ]">
            <div
              v-if="index < roles.length - 1 && role.alignRight"
              class="step1-roles__arrows step1-arrow__left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M175 495l17 17 17-17L345 359l17-17L328 308.1l-17 17-95 95L216 24l0-24L168 0l0 24 0 396.1-95-95-17-17L22.1 342.1l17 17L175 495z"/></svg>
            </div>
            <details
              :id="role.slug"
              :key="role.slug"
              class="nhsuk-details nhsuk-expander nhsuk-u-margin-bottom-2 nhsuk-u-margin-top-2"
              :class="[
                'step1-roles-color__' + role.color,
                ]"
              v-on:toggle="toggleOpens"
              >
              <summary class="nhsuk-details__summary">
                <h2 class="nhsuk-details__summary-text nhsuk-heading-m nhsuk-u-margin-bottom-0">
                  {{ role.title }}
                  <span v-if="role.isOptional" class="nhsuk-tag step1-role__optional--tag">
                    Optional
                  </span>
                </h2>
              </summary>
              <div class="nhsuk-details__text nhsuk-u-padding-top-4">
                <NuxtContent :document="role" />
              </div>
            </details>
          </div>
          <div
            v-if="index < nonAdminRoles.length - 1"
            class="step1-roles__arrows"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 365.3l22.6-22.6 160-160L429.3 160 384 114.7l-22.6 22.6L224 274.7 86.6 137.4 64 114.7 18.7 160l22.6 22.6 160 160L224 365.3z"/></svg>
          </div>
        </template>
      </div>
    </div>
    <div class="step1-functionalities__container">
      <h2>
        {{ overview.functionalityTitle }}
      </h2>
      <div class="table-filters">
        <p class="nhsuk-body-s">
          Click a role to highlight the relevant abilities on the platform
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
        <button
          @click.prevent="hoverRole = ''"
          class="nhsuk-button toggle--button toggle--button__clear"
          >
          Clear selection
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
              Roles with ability
            </th>
            <!--
            <th role="columnheader" scope="col">
              Has partial access but not expected to use
            </th>
            -->
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
            <!--
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
            -->
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
    const role = params.role
    const roles = await $content('platform-roles/roles')
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Roles not recognised' })
      })

    const adminRoles = roles.filter((r) => r.isAdminRole)
    const nonAdminRoles = roles.filter((r) => !r.isAdminRole)
    
    const overview = await $content('platform-roles/overview').fetch()

    const roleSlugs = roles.map(r => r.slug)

    return {
      overview,
      roles,
      adminRoles,
      nonAdminRoles,
      roleSlugs,
      role
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
@import 'node_modules/nhsuk-frontend/packages/components/images/images';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';

.step1-roles__container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.step1-roles__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: nhsuk-spacing(5);
  
  @include mq( $until: tablet ) {
    min-width: 100%;
  }

  &.align-right {
    justify-content: space-evenly;
  }

  > .nhsuk-details.nhsuk-expander {
    width: 80%;
    margin: 0 !important;
  }

  .step1-role__optional--tag {
    margin-left: nhsuk-spacing(9);
    color: $color_nhsuk-grey-1;
    background-color: #fff;
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
  display: flex;
  justify-content: center;

  svg {
    height: 40px;
    margin-right: 20%;
  }

  &.step1-arrow__left {
    float: left;
    transform: scale(1.8);
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

.step1-image {
  width: 100%;

  img {
    width: 100%;
  }
}

table {

  .nhsuk-tag {
    font-size: 0.75rem;
    margin: nhsuk-spacing(1);
  }

  tr.nhsuk-table__row:nth-child(5),
  tr.nhsuk-table__row:nth-child(9) {
    td {
      border-bottom: 2px solid $color_nhsuk-grey-3;
    }
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

.nhsuk-button.toggle--button__clear {
  background-color: #fff;
  border-color: #fff;
  color: $color_nhsuk-pink;
}

.step1-roles__container--admin {
  border: 4px dotted $color_nhsuk-grey-3;
  background-color: $color_nhsuk-grey-4;
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

  &dark-blue {
    summary.nhsuk-details__summary {
      background-color: $color_nhsuk-dark-blue;
      
      h2.nhsuk-details__summary-text {
        color: #fff;
      }
    }

    &.nhsuk-tag, &.toggle--button {
      background-color: $color_nhsuk-dark-blue;
      border-color: $color_nhsuk-dark-blue;
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

.role_trust-example {
  padding: nhsuk-spacing(3);
  border: 2px solid $color_nhsuk-grey-4;
  background-color: $color_nhsuk-grey-5;

  h3 {
    color: $color_nhsuk-grey-1;
  }

  ul {
    li {
      @include nhsuk-typography-responsive(16);

      color: $color_nhsuk-grey-1;
    }
  }
}

.step1-double-roles {
  margin-right: (-(nhsuk-spacing(9)) * 3);

  @include mq($until: tablet) {
    margin-right: (-(nhsuk-spacing(9)) * 2);
  }

  .nhsuk-card > h3 {
    padding: nhsuk-spacing(5);
    color: #fff;
    background-color: $color_nhsuk-blue;
  }
}

</style>
