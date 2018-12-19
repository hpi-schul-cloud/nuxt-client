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
          <article
            :class="{ 'is-primary': i % 3 == 0, 'is-info': i % 3 == 1, 'is-success': i % 3 == 2 }"
            class="tile is-child notification"
          >
            <p class="title">{{ course.name }}</p>
            <p class="subtitle">
              {{ course.description }}
            </p>
            <p>
              <nuxt-link :to="{ name: 'courses-id', params: { id: course._id } }">Anschauen</nuxt-link>
            </p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
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
      this.$store.dispatch('teams/find')
    }
  }
}
</script>
