# How to make fallback routes to the old client?

This project is running in a parallel mode with the old client:

[https://github.com/schul-cloud/schulcloud-client](https://github.com/schul-cloud/schulcloud-client)

You need to have the legacy client running to use most of this service, because by default we are routing everything to the old client using a server proxy middleware.

## Create a new Vue Page

To create and use a new vue page, simply add a regex to the [`routes.js` (src/serverMiddleware/routes.js)](https://github.com/schul-cloud/nuxt-client/tree/develop/src/serverMiddleware/routes.js) that matches the route of your new page.
All pages that match any of the specified regex there will be served with nuxt. Everything else will be forwarded to the legacy client with the [Nuxt Server Middleware](https://nuxtjs.org/api/configuration-servermiddleware/) [`proxy.js` (src/serverMiddleware/proxy.js)](https://github.com/schul-cloud/nuxt-client/tree/develop/src/serverMiddleware/proxy.js).
