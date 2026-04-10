# Copilot Instructions for AI Agents

This project is a Vue/Nuxt client for Schul-Cloud, with a modular architecture and strong conventions. Follow these guidelines to be productive and maintain consistency:

## Architecture Overview

- **Entry Point:** `src/main.ts` bootstraps the app; `App.vue` is the root component.
- **Component Structure:** Organized by atomic design (`src/components/atoms`, `molecules`, `organisms`, etc.).
- **State Management:** Uses Vuex store in `src/store/` (see its README for Nuxt-specific auto-activation).
- **Theming:** Themes and assets are in `src/assets/` and `public/themes/`. Images go in `src/assets/img/`, fonts in `src/assets/fonts/`.
- **Config & Plugins:** Vite config in `vite.config.ts`, Nuxt/Vue plugins in `src/plugins/`, and custom Vite plugins in `config/vite/`.
- **API Integration:** API modules are in `src/commonCartridgeApi/`, `fileStorageApi/`, `h5pEditorApi/`, and `serverApi/`.

## Developer Workflows

- **Build:** Use `npm run build` (Vite-based).
- **Dev Server:** Use `npm run dev` (Vite, with custom config in `config/vite/dev-server-config.mjs`).
- **Testing:** Unit tests with Vitest (`npm run test:unit`), config in `vitest.config.ts`. Mocks in `__mocks__` and `src/composables/*.unit.ts`.
- **Linting:** Run `npm run lint` (config in `eslint.config.js`).
- **Docker:** Build and run with Docker using the `Dockerfile` and `config/docker/nginx.conf.template`.

## Project-Specific Conventions

- **Komponenten-Props bevorzugen:** Passe nach Möglichkeit direkt die Props von Vuetify-Komponenten an, um gewünschtes Verhalten oder Styling zu erreichen. Vermeide CSS-Workarounds, wenn eine Lösung über Properties möglich ist.
- **Assets:** Use `/assets` for images and fonts to support theming. Avoid placing images in `/public` unless strictly static.
- **Logos:** Only logos in `src/assets/img/logo/` (see its README).
- **Vuex:** Store modules auto-activate by file presence (Nuxt convention).
- **Testing:** Place unit tests next to source files with `.unit.ts` suffix, or in `tests/unit/`.
- **External Docs:** See [project documentation](https://documentation.dbildungscloud.dev/docs/category/nuxt-client) for deeper details.

## Integration Points

- **API:** Communicate with backend via modules in `src/serverApi/` and related API folders.
- **CI/CD:** Managed in [dof_app_deploy](https://github.com/hpi-schul-cloud/dof_app_deploy).
- **Quality Gates:** SonarCloud integration (see README badges).

## Examples

- To add a new composable: place in `src/composables/`, add a `.unit.ts` for tests.
- To add a new API module: follow the structure in `src/commonCartridgeApi/v3/`.

---

For questions or unclear conventions, check the main `README.md` or ask for clarification.
