<template>
  <div>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>User guide for {{ role.title }}s</h1>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-one-third user-guide__contents">
        <UserGuideContents
          :contents="contents"
          :role="role.slug"
          :active="contentPath"
          :framework="framework"
        />
      </div>
      <div class="nhsuk-grid-column-two-thirds">
        <h2>{{ page.title }}</h2>
        <p class="nhsuk-body-s nhsuk-u-secondary-text-color">
          Last changed: {{ page.updatedAt | formatDate }}
        </p>
        <nuxt-content :document="page" />
        <div v-if="page.folders.length > 2 && children && children.length > 0">
          <h3>In this section:</h3>
          <div>
            <nav
              class="nhsuk-contents-list"
              role="navigation"
              aria-label="Pages in this section"
            >
              <ol class="nhsuk-contents-list__list">
                <UserGuideContentTree
                  v-for="page in children"
                  :key="page.dir"
                  :node="page"
                  :active="contentPath"
                  :layer="1"
                >
                </UserGuideContentTree>
              </ol>
            </nav>
          </div>
        </div>
        <UserGuideRating
          v-if="page.rating"
          :key="$route.fullPath"
          :path="$route.path"
          :role="role.title"
          :framework="framework"
          :guide="page.title"
        />
        <UserGuidePagination :prev="prev" :next="next" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate: (dateStr) =>
      Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(dateStr)),
  },
  scrollToTop: true,
  async asyncData({ $content, params, error }) {
    const contentPath = `/user-guide/${params.role}/${params.pathMatch}/index`

    // fetch role info content
    const role =
      params.role !== 'non-clinical-centre-managers'
        ? await $content('roles/' + params.role).fetch()
        : {
            title: 'Non-clinical Centre Manager',
            slug: 'non-clinical-centre-managers',
          }

    const framework = params.framework || 'steps'

    // fetch current page content
    const page = await $content(contentPath)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'No guides retrieved' })
      })

    // fetch full directory list without body
    const pages = await $content('user-guide/' + params.role, { deep: true })
      .without(['body'])
      // .where({ id: { $ne: params.role }})
      .sortBy('order')
      .fetch()

    const pagesRedirected = pages.map((item) => {
      item.dir = item.dir.replace(`user-guide/${params.role}`,`${framework}/${params.role}/user-guide`)
      return item
    })

    const arrMap = new Map(pagesRedirected.map((item) => [item.id, item]))

    const ordering = pagesRedirected.sort((a, b) => {
      const maxDepth = Math.max(a.folders.length, b.folders.length)

      for (let i = 0; i < maxDepth; i++) {
        const aObj = arrMap.get(a.folders[i])
        const bObj = arrMap.get(b.folders[i])
        const aObjOrder = aObj ? aObj.order : 0
        const bObjOrder = bObj ? bObj.order : 0

        if (aObjOrder < bObjOrder) return -1
        else if (aObjOrder > bObjOrder) return 1
      }
      return 0
    })

    const prev = ordering[ordering.findIndex((e) => e.path === contentPath) - 1]
    const next = ordering[ordering.findIndex((e) => e.path === contentPath) + 1]

    const children = ordering.filter((e) => e.pid === page.id)

    const contents = []

    for (let i = 0; i < pagesRedirected.length; i++) {
      const item = pagesRedirected[i]

      if (item.pid && item.pid !== params.role) {
        const parentItem = arrMap.get(item.pid)

        if (parentItem) {
          const { children } = parentItem

          if (children) {
            parentItem.children.push(item)
          } else {
            parentItem.children = [item]
          }
        }
      } else {
        contents.push(item)
      }
    }

    const breadcrumbs = 
      [
        {
          title: `${role.title} training`,
          url: `/${framework}/${role.slug}`
        },
        {
          title: `User guide`,
          url: `/${framework}/${role.slug}/user-guide/`
        }
      ].concat(
        params.pathMatch
          .split('/')
          .map((f) => {
            return arrMap.get(f) || null
          })
          .filter((f) => f !== null)
          .map((f) => {
            const title = f.title
            const url = f.dir

            return {
              title,
              url
            }
          })
      )

    return {
      contentPath,
      role,
      page,
      contents,
      children,
      prev,
      next,
      params,
      breadcrumbs,
      framework
    }
  },
  head() {
    return {
      title:
        `${this.page.title} (Digitised proficiencies user guide for ${this.role.title}s)`
    }
  },
}
</script>

<style lang="scss">
.user-guide__contents {
  border-right: 1px solid $color_nhsuk-grey-4;
}

.nuxt-content {
  img {
    outline: 2px solid $color_nhsuk-blue;
    outline-offset: -2px;
    max-width: 100%;
  }

  blockquote {
    border: 4px solid $color_nhsuk-pink;
    @include nhsuk-responsive-margin(4, 'bottom');
    @include nhsuk-responsive-padding(4);

    *:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
