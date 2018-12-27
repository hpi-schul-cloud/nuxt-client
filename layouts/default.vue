<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation">
      <div 
        class="navbar-brand" >
        <a
          class="navbar-item"
          href="/">
          <img
            src="~assets/cloud.svg"
            alt="Schul-Cloud"
            style="width: 78px"
          >
        </a>

        <nuxt-link
          v-if="!authenticated"
          class="navbar-item"
          to="/login">
          Login
        </nuxt-link>

        <span 
          v-if="authenticated"
          class="navbar-item"        
        >
          Hallo, {{ firstName }}
        </span>

        <a
          v-if="authenticated"
          class="navbar-item"
          @click="logout(); $router.push('login')">
          Logout
        </a>

        <div class="navbar-burger">
          <span/>
          <span/>
          <span/>
        </div>
      </div>
    </nav>

    <section class="main-content columns">

      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key">
            <nuxt-link
              :to="item.to"
              exact-active-class="is-active">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>

    </section>
  
    <footer class="footer">
      <div class="content has-text-centered">
        <div class="is-flex align-items-center justify-content-center">
          <img 
            style="height: 35px" 
            src="/images/footer-logo.png" 
            alt="Anbieterlogo">
          <span>© 2018 Schul-Cloud </span>
        </div>

        <div class="mt-2">
          <a 
            href="/impressum" 
            target="_blank">Impressum</a>
          <span> - </span>
          <a 
            href="/impressum#data_security" 
            target="_blank">Datenschutzerklärung</a>
          <span> - </span>
          <a 
            href="mailto:hpi-info@hpi.de?subject=Schul_Cloud%20Anfrage" 
            target="_blank">Kontakt</a>
          <span> - </span>
          <a 
            href="/team" 
            target="_blank">Team</a>
          <span> - </span>
          <a 
            href="/about" 
            target="_blank">Über das Projekt</a>
          <span> - </span>
          <a 
            href="/community" 
            target="_blank">Mitmachen</a>
          <span> - </span>
          <a 
            href="/partner" 
            target="_blank">Partner</a>
          <span> - </span>
          <a 
            href="https://github.com/schul-cloud/" 
            target="_blank">GitHub</a>
        </div>
        <div class="mt-2">
          <p class="made-with-love">Made with <span class="heart">❤</span> in Potsdam</p>
        </div>
      </div>
    </footer>    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        { title: 'News', to: { name: 'news' } },
        { title: 'Teams', to: { name: 'teams' } },
        { title: 'Kurse', to: { name: 'courses' } },
        { title: 'Termine', to: { name: 'events' } },
        { title: 'Aufgaben', to: { name: 'tasks' } },
        { title: 'Dateien', to: { name: 'files' } },
        { title: 'Lernstore', to: { name: 'content' } },
        { title: 'Verwaltung', to: { name: 'administration' } }
      ]
    }
  },
  computed: mapState({
    firstName: state =>
      state.auth && state.auth.user ? state.auth.user.firstName : '',
    authenticated: state => (state.auth ? state.auth.accessToken : '')
  }),
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
