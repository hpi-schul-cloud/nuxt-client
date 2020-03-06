# Schul-Cloud Entwickler Guide – Einführung

Hallo!

Wir freuen uns, dass Du auf diese Seite gefunden hast.

Wir wollen Dir als (Nachwuchs)-Entwickler einen guten Einstieg dabei geben, wo Du bei der Schul-Cloud mithelfen kannst. Ob Du uns bei der Entwicklung kleinere Applikationen und Features unterstützen oder selber einen Bug in der Schul-Cloud beheben möchtest, der dich gerade stört. Das Team der Schul-Cloud ist Dir für jede Mithilfe dankbar. Denn als Open Source Plattform zeichnet sich die Schul-Cloud dadurch aus, dass die Codebase jedem offen steht und jeder ist eingeladen mitzuentwickeln und dabei die Schul-Cloud noch besser zu machen. (Natürlich gerne auch als Teil des Informatikunterrichts oder einer Informatik-AG)

## Die Basics

Die Schul-Cloud ist kein typisches Lernmanagement-System (LMS), sondern zeichnet sich dadurch aus, dass sie in mehrere Module aufgeteilt ist, sogenannte Microservices. Diese Module werden unabhängig voneinander entwickelt und eingesetzt. Dies geschieht für die Nutzer im Hintergrund und vereinfacht für die Entwickler dabei die Wartung (wenn zum Beispiel der Code für eine Anwendung refactored werden soll) oder ein Bug ein ganzes Modul beeinträchtigt, bedeutet dies im Normfall, dass das die restlichen Module trotzdem funktionieren. Zudem erlaubt es neue Module ständig mit und weiterzuentwickeln und neue Funktionen hinzuzufügen. Dies ermöglicht der Schul-Cloud über den Nutzen einer Plattform hinauszugehen, die Anwendungen nur für einen spezifischen Bereich bedient. Zudem werden alle Funktionen der Schul-Cloud über eine eigene Programmierschnittstelle (API) bereitgestellt. Der gesamte Quellcode der Schul-Cloud ist dabei als Open Source Projekt auf [Github](https://github.com/schul-cloud) einsehbar.

## Die verschiedenen Instanzen 

Bei der Entwicklung ist zu beachten, dass Du als Entwickler primär an der Kernanwendung, der HPI Schul-Cloud selbst mitentwickelst, die als Prototyp für die Schul-Cloud in einzelnen Bundesländern dient. Die länderspezifischen Schul-Clouds (wie die Brandenburg Schul-Cloud oder Niedersächsische Bildungscloud) sind Klone dieses Kernprojektes, das noch bis Juli 2021 laufen wird und das in Zukunft von den einzelnen Ländern selbst weiterbetrieben werden soll. Da sich bei den Klonen meistens nur wenige Details und das Design der einzeln Schul-Clouds unterscheiden, die grundlegenden Funktionen jedoch gleich bleiben, genügt es aber vollauf, wenn Du am Kernprojekt mitarbeitest und deine Änderungen werden dann automatisch auf die anderen Projekte mitübertragen.

## Ansprechpartner

Hier findest Du eine Übersicht des [Teams der Schul-Cloud](https://schul-cloud.org/team). Wenn Du dich schon bereit fühlst, auf Anhieb mitzuentwickeln, ist dein Ansprechpartner der technische Leiter der Schul-Cloud Jan Renz (<jan.renz@hpi.de>)Alternativ kannst Du auch gerne alle Fragen, die Du als Entwickler hast, an das [Support Team](https://ticketsystem.schul-cloud.org/servicedesk/customer/portal/2/user/login?destination=portal%2F2) stellen und auch vorab deine Ideen zur Verbesserung mit uns diskutieren. Wir würden dich dann an die entsprechenden Stellen (z.B die verantwortlichen Entwickler der einzelnen Komponenten) weiterleiten. Als richtiger Entwickler zählst Du natürlich sobald Du beginnst deine ersten Beiträge für die Schul-Cloud zu leisten und kannst bei aktiver Beteiligung gerne auch als Contributer vermerkt werden. Natürlich könnte die Schul-Cloud auch der richtige Ort sein, wenn Du nach einem interessanten Platz für ein Praktikum suchst. Schreib uns einfach! 