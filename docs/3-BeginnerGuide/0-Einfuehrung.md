# HPI Schul-Cloud Entwickler Guide – Einführung

Hallo!

Wir freuen uns, dass Du auf diese Seite gefunden hast.

Wir wollen Dir als (Nachwuchs)-Entwickler einen guten Einstieg dabei geben, wo Du bei der HPI Schul-Cloud mithelfen kannst. Ob Du uns bei der Entwicklung kleinere Applikationen und Features unterstützen oder selber einen Bug in der HPI Schul-Cloud beheben möchtest, der dich gerade stört. Das Team der HPI Schul-Cloud ist Dir für jede Mithilfe dankbar. Denn als Open Source Plattform zeichnet sich die HPI Schul-Cloud dadurch aus, dass die Codebase jedem offen steht und jeder ist eingeladen mitzuentwickeln und dabei die HPI Schul-Cloud noch besser zu machen. (Natürlich gerne auch als Teil des Informatikunterrichts oder einer Informatik-AG)

## Die Basics

Die HPI Schul-Cloud ist kein typisches Lernmanagement-System (LMS), sondern zeichnet sich dadurch aus, dass sie in mehrere Module aufgeteilt ist, sogenannte Microservices. Diese Module werden unabhängig voneinander entwickelt und eingesetzt. Dies geschieht für die Nutzer im Hintergrund und vereinfacht für die Entwickler dabei die Wartung (wenn zum Beispiel der Code für eine Anwendung refactored werden soll) oder ein Bug ein ganzes Modul beeinträchtigt, bedeutet dies im Normfall, dass die restlichen Module trotzdem funktionieren. Zudem erlaubt es neue Module ständig mit und weiterzuentwickeln und neue Funktionen hinzuzufügen. Dies ermöglicht der HPI Schul-Cloud über den Nutzen einer Plattform hinauszugehen, die Anwendungen nur für einen spezifischen Bereich bedient. Zudem werden alle Funktionen der HPI Schul-Cloud über eine eigene Programmierschnittstelle (API) bereitgestellt. Der gesamte Quellcode der HPI Schul-Cloud ist dabei als Open Source Projekt auf [GitHub](https://github.com/hpi-schul-cloud) einsehbar.

## Die verschiedenen Instanzen

Bei der Entwicklung ist zu beachten, dass Du als Entwickler primär an der Kernanwendung, der HPI Schul-Cloud selbst mitentwickelst, die als Prototyp für die HPI Schul-Cloud in einzelnen Bundesländern dient. Die länderspezifischen Clouds (wie die Schul-Cloud Brandenburg oder Niedersächsische Bildungscloud) sind Klone dieses Kernprojektes, das noch bis Juli 2021 laufen wird und das in Zukunft von den einzelnen Ländern selbst weiterbetrieben werden soll. Da sich bei den Klonen meistens nur wenige Details und das Design der einzeln Clouds unterscheiden, die grundlegenden Funktionen jedoch gleich bleiben, genügt es aber vollauf, wenn Du am Kernprojekt mitarbeitest und deine Änderungen werden dann automatisch auf die anderen Projekte mitübertragen.

## Ansprechpartner

Wenn Du dich schon bereit fühlst, auf Anhieb mitzuentwickeln, ist dein Ansprechpartner der technische Leiter der HPI Schul-Cloud Jan Renz (<jan.renz@hpi.de>)Alternativ kannst Du auch gerne alle Fragen, die Du als Entwickler hast, an das [Support Team](https://ticketsystem.dbildungscloud.de/servicedesk/customer/portal/2/user/login?destination=portal%2F2) stellen und auch vorab deine Ideen zur Verbesserung mit uns diskutieren. Wir würden dich dann an die entsprechenden Stellen (z.B die verantwortlichen Entwickler der einzelnen Komponenten) weiterleiten. Als richtiger Entwickler zählst Du natürlich sobald Du beginnst deine ersten Beiträge für die HPI Schul-Cloud zu leisten und kannst bei aktiver Beteiligung gerne auch als Contributer vermerkt werden. Natürlich könnte die HPI Schul-Cloud auch der richtige Ort sein, wenn Du nach einem interessanten Platz für ein Praktikum suchst. Schreib uns einfach!
