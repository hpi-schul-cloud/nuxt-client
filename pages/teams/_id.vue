<template lang="pug">
div
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
import teams from './teams.js'

export default {
  asyncData (ctx) {
    const team = teams.find(t => t.id == ctx.params.id)
    return {
      team: team || {}
    }
  },
  props: {
    // team: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // }
  }
}
</script>
