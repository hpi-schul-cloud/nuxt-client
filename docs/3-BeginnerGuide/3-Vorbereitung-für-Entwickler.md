# Vorbereitung für Entwickler

Hier listen wir eine Zusammenfassung aller Tools, Software und Materialien auf, die benötigt werden, um als Entwickler an der Schul-Cloud mitzuarbeiten.

## JavaScript / Node.js

Wenn Du als Entwickler an der Schul-Cloud mitentwickeln möchtest, solltest Du als wichtigste Grundlage etwas Erfahrung in JavaScript mitbringen. Ursprünglich als Skriptsprache vorgesehen hat sich JavaScript innerhalb des letzten Jahrzehnts zu einer vollwertigen, modernen Programmiersprache entwickelt. Diese wurde nicht zuletzt durch Verbreitung der Open-Source-Laufzeitumgebung Node.js möglich. Seit 2009 wird Node.js kontinuierlich weiterentwickelt und ermöglicht Anwendungen vom Server über die Datenbank bis hin zum Frontend mit JavaScript zu implementieren. Zudem ermöglicht Node.js Rapid Application Development. Dies bedeutet, dass Anwendungen auch schon in einer sehr frühen Phase veröffentlicht und durch kontinuierliches Feedback verbessert werden können. Mit Paketmanager wie npm oder yarn können zudem Module leicht hinzugefügt werden. Mache dich also mit den notwendigen Grundlagen von [Node.js](https://www.w3schools.com/nodejs/nodejs_intro.asp) einmal [vertraut](https://o7planning.org/de/11931/die-anleitung-zum-nodejs-fur-den-anfanger). Und hier kannst Du einmal deine Fähigkeiten mit Java-Script grundlegend testen: [GitHub - lydiahallie/javascript-questions: A long list of (advanced) JavaScript questions, and their explanations](https://github.com/lydiahallie/javascript-questions)

Was für dich als Entwickler zudem wichtig ist, sind unsere Code Conventions, die Du unter [Die Grade Clean Code Developer](https://clean-code-developer.de/die-grade/) detailliert nachlesen kannst. Eine besondere Ausnahme bilden noch unsere Naming Conventions zur Orientierung, die Du unter [BEM — Block Element Modifier](http://getbem.com/naming/) einsehen kannst.

## Git/Github

Vermutlich hast Du schon einige Erfahrungen mit der Konsole oder dem Terminal gesammelt, wenn Du an der Schul-Cloud mitarbeiten möchtest. (Falls nicht findest Du hier einen Einsteigerguide: [Lerne Git kennen – Git-Tutorials, -Workflows und Befehle](https://www.atlassian.com/de/git)) Für Einsteiger können wir dir zudem auch eine [Browser-Applikation](https://desktop.github.com/) für Github empfehlen, die viele der Abläufe vereinfacht, die auf der Konsole anfänglich noch kompliziert wirken (. Es ist dabei stets von äußerster Wichtigkeit für deinen Workflow, die lokalen Dateien mit dem Hauptprojekt synchron zu halten. Als Entwickler-Novize wirst Du deine Branches von Develop abzweigen aber noch nicht automatisch auf Develop pushen können, sondern nur Pull Requests erstellen. Die Benennung der Branches erfolgt nach folgendem Schema:

Dabei sollen Feature-Branches die Ticket-Id und den Ticket-Namen beinhalten, also z.B. ‘feature/SC-XXX_ticket_name_or_shorter_description’.

## Feathers

Ein serverorientierest Web-Framework um Echtzeit-Applikationen mit REST APIs und Javascript zu entwickeln. Feathers beruht intern auf Express, welches das meistgenutzte HTTP-Server-Framework in Node.js ist. Es vereinfacht sowohl den Aufbau von Routen und Services als auch die Anbindung an die Datenbanken der Schul-Cloud wie MongoDB und kann dabei mit jeder fast Art von Backend/Server-Technologie interagieren. Mehr Infos findest Du unter: [https://github.com/feathersjs](https://github.com/feathersjs)

## Docker

Vielleicht hast Du schon einmal den Begriff Software as a Service (SaaS) gehört. Innerhalb der Schul-Cloud operieren wir mit einer Plattform as a Service (PaaS)-Lösung. Dabei unterstützt uns Docker, das uns ermöglicht Software in einzelnen Paketen, sogenannten Containern auszuliefern und dabei die die Trennung und Verwaltung der Ressourcen besser zu garantieren, die auf einem Rechner genutzt werden. Container sind voneinander unabhängig und enthalten jeweils ihre eigene Code Laufzeitmodule, Systemwerkzeuge und Bibliotheken können aber durch Docker leicht miteinander interagieren.

## MongoDB und PostgreSQL

Die beiden Datenbanksysteme MongoDB und PostgreSQL stellen die Datenbank-Infrastruktur der Schul-Cloud bereit. In den meisten Fällen kommt die nicht-relationale Datenbank MongDB zum Einsatz, da sie eine der schnellsten Zugriffszeiten für Datenbanken aufweist. Bei komplexeren Objekten wie Audio oder Bilddaten wird jedoch ein objekt-relationales Datenbanksystem benötigt. Hierbei wird PostgreSQL eingesetzt
