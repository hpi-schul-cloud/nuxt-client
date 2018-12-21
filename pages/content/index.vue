<template>
  <section class="section">
    <h1>Lernstore</h1>
    <input
      v-model.lazy="searchQuery"
      class="input"
      type="text"
      placeholder="Suche nach...">
    <div class="columns is-multiline is-mobile">
      <div
        v-for="(content, i) of searchResults"
        :key="i"
        class="column"
      >
        <ContentCard
          :data="content"
        />
      </div>
    </div>
    <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
        <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
        <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ContentCard from './contentCard.vue'

export default {
  name: 'CardFooter',
  components: {
    ContentCard
  },
  props: {
  },
  data(){
    return {
      searchQuery: ""
    }
  },
  computed: {
    ...mapGetters('content_search', {
      searchResults: 'list'
    })
  },
  watch: {
    searchQuery(to, from) {
      if (to != from) {
        find(to);
      }
    },
  },
  created(ctx) {
    this.find("");
  },
  methods: {
    find (searchString) {
      console.log("search for", this.searchQuery)
      this.$store.dispatch('content_search/find', {
        "$match[_all": this.searchQuery
      })
    }
  },
  watch: {
    searchQuery(to, from) {
      if (to != from) {
        this.find(to);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  input.input {
    margin-bottom: 2rem;
  }
</style>
