<template lang="pug">
div(v-if="team")
  section.section
    nuxt-link(:to="{ name: 'teams-id', params: { id: team._id } }")
      h4 {{ team.name }} 
    h1 Mitglieder Übersicht

  section.section
    .columns
      .column
        p Füge Lehrer und Schüler aus deiner Schule zum Team hinzu.
        button.button.is-primary(@click="$router.push({ name: 'teams-id-members', params: { id: team._id } })")
          | Interne Teilnehmer hinzufügen
      .column
        p Lade Lehrer anderer Schulen und Experten per E-Mail ein.
        button.button.is-primary(@click="$router.push({ name: 'teams-id-members', params: { id: team._id } })")
          | Externe Teilnehmer hinzufügen

  section
    button.button.field.is-danger(@click="selected = null" :disabled="!selected")
      b-icon(icon="close")
      span Clear selected
    b-tabs
      b-tab-item(label="Table")
        b-table(:data="team.userIds" :columns="columns" :selected.sync="selected" focusable="")
      b-tab-item(label="Selected")
        pre.
          \n{{ selected }}            

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      selected: null,
      columns: [
          {
              field: '_id',
              label: 'ID',
              width: '40',
              numeric: true
          },
          {
              field: 'firstName',
              label: 'First Name',
          },
          {
              field: 'lastNAme',
              label: 'Last Name',
          }
      ]      
    }
  },
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
      this.$store.dispatch('teams/get', [id, {
        query: {
          $populate: [
              {
                path: 'userIds.userId',
                populate: ['schoolId']
              },
              {
                path: 'userIds.role',
              }
          ],
        }
      }])
    }
  }
}
</script>