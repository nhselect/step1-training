<template>
  <div class="nhsuk-u-reading-width">
    <hr />
    <h2>Self declaration and feedback</h2>
    <div class="nhsuk-form-group" v-if="itemsChecked.length < items.length">
      <fieldset class="nhsuk-fieldset" aria-describedby="check-hint">
        <p id="check-hint">Please tick the boxes below to confirm that you've read each required resource:</p>
        <div class="nhsuk-checkboxes">
          <div 
            class="nhsuk-checkboxes__item"
            v-for="( item, index ) in items" :key="item"
          >
            <input
              class="nhsuk-checkboxes__input"
              :id="'item-'+index"
              :name="'item-'+index"
              type="checkbox"
              :value="item"
              v-model="itemsChecked"
            >
            <label
              class="nhsuk-label nhsuk-checkboxes__label"
              :for="'item-'+index">
              {{ item }}
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <p
      class="nhsuk-tag"
      :class="itemsChecked.length===items.length?'nhsuk-tag--green':'nhsuk-tag--grey'"
    >
      <strong>Completed: {{ itemsChecked.length }} / {{ items.length }}</strong>
    </p>

    <div v-if="itemsChecked.length === items.length">
      <p><strong>Thank you for working through this training content. You can revisit this at any time.</strong></p>
      <p>Now that you have completed this content, it's time to get set up on the platform. You'll need to complete a self declaration stating that you have viewed these materials, and provide us with some feedback on the content.</p>
      <p>Once this has been submitted you'll receive an email with a link to the platform, and final steps on signing up.</p>
      <button class="nhsuk-button" href="https://forms.office.com/Pages/ResponsePage.aspx?id=-79gf9LZcUSKsPyF5z_3qWrr7hJ6td1DsRX0S5ZELqFURFNXSUNKTlpVOUlYVzRMSjk2NzE0Rkk4RCQlQCN0PWcu" target="_blank">
        Complete your self-declaration
      </button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsChecked: []
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
  },
  computed: {
    allItemsChecked() {
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/checkboxes/checkboxes';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';

</style>