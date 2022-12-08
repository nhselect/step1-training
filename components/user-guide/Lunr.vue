<template>
  <component :is="tag" ref="lunr" class="lunr-search">
    <input
      :id="`lunr-search${elementId}`"
      :name="`lunr-search${elementId}`"
      v-model="searchText"
      type="text"
      class="autocomplete__input autocomplete__input--default"
      placeholder="Search"
      aria-label="Search"
      aria-haspopup="true"
      :aria-expanded="showResults"
      autocomplete="off"
      spellcheck="false"
      role="combobox"
      @keyup.enter="keyEnter"
      @keyup.up="keyUp"
      @keyup.down="keyDown"
    >

    <ul
      v-show="showResults"
      ref="results"
      id="search-field__listbox"
      class="lunr-results autocomplete__menu autocomplete__menu--inline"
      tabIndex="-1"
      role="listbox"
      :aria-labelledby="`lunr-search${elementId}`"
      @keyup.enter="keyEnter"
      @keydown.up.stop.prevent
      @keydown.down.stop.prevent
      @keyup.up.stop.prevent="keyUp"
      @keyup.down.stop.prevent="keyDown"
    >
      <li
        v-if="statusMsg"
        class="lunr-status nhsuk-body-s"
      >
        {{ statusMsg }}
      </li>
      <li
        v-for="(result, index) in searchResults"
        :key="`search${elementId}-${result.ref}`"
        class="lunr-result autocomplete__option"
        role="option"
        :tabIndex="100 + index"
        aria-posinset="1"
        aria-setsize="10"
        @click.prevent="closeResults"
      >
        <slot
          :result="result"
          :index="index"
          :max-score="maxScore"
          :meta="getResultMeta(result)"
        >
          <nuxt-link :to="result.ref" role="menuitem">
            {{ result.ref }}
            <span class="text-right">{{ result.score }}</span>
          </nuxt-link>
        </slot>
      </li>
    </ul>
  </component>
</template>

<script>
import lunr from 'lunr'

import lunrStemmer from 'lunr-languages/lunr.stemmer.support'

!lunr.stemmerSupport && lunrStemmer(lunr)

const normalizeLanguage = locale => (locale || '').substr(0, 2).toLowerCase()

const statusMessages = JSON.parse(`{
  "fetching": "Fetching search index",
  "loading": "Loading search index",
  "searching": "Searching...",
  "noresults": "No results found"
}`)

