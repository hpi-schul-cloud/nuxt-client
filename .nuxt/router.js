import { createRouter as customCreateRouter } from '../src/router/index.js'

const createDefaultRouter = null
const routerOptions = null

export function createRouter(ssrContext, config, store) {
  return customCreateRouter(ssrContext, createDefaultRouter, routerOptions, config, store)
}
