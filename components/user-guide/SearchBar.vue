<template>
  <div class="nhsuk-header__search">
    <button
      id="toggle-search"
      class="nhsuk-header__search-toggle"
      aria-controls="search"
      aria-label="Open search"
    >
      <svg
        class="nhsuk-icon nhsuk-icon__search"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        width="27"
        height="27"
      >
        <path
          d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"
        ></path>
      </svg>
      <span class="nhsuk-u-visually-hidden">Search</span>
    </button>
    <div
      id="wrap-search" 
      class="nhsuk-header__search-wrap"
    >
      <form id="search" class="nhsuk-header__search-form" role="search">
        <label class="nhsuk-u-visually-hidden" for="search-field"
          >Search the user guide</label
        >
        <div id="autocomplete-container" class="autocomplete-container">
          <div class="autocomplete__wrapper">
            <div
              style="border: 0;
                clip: rect(0, 0, 0, 0);
                height: 1px;
                margin-bottom: -1px;
                margin-right: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                white-space: nowrap;
                width: 1px;"
            >
              <div
                id="search-field__status--A"
                role="status"
                aria-atomic="true"
                aria-live="polite"
              ></div>
              <div
                id="search-field__status--B"
                role="status"
                aria-atomic="true"
                aria-live="polite"
              ></div>
            </div>
            <UserGuideLunr 
              id="search-field"
              :role="role"
              lang="en"
              >
              <template v-slot:default="{ result, index, maxScore, meta }">
                <NuxtLink
                  :to="meta.href"
                  class="autocomplete__option-title"
                  >
                  {{ meta.title }}
                </NuxtLink>
              </template>
            </UserGuideLunr>
            <span id="search-field__assistiveHint" style="display: none">
              When autocomplete results are available use up and down arrows
              to review and enter to select. Touch device users, explore by
              touch or with swipe gestures.
            </span>
          </div>
        </div>
        <button class="nhsuk-search__close" id="close-search" >
          <svg class="nhsuk-icon nhsuk-icon__close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="27" height="27">
            <path d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
          </svg>
          <span class="nhsuk-u-visually-hidden">Close search</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: String,
  }
}
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/input/input';
@import '~/assets/scss/search';
@import '~/assets/scss/autocomplete';
</style>
