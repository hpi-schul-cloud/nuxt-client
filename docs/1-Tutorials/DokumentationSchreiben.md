# Dokumentation schreiben

Für die Dokumentation verwenden wir [Vuepress](https://vuepress.vuejs.org) mit einigen Convenience Anpassungen.

## Sidebar

Die Sidebar wird automatisch aus der Ordnerstruktur erstellt. Das Skript dazu befindet sich in der Vuepress-Config Datei (`./docs/.vuepress/config.js`).

::: tip Dateibenennung

Es zwingend erforderlich, die Dateinamen und Ordner in **_PascalCase_**-Case zu schreiben, damit die Sidebar korrekt generiert wird.

:::

Um die Einträge sortieren zu können, können diese mit `[Zahl]-` (Bspw. `2-`) geprefixt werden. Sollte kein Prefix existieren wird die Sortierung des Dateisystems genutzt.
