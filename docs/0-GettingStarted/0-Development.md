# Development

[[toc]]

## Reading

Please read the following Code Styleguides before you start contributing:

1. [official vue 2 style guide](https://vuejs.org/v2/style-guide/)
1. [Vue Linter Recommendations](https://eslint.vuejs.org/user-guide/) (optional, but nice to know why some rules are enabled)

::: warning Please don't use yarn !!!

- It's not recommended to mix npm & yarn in one repository.
- we wan't to be consistent across all our repositories.

:::

## Setup

```bash
# install node 10.x + npm (system specific)
https://nodejs.org/en/

# install dependencies
npm i

# install legacy schulcloud-client and run gulp
yarn setup

# start "developing" :)
```

## Developing

```bash
# serve nuxt, docs und storybook in parallel
npm run dev
```

You can find all commands inside the [package.json](https://github.com/schul-cloud/nuxt-client/blob/develop/package.json) under the `scripts` section.

### Nuxt

```bash
npm run dev:nuxt
```

**URL**: [http://localhost:4000](http://localhost:4000)

All Nuxt source-files can be found at `src/`.

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### Storybook

```bash
npm run dev:storybook
```

**URL**: [http://localhost:4001](http://localhost:4001)

For detailed explanation on how things work, checkout [Storybook](https://storybook.js.org/).

### Docs

```bash
npm run dev:docs
```

**URL**: [http://localhost:4002](http://localhost:4002)

For detailed explanation on how things work, checkout [Vuepress](https://vuepress.vuejs.org/guide/).

### Test

### Unit Tests

```bash
# Run all (unit) tests
npm run test
```

For development we recommend using

```bash
# Run all unit tests and watch for changes
npm run test:unit:watch
```

this runs all the tests that are covering a component as soon as you change something.

### Lint

```bash
npm run lint
```

The linter is configured to use the --fix option by default. So in most cases you shoudn't get a lot of warnings and errors.

### more Tools

We have [a seperate page](/4-Tools.md) for our other tools

## Aliases

To simplify referencing local modules and refactoring, you shpuld use aliases that are shared between nuxt-dev, unit tests and storybook. You can find them in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.

## Pre-commit

Staged files are automatically linted and tested before each commit using [yorkie](https://www.npmjs.com/package/yorkie) and [lint-staged](https://github.com/okonet/lint-staged). See `lint-staged.config.js` for details.
