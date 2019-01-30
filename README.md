# schulcloud-nuxt

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> The next Level of Schul-Cloud

## Development

Please read the following Code Styleguides before you start contributing:

1. [official vue 2 style guide](https://vuejs.org/v2/style-guide/)
1. [Vue Linter Recommendations](https://eslint.vuejs.org/user-guide/) (optional, but nice to know why some rules are enabled)
1. [how to structure vue components](https://vueschool.io/articles/vuejs-tutorials/structuring-vue-components/)

**Please don't use npm!!!**

[yarn](https://yarnpkg.com/lang/en/docs/install/) is faster and cleaner. It's also not recommended to mix npm & yarn in one repository.

### setup

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

### developing

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

### Pre-commit

Staged files are automatically linted and tested before each commit. See `lint-staged.config.js` to update.

## Configuration

You can edit each tools configuration in the following config files:

- [ESLint](https://eslint.org/docs/user-guide/configuring) and [eslint-plugin-vue](https://eslint.vuejs.org/rules/)
  - `.eslintrc.js`
  - `.eslintignore`
- [Stylelint](https://stylelint.io/user-guide/configuration/)
  - `stylelint.config.js`
  - `.stylelintignore`
- [Markdownlint](https://github.com/markdownlint/markdownlint/blob/master/docs/configuration.md)
  - `.markdownlintrc`
- [Prettier](https://prettier.io/docs/en/configuration.html)
  - `.prettierrc.js`
  - `.prettierignore`

## Q&A - Warum ...?

### Warum kein Pug oder ähnliches für Vue Templates?

Der Support von Lintern ist sehr gering und zudem ist der Einstieg für neue Entwickler schwerer. Der Mehrwert den Pug bietet ist den Verlust an Lint Features & Developer Onboarding nicht wert.

### Warum kein sass, sondern nur scss & css?

Die Kompatibilität von sass zu Dev-Tools und Lintern ist im vergleich zu scss wesentlich geringer und scss ist vollkommen ausreichend, auch wenn man mit sass natürlich weniger schreiben müsste.

### Wieso sind die Componenten nicht mit Unterordnern kategorisiert?

Dies lässt sich am besten mit einem Beispiel begründen: Angenommen du baust eine `Card` für `Aufgaben`. Diese würdest du sicherlich in einem Ordner `/tasks` (o.ä.) ablegen. Jetzt möchtest du dieses Aufgabenmodul aber auch unter `/courses` auf einer Seite wiederverwenden. Ein `import "@components/tasks/card.vue"` wäre hier einfach unintuitiv und es wird sehr schnell kompliziert die entsprechenden Komponenten zu finden. Die meisten Editoren haben jedoch eine starke Suche und Autoverfollstöndigung integriert, sodass eine Flache, Alphabetisch sortierte Hierarchie kaum Nachteile mit sich bringt.
