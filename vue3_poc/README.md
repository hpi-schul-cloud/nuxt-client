# Vue 3 + Vite

## Important note

In order to prevent conflicts with the configuration in the Nuxt client it is recommended to open this project in its own workspace. This affects for instance the Vitest plugin (see below).

## Checklist

- [x] vite installation
- [x] using existing component as it is (impressum.vue)
- [x] using composition api with ts (@pages/Homeview.vue)
- [x] router implementation (@src/router/index.ts)
- [x] pinia implementation (@src/store/index.ts)
- [x] using pinia in component (@pages/HomeView.vue)
- [x] typescript integration
- [ ] vuetify@3 integration
  - currently beta version is available
  - has some errors when installing with vue-cli <https://next.vuetifyjs.com/en/getting-started/installation/#vite>
- [ ] axios integration
- [ ] jest/vitest integration
  - [ ] unit tests for components
  - [ ] unit tests for pinia
- [x] vitest integration
  - [x] unit tests for components
  - [ ] unit tests for pinia
- [x] eslint configuration
- [x] prettier configuration
- [ ] stylelint configuration?

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

### Initialize project

In order to get the latest version of the project setup it's recommended to use:

```sh
npm init vue@latest
```

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

### Fix import of .vue files

`src/shims-vue.d.ts`

```ts
/* eslint-disable */
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
```

### Vitest

Install Vitest extension (VSCode): [https://github.com/vitest-dev/vscode](https://github.com/vitest-dev/vscode)

Fix error running tests: “document not found”:

`vite.config.ts`

```ts
import { defineConfig } from "vitest/config";
// …
test: {
	environment: "jsdom";
}
```

Note: When the project is opened inside the parent Nuxt project the Vitest it plugin is unable to detect Vitest properly. If enable the Vitest plugin manually in the main VSCode settings there will be conflicts with the Jest plugin used in the Nuxt project.

`settings.json`

```json
{
	"vitest.enable": true,
	"vitest.include": [
		"vue3_poc/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
	]
	//...
}
```

Additional information:

[https://vitest.dev/config/#configuration](https://vitest.dev/config/#configuration)

[https://github.com/kwai-explore/vscode-vitest-runner/issues/1](https://github.com/kwai-explore/vscode-vitest-runner/issues/1)

### ESlint and Prettier

install libraries:

```sh
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue prettier @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser

```

`.eslintrc.js`

```js
module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"plugin:prettier/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	},
};
```

Enable autoformatting:

`.vscode/settings.json`

```json
{
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true
	}
}
```

### Env Variables

Vite exposes env variables on the special import.meta.env object.

[https://vitejs.dev/guide/env-and-mode.html#env-variableshttps://vitejs.dev/guide/env-and-mode.html#env-variables](https://vitejs.dev/guide/env-and-mode.html#env-variableshttps://vitejs.dev/guide/env-and-mode.html#env-variables)

`env.d.ts`

```ts
/// <reference types="vite/client" />
```
