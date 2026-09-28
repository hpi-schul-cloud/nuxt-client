# Verschachtelte Unterordner im Dateibereich (nuxt-client)

Dieses Dokument beschreibt die Frontend-Änderungen des Features "verschachtelte Ordner"
(Branch `feature/nested-folders`). Das zugehörige Backend-Dokument liegt im `file-storage`-Repo
unter `docs/nested-folders.md` — dort steht auch, warum `parentId` unverändert bleibt und
Unterordner stattdessen über ein neues `folderId`-Feld abgebildet werden.

## Überblick

Die bestehende Ordner-Seite (`/folder/:id`, Komponente `Folder.vue` + `FileTable.vue`) zeigte
bisher eine flache Dateiliste. Mit diesem Feature können innerhalb eines Dateiordner-Elements
beliebig tief verschachtelte Unterordner angelegt, durchsucht, umbenannt, verschoben und
gelöscht werden.

## Routing

`src/router/routes.ts`: Die Route `/folder/:id` wurde um ein wiederholbares, optionales Segment
erweitert: `/folder/:id/:subPath*`. `:id` bleibt die Board-Node-ID des Dateiordner-Elements
(unverändert, wird weiterhin für Berechtigungs-/Breadcrumb-Auflösung über `schulcloud-server`
verwendet); `:subPath*` ist ein Array von Unterordner-IDs (Navigationspfad von der Root-Ebene
bis zum aktuell angezeigten Ordner). Die Route heißt weiterhin `folder-id`, die `props`-Funktion
liefert zusätzlich `subFolderPath: string[]`.

Ein Catch-all-Segment statt N flacher Routen wurde gewählt, damit beliebige Verschachtelungstiefe
ohne weitere Routing-Änderungen funktioniert.

**Wichtiger Fund aus dem lokalen End-to-End-Test:** `src/router/vue-client-route.ts` pflegt eine
eigene Allowlist von Pfad-Mustern, die der Dev-Server-Proxy (und vermutlich die produktive
Reverse-Proxy-Konfiguration außerhalb dieses Repos) nutzt, um zu entscheiden, ob eine Anfrage an
die Vue-SPA oder an den Legacy-Client (`schulcloud-client`) weitergeleitet wird. Die bisherigen
Einträge `^/folder/${mongoId}/?$` und `^/folder/${mongoId}/trash/?$` matchen **nicht** auf einen
Pfad mit zusätzlichen Unterordner-Segmenten (`/folder/<id>/<subId>`) — ohne Anpassung wurden
solche Deep-Links fälschlich an den Legacy-Client geroutet (beobachtet als 504 im lokalen Test,
da dort kein Legacy-Client lief). Ergänzt wurde ein zusätzliches Muster
`^/folder/${mongoId}(/${mongoId})+/?$`. **Hinweis:** Falls die produktive Umgebung eine eigene,
von diesem Repo unabhängige Reverse-Proxy-/Ingress-Konfiguration mit einer ähnlichen Pfad-Liste
pflegt, muss diese ebenfalls um das gleiche Muster ergänzt werden — das liegt aber außerhalb der
vier hier bearbeiteten Repos und konnte nicht geprüft werden.

## Datenfluss

- `Folder.vue` berechnet `currentFolderId = subFolderPath.at(-1)` (die innerste Ebene,
  `undefined` = Root-Ebene des Dateiordner-Elements).
- Der Dateien-Store (`useFileRecordsStore`) ist weiterhin nur nach `parentId` organisiert — er
  sammelt über die Zeit alle jemals für dieses Element abgerufenen `FileRecord`s, unabhängig von
  der Ebene. Die Anzeige filtert client-seitig mit der neuen Hilfsfunktion
  `filterByFolderId(records, folderId)` (`src/utils/fileHelper.ts`) auf die aktuell angezeigte
  Ebene herunter.
- Da Vue Router bei einem Wechsel zwischen `/folder/:id/...`-Pfaden mit gleichem `:id` die
  Komponente wiederverwendet (kein Remount), gibt es einen `watch(currentFolderId, ...)` in
  `Folder.vue`, der bei jedem Ebenenwechsel `fetchFiles(...)` für die neue Ebene nachlädt.

## Backend-Anbindung: `FileStorageApi.composable.ts`

- `fetchFiles`, `upload` und `uploadCollaboraFile` haben einen neuen optionalen `folderId`-
  Parameter, der als Query-Parameter an die entsprechenden Endpunkte durchgereicht wird.
