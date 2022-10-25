import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('../src/store/index.ts'), 'store/index.ts')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('../src/store/accounts.ts'), 'accounts.ts')
  resolveStoreModules(require('../src/store/activation.js'), 'activation.js')
  resolveStoreModules(require('../src/store/auth.ts'), 'auth.ts')
  resolveStoreModules(require('../src/store/autoLogout.ts'), 'autoLogout.ts')
  resolveStoreModules(require('../src/store/bulkConsent.js'), 'bulkConsent.js')
  resolveStoreModules(require('../src/store/calendar.js'), 'calendar.js')
  resolveStoreModules(require('../src/store/classes.js'), 'classes.js')
  resolveStoreModules(require('../src/store/consent-versions.js'), 'consent-versions.js')
  resolveStoreModules(require('../src/store/content-search.js'), 'content-search.js')
  resolveStoreModules(require('../src/store/content.ts'), 'content.ts')
  resolveStoreModules(require('../src/store/copy.ts'), 'copy.ts')
  resolveStoreModules(require('../src/store/course-groups.js'), 'course-groups.js')
  resolveStoreModules(require('../src/store/courses.js'), 'courses.js')
  resolveStoreModules(require('../src/store/env-config.ts'), 'env-config.ts')
  resolveStoreModules(require('../src/store/error.js'), 'error.js')
  resolveStoreModules(require('../src/store/filePaths.ts'), 'filePaths.ts')
  resolveStoreModules(require('../src/store/files-poc.ts'), 'files-poc.ts')
  resolveStoreModules(require('../src/store/finished-tasks.ts'), 'finished-tasks.ts')
  resolveStoreModules(require('../src/store/ghost.js'), 'ghost.js')
  resolveStoreModules(require('../src/store/import-users.ts'), 'import-users.ts')
  resolveStoreModules(require('../src/store/insights.js'), 'insights.js')
  resolveStoreModules(require('../src/store/ldap-config.js'), 'ldap-config.js')
  resolveStoreModules(require('../src/store/lessons.js'), 'lessons.js')
  resolveStoreModules(require('../src/store/loading-state.ts'), 'loading-state.ts')
  resolveStoreModules(require('../src/store/messenger.js'), 'messenger.js')
  resolveStoreModules(require('../src/store/news.ts'), 'news.ts')
  resolveStoreModules(require('../src/store/notifier.ts'), 'notifier.ts')
  resolveStoreModules(require('../src/store/public-teachers.js'), 'public-teachers.js')
  resolveStoreModules(require('../src/store/room.ts'), 'room.ts')
  resolveStoreModules(require('../src/store/rooms.ts'), 'rooms.ts')
  resolveStoreModules(require('../src/store/schools.ts'), 'schools.ts')
  resolveStoreModules(require('../src/store/share-course.ts'), 'share-course.ts')
  resolveStoreModules(require('../src/store/status-alerts.ts'), 'status-alerts.ts')
  resolveStoreModules(require('../src/store/task.filter.ts'), 'task.filter.ts')
  resolveStoreModules(require('../src/store/tasks.ts'), 'tasks.ts')
  resolveStoreModules(require('../src/store/teams.js'), 'teams.js')
  resolveStoreModules(require('../src/store/terms-and-conditions.js'), 'terms-and-conditions.js')
  resolveStoreModules(require('../src/store/uiState.js'), 'uiState.js')
  resolveStoreModules(require('../src/store/users.js'), 'users.js')
  resolveStoreModules(require('../src/store/types/alert-payload.ts'), 'types/alert-payload.ts')
  resolveStoreModules(require('../src/store/types/auth.ts'), 'types/auth.ts')
  resolveStoreModules(require('../src/store/types/commons.ts'), 'types/commons.ts')
  resolveStoreModules(require('../src/store/types/content.ts'), 'types/content.ts')
  resolveStoreModules(require('../src/store/types/env-config.ts'), 'types/env-config.ts')
  resolveStoreModules(require('../src/store/types/filePaths.ts'), 'types/filePaths.ts')
  resolveStoreModules(require('../src/store/types/loading-state-payload.ts'), 'types/loading-state-payload.ts')
  resolveStoreModules(require('../src/store/types/news.ts'), 'types/news.ts')
  resolveStoreModules(require('../src/store/types/room.ts'), 'types/room.ts')
  resolveStoreModules(require('../src/store/types/rooms.ts'), 'types/rooms.ts')
  resolveStoreModules(require('../src/store/types/schools.ts'), 'types/schools.ts')
  resolveStoreModules(require('../src/store/types/status-alert.ts'), 'types/status-alert.ts')
  resolveStoreModules(require('../src/store/types/tasks.ts'), 'types/tasks.ts')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '../src/store/accounts.ts',
      '../src/store/activation.js',
      '../src/store/auth.ts',
      '../src/store/autoLogout.ts',
      '../src/store/bulkConsent.js',
      '../src/store/calendar.js',
      '../src/store/classes.js',
      '../src/store/consent-versions.js',
      '../src/store/content-search.js',
      '../src/store/content.ts',
      '../src/store/copy.ts',
      '../src/store/course-groups.js',
      '../src/store/courses.js',
      '../src/store/env-config.ts',
      '../src/store/error.js',
      '../src/store/filePaths.ts',
      '../src/store/files-poc.ts',
      '../src/store/finished-tasks.ts',
      '../src/store/ghost.js',
      '../src/store/import-users.ts',
      '../src/store/index.ts',
      '../src/store/insights.js',
      '../src/store/ldap-config.js',
      '../src/store/lessons.js',
      '../src/store/loading-state.ts',
      '../src/store/messenger.js',
      '../src/store/news.ts',
      '../src/store/notifier.ts',
      '../src/store/public-teachers.js',
      '../src/store/room.ts',
      '../src/store/rooms.ts',
      '../src/store/schools.ts',
      '../src/store/share-course.ts',
      '../src/store/status-alerts.ts',
      '../src/store/task.filter.ts',
      '../src/store/tasks.ts',
      '../src/store/teams.js',
      '../src/store/terms-and-conditions.js',
      '../src/store/uiState.js',
      '../src/store/users.js',
      '../src/store/types/alert-payload.ts',
      '../src/store/types/auth.ts',
      '../src/store/types/commons.ts',
      '../src/store/types/content.ts',
      '../src/store/types/env-config.ts',
      '../src/store/types/filePaths.ts',
      '../src/store/types/loading-state-payload.ts',
      '../src/store/types/news.ts',
      '../src/store/types/room.ts',
      '../src/store/types/rooms.ts',
      '../src/store/types/schools.ts',
      '../src/store/types/status-alert.ts',
      '../src/store/types/tasks.ts',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs|ts)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const propertyStoreModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(propertyStoreModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
