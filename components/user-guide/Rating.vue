<template>
  <div class="nhsuk-card step1-guide--rating">
    <div class="nhsuk-card__content">
      <h4>Feedback</h4>
      <p>
        How would you rate your experience of <b>{{ guideText }}</b
        >?
      </p>
      <button
        v-for="option in options"
        :key="'option-' + option.value"
        class="nhsuk-button nhsuk-u-padding-1 nhsuk-u-font-size-32"
        :class="
          score == option.value
            ? 'nhsuk-button--primary'
            : 'nhsuk-button--secondary'
        "
        :disabled="rated"
        @click="rateGuide(option.value)"
      >
        {{ option.text }}
      </button>
      <div v-if="rated && score < 0 && !submitted" class="nhsuk-form-group">
        <label class="nhsuk-label" for="rating-comment">
          Please tell us what issues you experienced:
        </label>
        <textarea
          id="rating-comment"
          v-model="ratingComment"
          class="nhsuk-textarea"
          name="rating-comment"
          type="text"
          maxlength="150"
          rows="3"
        >
        </textarea>
        <div class="nhsuk-hint">
          {{ 150 - ratingComment.length }} characters remaining
        </div>
        <button
          class="nhsuk-button step1-guide--rating-submit nhsuk-u-margin-top-2 nhsuk-u-padding-3"
          @click="submitComments"
        >
          Submit
        </button>
      </div>
      <div v-if="submitted">
        <p>Thank you for your feedback</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guide: String,
    role: String,
  },
  data() {
    return {
      rated: false,
      score: null,
      ratingComment: '',
      submitted: false,
      options: [
        {
          text: '😦',
          value: -1,
        },
        {
          text: '😐',
          value: 0,
        },
        {
          text: '😀',
          value: 1,
        },
      ],
    }
  },
  computed: {
    guideText() {
      return this.guide.charAt(0).toLowerCase() + this.guide.substr(1)
    },
  },
  methods: {
    rateGuide(score) {
      this.$posthog.capture('GuideRating', {
        Role: this.role,
        Guide: this.guide,
        Score: score,
      })
      this.rated = true
      this.score = score
      this.submitted = score > -1
    },
    submitComments() {
      if (this.ratingComment.length > 0) {
        this.$posthog.capture('GuideComment', {
          Role: this.role,
          Guide: this.guide,
          Comment: this.ratingComment,
        })
        this.submitted = true
      }
    },
  },
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/button/button';
@import 'node_modules/nhsuk-frontend/packages/components/textarea/textarea';
@import 'node_modules/nhsuk-frontend/packages/components/label/label';
@import 'node_modules/nhsuk-frontend/packages/components/card/card';
</style>
