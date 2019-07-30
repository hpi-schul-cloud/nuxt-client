# Localization mit i18n

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

Das aktualisieren kann entweder direkt in den JSON.Objekten unter `./locales/*.json` erfolgen oder über das [lokalise.co Projekt](https://lokalise.co). Wenn Strings über localise aktualisiert wurden, erstellt lokalise einen pull request auf Github der reviewed und approved werden muss.

#### localise Tutorial

1. Einloggen bei [lokalise.co](https://lokalise.co/). (Account Daten momentan bei Dominik)
2. Project Schulcloud auswählen.
3. Oben rechts: Key hinzufügen
4. Key gemäß Namenschema angeben
5. Die "Base language" ist Deutsch. "Base language value" ist der eigentliche String und der hier in Deutsch eingegeben wird. Platforms sollte standardmäßig auf Web sein.
6. Save
7. Übersetzung für den Text eingeben. (Google translate ist zu hilfe schon eingebaut)
8. Oben links auf den Download button klicken
9. Sicher gehen das bei "Triggers" GitHub aktiviert ist. Alle anderen Einstellungen sollten standard mäßig korrekt sein. Auf "Preview" klicken, nun wird automatisch der PR auf Github erstellt.

[Localise Github integration Doku](https://docs.lokalise.co/en/articles/1684090-github)
