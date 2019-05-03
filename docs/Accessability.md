# Accessibility

Menschen sollen nicht ausgeschlossen werden bei der Benutzung eines Interfaces die teilweise oder permanent eingeschränkt sind.

Es gibt verschiedene Level von Barrierefreiheit: A - AAA. Das höchste Level ist sehr schwer zu erreichen.

Es geht darum den Browser anzuleiten was über die OS API an das Betriebssystem weiterzugeben ist.

**HTML ist per se barrierefrei bei semantisch korrekter Entwicklung.**

- Section
- Header
- Footer
- Navigation Elemente

sind eine in HTML5 geschaffene Basis

## Section, Nav, Header und Footer Elemente

`<aside>`kennzeichnet eine weiterführende Option

Screenreader strukturieren Seiten anhand von `h1-h6`. Jedes Element braucht eine Überschrift, articles, sections, etc. Es gibt nur eine `h1` --> Separation of concern, styling erfolgt per Klasse. Wir haben dafür die Klassen `.h1, .h2, ...` global verfügbar gemacht.

Dementsprechend: Für ein `<nav>`-Element wird eine Überschrift benötigt. Kann mit `aria-labelledby` mit einer Überschrift zugeordnet werden

## Input

`<input>` benötigt immer ein `<label>`

## Forms

Forms sollten groupiert sein durch `<fieldset>`. Dort sollte auch das `<legend>`tag beschreiben was ausgefüllt wird.

## Buttons

Für die Navigation zwischen Ressourcen/Seiten sollte, unabhängig vom styling, ein `<a>`-Tag verwendet werden. Immer wenn sich also die URL ändert/auf eine andere Seite navigiert wird einen a-Tag verwenden und nur ansonsten einen Button.

Beispiele für `<a>`-Tag Anwendungsfälle: "Nächste Seite", "Gehe zu Bereich x", ...

`<Button>` wird verwendet für Form Action, Modal Trigger, irgendwelche Trigger

## CSS Farben

Achten auf:

- Kontraste
- CSS Selektoren

## Inhalte verstecken für not-impaired Benutzer

a11yproject.com/posts/how-to-hide-content

.visually-hidden class

## Images

`<img alt="">` muss eine Beschreibung des Bildinhaltes enthalten. Statt einer Beschreibung à la "Bild für Kurs" lieber das alt-Attribut leer lassen. Die Beschreibung soll den tatsächlichen Inhalt des Bildes beschreiben und nicht den Kontext, in welchem es Eingebunden ist.

`<svg>` title vergeben, mit `aria-labelledby` beschreiben

## TabIndex

Werte sollten nicht positiv sein

## Accessiblity Testing

Pa11y soll genutzt werden. AccessLint wird ist auf Github schon aktiviert.

## Weiteres lesen

Volle Ausführung gibt es bei: [W3.org aria practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
