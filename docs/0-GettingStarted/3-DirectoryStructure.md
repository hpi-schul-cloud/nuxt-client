# Folder Structure

## Main Project

The Main Project can be found in the `/src`-directory. This mainly follows the [Nuxt directory structure](https://nuxtjs.org/guide/directory-structure).

### `src/components`

For the Components Directory, we mostly follow the [Atomic Design Guidelines](https://atomicdesign.bradfrost.com):

[![Atomic Design - How to categorize components](https://res.cloudinary.com/practicaldev/image/fetch/s--IHiwlC8g--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/4gd0sforrkoi0g8a4gdw.png)](https://dev.to/maciekchmura/how-i-structure-a-react-project-3c2i)

but with the small extensions `legacy` and `base`. `legacy` contains components that are needed for a consistent design when switching between the new and the legacy client (like the sidebar, topbar, ...). In the long term, we wan't to get rid of all of them. `base` contains our base components that are always available and don't have to be imported manually.

The Component directory therefore now has 5 subdirectories

- atoms
- molecules
- organisms
- templates (currently only used for the error page, because for some reasons we can't store it in the pages directory)
- legacy
- base

#### `/src/components/base`

This base-Directory contains our BaseComponents. Those components must match all off the following rules and must be prefixed with `Base`:

- has no dependencies to other components (except node_modules)
- all visible content (text) and state must be configurable with props

### `/src/mixins`

All Javascript Code that will be shared **between multiple components** should be placed at `/mixins`. What a mixin is can be read [here](https://vuejs.org/v2/guide/mixins.html). To prevent naming collisions of functions, all methods within a mixin must be prefixed with `$_`. For all other helper Methods you should use the `/utils` directory.
