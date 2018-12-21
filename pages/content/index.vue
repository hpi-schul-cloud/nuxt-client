<template>
  <section class="section">
    <h1>Lernstore</h1>
    <Searchbar
      v-model.lazy="searchQuery"
      type="text"
      placeholder="Suche nach..." />
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
    <Pagination />
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ContentCard from './contentCard.vue'
import Searchbar from '~/components/searchbar.vue'
import Pagination from '~/components/pagination.vue'

export default {
  name: 'CardFooter',
  components: {
    ContentCard,
    Searchbar,
    Pagination
  },
  props: {
  },
  data(){
    return {
      searchQuery: this.$route.query.q || ""
    }
  },
  computed: {
    ...mapGetters('content_search', {
      searchResults: 'list'
    })
  },
  created(ctx) {
    this.find(this.searchQuery);
  },
  methods: {
    find (searchString) {
      const query = {};
      if(searchString){
        query["_all[$match]"] = this.searchQuery;
      }
      this.$store.dispatch('content_search/find', {
        query: query
      });
      this.$router.push({query: {q: this.searchQuery}})
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
