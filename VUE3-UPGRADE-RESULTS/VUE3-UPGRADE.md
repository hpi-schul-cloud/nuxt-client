# VUE V3 UPGRADE

## Slots

If you are still using the [deprecated named / scoped slot syntax](https://v2.vuejs.org/v2/guide/components-slots.html#Deprecated-Syntax), update it to the latest syntax first (which is already supported in 2.6).

## CSS

### Accessing css color variables

CSS color names have been changed, e.g.:

```css
class .custom-bg {
	/* Vuetify 2 */
	background-color: var(--v-white-base));
	/* Vuetify 3 */
	background-color: rgb(var(--v-theme-white));
}
```

<https://vuetifyjs.com/en/features/theme/#custom-theme-colors>

Files affected in our code: ~90. Can be done via search and replace.

## Breaking changes

- The [migration breaking-changes](https://v3-migration.vuejs.org/breaking-changes/) should be checked step by step while upgrading.
