# Hygen Template erstellen

Um das Erstellen von wiederkehrenden Strukturen zu erleichtern, kann man Hygen Templates erstellen die anschließend mit yarn ausführbar sind. Als Beispiel für ein neues Component:

```bash
yarn new component
```

## Struktur

Der Aufruf des Templates erstellt sich aus der Ordner-Struktur. In obigen Fall

```bash
_templates/
 └─  new/
     └─ component/
	 	└─ prompt.js
		└─ doc.ejs.t
		└─ component.ejs.t
```

Nach Aufruf wird alles im Ordner component gerendert. Im Beispiel würden zwei neue Dateien erstellt werden sowie eine Abfrage durch das prompt.

## Prompt

Falls für das Erstellen des Templates Entscheidungen zu treffen sind werden diese im prompt.js definiert. Das prompt wird mit Hilfe von [Enquirer](https://github.com/enquirer/enquirer "Enquirer Github") erstellt. In deren git findet man mehr Informationen darüber, was unterstützt wird. Mit am wichtigsten im prompt ist, dass man Variablen abfragen kann, die im Template definiert sind.

## Template

Das Template besteht aus einer .ejs.t Datei in der definiert ist was generiert werden soll.

Als erstes müssen die Metadaten bestimmt werden. Zwischen den Bindestrichen wird dies in YAML definiert. Im Beispiel wird definiert wo die Datei erstellt werden soll.

```bash
---
to: "docs/stories/<%= name %>.md"
---
```

Anschließend steht was im Template erstellt werden soll. Als Beispiel ein Block aus dem component Template.

```bash
<%
if (blocks.indexOf('template') !== -1) {
%>
<template>
  <div/>
</template>
<%
}
%>
```

Das Template basiert auf EJS. Die <% und %> können als Öffnungs- und Schliessungs-tag gesehen werden, zwischen denen JavaScript steht. Dort kann man z. B. auf die im prompt abgefragten Variablen zugreifen. Weitere Infos findet man bei [EJS](https://ejs.co/ "EJS hompage"). Alles, was außerhalb der tags steht, wird einfach in die zu erstellende Datei geschrieben.
