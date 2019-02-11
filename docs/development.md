# Development

Please read the following Code Styleguides before you start contributing:

1. [official vue 2 style guide](https://vuejs.org/v2/style-guide/)
1. [Vue Linter Recommendations](https://eslint.vuejs.org/user-guide/) (optional, but nice to know why some rules are enabled)

**Please don't use npm!!!**

[yarn](https://yarnpkg.com/lang/en/docs/install/) is faster and cleaner. It's also not recommended to mix npm & yarn in one repository.

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
# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate

# run the linter
$ yarn lint
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

### Read more about our toolset [here](/tools.html).

## Aliases

To simplify referencing local modules and refactoring, you can set aliases to be shared between dev and unit tests in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.

## Pre-commit

Staged files are automatically linted and tested before each commit. See `lint-staged.config.js` to update.
