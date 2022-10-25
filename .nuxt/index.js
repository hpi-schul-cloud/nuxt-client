import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../src/layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_6f03fd90 from 'nuxt_plugin_plugin_6f03fd90' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_plugin_53fd0ede from 'nuxt_plugin_plugin_53fd0ede' // Source: ./composition-api/plugin.mjs (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_f9df0b98 from 'nuxt_plugin_cookieuniversalnuxt_f9df0b98' // Source: ./cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_toast_6285bf3b from 'nuxt_plugin_toast_6285bf3b' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_axios_d3551ae8 from 'nuxt_plugin_axios_d3551ae8' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_router_2eb52aba from 'nuxt_plugin_router_2eb52aba' // Source: ./router.js (mode: 'all')
import nuxt_plugin_polyfills_0ddaccea from 'nuxt_plugin_polyfills_0ddaccea' // Source: ../src/plugins/polyfills (mode: 'all')
import nuxt_plugin_axiosaccessor_62d29b97 from 'nuxt_plugin_axiosaccessor_62d29b97' // Source: ../src/plugins/axios-accessor (mode: 'all')
import nuxt_plugin_axios_630a4306 from 'nuxt_plugin_axios_630a4306' // Source: ../src/plugins/axios (mode: 'all')
import nuxt_plugin_configInit_adb7746a from 'nuxt_plugin_configInit_adb7746a' // Source: ../src/plugins/configInit (mode: 'all')
import nuxt_plugin_global_0a77727c from 'nuxt_plugin_global_0a77727c' // Source: ../src/plugins/global (mode: 'all')
import nuxt_plugin_authenticate_5d424eee from 'nuxt_plugin_authenticate_5d424eee' // Source: ../src/plugins/authenticate (mode: 'all')
import nuxt_plugin_user_d9d58638 from 'nuxt_plugin_user_d9d58638' // Source: ../src/plugins/user (mode: 'all')
import nuxt_plugin_i18n_d9e26992 from 'nuxt_plugin_i18n_d9e26992' // Source: ../src/plugins/i18n (mode: 'all')
import nuxt_plugin_datetime_54d04fd8 from 'nuxt_plugin_datetime_54d04fd8' // Source: ../src/plugins/datetime (mode: 'all')
import nuxt_plugin_vuelidate_59a17a38 from 'nuxt_plugin_vuelidate_59a17a38' // Source: ../src/plugins/vuelidate (mode: 'all')
import nuxt_plugin_iconfonts_ced4c89c from 'nuxt_plugin_iconfonts_ced4c89c' // Source: ../src/plugins/iconfonts (mode: 'all')
import nuxt_plugin_storeaccessor_1b32778c from 'nuxt_plugin_storeaccessor_1b32778c' // Source: ../src/plugins/store-accessor (mode: 'all')
import nuxt_plugin_notifier_0e8e6ee4 from 'nuxt_plugin_notifier_0e8e6ee4' // Source: ../src/plugins/notifier.ts (mode: 'all')
import nuxt_plugin_meta_7e11ed20 from 'nuxt_plugin_meta_7e11ed20' // Source: ./composition-api/meta.mjs (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"dBildungscloud","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"The next Level of Dataport Bildungscloud"}],"link":[{"rel":"icon","type":"image\u002Fpng","href":"\u002Fthemes\u002Fdefault\u002Ffavicon.png"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_6f03fd90 === 'function') {
    await nuxt_plugin_plugin_6f03fd90(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_53fd0ede === 'function') {
    await nuxt_plugin_plugin_53fd0ede(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_f9df0b98 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_f9df0b98(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_6285bf3b === 'function') {
    await nuxt_plugin_toast_6285bf3b(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_d3551ae8 === 'function') {
    await nuxt_plugin_axios_d3551ae8(app.context, inject)
  }

  if (typeof nuxt_plugin_router_2eb52aba === 'function') {
    await nuxt_plugin_router_2eb52aba(app.context, inject)
  }

  if (typeof nuxt_plugin_polyfills_0ddaccea === 'function') {
    await nuxt_plugin_polyfills_0ddaccea(app.context, inject)
  }

  if (typeof nuxt_plugin_axiosaccessor_62d29b97 === 'function') {
    await nuxt_plugin_axiosaccessor_62d29b97(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_630a4306 === 'function') {
    await nuxt_plugin_axios_630a4306(app.context, inject)
  }

  if (typeof nuxt_plugin_configInit_adb7746a === 'function') {
    await nuxt_plugin_configInit_adb7746a(app.context, inject)
  }

  if (typeof nuxt_plugin_global_0a77727c === 'function') {
    await nuxt_plugin_global_0a77727c(app.context, inject)
  }

  if (typeof nuxt_plugin_authenticate_5d424eee === 'function') {
    await nuxt_plugin_authenticate_5d424eee(app.context, inject)
  }

  if (typeof nuxt_plugin_user_d9d58638 === 'function') {
    await nuxt_plugin_user_d9d58638(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_d9e26992 === 'function') {
    await nuxt_plugin_i18n_d9e26992(app.context, inject)
  }

  if (typeof nuxt_plugin_datetime_54d04fd8 === 'function') {
    await nuxt_plugin_datetime_54d04fd8(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_59a17a38 === 'function') {
    await nuxt_plugin_vuelidate_59a17a38(app.context, inject)
  }

  if (typeof nuxt_plugin_iconfonts_ced4c89c === 'function') {
    await nuxt_plugin_iconfonts_ced4c89c(app.context, inject)
  }

  if (typeof nuxt_plugin_storeaccessor_1b32778c === 'function') {
    await nuxt_plugin_storeaccessor_1b32778c(app.context, inject)
  }

  if (typeof nuxt_plugin_notifier_0e8e6ee4 === 'function') {
    await nuxt_plugin_notifier_0e8e6ee4(app.context, inject)
  }

  if (typeof nuxt_plugin_meta_7e11ed20 === 'function') {
    await nuxt_plugin_meta_7e11ed20(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
