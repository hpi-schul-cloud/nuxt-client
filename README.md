# The next Level of Schul-Cloud

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=hpi-schul-cloud_nuxt-client&metric=coverage)](https://sonarcloud.io/summary/new_code?id=hpi-schul-cloud_nuxt-client)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=hpi-schul-cloud_nuxt-client&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=hpi-schul-cloud_nuxt-client)

The **nuxt-client** is the primary frontend application for the [dBildungscloud](https://github.com/hpi-schul-cloud) ecosystem. 
It is a Vue 3 single-page application built with Vite, Vuetify, and TypeScript. The application serves teachers, students, and administrators across multiple German federal states (branded via a theming system). 
It communicates with the [Schulcloud-Server](https://github.com/hpi-schul-cloud/schulcloud-server) REST and Socket API and coexists with the [legacy client](https://github.com/hpi-schul-cloud/schulcloud-client) during an ongoing migration.

## 🏗️ Tech Stack Overview

📎 [Architecture Diagram](docs/architecture.drawio) *(open in [diagrams.net](https://app.diagrams.net) or the draw.io IDE plugin)*

## 🚀 Getting Started

### Prerequisites

- Node.js and npm (see `engines` in `package.json`)
- [Schulcloud-Server](https://github.com/hpi-schul-cloud/schulcloud-server)
- [Schulcloud-Client](https://github.com/hpi-schul-cloud/schulcloud-client)

For a full walkthrough of the local development environment, see the [Getting Started guide](https://documentation.dbildungscloud.dev/docs/getting-started).

### Installation & Start

```bash
npm install
npm run serve
```

The app will be available at `http://localhost:4000`.


## 📁 Project Structure

```
/config                     # ⚙️ Vite plugins and build configuration
/public                     # 🌐 Static assets and theme files
/src                        # 🧩 Application source code
├── assets/                 # 🎨 Fonts, images, SVGs
├── components/             # 🧩 Shared Vue components
├── composables/            # 🪝 Shared Vue composables
├── generated/              # 🤖 Auto-generated API clients (OpenAPI)
├── layouts/                # 📐 Page layout wrappers
├── locales/                # 🌍 i18n translation files
├── modules/                # 📦 Building Block modules
├── pages/                  # 📄 Route-level page components
├── plugins/                # 🔌 Vue plugins (Vuetify, i18n, etc.)
├── router/                 # 🛤️ Vue Router configuration
├── store/                  # 🗄️ Pinia state stores
├── styles/                 # 🎨 Global SCSS styles
├── themes/                 # 🎨 Theme definitions
├── types/                  # 📝 Shared TypeScript types
└── utils/                  # 🔧 Utility functions
/tests                      # 🧪 Test setup and helpers
```

## 📜 Scripts

| Script | Purpose |
| --- | --- |
| `serve` | Start the Vite dev server with HMR |
| `build` | Type-check and build for production |
| `type-check` | Run `vue-tsc` without emitting files |
| `test:unit` | Run unit tests with Vitest |
| `test:unit:watch` | Run unit tests in watch mode |
| `test:unit:ci` | Run unit tests with coverage |
| `lint` | Lint source files with ESLint |
| `lint:fix` | Lint and auto-fix source files |
| `generate-client:server` | Regenerate the server API client from OpenAPI spec |
| `generate-client:fwu` | Regenerate the FWU API client from OpenAPI spec |
| `generate-client:filestorage` | Regenerate the file storage API client from OpenAPI spec |
| `generate-client:h5p-editor` | Regenerate the H5P editor API client from OpenAPI spec |
| `generate-client:common-cartridge` | Regenerate the Common Cartridge API client from OpenAPI spec |

## 🧪 Testing

Unit tests use [Vitest](https://vitest.dev/) with [Vue Test Utils](https://test-utils.vuejs.org/) and [vitest-mock-extended](https://github.com/eratio08/vitest-mock-extended) for type-safe mocking.

```bash
npm run test:unit
```

## 🤖 API Client Generation

API clients are auto-generated from OpenAPI specs via [openapi-generator-cli](https://openapi-generator.tech/). Configuration lives in `openapitools.json`.

```bash
npm run generate-client:server
npm run generate-client:fwu
npm run generate-client:filestorage
npm run generate-client:h5p-editor
npm run generate-client:common-cartridge
```

## 💡 Coding Conventions

### General

- Use `async/await` for better readability instead of callbacks
- Leverage TypeScript for type safety – use inference over declared return types
- Avoid `// @ts-ignore` – define types properly instead
- File naming: kebab-case, e.g. `MyComponent.vue`, `my-util.ts`
- Context meta tags separated by dots: `MyComponent.unit.ts`
- Function names: `camelCase`
- Pure functions as directly importable utils/ES modules
- Avoid assigning a variable only to immediately return it
- Avoid `async` as part of function names

### CSS / Styling

- Global styles live in a central `styles/` directory, imported via `main.ts`
- Use **scoped styles** by default in page and module components
- Font sizes via CSS custom properties defined in `src/styles/css-variables/_typography.scss` (e.g. `--heading-1`, `--text-md`) – do not use hardcoded pixel values
- Prefer CSS Grid / Flexbox for column/row layouts
- Font changes exclusively in `src/styles/utility/_fonts.scss`
- Refer to the official [Vue Style Guide](https://vuejs.org/style-guide/) for component conventions

## 📖 Documentation

The comprehensive guide covering architecture, design patterns, and development workflows is available in the **[documentation](https://documentation.dbildungscloud.dev/docs/category/frontend-design-patterns)**.

## 🔗 Related Repositories

- [Schulcloud-Server](https://github.com/hpi-schul-cloud/schulcloud-server) - the backend (Node.js / Nest.js)
- [Schulcloud-Client](https://github.com/hpi-schul-cloud/schulcloud-client) - the (partly still in use) legacy frontend
- [dof_app_deploy](https://github.com/hpi-schul-cloud/dof_app_deploy) - **D**ev**O**ps**F**uture – CI/CD and instance configurations
- [e2e-system-tests](https://github.com/hpi-schul-cloud/e2e-system-tests) - BDD end-to-end tests

## License

[GNU AFFERO GENERAL PUBLIC LICENSE - Version 3](./LICENSE.md)
