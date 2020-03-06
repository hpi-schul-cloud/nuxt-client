#Das Ticketsystem – Eine Einführung

##Generell

In der Entwicklung der Schul-Cloud arbeiten wir mit einem Kanban-System. Es beruht auf Jira mit einem integrierten Kanban-Board für Entwickler. Wie auch Scrum versucht Kanban die Arbeitsabläufe von Entwicklern besser zu strukturieren, ist dabei aber deutlich flexibler. Wir streben damit innerhalb der Schul-Cloud ein Continuous Deployment an, also Kurze und regelmäßige Sprints. Dabei können wir aber auch Tickets nachträglich zu einem Release hinzufügen, um intern übersichtlicher zusammenzufassen. Die Entwicklung selbst teilt sich dabei in fünf Phasen auf:

Im *Backlog (1)* finden sich alle Tickets, die noch darauf warten dem Entwicklungszyklus hinzugefügt zu werden. Normalerweise geschieht dies durch den Product Owner, aber Du kannst dich natürlich trotzdem gerne einmal durchklicken und dir gerade die Tickets mit höheren Prioritäten anschauen. Da der Ready for *Development-Stapel (2)* oft sehr voll ist, wird der Backlog immer nur nach und nach abgearbeitet. Wenn Du als Entwickler ein Ticket beginnst, stellt Du es hier auf *Progress (3)*.

*Review (4)*: Sobald Du ein Ticket abgeschlossen hast, kannst Du es von einen zweiten Entwickler überprüfen lassen, der deinen Code checkt und die Funktionalität überprüft. Dafür musst Du einen Pull Request auf den richtigen Zielbranch erstellen und das Ticket auf Review setzten

*Done (5):* Hat der Reviewer, der stets ein Mitglied des Core-Dev-Teams ist, seine Überprüfung abgeschlossen. Kann er deinen Pull Request mergen, stellt das Ticket auf fertig und gibt es zur Veröffentlichung frei.

Die Sprache, die wir dabei in Jira verwenden ist so weit wie möglich Englisch.

##Typen

Insgesamt gibt vier verschiedene Typen von Tickets:

1. Stories: Neue Features oder Verbesserungsvorschläge
2. Bug: Alle Fehler, die bei der Benutzung auftreten
3. Epic: Oberthemen enthalten Stories. Sie geben den Entwicklern gewisse Zyklen vor, innerhalb denen gearbeitet wird
4. Aufgabe:  Hier werden Storys, Bugs oder Aufgaben in konkrete ToDos aufgesplittet, wenn sich eine komplexere Aufgabe auf mehrere Entwickler verteilen sollen

##Prioritäten

Es gibt fünf verschiedene Prioritäten. Für die Priorität erstellen wir kein Ticket. Für alle anderen gelten grob folgende Bedingungen:

<img src="JHDGuideline.pdf
" alt="Alt-Text" title="" />

Wobei gerade die Prioritäten Blocker und Feueralarm von den erfahrenen Entwicklern so schnell wie möglich gelöst werden, was meistens nur 24h bis zu maximal drei Tage dauert. Für dich als externer Entwickler sind vor allem die Prioritäten High und Medium interessant. Die Entwicklung von Medium-Funktionen darf auch schon einmal gerne einige Wochen dauern, also musst Du dir hier keinen Druck machen.