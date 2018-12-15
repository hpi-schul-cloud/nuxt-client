<template>
  <section class="section">
    <div class="columns is-mobile">
      <div
        v-for="(team, i) of teams"
        :key="i"
        class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title has-text-grey">
              {{ team.name }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              {{ team.description }}
            </div>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <nuxt-link :to="{ name: 'teams-id', params: { id: team.id } }">Öffnen</nuxt-link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </section>    
</template>

<script>
import teams from './teams.js'

export default {
    asyncData () {
        return {
            teams: teams || []
        };
    }
}
</script>
