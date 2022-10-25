const middleware = {}

middleware['externally-managed-check'] = require('../src/middleware/externally-managed-check.js')
middleware['externally-managed-check'] = middleware['externally-managed-check'].default || middleware['externally-managed-check']

middleware['is-authenticated'] = require('../src/middleware/is-authenticated.js')
middleware['is-authenticated'] = middleware['is-authenticated'].default || middleware['is-authenticated']

middleware['language-switch'] = require('../src/middleware/language-switch.js')
middleware['language-switch'] = middleware['language-switch'].default || middleware['language-switch']

middleware['links-fallback'] = require('../src/middleware/links-fallback.js')
middleware['links-fallback'] = middleware['links-fallback'].default || middleware['links-fallback']

middleware['permission-check'] = require('../src/middleware/permission-check.js')
middleware['permission-check'] = middleware['permission-check'].default || middleware['permission-check']

middleware['redirects'] = require('../src/middleware/redirects.js')
middleware['redirects'] = middleware['redirects'].default || middleware['redirects']

export default middleware
