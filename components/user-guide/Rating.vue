<template>
  <div class="nhsuk-card step1-guide--rating">
    <div class="nhsuk-card__content">
      <h4>Feedback</h4>
      <p>
        How would you rate your experience of <b>{{ guideText }}</b
        >?
      </p>
      <div>
        <button
          v-for="option in options"
          :key="'option-' + option.value"
          class="nhsuk-button step1-guide--rating_button nhsuk-u-padding-2 nhsuk-u-font-size-32"
          :class="
            score == option.value
              ? 'nhsuk-button--primary'
              : 'nhsuk-button--secondary'
          "
          :alt="option.text"
          :title="option.text"
          :disabled="rated"
          @click="rateGuide(option.value)"
        >
          <FontAwesome :icon="option.icon" />
        </button>
      </div>
      <div v-if="rated && score < 1 && !submitted" class="nhsuk-form-group">
        <label class="nhsuk-label" for="rating-comment">
          Please share any information about your experience:
        </label>
        <div class="nhsuk-hint">
          e.g. any issues you encountered, things we could improve
        </div>
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
import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faFaceSmile,
  faFaceFrown,
  faFaceMeh,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(
  faFaceSmile,
  faFaceFrown,
  faFaceMeh,
)

Vue.component('FontAwesome', FontAwesomeIcon)

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
          icon: 'face-smile',
          text: 'Bad',
          value: -1,
        },
        {
          icon: 'face-meh',
          text: 'Average',
          value: 0,
        },
        {
          icon: 'face-frown',
          text: 'Good',
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
      this.submitted = score > 0
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

.step1-guide--rating {
  button.step1-guide--rating_button {
    &:nth-child(even) {
      border-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>
