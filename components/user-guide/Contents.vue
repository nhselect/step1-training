<template>
  <div>
    <h3>Contents</h3>
    <nav
      class="nhsuk-contents-list"
      role="navigation"
      aria-label="Pages in this user guide"
    >
      <ol class="nhsuk-contents-list__list">
        <UserGuideContentTree
          v-for="page in contents"
          :key="page.dir"
          :node="page"
          :active="active"
        >
        </UserGuideContentTree>
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
      let pages = await this.$content('user-guide/'+this.role,{deep:true})
        .without(['body'])
        .sortBy('order')
        .fetch()
        .catch((err) => {
          error({ statusCode: 404, message: 'No items retrieved' })
        })

      pages = pages.map((p) => {
        const folders = p.dir.replace('/user-guide/'+this.role,'').split('/').filter(i => i != '')
        const pid = folders[folders.length-2]
        const id = folders[folders.length-1]
        return {...p,folders,pid,id}
      }).filter(i => i.folders.length > 0)

      let arrMap = new Map(pages.map(item => [item.id, item]));
      let tree = [];

      for (let i = 0; i < pages.length; i++) {
        let item = pages[i];

        if (item.pid) {
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
          tree.push(item);
        }
      }

      this.contents = tree
    },
    fetchKey() { return this.role },
  }
</script>

<style lang="scss">
@import "node_modules/nhsuk-frontend/packages/components/contents-list/contents-list";
</style>