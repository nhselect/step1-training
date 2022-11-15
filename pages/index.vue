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
      <ol>
        <li>
          <strong>Select the relevant training package</strong> below for the role(s) that you will be performing within the platform. If you are unsure which training package to complete, contact your Implementation Lead or Clinical Centre Manager 
        </li>
        <li>
          <strong>Read through all the pre-read materials</strong> within your training package - this should take 1 to 2 hours in total (you don't need to do this in one session) 
        </li>
        <li>
          <strong>Complete the self-declaration and feedback form</strong> at the bottom of the training package page to confirm that you've read each of the required materials. If you are performing more than one role, you only need to complete the self-declaration and feedback form once 
        </li>
        <li>
          <strong>Go to the user guide (in your training package) for step-by-step guidance</strong> to start using the platform  
        </li>
      </ol>
      <p>
        <strong>You can revisit the training materials</strong> at any point to refresh your knowledge 
      </p>
      <h2>Select your training package:</h2>
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
    title: "Digitised Step 1 user guides",
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      }
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
