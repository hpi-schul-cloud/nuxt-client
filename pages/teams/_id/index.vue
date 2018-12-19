<template lang="pug">
div(v-if="team")
  section.section
    h5
      span
        nuxt-link(:to="{ name: 'teams' }")
          | Teams 
      span / {{ team.name }}
    p {{ team.description }}
    hr 
    button.button.is-info(
      @click="$router.push({ name: 'teams-id-edit'})"
    ) Team bearbeiten
  
  section.section(v-if="team.userIds")
    h3 Teilnehmer
    p Es befinden sich {{ team.userIds.length }} Teilnehmer im Team
    button.button.is-info(@click="$router.push({ name: 'teams-id-members', params: { id: team._id } })") Zur Teilnehmer-Übersicht
  
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
    this.get(this.$route.params.id);
  },  
  methods: {
    get (id) {
      this.$store.dispatch('teams/get', id)
    }
  }
}
</script>
