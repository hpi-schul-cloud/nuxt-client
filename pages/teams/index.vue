<template>
  <div>
    <section class="section">
      <h1>Teams</h1>
      <button
        class="button is-primary"
        @click="$router.push({ name: 'teams-create'})"
      >Neues Team erstellen</button>
    </section>
    <section class="section">
      <div class="columns is-tablet">
        <div 
          v-for="(team, i) of teams" 
          :key="i" 
          class="column is-one-third"
        >
          <div class="card">
            <header class="card-header">
              <p class="card-header-title has-text-grey">{{ team.name }}</p>
            </header>
            <div class="card-content">
              <div class="content">{{ team.description }}</div>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <nuxt-link :to="{ name: 'teams-id', params: { id: team._id } }">Öffnen</nuxt-link>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import isAuthenticated from '~/middleware/is-authenticated'

export default {
  middleware: [isAuthenticated],
  computed: {
    ...mapGetters('teams', {
      teams: 'list'
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
