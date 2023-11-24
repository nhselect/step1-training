<template>
  <div>
    <h1>
      Digitised proficiencies
      <span class="nhsuk-caption-xl"> Training packages </span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-l">
        {{ homePage.title }}
      </p>
      <NuxtContent :document="homePage" />
    </div>
    <hr />
    <h2>Which framework are you accessing?</h2>

    <div class="nhsuk-form-group">

      <fieldset class="nhsuk-fieldset">
        <legend class="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
          <h4 class="nhsuk-fieldset__heading">
            Are you primarily based in a Trust or Higher Education Institute (HEI)?
          </h4>
        </legend>

        <div class="nhsuk-radios">

          <div
          v-for="framework in frameworks"
            :key="framework.title"
            class="nhsuk-radios__item"
            >
            <input
              v-model="frameworkSelected"
              class="nhsuk-radios__input"
              :id="'fw-'+framework.id"
              :name="'fw-'+framework.id"
              type="radio"
              :value="framework.id"
            >
            <label
              class="nhsuk-label nhsuk-radios__label"
              :for="'fw-'+framework.id"
            >
              {{ framework.title }}
            </label>
          </div>

        </div>
      </fieldset>

      </div>
      <div v-if="frameworkSelected">
        <h2>Which role will you performing?</h2>
        <ul class="nhsuk-grid-row nhsuk-card-group">
          <li
            v-for="role in roles"
            :key="role.title"
            class="nhsuk-grid-column-one-third nhsuk-card-group__item"
          >
            <ElectCard clickable="true" :url="`/${frameworkSelected}/${role.slug}`" :title="role.title">
            </ElectCard>
          </li>
        </ul>
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
      .only(['title', 'slug'])
      .where({
        'slug': { $ne: 'non-clinical-centre-managers'}
      })
      .sortBy('order')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })

    const frameworks = [
      {
        id: 'iv',
        title: 'IV Therapy Passport'
      },
      {
        id: 'steps',
        title: 'Steps proficiencies'
      }
    ]

    const homePage = await $content('home').fetch()

    return {
      roles,
      homePage,
      frameworks
    }
  },
  head: {
    title: 'Digitised proficiencies user guides',
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
    ],
  },
  data() {
    return {
      frameworkSelected: null
    }
  }
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
</style>
