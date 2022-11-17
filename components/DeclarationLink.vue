<template>
  <div class="nhsuk-u-reading-width">
    <h2>2. Self declaration and feedback form:</h2>
     <!--
    <div v-if="itemsChecked.length < items.length" class="nhsuk-form-group">
      <fieldset class="nhsuk-fieldset" aria-describedby="check-hint">
        <p id="check-hint">
          Please tick the boxes below to confirm that you've read each required
          resource:
        </p>
        <div class="nhsuk-checkboxes">
          <div
            v-for="(item, index) in items"
            :key="item"
            class="nhsuk-checkboxes__item"
          >
            <input
              :id="'item-' + index"
              v-model="itemsChecked"
              class="nhsuk-checkboxes__input"
              :name="'item-' + index"
              type="checkbox"
              :value="item"
            />
            <label
              class="nhsuk-label nhsuk-checkboxes__label"
              :for="'item-' + index"
            >
              {{ item }}
            </label>
          </div>
        </div>
      </fieldset>
    </div>
    <p
      class="nhsuk-tag"
      :class="allItemsChecked ? 'nhsuk-tag--green' : 'nhsuk-tag--grey'"
    >
      <strong>Completed: {{ itemsChecked.length }} / {{ items.length }}</strong>
    </p>
    -->
    <!-- <div v-if="allItemsChecked">-->
    <div>
      <p>
        Once you have completed the pre-reading, you will need to complete this self-declaration form stating that you have read the essential materials and provide us with some feedback on the content.
      </p>
      <p>
        Upon submission, you will receive an email with a certificate of completion. We recommend that you share this with your Implementation Lead as evidence of having completed the essential pre-reading.
      </p>
      <a
        class="nhsuk-button"
        href="https://forms.office.com/Pages/ResponsePage.aspx?id=-79gf9LZcUSKsPyF5z_3qWrr7hJ6td1DsRX0S5ZELqFURFNXSUNKTlpVOUlYVzRMSjk2NzE0Rkk4RCQlQCN0PWcu"
        target="_blank"
      >
        Complete your self-declaration
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemsChecked: [],
    }
  },
  computed: {
    allItemsChecked() {
      return this.itemsChecked.length === this.items.length
    },
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/fieldset/fieldset';
@import 'node_modules/nhsuk-frontend/packages/components/checkboxes/checkboxes';
@import 'node_modules/nhsuk-frontend/packages/components/tag/tag';
</style>
