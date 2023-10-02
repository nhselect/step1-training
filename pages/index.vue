<template>
  <div>
    <h1>
      Digitised Step 1 proficiencies pilot
      <span class="nhsuk-caption-xl"> Training packages </span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-l">
        {{ homePage.title }}
      </p>
      <NuxtContent :document="homePage" />

      <hr />

      <div class="nhsuk-form-group">

        <fieldset class="nhsuk-fieldset">
          <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
            <h2 class="nhsuk-fieldset__heading nhsuk-heading-l">
              Which proficiency frameworks are you enrolling in?
            </h2>
          </legend>

          <div class="nhsuk-checkboxes">

            <div
              v-for="opt in fwOptions"
              :key="'fw-'+opt.value"
              class="nhsuk-checkboxes__item"
              >
              <input
                v-model="fw"
                class="nhsuk-checkboxes__input"
                :id="'fw-'+opt.value"
                :name="'fw-'+opt.value"
                type="checkbox"
                :value="opt.value"
                >
              <label
                class="nhsuk-label nhsuk-checkboxes__label"
                :for="'fw-'+opt.value"
                >
                {{ opt.text }}
              </label>
            </div>

          </div>
        </fieldset>

        </div>

        <hr />

    </div>
    <div v-if="fw.length > 0">
      <h2>Please select your role:</h2>
      <ul class="nhsuk-grid-row nhsuk-card-group">
        <li
          v-for="role in roles"
          :key="role.title"
          class="nhsuk-grid-column-one-third nhsuk-card-group__item"
        >
          <ElectCard clickable="true" :url="`${role.path}?site=${fw}`" :title="role.title">
          </ElectCard>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please select at least one framework.</p>
    </div>
  </div>
</template>

<script>
import ElectCard from '../components/ElectCard.vue'

export default {
  components: {
    ElectCard,
  },
  async asyncData({ $content, params, error }) {
    const roles = await $content('roles')
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const homePage = await $content('home').fetch()

    return {
      roles,
      homePage,
    }
  },
  data() {
    const fwOptions = [
      {
        value: 'steps',
        text: 'Steps 1, 2 and 3 proficiencies'
      },
      {
        value: 'iv',
        text: 'IV therapy passport'
      }
    ],
    fw = []

    return {
      fwOptions,
      fw
    }
  },
  
  head: {
    title: 'Digitised Step 1 user guides',
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
    ],
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/skip-link/skip-link';
@import 'node_modules/nhsuk-frontend/packages/components/care-card/care-card';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
@import 'node_modules/nhsuk-frontend/packages/components/images/images';
@import 'node_modules/nhsuk-frontend/packages/components/details/details';
@import 'node_modules/nhsuk-frontend/packages/components/inset-text/inset-text';
@import 'node_modules/nhsuk-frontend/packages/components/radios/radios';

.nhsuk-radios__item {
  float: left;
  clear: none;
  margin-right: 96px;
}

</style>
