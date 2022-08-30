# Vue 3 + Vite

## Checklist

- [x] vite installation
- [x] using existing component as it is (impressum.vue)
- [x] using composition api with ts (@/pages/HomePage.vue)
- [x] router implementation (@src/router/index.ts)
- [x] pinia implementation (@src/store/index.ts)
- [x] using pinia in component (@pages/HomePage.vue)
- [x] typescript integration
- [x] vuetify@3 integration
- [ ] axios integration
- [x] vitest integration
  - [x] unit tests for components
  - [x] unit tests for pinia
  - [x] vuetify support
- [x] eslint configuration
- [x] prettier configuration
- [x] stylelint configuration?
  - [ ] fix linter errors
- [ ] generalize imports using index.ts files
- [ ] pinned dependencies

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
npm run test:watch
npm run test:cov
```

## Additional findings

### Initialize a new project

In order to get the latest version of the project setup it's recommended to use:

```sh
npm init vue@latest
```

### Guide

A good guide for building a project using Vue3, Vite and Typescript can be found here:

[https://miyauchi.dev/posts/vite-vue3-typescript/](https://miyauchi.dev/posts/vite-vue3-typescript/)

[https://github.com/TomokiMiyauci/vite-vue3-template](https://github.com/TomokiMiyauci/vite-vue3-template)

### Set dev server port

`vite.config.ts`

```ts
export default defineConfig({
	server: {
		port: 4000,
	},
	// …
});
```

### Jest vs Vitest

See [https://docs.dbildungscloud.de/display/DBH/Jest+vs+Vitest](https://docs.dbildungscloud.de/display/DBH/Jest+vs+Vitest)

### Env Variables

Vite exposes env variables on the special import.meta.env object.

[https://vitejs.dev/guide/env-and-mode.html#env-variableshttps://vitejs.dev/guide/env-and-mode.html#env-variables](https://vitejs.dev/guide/env-and-mode.html#env-variableshttps://vitejs.dev/guide/env-and-mode.html#env-variables)

`tsconfig.json`

```json
{
	"types": ["vite/client" /* ... */]
}
```

## Testing

- mdi icons
  - install '@mdi/js'
  - add to test vuetify initializer
  - use new notation `<v-icon>mdi-home</v-icon>` or `<v-icon icon="mdi-home"/>`
  - update activator slot for menu
- server API not available
  - add server api for types, enums
- store modules
  - no env-config for feature flags
  - commented out code
- test setup
  - refactor `createComponentMocks()` and `getWrapper()`
- we should use `window.location.assign()` for safely redirecting to another url and provide better testability
- stubbing `window.location.assign`
  ```
  vi.stubGlobal("location", { assign: vi.fn() });
  ```
- stubbing `window.ResizeObserver`
  ```
  	vi.stubGlobal(
  		"ResizeObserver",
  		vi.fn().mockImplementation(() => ({
  			disconnect: vi.fn(),
  			observe: vi.fn(),
  			unobserve: vi.fn(),
  		}))
  	);
  ```
- access to wrapper elements:
  `wrapper.wrappers[0].element` => `wrapper.at(0)?.element`
- check for emitted events, e.g.
  `expect(wrapper.emitted("post-lesson")).toBeDefined()`

TODO:

- translations
- access store modules, e.g. envConfig
