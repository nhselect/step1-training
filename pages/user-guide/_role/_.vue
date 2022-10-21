<template>
  <div>
    <UserGuideBreadcrumbs v-if="breadcrumbs.length > 1" :breadcrumbs="breadcrumbs" />
    <h1>User guide for {{role.title}}s</h1>
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-one-third user-guide__contents">
        <UserGuideContents :contents="contents" :role="role.slug" :active="contentPath" />
      </div>
      <div class="nhsuk-grid-column-two-thirds">
        <h2>{{page.title}}</h2>
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
                  :layer=1
                >
                </UserGuideContentTree>
              </ol>
            </nav>
          </div>
        </div>
        <UserGuidePagination :prev="prev" :next="next" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    scrollToTop: true,
    filters: {
      formatDate: (dateStr) =>
        Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(new Date(dateStr)),
    },
    async asyncData({ $content, params, error }) {
      const path = params.pathMatch || ''
      const slug = params.pathMatch.split('/').pop()
      const roleParam = params.role || params.pathMatch
      const contentPath = params.role ? '/user-guide/'+params.role+'/'+params.pathMatch : '/user-guide/'+params.pathMatch

      // fetch role info content
      const role = roleParam !== "non-clinical-centre-managers" ? await $content('roles/'+roleParam)
        .fetch() : {
          title: "Non-clinical Centre Manager",
          slug: "non-clinical-centre-managers"
        }

      // fetch current page content
      const page = await $content(contentPath+'/index')
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'No guides retrieved' })
        })

      // fetch full directory list without body
      let pages = await $content('user-guide/'+roleParam,{deep:true})
        .without(['body'])
        // .where({ id: { $ne: params.role }})
        .sortBy('order')
        .fetch()

      let arrMap = new Map(pages.map(item => [item.id, item]));

      const ordering = pages.sort((a,b) => {
        const maxDepth = Math.max(a.folders.length,b.folders.length)

        for (let i=0;i<maxDepth;i++) {
          const aObj = arrMap.get(a.folders[i])
          const bObj = arrMap.get(b.folders[i])
          const aObjOrder = aObj ? aObj.order : 0
          const bObjOrder = bObj ? bObj.order : 0

          if (aObjOrder < bObjOrder) return -1
          else if (aObjOrder > bObjOrder) return 1
        }
        return 0
      })

      const breadcrumbs = page.folders.map((f) => {
        return arrMap.get(f) || null
      }).filter(f=>f !== null)

      const prev = ordering[ordering.findIndex(e=>e.dir===contentPath)-1]
      const next = ordering[ordering.findIndex(e=>e.dir===contentPath)+1]

      const children = ordering.filter(e=>e.pid===page.id)
      
      let contents = [];
      
      for (let i = 0; i < pages.length; i++) {
        let item = pages[i];

        if (item.pid && item.pid !== roleParam) {
          let parentItem = arrMap.get(item.pid);

          if (parentItem) {
            let { children } = parentItem;

            if (children) {
              parentItem.children.push(item);
            } else {
              parentItem.children = [item];
            }
          }
        } else {
          contents.push(item);
        }
      }

      return {
        contentPath,
        role,
        page,
        contents,
        children,
        prev,
        next,
        breadcrumbs,
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
    @include nhsuk-responsive-margin(4, "bottom");
    @include nhsuk-responsive-padding(4);

    *:last-child {
      margin-bottom: 0
    }
  }
}
</style>