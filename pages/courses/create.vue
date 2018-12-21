<template lang="pug">
div(v-if="course")
  section.section
    h1 Kurs erstellen
    b-field(label="Name")
      b-input(type="text" v-model="course.name" placeholder="Dream Team" maxlength="30")
    b-field(label="Beschreibung")
      b-input(type="textarea" v-model="course.description" placeholder="Everything you have to know" maxlength="255")
    button.button.is-primary(@click="create()") Speichern
    h1 {{ course.name }}
    p {{ course.description }}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      course: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState('auth', {
      user: 'user'
    })
  },
  methods: {
    async create(id) {
      try {
        const course = await this.$store.dispatch('courses/create', {
          schoolId: this.user.schoolId,
          name: this.course.name,
          description: this.course.description
        })

        this.$toast.open({
          message: 'Kurs erstellt',
          type: 'is-success'
        })

        this.$router.push({ name: 'courses' })
      } catch (e) {
        this.$toast.open({
          message: 'Fehler beim Erstellen des Kurses',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
