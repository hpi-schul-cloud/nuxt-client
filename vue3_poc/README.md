# Vue 3 + Vite

## Checklist

- [x] vite installation
- [x] using existing component as it is (impressum.vue)
- [x] using composition api with ts (@/pages/Homeview.vue)
- [x] router implementation (@src/router/index.ts)
- [x] pinia implementation (@src/store/index.ts)
- [x] using pinia in component (@pages/HomeView.vue)
- [x] typescript integration
- [ ] vuetify@3 integration
  - currently beta version is available
  - has some errors when installing with vue-cli <https://next.vuetifyjs.com/en/getting-started/installation/#vite>
- [ ] axios integration
- [x] jest integration
  - [x] unit tests for components
  - [x] unit tests for pinia
- [x] eslint configuration
- [x] prettier configuration
- [x] stylelint configuration?
  - [ ] fix linter errors

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

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
npm run test:unit
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

We should stick with Jest for now because:

- Vitest is not ready for production
- Vitest is not 100% compatible with Jest, e.g. `vi.fn()`
- migration of existing tests is a lot of work

### Jest

A guide for adding Jest can be found here:

[https://dev.to/vuesomedev/add-testing-to-vite-4b75](https://dev.to/vuesomedev/add-testing-to-vite-4b75)

```sh
npm install --save-dev jest @types/jest ts-jest vue-jest@next @vue/test-utils@next ts-node
```

`tsconfig.json`

```json
{
	"types": ["@types/jest" /* ... */]
}
```

    	"types": ["vite/client", ],

### Env Variables

Vite exposes env variables on the special import.meta.env object.

[https://vitejs.dev/guide/env-and-mode.html#env-variableshttps://vitejs.dev/guide/env-and-mode.html#env-variables](https://vitejs.dev/guide/env-and-mode.html#env-variableshttps://vitejs.dev/guide/env-and-mode.html#env-variables)

`tsconfig.json`

```json
{
	"types": ["vite/client" /* ... */]
}
```
