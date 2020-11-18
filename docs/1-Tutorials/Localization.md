# Localization mit i18n

Wir verwenden [Vue i18n](http://kazupon.github.io/vue-i18n) zur Internationalisierung des Nuxt-Clients. Die Sprachdateien werden dabei über [lokalise.com](https://lokalise.com) verwaltet.

## Verwendung

### Komponenten

In Vue Komponenten wird anstatt eines Strings stets, über einen Identifier, auf die Sprachdateien verwiesen.

Ein minimales Beispiel sähe so aus:

#### Template

```vue
<template>Localized: {{ $t(fileName.identifier) }}</template>
```

#### Script

Alternativ kann auch mit JS der Übersetzte String ausgelesen werden.

```vue{4}
<script>
export default {
	computed: {
		title() {
			return this.$t(fileName.identifier);
		},
	},
};
</script>
```

### Nuxt Middlewares/Plugins

Indem die `app` importiert wird kann auch hier auf i18n zugegriffen werden.

```js{2}
export default async ({ app }) => {
	console.log(app.i18n.t(fileName.identifier));
};
```

### Namensschema für keys

Wie bereits im Beispiel oben zu sehen werden die Strings (bis auf ein paar Ausnahmen) nach folgendem Schema referenziert:

> `fileName.identifier`

**Ausnahmen:**

- Für `index.*` Dateien wird der Name des Ordners verwendet.
- Für HTTP-Status Fehlermeldungen wird `error.<STATUS_NUMBER>` verwendet.

### Aktualisieren von Strings

Das aktualisieren kann entweder direkt in den JSON.Objekten unter `./locale/*.json` erfolgen oder über das [lokalise.co Projekt](https://lokalise.co). Wenn Strings über lokalise aktualisiert wurden, erstellt lokalise einen pull request auf Github der reviewed und approved werden muss.

#### Lokalise Tutorial

1. log in at [lokalise.co](https://lokalise.co/). (Account data currently at Dominik)
2. Select Project School Cloud.
3. top right: add key
4. specify the key according to the naming scheme
5. the "base language" is German. "Base language value" is the actual string and should be entered here in German. Platform should be on Web by default.
6. save
7. enter the translation for the text. (Google Translator is already built in to help)
8. click on the download button in the upper left corner
9. Set Export Settings: (most should be correct by default)
   - Format: `JSON (.json)` (not `structured JSON`)
   - File-Structure: `All keys to a single file per language with the following bundle structure`: `locale/%LANG_ISO%.%FORMAT%`
   - Empty translations: `Export as emptry strings`
   - Order keys by: `Key name A-Z`
   - Plural format: `Symfony`
   - Indentation: `Tab`
   - `Add new line at EOF` must be checked
   - Data to export: `All`
   - Triggers: `GitHub`
10. Check the export by clicking `Preview`
11. Open a Pull Request by clicking `Build`

[Localise Github integration Doku](https://docs.lokalise.co/en/articles/1684090-github)
