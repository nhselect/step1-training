<template>
  <div>
    <h1>
      Digitised Step 1 proficiencies
      <span class="nhsuk-caption-xl">
        Training packages
      </span>
    </h1>
    <div class="nhsuk-u-reading-width">
      <p class="nhsuk-body-l">
        Welcome to the training packages for the Step 1 proficiency pilot.
      </p>
      <h2>What you need to do</h2>
      <ul>
        <li>Begin by selecting your role from the options below</li>
        <li>Work through the content and tasks presented</li>
        <li>Once you have completed all the materials, complete the self declaration and feedback form</li>
        <li>Upon submission of the self declaration, you will receive an email containing the link to register on the platform</li>
      </ul>
      <h2>What's your role?</h2>
    </div>
    <ul class="nhsuk-grid-row nhsuk-card-group">
      <li
        v-for="role in roles" :key="role.title"
        class="nhsuk-grid-column-one-third nhsuk-card-group__item"
      >
        <ElectCard clickable="true" :url="role.path" :title="role.title">
        </ElectCard>
      </li>
    </ul>
  </div>
</template>

<script>
import LtlcHeader from '~/components/LtlcHeader.vue'
import LtlcFooter from '~/components/LtlcFooter.vue'
import ActionLink from '../components/ActionLink.vue'
import ElectCard from '../components/ElectCard.vue'

export default {
  components: {
    LtlcHeader,
    LtlcFooter,
    ActionLink,
    ElectCard
  },
  head: {
    script: [
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      }
    ],
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || "index";
    const roles = await $content('roles')
      .sortBy('order')
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: "Roles not found" });
      });

    return {
      roles
    };
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

</style>
