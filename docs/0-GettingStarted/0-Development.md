# Development

[[toc]]

## Reading

Please read the following Code Styleguides before you start contributing:

1. [official vue 2 style guide](https://vuejs.org/v2/style-guide/)
1. [Vue Linter Recommendations](https://eslint.vuejs.org/user-guide/) (optional, but nice to know why some rules are enabled)

::: warning Please don't use npm!!!

- [yarn](https://yarnpkg.com/lang/en/docs/install/) is faster and cleaner.
- It's also not recommended to mix npm & yarn in one repository.

:::

## Setup

```bash
# install yarn (system specific)
https://yarnpkg.com/lang/en/docs/install/

# install dependencies
$ yarn install

# install legacy schulcloud-client
git submodule init && git submodule update

# install legacy schulcloud-client dependencies
cd schulcloud-client && npm i

# navigate back to the nuxt client
cd ..

# continue with "developing"
```

## Developing

```bash
# serve nuxt, docs und storybook in parallel
$ yarn dev
```

You can find all commands inside the [package.json](./package.json).

### Nuxt

```bash
$ yarn dev:nuxt
```

All Nuxt source-files can be found at `src/`.

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### Docs

```bash
$ yarn dev:docs
```

For detailed explanation on how things work, checkout [Vuepress](https://vuepress.vuejs.org/guide/).

### Storybook

```bash
$ yarn dev:storybook
```

For detailed explanation on how things work, checkout [Storybook](https://storybook.js.org/).

### Test

### Unit Tests

```bash
# Run all unit tests
$ yarn test
```

For development we recommend using

```bash
# Run all unit tests and watch for changes
$ yarn test:unit:watch
```

this runs all the tests that are covering a component as soon as you change something.

### Lint

```bash
$ yarn lint
```

The linter is configured to use the --fix option by default. So in most cases you shoudn't get a lot of warnings and errors.

### more Tools

We have [a seperate page](/2-Tools.html) for our other tools

## Aliases

To simplify referencing local modules and refactoring, you shpuld use aliases that are shared between nuxt-dev, unit tests and storybook. You can find them in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.

## Pre-commit

Staged files are automatically linted and tested before each commit. See `lint-staged.config.js` to update.
