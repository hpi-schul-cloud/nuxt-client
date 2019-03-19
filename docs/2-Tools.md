# Tools

[[toc]]

## Templates - Hygen

Um das nötige Boilerplate für neue Komponenten schneller erstellen zu können haben wir einige Template mittels [Hygen](http://www.hygen.io/) erstellt.

```bash
# Generate a new component with adjacent unit test
yarn new component

# Generate a new page component with adjacent unit test
yarn new page

# Generate a new layout component with adjacent unit test
yarn new layout
```

- [Hygen](http://www.hygen.io/)
  - `_templates/new/$name` (use with `yarn new $name`)
    - `prompt.js` (ask for options)
    - `*.ejs.t` template file(s)

## Codeformatting - Prettier

Prettier wird für die gesamte Codeformatierung verwendet. Sämtliche Linter sollten so eingestellt werden, um möglichen Konflikten vorzubeugen, dass sie sich nicht um Formatierung kümmern.

::: tip Hinweis:

- Prettier → Formatierung
- Linter → Syntax, Reihenfolge, ..

:::

- [Prettier](https://prettier.io/docs/en/configuration.html)
  - `.prettierrc.js`
  - `.prettierignore`

## Linter

- [ESLint](https://eslint.org/docs/user-guide/configuring) and [eslint-plugin-vue](https://eslint.vuejs.org/rules/)
  - `.eslintrc.js`
  - `.eslintignore`
- [Stylelint](https://stylelint.io/user-guide/configuration/)
  - `stylelint.config.js`
  - `.stylelintignore`
- [Markdownlint](https://github.com/igorshubovych/markdownlint-cli)
  - `.markdownlint.yml`

### [ESLint](https://eslint.org/docs/user-guide/configuring)

ESLint wird sowohl für das HTML als auch das JS in Vue-Components verwendet. Dabei versuchen wir möglichst viele der Vue-Spezifischen Regeln des [eslint-plugin-vue](https://eslint.vuejs.org/rules/) zu aktivieren um den Code möglichst nah am [Vue-Styleguide](https://vuejs.org/v2/style-guide/) zu halten. In den meisten fällen solltest du davon nichts mitbekommen, da vieles automatisch gefixt wird.

### [Stylelint](https://stylelint.io/user-guide/configuration/)

Wird verwendet um sämtliches CSS zu prüfen. Welche Regeln warum aktiviert sind ist direkt in der Konfigurationsdatei zu finden: `/stylelint.config.js`

### [Markdownlint](https://github.com/igorshubovych/markdownlint-cli)

Wir verwenden einen fork von Markdownlint. Dieser hat die Möglichkeit zum ignorieren von Dateien hinzugefügt, sodass auf dem alten /schulcloud-client repo kein Markdownlint ausgeführt werden muss (verursacht einige Fehler).

## Tests

### Unit-Tests - Jest

Für unit-tests verwenden wir [Jest](https://jestjs.io/). Die Konfigurationsdatei ist unter `/jest.config.js` zu finden.

### Coverage

[![codecov](https://codecov.io/gh/schul-cloud/nuxt-client/branch/master/graph/badge.svg)](https://codecov.io/gh/schul-cloud/nuxt-client)

Um unsere Testabdeckung zu überwachen verwenden wir [codecov.io](https://codecov.io). Der aktuelle Status ist auf dem entsprechenden [Dashboard](https://codecov.io/gh/schul-cloud/nuxt-client/) einzusehen.

## Babel

Für Tests benötigen wir zwingend `@babel/preset-env` mit `babel-core ^7.0.0` und `babel-jest ^24.1.0`.

Für alles weitere bleiben wir bisher bei den default Einstellungen und verwenden das preset `@nuxt/babel-preset-app` ([documentation](https://nuxtjs.org/api/configuration-build/#babel))

- [Babel](https://github.com/igorshubovych/markdownlint-cli)
  - `babel.config.js`
