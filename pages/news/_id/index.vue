<template lang="pug">
div(v-if="news")
  section.section
    h5
      span
        nuxt-link(:to="{ name: 'news' }")
          | News 
      span / {{ news.title }}
    div(v-html="news.content")
    hr 
    button.button.is-info(
      @click="$router.push({ name: 'news-id-edit'})"
    ) Artikel bearbeiten
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('news', {
      news: 'current'
    })
  },
  created (ctx) {
    this.get(this.$route.params.id);
  },  
  methods: {
    get (id) {
      this.$store.dispatch('news/get', id)
    }
  }
}
</script>
