# State Styles

Eine Komponente kann in verschiedenen zuständen verschieden gestylt gebraucht werden. Damit es einheitlich und durchgängig ist sollten diese styles direkt in der Komponente schon definiert sein. Dies soll über die property `design` weiter gegeben werden. In der Komponente sollte ein validator sein der bei tipp Fehler oder nicht vorhanden designs einen Error schmeißt.

Usage:

```html
<BaseButton design="textbutton primary">Button</BaseButton>
```

Komponente:

```javascript
export default = {
props: {
  design: {
    type: String,
    validator: (design) => ["textbutton primary"].includes(design)
  }
}
}
```

Welche designs zu verfügung stehen, können im Storybook nachgeschlagen werden und sollten dort auch bei jedem neu hinzugekommenen design eingepflegt werden.
