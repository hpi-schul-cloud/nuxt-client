import Vue from 'vue'
const feathers = require('@feathersjs/feathers')
const auth = require('@feathersjs/authentication-client')
const io = require('socket.io-client')
const socketio = require('@feathersjs/socketio-client')
const moment = require('moment')
const { CookieStorage } = require('cookie-storage')

const BACKEND_URL = 'http://localhost:3030'
const socket = io(BACKEND_URL)

console.log('Backend URL:', BACKEND_URL)
console.log('Cookie Domain:', process.env.cookieDomain)

let app = feathers()
  .configure(socketio(socket, { timeout: 60000 }))
  .configure(auth({
    storage: new CookieStorage({
      // domain: 'localhost',
      // path: '/',
      // expires: moment().add(14, 'd').toDate(),
      // secure: false
    }),
    storageKey: 'schulcloud-jwt'
  }))

export default ctx => {
  Vue.use(Vue => {
    if (!Vue.prototype.hasOwnProperty('$feathers')) {
      Object.defineProperty(Vue.prototype, '$feathers', {
        get () { return app }
      })
    }
  })

  ctx.app.$feathers = app
}

export {
  app,
  socket
}
