<template lang="pug">
div(v-if="team")
  section.section
    h1 {{ team.name }}
    h5 {{ team.description }}
  
  section.section
    h3 Teilnehmer
  
  section.section
    h3 News

  section.section
    h3 Dateien & Ordner
    h4 Ordner
    h4 Dateien

  section.section
    h3 Termine

  section.section
    h3 Themen & Aufgaben
</template>


<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('teams', {
      team: 'current'
    })
  },
  created (ctx) {
    console.log(this.$route.params)
    this.get(this.$route.params.id);
  },  
  methods: {
    get (id) {
      this.$store.dispatch('teams/get', id)
    },
    ...mapActions('auth', ['logout']),
  }
}
</script>
