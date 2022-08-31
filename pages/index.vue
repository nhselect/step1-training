<template>
  <div>
    <h1>
      Digitised Step 1 proficiencies pilot
      <span class="nhsuk-caption-xl"> Training packages </span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-l">
        Welcome to the training packages for the Step 1 proficiencies pilot.
      </p>
      <h2>What you need to do</h2>
      <ul>
        <li>
          Begin by selecting the platform role you will be performing from the
          options below. If you do not know, contact whoever provided you with
          the link to the training packages
        </li>
        <li>
          Work through the materials and tasks presented - this should take 1 to
          2 hours in total (you don't need to do this in one session)
        </li>
        <li>
          You can revisit these materials at any point to refresh your knowledge
        </li>
        <li>
          Once you have read through all the materials, complete the self
          declaration and feedback form
        </li>
        <li>
          Upon submission of the self declaration, you will receive an email
          with a completion certificate attached
        </li>
      </ul>
      <h2>What's your role?</h2>
    </div>
    <ul class="nhsuk-grid-row nhsuk-card-group">
      <li
        v-for="role in roles"
        :key="role.title"
        class="nhsuk-grid-column-one-third nhsuk-card-group__item"
      >
        <ElectCard clickable="true" :url="role.path" :title="role.title">
        </ElectCard>
      </li>
    </ul>
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

    return {
      roles,
    }
  },
  head: {
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
</style>
