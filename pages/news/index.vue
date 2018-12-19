<template>
  <section class="section">
    <h1>News</h1>
    <div class="columns is-tablet">
      <div 
        v-for="(article, i) of news" 
        :key="i" 
        class="column is-one-third">
        <div class="card">
          <header class="card-header">
            <h4 class="card-header-title has-text-grey">{{ article.title }}</h4>
          </header>
          <div class="card-content">
            <!-- <div class="content">{{ article.content }}</div> -->
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <nuxt-link :to="{ name: 'news-id', params: { id: article._id } }">Weiterlesen</nuxt-link>
            </div>
          </footer>
        </div>
      </div>
    </div>    
  </section>
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import isAuthenticated from '~/middleware/is-authenticated'

export default {
  computed: {
    ...mapGetters('news', {
      news: 'list'
    })
  },
  created(ctx) {
    this.find();
  },  
  methods: {
    find () {
      this.$store.dispatch('news/find')
    }
  }
}
</script>