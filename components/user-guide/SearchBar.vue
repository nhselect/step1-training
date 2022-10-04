<template>
  <div class="nhsuk-header__content" id="content-header">
    <div class="nhsuk-header__search">
      <button class="nhsuk-header__search-toggle" id="toggle-search" aria-controls="search" aria-label="Open search">
        <svg class="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="27" height="27">
          <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
        </svg>
        <span class="nhsuk-u-visually-hidden">Search</span>
      </button>
      <div class="nhsuk-header__search-wrap" id="wrap-search">
        <form class="nhsuk-header__search-form" id="search" role="search">
          <label class="nhsuk-u-visually-hidden" for="search-field">Search the NHS website</label>
          <div class="autocomplete-container" id="autocomplete-container"><div class="autocomplete__wrapper">
            <div style="border: 0; clip: rect(0, 0, 0, 0); height: 1px; margin-bottom: -1px; margin-right: -1px; overflow: hidden; padding: 0; position: absolute; white-space: nowrap; width: 1px;">
              <div id="search-field__status--A" role="status" aria-atomic="true" aria-live="polite"></div>
              <div id="search-field__status--B" role="status" aria-atomic="true" aria-live="polite"></div>
            </div>
            <input v-model="query" aria-expanded="false" aria-owns="search-field__listbox" aria-autocomplete="list" autocomplete="off" class="autocomplete__input autocomplete__input--default" id="search-field" name="search-field" placeholder="Search" type="text" role="combobox">
            <ul v-if="articles.length" class="autocomplete__menu autocomplete__menu--inline" id="search-field__listbox" role="listbox">
              <li v-for="article of articles" :key="article.dir" aria-selected="false" class="autocomplete__option" id="search-field__option--0" role="option" tabindex="-1" aria-posinset="1" aria-setsize="10">
                <NuxtLink class="autocomplete__option-title" :to="article.dir">
                  {{ article.title }}
                </NuxtLink>
              </li>
            </ul>
            <span id="search-field__assistiveHint" style="display: none;">
              When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.
            </span>
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      role: String,
    },
    data () {
      return {
        query: '',
        articles: []
      }
    },
    watch: {
      async query (query) {
        if (!query) {
          this.articles = []
          return
        }
        this.articles = await this.$content('user-guide/'+this.role,{deep:true})
          .only(['title', 'slug', 'dir'])
          .sortBy('createdAt', 'asc')
          .search(query)
          .limit(12)
          .fetch()
      }
    }
  };
</script>

<style lang="scss">
@import "node_modules/nhsuk-frontend/packages/components/input/input";
@import "node_modules/nhsuk-header-search--test/src/scss/header-search";
</style>
