<template>
  <div>
    <section class="section">
      <h1>Kurse</h1>
      <button
        class="button is-info"
        @click="$router.push({ name: 'courses-create'})"
      >Neues Kurs erstellen</button>
    </section>
    <section class="section">
      <div class="tile is-ancestor">
        <div
          v-for="(course, i) of courses"
          :key="i"
          class="tile is-parent is-4">
          <CourseCard :course="course"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CourseCard from '~/components/courses/CourseCard';

export default {
  components: {
    CourseCard
  },
  computed: {
    ...mapGetters('courses', {
      courses: 'list'
    })
  },
  created(ctx) {
    this.find()
  },
  methods: {
    find() {
      this.$store.dispatch('courses/find')
    }
  }
}
</script>
