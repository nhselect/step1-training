<template>
  <div>
    <h3>Contents</h3>
    <nav class="nhsuk-contents-list" role="navigation" aria-label="Pages in this guide">
      <ol>
        <li v-for="stage in contents" :key="stage.title">
          {{ stage.title }}
          <ol class="nhsuk-contents-list__list">
            <li 
              v-for="page in stage.pages"
              :key="page.slug"
              class="nhsuk-contents-list__item"
            >
              <span
                v-if="active == page.slug"
                class="nhsuk-contents-list__current"
              >
                {{ page.title }}
              </span>
              <NuxtLink
                v-else
                class="nhsuk-contents-list__link" :to="page.slug">
                {{ page.title }}
              </NuxtLink>
            </li>
          </ol>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
  export default {
    props: {
      active: {
        type: String,
        required: false,
        default: '',
      },
      role: {
        type: String,
        required: true,
      }
    },
    data: () => ({
      contents: []
    }),
    async fetch() {
      this.pages = await this.$content('user-guide')
        .where({
          roles: { $contains: this.role },
        })
        .only(['title','order','slug','stage'])
        .sortBy('order')
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'No items retrieved' })
        })

      const stageList = this.pages.map(p => p.stage)

      this.stages = await this.$content('user-guide-stages')
        .where({
          title: { $in: stageList }
        })
        .sortBy('order')
        .fetch()

      this.contents = this.stages.map((s) => {
        const title = s.title
        const pages = this.pages.filter(p => p.stage == title)
        return {
          title,
          pages
        }
      })
    },
    fetchKey() { return this.role }
  }
</script>

<style lang="scss">
@import 'node_modules/nhsuk-frontend/packages/components/contents-list/contents-list';
</style>