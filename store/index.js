import Vue from 'vue'
import Vuex from 'vuex'
import { app } from './feathers-client'

// Fix memory leak with ssr
const enableEvents = typeof window !== 'undefined'
import feathersVuex, { initAuth } from 'feathers-vuex'
const { service, auth } = feathersVuex(app, { idField: '_id' })
const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {
      increment (state) {
        state.counter++
      }
    },
    actions: {
      nuxtServerInit ({ commit, dispatch }, { req }) {
        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'schulcloud-jwt'
        })
      }
    },
    plugins: [
      service('teams'),
      service('schools'),
      auth({
        state: {
          publicPages: [
            'login',
            'signup'
          ]
        }
      })
    ]
  })
}
export default createStore
