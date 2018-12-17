<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/">
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28">
        </a>
        <nuxt-link
          class="navbar-item"
          to="/login">Login
        </nuxt-link>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Übersicht', to: { name: 'index' } },
        { title: 'Neuigkeiten', to: { name: 'news' } },
        { title: 'Teams', to: { name: 'teams' } },
        { title: 'Kurse', to: { name: 'courses' } },
        { title: 'Termine', to: { name: 'events' } },
        { title: 'Aufgaben', to: { name: 'tasks' } },
        { title: 'Meine Dateien', to: { name: 'files' } },
        { title: 'Lernstore', to: { name: 'content' } },
        { title: 'Verwaltung', to: { name: 'administration' } },
      ]
    }
  }
}
</script>
