<template lang="pug">
div(v-if="news")
  section.section
    nuxt-link(:to="{ name: 'news-id', params: { id: news._id } }")
      h5 {{ news.title }} 
    h1 News bearbeiten
    button.button.is-danger(@click="confirmDelete") Löschen

  section.section
    b-field(label="Name")
        b-input(type="text" v-model="news.title" maxlength="30")
    b-field(label="Beschreibung")
        b-input(type="textarea" v-model="news.content")
    button.button.is-primary(@click="save()") Speichern
    
  section.section
    h1 {{ news.title }}
    div(v-html="news.content")
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
    ...mapActions('news', ['remove']),
    confirmDelete() {
        this.$dialog.confirm({
            title: 'Artikel löschen',
            message: 'Bist du sicher, dass du diesen Artikel löschen möchtest?',
            confirmText: 'Artikel löschen',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: async () => {
              try {
                await this.remove(this.news._id);
                this.$toast.open('Artikel gelöscht')  
                this.$router.push({ name: 'news' })                            
              } catch (e) {
                this.$toast.open({
                  message: 'Fehler beim Löschen',
                  type: 'is-error'
                })              
              }
            }
        })        
    } ,
    get (id) {
      this.$store.dispatch('news/get', id)
    },
    async save () {
      try {
        await this.$store.dispatch('news/patch', [this.$route.params.id, {
          name: this.news.name,
          content: this.news.content
        }])
        this.$toast.open({
          message: 'Artikel gespeichert',
          type: 'is-success'
        })      
      } catch (e) {
        this.$toast.open({
          message: 'Fehler beim Speichern',
          type: 'is-error'
        })
      }
    }
  }
}
</script>