- **Wichtiger Hinweis zum generierten API-Client:** Die neuen Backend-Endpunkte
  `POST /file/folder/...` (Ordner anlegen) und `PATCH /file/move/:fileRecordId` (Verschieben)
  sind **nicht** Teil des generierten OpenAPI-Clients (`src/generated/fileStorageApi/v3/`), da
  dessen Regenerierung (`npm run generate-client:filestorage`) eine laufende `file-storage`-
  Instanz voraussetzt, die in dieser Entwicklungsumgebung nicht verfügbar war. Die neuen
  Composable-Funktionen `createFolder`/`moveFile` rufen deshalb den geteilten `$axios`-Client
  direkt mit demselben Pfad-/Body-Schema auf, das der Generator erzeugen würde (siehe
  Kommentar in `FileStorageApi.composable.ts`). **Sobald der Client gegen das aktualisierte
  Backend neu generiert wurde, sollten diese beiden Funktionen auf `fileApi.createFolder`/
  `fileApi.move` umgestellt werden.**
- Für `folderId` auf den *bereits generierten* Endpunkten (`list`, `upload`, `uploadFromUrl`,
  `addDocumentToParent`) wurde kein Codegenerator-Lauf benötigt: der generierte Client
  unterstützt pro Aufruf ein `options.query`-Objekt, das zusätzliche Query-Parameter in die
  bestehende Anfrage einmischt (`setSearchParams(url, ..., options.query)` in
  `src/generated/fileStorageApi/v3/api/file-api.ts`). Das wurde hier genutzt, statt den
  generierten Code manuell zu patchen.
- Das Antwortmodell `FileRecordResponse`
  (`src/generated/fileStorageApi/v3/models/file-record-response.ts`) wurde manuell um die
  Felder `isFolder?`/`folderId?` ergänzt, passend zur Backend-Antwort. Eine echte Regenerierung
  sollte dasselbe Ergebnis liefern.

## UI-Komponenten

- **`file-table/FileTable.vue`**: Zeilen mit `item.isFolder === true` zeigen ein Ordner-Icon
  (`mdiFolderOpenOutline`, wiederverwendet vom bestehenden Board-Ordnerelement) statt
  Dateivorschau; Klick auf Icon/Name navigiert in den Ordner (`navigate-into-folder`-Event)
  statt eine Vorschau zu öffnen. Die Größen-Spalte bleibt für Ordner-Zeilen leer (`—`) —
  rekursive Ordnergröße wurde bewusst nicht umgesetzt (siehe Backend-Doku). Der Download-Eintrag
  im Kebab-Menü ist für Ordner-Zeilen ausgeblendet. Ein neuer "Verschieben"-Eintrag (Icon
  `mdiFolderMoveOutline`) öffnet `MoveFileDialog.vue`.
- **`MoveFileDialog.vue`** (neu): Einfache Ziel-Auswahl aus den Ordner-Geschwistern der
  aktuellen Ebene plus optional "Oberste Ebene" (falls man sich gerade in einem Unterordner
  befindet). Bewusst **kein** vollständiger Ordner-Baum-Browser — Verschieben in einen Ordner,
  der nicht auf der aktuellen Ebene sichtbar ist, erfordert, zuerst dorthin zu navigieren und von
  dort aus zu verschieben. Das hält den Umfang klein; ein vollwertiger Ordnerbaum-Picker wäre ein
  sinnvoller Folgeschritt, falls das nicht ausreicht.
- **`CreateFolderDialog.vue`** (neu): Einfacher Namens-Dialog, strukturell an
  `RenameFolderDialog.vue` angelehnt. Wird über einen neuen FAB-Eintrag ("Ordner erstellen",
  Icon `mdiFolderPlusOutline`) in `Folder.vue` geöffnet.
- **`RenameFileDialog.vue`**: bekam eine neue optionale Prop `isFolder`. Ohne diese Änderung
  hätte das Umbenennen eines Ordners fälschlich eine "Dateiendung" angehängt bekommen, da
  `getFileExtension`/`removeFileExtension` für Namen ohne Punkt den gesamten String als
  vermeintliche Endung zurückgeben. Mit `isFolder: true` wird die Endungslogik komplett
  übersprungen.
