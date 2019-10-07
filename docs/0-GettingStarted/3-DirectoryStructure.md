# Folder Structure

## Main Project

The Main Project can be found in the `/src`-directory. This mainly follows the [Nuxt directory structure](https://nuxtjs.org/guide/directory-structure).

We extended this structure with the following directories:

### `/src/components/base`

This UI-Directory contains our BaseComponents. Those components must match all off the following rules and must be prefixed with `Base`:

- has no dependencies to other components (except node_modules)
- all visible content (text) and state must be configurable with props

### `/src/mixins`

All Javascript Code that will be shared between multiple components should be placed here. What a mixin is can be read [here](https://vuejs.org/v2/guide/mixins.html). To prevent naming collisions of functions, all methods within a mixin must be prefixed with `$_`.
