# BREAKING CHANGES

- [Vue.2x -> Vue.3x](https://v3-migration.vuejs.org/breaking-changes/)
- [Vuetify.2x -> Vuetify.3x](https://vuetifyjs.com/en/getting-started/upgrade-guide/)
- [Vuex.3x -> Vuex.4x](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html)
- [Vue Router.3x -> Vuex.4x](https://router.vuejs.org/guide/migration/)
- [Vue Test Utils](https://test-utils.vuejs.org/migration/)
- [vue instance vs app instance](https://v3-migration.vuejs.org/breaking-changes/global-api.html)

  | 2.x Global API             | 3.x Instance API (app)                     |
  | -------------------------- | ------------------------------------------ |
  | Vue.config                 | app.config                                 |
  | Vue.config.productionTip   | **removed**                                |
  | Vue.config.ignoredElements | app.config.compilerOptions.isCustomElement |
  | Vue.component              | app.component                              |
  | Vue.directive              | app.directive                              |
  | Vue.mixin                  | app.mixin                                  |
  | Vue.use                    | app.use                                    |
  | Vue.prototype              | app.config.globalProperties                |
  | Vue.extend                 | **removed**                                |
  | Vue.set                    | can be replaced by just setting `reactive` properties (used in `src/utils/service-template.js`) |