- **`Folder.vue`**: siehe Datenfluss oben. Zusätzlich:
  - `onNavigateIntoFolder` merkt sich beim Klick den Namen des angeklickten Unterordners in
    einer lokalen `subfolderNameCache` (`Map<id, name>`), damit Breadcrumb und Seitentitel den
    echten Namen zeigen können.
  - `onMoveRecord` ruft `moveFile(record.id, targetFolderId)` auf.
  - `onCreateSubfolderConfirm` ruft `createFolder(name, folderId, FileRecordParent.BOARDNODES,
    currentFolderId)` auf.
  - Die Kopfzeilen-Aktionen "Umbenennen"/"Löschen" (`FolderMenu`) sind nur auf der **Root-Ebene**
    sichtbar (`v-if="... && !currentFolderId"`) und wirken weiterhin auf das Board-Element
    selbst. Das Umbenennen/Löschen eines *Unterordners* geschieht über dessen Zeilen-Menü in der
    Tabelle der **übergeordneten** Ebene — es gibt bewusst keine "Ordner umbenennen"-Aktion,
    während man sich im Ordner selbst befindet.

## Bekannte Einschränkung: Breadcrumb-Namen nach Reload/Direktlink

Die Breadcrumb-Namen für Unterordner werden ausschließlich aus der `subfolderNameCache` befüllt,
die beim Navigieren (Klick auf eine Ordner-Zeile) wächst. Bei einem direkten Aufruf oder Reload
eines tiefen Unterordner-Links (`/folder/<id>/<a>/<b>`) sind `a`/`b` nur als IDs aus der URL
bekannt, nicht als Namen — die Breadcrumb zeigt in diesem Fall einen Platzhaltertext
(`pages.folder.untitled`) statt des echten Namens, bis normal in den Ordner navigiert wurde. Das
ist eine bewusste, mit dem Auftraggeber abgestimmte Scope-Entscheidung: ein zusätzlicher
Server-Endpoint zur Auflösung der kompletten Namenskette wäre möglich, wurde aber zugunsten des
minimalen Eingriffs zurückgestellt.

## i18n

Neue Texte wurden in allen vier Sprachdateien ergänzt (`src/locales/{de,en,es,uk}.ts`):
`pages.folder.fab.create-folder`, `pages.folder.createFolderDialog.title`,
`pages.folder.moveDialog.title`, `pages.folder.moveDialog.targetLabel`,
`pages.folder.moveDialog.rootLevel`, `pages.folder.ariaLabels.openFolder`. Die Aktion
"Verschieben" nutzt den bereits vorhandenen Schlüssel `common.actions.move`.

## Icons

`mdiFolderOpenOutline` (bereits vorhanden), `mdiFolderMoveOutline` und `mdiFolderPlusOutline`
(neu ergänzt) wurden zur Icon-Allowlist in `src/components/icons/material/index.ts`
hinzugefügt (Import- und Export-Liste, wie von der Projektkonvention gefordert).

## Bewusst nicht umgesetzt (Scope-Entscheidungen)

- **Drag & Drop** zum Verschieben von Dateien zwischen Ordnern — stattdessen eine einfache
  Menü-Aktion ("Verschieben" im Kebab-Menü), um den Umfang klein zu halten.
- **Rekursive Ordnergröße** in der Tabelle (siehe oben).
- **Vollständiger Ordnerbaum-Browser** im Verschieben-Dialog (siehe oben).
- **Korrekte Breadcrumb-Namen nach Reload** ohne zusätzlichen Server-Endpoint (siehe oben).

## Verifikation

- `npx vue-tsc --noEmit` läuft fehlerfrei durch.
- `npx eslint` (mit `--fix`) auf allen geänderten Dateien zeigt keine verbleibenden Probleme
  außer einer vorbestehenden, nicht mit diesem Feature zusammenhängenden Regel-Warnung im
  Backend-Repo.
- **Nicht ausgeführt:** Die bestehende Jest-Testsuite ließ sich in dieser Umgebung wegen einer
  Node-Versions-Inkompatibilität (Repo verlangt Node 24, Umgebung hatte Node 18.19.1) nicht
  starten. Vor dem Merge sollte die Suite unter Node 24 laufen, inkl. neuer Tests für
  `FileTable.vue` (Ordner-Zeilen-Rendering, Navigation, Verschieben-Dialog) und `Folder.vue`
  (Ebenenwechsel, Breadcrumb-Erweiterung).
- **Manuell/E2E (empfohlen vor Merge):** Feature-Flag `FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED`
  aktivieren, dann auf Staging (`staging.kibox.online`, Branch-Label auf PRs in beiden Repos
  setzen) durchspielen: Ordner-Element anlegen → Unterordner erstellen → Datei in Unterordner
  hochladen → in tieferen Unterordner navigieren → Datei zwischen Ordnern verschieben →
  Unterordner mit Inhalt löschen (Kaskade prüfen) → Reload auf tiefem Unterordner-Link
  (Breadcrumb-Platzhalter beobachten).
