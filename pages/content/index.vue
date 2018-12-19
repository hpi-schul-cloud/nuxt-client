<template>
  <section class="section">
    <h1>Lernstore</h1>
    <input v-bind:lazy="searchQuery" class="input" type="text" placeholder="Suche nach...">
    <div class="columns is-multiline">
      <div
        v-for="(content, i) of searchResults"
        :key="i"
        class="column">
        <ContentCard :data="content"/>
      </div>
      <div
        v-for="(content, i) of [0,1,2,3,4,5,6,7]"
        :key="i"
        class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
      >
        <ContentCard :data="{
          title: 'Titel',
          description: 'Beschreibung...',
          tags: [
            'schule',
            'bildung'
          ],
          thumbnail: 'https://img.youtube.com/vi/muZmOiiukQE/maxresdefault.jpg'
        }"/>
      </div>
    </div>
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
  created(ctx) {
    this.find("");
  },
  methods: {
    find (searchString) {
      this.$store.dispatch('content_search/find')
    }
  },
  watch: {
    searchQuery(to, from) {
      if (to != from) {
        find(to);
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
