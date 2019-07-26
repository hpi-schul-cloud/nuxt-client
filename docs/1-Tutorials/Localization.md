# Localization mit i18n <Badge text="WIP" type="warn"/>

Wir verwenden [Vue i18n](http://kazupon.github.io/vue-i18n) zur Internationalisierung des Nuxt-Clients. Die Sprachdateien werden dabei über [localise.co](https://lokalise.co) verwaltet.

## Verwendung

In Vue Komponenten wird anstatt eines Strings stets, über einen Identifier, auf die Sprachdateien verwiesen.

Ein minimales Beispiel sähe so aus:

```vue{2}
<template>
	Localized: {{ $t(fileName.identifier) }}
</template>
```

### Namensschema für keys

Wie bereits im Beispiel oben zu sehen werden die Strings (bis auf ein paar Ausnahmen) nach folgendem Schema referenziert:

> `fileName.identifier`

**Ausnahmen:**

- Für `index.*` Dateien wird der Name des Ordners verwendet.

### Aktualisieren von Strings

Das aktualisieren kann entweder direkt in den JSON.Objekten unter `./locales/*.json` erfolgen oder über das [lokalise.co Projekt](https://lokalise.co).

#### localise Tutorial <Badge text="TODO" type="warn"/>

[Localise Github integration](https://docs.lokalise.co/en/articles/1684090-github)
