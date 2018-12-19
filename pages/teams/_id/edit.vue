<template lang="pug">
div(v-if="team")
  section.section
    h4
      span
        nuxt-link(:to="{ name: 'teams' }")
          | Teams 
      span
        nuxt-link(:to="{ name: 'teams-id', params: { id: team._id } }")
          | / {{ team.name }} 
      span / Bearbeiten
    h1 Team bearbeiten
    button.button.is-danger(@click="confirmDelete") Löschen

  section.section
    b-field(label="Name")
        b-input(type="text" v-model="team.name" placeholder="Dream Team" maxlength="30")
    b-field(label="Beschreibung")
        b-input(type="textarea" v-model="team.description" placeholder="Everything you have to know" maxlength="255")
    button.button.is-primary(@click="save()") Speichern
    
  section.section
    h1 {{ team.name }}
    h5 {{ team.description }}
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
    ...mapActions('teams', ['remove']),
    confirmDelete() {
        this.$dialog.confirm({
            title: 'Team löschen',
            message: 'Bist du sicher, dass du das Team löschen möchtest?',
            confirmText: 'Team löschen',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: async () => {
              try {
                await this.remove(this.team._id);
                this.$toast.open('Team gelöscht')  
                this.$router.push({ name: 'teams' })                            
              } catch (e) {
                this.$toast.open({
                  message: 'Fehler beim löschen',
                  type: 'is-error'
                })              
              }
            }
        })        
    } ,
    get (id) {
      this.$store.dispatch('teams/get', id)
    },
    async save () {
      try {
        await this.$store.dispatch('teams/patch', [this.$route.params.id, {
          name: this.team.name,
          description: this.team.description
        }])
        this.$toast.open({
          message: 'Team gespeichert',
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
