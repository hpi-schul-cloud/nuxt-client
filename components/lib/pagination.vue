<template>
  <nav 
    class="pagination is-rounded is-centered" 
    role="navigation" 
    aria-label="pagination">
    <ul class="pagination-list">
      <li>
        <a 
          class="pagination-link" 
          aria-label="Goto previous page" 
          @click="previousPage">←</a>
      </li>
      <li>
        <a 
          class="pagination-link is-current" 
          aria-label="Page 46" 
          aria-current="page">{{ currentPage }}</a>
      </li>
      <li>
        <a 
          class="pagination-link" 
          aria-label="Goto next page" 
          @click="nextPage">→</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  model: {
    event: 'update'
  },
  props: {
    state: {
      type: Object,
      default: () => {
        return {
          limit: 10,
          skip: 0,
          total: 0
        }
      }
    },
    value: {
      // number of skipped items ( $skip: 0 )
      type: Number,
      default: 0
    }
  },
  computed: {
    currentPage() {
      return this.state.skip / this.state.limit + 1
    },
    pages() {
      return Math.ceil(this.state.total / this.state.limit)
    }
  },
  methods: {
    gotoPage(pageNumber) {
      this.updateModel(this.state.limit * (pageNumber - 1))
    },
    previousPage() {
      this.updateModel(this.value - this.state.limit)
    },
    nextPage() {
      this.updateModel(this.value + this.state.limit)
    },
    updateModel(itemsSkipped) {
      this.$emit('update', itemsSkipped)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
