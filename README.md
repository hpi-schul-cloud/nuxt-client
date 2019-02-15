# schulcloud-nuxt

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Greenkeeper badge](https://badges.greenkeeper.io/schul-cloud/nuxt-client.svg)](https://greenkeeper.io/)

> The next Level of Schul-Cloud

## [docs](./docs)

## setup

**Please don't use npm!!!**

[yarn](https://yarnpkg.com/lang/en/docs/install/) is faster and cleaner. It's also not recommended to mix npm & yarn in one repository.

### main project

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

[start developing](./docs/development.md)

### docs

```bash
# install yarn (system specific)
https://yarnpkg.com/lang/en/docs/install/

# install dependencies
$ yarn install

# start docs server
yarn docs
```
