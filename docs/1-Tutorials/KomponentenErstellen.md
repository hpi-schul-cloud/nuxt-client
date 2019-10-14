# Neue Komponente erstellen

Eine neue Komponente geht am einfachsten mithilfe unserer Hygen Templates zu erstellen.

```bash
npm run new component
```

Dir werden ein paar Fragen gestellt und anschließend die entsprechenden Dateien mit ein wenig Boilerplate Code generiert.

Sogenannte _BaseComponents_ sind Komponenten welche auf so ziemlich jeder Seite benutzt werden oder als _"Polyfill"_ für Standard HTML-Tags genutzt werden. Diese Komponenten findest du unter `./src/components/base`. Alle anderen Komponenten direkt unter `./src/components`.

Die zugehörigen Unit Tests liegen stets direkt neben der Datei.

Solltest du dich dazu entschieden haben (hoffentlich!) auch gleich einen Storybook Eintrag für deine Komponente anzulegen, so findest du die Entsprechende Story unter `./stories/{ComponentName}.stories.js`.
