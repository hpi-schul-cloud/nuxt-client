# FAQ

[[toc]]

## Warum kein Pug oder ähnliches für Vue Templates?

Der Support von Lintern ist sehr gering und zudem ist der Einstieg für neue Entwickler schwerer. Der Mehrwert den Pug bietet ist den Verlust an Lint Features & Developer Onboarding nicht wert.

## Warum kein sass, sondern nur scss & css?

Die Kompatibilität von sass zu Dev-Tools und Lintern ist im vergleich zu scss wesentlich geringer und scss ist vollkommen ausreichend, auch wenn man mit sass natürlich weniger schreiben müsste.

## Wieso sind die Componenten nicht mit Unterordnern kategorisiert?

Dies lässt sich am besten mit einem Beispiel begründen: Angenommen du baust eine `Card` für `Aufgaben`. Diese würdest du sicherlich in einem Ordner `/tasks` (o.ä.) ablegen. Jetzt möchtest du dieses Aufgabenmodul aber auch unter `/courses` auf einer Seite wiederverwenden. Ein `import "@components/tasks/card"` wäre hier einfach unintuitiv und es wird sehr schnell kompliziert die entsprechenden Komponenten zu finden. Die meisten Editoren haben jedoch eine starke Suche und Autoverfollstöndigung integriert, sodass eine Flache, Alphabetisch sortierte Hierarchie kaum Nachteile mit sich bringt.
