# Workflow zur Arbeit im Nuxt-Client

Hier ist der interne Workflow zur Komponenten und Pages Entwicklung im Nuxt-Client beschrieben.

[[toc]]

## Ticket

Für Inhaltliche Dinge sollen stets Tickets im [Jira (unserem Ticketsystem)](https://ticketsystem.dbildungscloud.de/secure/RapidBoard.jspa?rapidView=23) erstellt werden.

Für Dinge die das Setup des Repos betreffen (Linter Regeln, neue Tools usw.) benutzen wir aktuell [Github Issues](https://github.com/hpi-schul-cloud/nuxt-client/issues), da Tools wie Greenkeeper hier sowieso solche Issues erstellen und dadurch eine Klare Trennung zwischen Inhaltlichen Todos und Organisatorischem geschaffen wird.

### Ticket Ready?

Wenn ein Ticket zur Entwicklung ausgewählt wurde, muss von Dev-Seite sichergestellt werden, dass das Ticket der "Definition of Ready" entspricht.

Das heißt im Einzelnen:

- User-Story im Ticket verstanden
- Mockups/UI-Entwürfe vorhanden
- Akzeptanzkriterien im Ticket vorhanden

Probleme/Fragen im JIRA Ticket diskutieren (oder persönlich)

## Entwicklung

### Branch naming

Branches werden nach folgendem Schema benannt: `${TICKETID}-${Kurzbeschreibung}`. Für ein [Ticket aus dem Ticketsystem (VUE-40)](https://ticketsystem.dbildungscloud.de/browse/VUE-40) würde der Branch so lauten: `VUE-40-Farbpalette-in-Storybook-einpflegen`. Für Github Issues gilt das Schema ebenfalls. Beispiel: `#129-postcss-autoprefixer-einbinden`.

**Ausnahme:** Für (wirklich) kleine Wording-Änderungen/Bugfixes für welche kein Ticket existiert, kann der Branch auch nach folgendem Schema benannt werden: `${AUTOR-INITIALIEN}/${Kurzbeschreibung}` (Beispiel für Autor Adrian Jost: `aj/fix schulcloud typo in courses`)

### Regeln, für die Entwicklung

- UI Reviews schon während der Entwicklung anstoßen (z. B. mit dem jeweiligen Designer)
- Tests schreiben
- Komponenten reusable gestalten
- [Richtlinien zur Accessibility einhalten](../Accessibility.md)

## Pull Requests

### Pull Request Erstellen

Beim erstellen des Pull Requests sollten alle beteiligten Entwickler, welche aktiv Code zur Problemlösung beigetragen haben als `Assignees` dem Pull angefügt werden. Dies erleichtert es später nachzuvollziehen, wer bei Fragen direkt kontaktiert werden kann.

Sollte ein Ticket/Issue noch nicht abgeschlossen sein oder nach einem Review noch Änderungen zu tun sein, so sollte das entsprechende Label `WIP` gesetzt werden.

#### Pull Request Titel

Der Pull Request sollte wie der Branchname benannt werden, jedoch mit `SPACE` statt `-` um die Lesbarkeit zu erhöhen. Beispiel für [VUE-40](https://ticketsystem.dbildungscloud.de/browse/VUE-40): `VUE-40 - Farbpalette in Storybook einpflegen`.

#### Pull Request Beschreibung

Die Bescheibung des Pull Requests sollte das entsprechende Template bestmöglich ausfüllen. Alles was Visuelle Änderungen hervorruft sollte mit einem Screenshot dokumentiert werden, damit die Reviewer eine Vorstellung davon bekommen, wie das Resultat aussehen soll.

### Pull Request Review

Der Review Prozess sollte erst Beginnen, wenn das WIP Label vom ersteller des Pulls entfernt wurde.

::: tip Hinweis

Wenn jemand schlechten Code sieht sollte er dies direkt Anmerken um die Codequalität hoch zu halten. Niemand soll hierdurch angegriffen oder bloßgestellt werden. Wir alle können nur durch Hinweise auf Verbesserungsmöglichkeiten besser werden und jeder macht Fehler. Solche Fehler später zu beheben ist wesentlich aufwändiger als sie direkt anzumerken und zu beheben.

:::

1. Code Review gewissenhaft ausführen
2. UI Reviews durchführen - An Tickets zu UI Änderungen sollte ein Screenshot hinterlegt sein, welcher das Zielresultat aufzeigen soll. Mit diesem sollte verglichen werden und entsprechende Abweichungen vor dem Approve abgeklärt werden.
3. Mergen oder das Label `ready to merge` setzen. Wenn das Label `ready to merge` gesetzt ist, wird der Mergify Bot sich um alles weitere kümmern. (Siehe [Tools](../4-Tools.md#mergify)).
