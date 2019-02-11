# Tools

## Generators

This project includes generators to speed up common development tasks. Commands include:

```bash
# Generate a new component with adjacent unit test
yarn new component

# Generate a new page component with adjacent unit test
yarn new page

# Generate a new layout component with adjacent unit test
yarn new layout
```

## Linter

- [ESLint](https://eslint.org/docs/user-guide/configuring) and [eslint-plugin-vue](https://eslint.vuejs.org/rules/)
  - `.eslintrc.js`
  - `.eslintignore`
- [Stylelint](https://stylelint.io/user-guide/configuration/)
  - `stylelint.config.js`
  - `.stylelintignore`
- [Markdownlint](https://github.com/igorshubovych/markdownlint-cli)
  - `.markdownlintrc`
- [Prettier](https://prettier.io/docs/en/configuration.html)
  - `.prettierrc.js`
  - `.prettierignore`

Update existing or create new generators in the `_templates` folder, with help from the [Hygen docs](http://www.hygen.io/).

### [Prettier](https://prettier.io/docs/en/configuration.html)

Prettier wird für die gesamte Codeformatierung verwendet. Sämtliche Linter sollten so eingestellt werden, um möglichen Konflikten vorzubeugen, dass sie sich nicht um Formatierung kümmern.

- Prettier → Formatierung
- Linter → Syntax, Reihenfolge, ...

### [ESLint](https://eslint.org/docs/user-guide/configuring)

ESLint wird sowohl für das HTML als auch das JS in Vue-Components verwendet. Dabei versuchen wir möglichst viele der Vue-Spezifischen Regeln des [eslint-plugin-vue](https://eslint.vuejs.org/rules/) zu aktivieren um den Code möglichst nah am [Vue-Styleguide](https://vuejs.org/v2/style-guide/) zu halten. In den meisten fällen solltest du davon nichts mitbekommen, da vieles automatisch gefixt wird.

### [Stylelint](https://stylelint.io/user-guide/configuration/)

Wird verwendet um sämtliches CSS zu prüfen. Welche Regeln warum aktiviert sind ist direkt in der Konfigurationsdatei zu finden: `/stylelint.config.js`

### [Markdownlint](https://github.com/igorshubovych/markdownlint-cli)

Wir verwenden einen fork von Markdownlint. Dieser hat die Möglichkeit zum ignorieren von Dateien hinzugefügt, sodass auf dem alten /schulcloud-client repo kein Markdownlint ausgeführt werden muss (verursacht einige Fehler).
