# schulcloud-nuxt

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> The next Level of Schul-Cloud

## Build Setup

**Please don't use npm!!!**

[yarn](https://yarnpkg.com/lang/en/docs/install/) is faster and cleaner. It's also not recommended to mix npm & yarn in one repository.

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate

# install legacy schulcloud-client
git submodule init && git submodule update

# start client gulp watcher
cd schulcloud-client && gulp watch
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Q&A - Warum ...?

### Warum kein Pug oder ähnliches für Vue Templates?

Der Support von Lintern ist sehr gering und zudem ist der Einstieg für neue Entwickler schwerer. Der Mehrwert den Pug bietet ist den Verlust an Lint Features & Developer Onboarding nicht wert.

### Warum kein sass, sondern nur scss & css?

Die Kompatibilität von sass zu Dev-Tools und Lintern ist im vergleich zu scss wesentlich geringer und scss ist vollkommen ausreichend, auch wenn man mit sass natürlich weniger schreiben müsste.