// cache previously loaded indexes
const indexCache = {}

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    },
    placeholder: {
      type: String,
      default: 'search'
    },
    lang: {
      type: String,
      default: '',
      validator: val => ['', 'en'].includes(val)
    },
    locale: {
      type: String,
      default: '',
      validator: val => ['', 'en'].includes(normalizeLanguage(val))
    },
    role: {
      type: String
    }
  },
  data () {
    return {
      placeholderText: '',
      statusMsg: '',
      searchMeta: undefined,
      searchText: '',
      searchResults: [],
      resultsVisible: false
    }
  },
  computed: {
    elementId () {
      return this.id ? `-${this.id}` : ''
    },
    language () {
      if (this.lang) {
        return this.lang
      }

      if (this.locale) {
        return normalizeLanguage(this.locale)
      }

      return 'en'
    },
    showResults () {
      if (this.statusMsg) {
        return true
      }

      if (this.resultsVisible) {
        return true
      }

      return false
    },
    maxScore () {
      if (this.searchResults.length) {
        return Math.max.apply(null, this.searchResults.map(r => r.score))
      }

      return 0
    }
  },
  watch: {
    language (val) {
      this.searchIndex = undefined
      this.searchMeta = undefined
      this.searchResults = []

      this.setPlaceholderText()

      if (this.searchText) {
        this.search(this.searchText)
      }
    },
    searchText (val) {
      if (!val) {
        this.closeResults()
        return
      }

      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => this.search(val), 200)
    },
    showResults (val) {
      if (val) {
        this.addBodyListener()
      } else {
        this.removeBodyListener()
      }
    },
    placeholder (val) {
      this.setPlaceholderText(val)
    }
  },
  created () {
    this.setPlaceholderText()
  },
  methods: {
    addBodyListener () {
      document.body.addEventListener('mousedown', this.bodyListener)
    },
    removeBodyListener () {
      document.body.removeEventListener('mousedown', this.bodyListener)
    },
    bodyListener (event) {
      if (this.$refs.lunr && !this.$refs.lunr.contains(event.target)) {
        this.resultsVisible = false
      }
    },
    closeResults () {
      this.searchText = ''
      this.resultsVisible = false
      this.removeBodyListener()
      this.clearStatus()
    },
    openResults () {
      this.resultsVisible = true
    },
    async loadIndex () {
      if (this.loadingIndex) {
        return this.waitLoadingComplete()
      }

      this.loadingIndex = true

      if (indexCache[this.language]) {
        this.searchIndex = indexCache[this.language].index
        this.searchMeta = indexCache[this.language].meta
        this.loadingIndex = false
        return
      }

      this.setStatus('fetching')
      const url = `/_nuxt/search-index/${this.language}.json`
      const searchJson = await fetch(url).then((res) => {
        if (res.status === 200) {
          return res.json()
        }

        this.setStatus(`Search index: ${res.status} ${res.statusText}`)
      })

      if (!searchJson) {
        this.loadingIndex = false
        return false
      }

      this.setStatus('loading')
      this.searchMeta = searchJson.metas || undefined
      this.searchIndex = lunr.Index.load(searchJson)

      indexCache[this.language] = {
        meta: this.searchMeta,
        index: this.searchIndex
      }

      this.$emit('loaded', {
        lang: this.language,
        json: searchJson
      })

      this.clearStatus()
      this.loadingIndex = false
      return true
    },
    waitLoadingComplete () {
      return new Promise((resolve) => {
        let iter = 0

        const resolveWhenLoaded = () => {
          if (!this.loadingIndex) {
            resolve(true)
            return
          }

          // timeout after 3s
          if (iter >= 15) {
            resolve(false)
          }

          setTimeout(resolveWhenLoaded, 50)
          iter++
        }

        resolveWhenLoaded()
      })
    },
    async search (txt) {
      if (!this.searchIndex) {
        const indexLoaded = await this.loadIndex()

        if (!indexLoaded) {
          return
        }
      }

      this.setStatus('searching')

      this.searchResults = this.searchIndex.search(txt + ' +role:'+this.role).slice(0,10)

      if (!this.searchResults || !this.searchResults.length) {
        this.setStatus('noresults')
      } else {
        this.clearStatus()
      }

      this.openResults()
    },
    clearStatus () {
      this.statusMsg = ''
    },
    setStatus (id) {
      this.statusMsg = this.getStatusText(id)
    },
    getStatusText (statusId) {
      if (statusMessages[statusId]) {
        return statusMessages[statusId]
      }

      return statusId
    },
    setPlaceholderText (text) {
      if (text) {
        this.placeholderText = text
      }
    },
    getResultMeta ({ ref }) {
      if (!this.searchMeta || !this.searchMeta[ref]) {
        return
      }

      return this.searchMeta[ref]
    },
    keyEnter () {
      const el = this.$refs.results.querySelector(':focus')
      if (el) {
        el.querySelector('a').click()
        this.closeResults()
      }
    },
    keyUp () {
      if (!this.showResults) {
        return
      }

      const el = this.$refs.results.querySelector(':focus')
      if (!el) {
        this.$refs.results.querySelector(':last-child').focus()
      } else if (el.previousSibling && el.previousSibling.focus) {
        el.previousSibling.focus()
      }
    },
    keyDown () {
      if (!this.showResults) {
        return
      }

      const el = this.$refs.results.querySelector(':focus')
      if (!el) {
        this.$refs.results.querySelector(':first-child').focus()
      } else if (el.nextSibling) {
        el.nextSibling.focus()
      }
    }
  }
}
</script>
