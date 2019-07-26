# Komponente mit Storybook dokumentieren

Das Storybook bietet über das Notes Add-on an, Komponenten mit einer Markdown Datei zu dokumentieren. Diese sollte den selbigen Namen wie die Komponente haben.

Wurde die Komponente, wie empfohlen, via `npm run new component` erstellt und die Option für das Storybook ausgewählt so generiert dies auch automatisch eine Markdown Datei am richtigen Ort. Außerdem ist sie so auch automatisch in die Story mit eingebunden. Die Markdown Datei sollte im Ordner docs/stories zu finden sein.

Hier sollte beschrieben sein was das Ziel der Komponente ist sowie wann und wo sie eingesetzt wird. Weiterhin können hier style guidelines, States und Besonderheiten im Data-handling festgehalten werden.

Wenn die Story schon existiert und nur ein Unterpunkt hinzukommen soll kann man das mit einem `.add()` and die `storiesOf()` anhängen.

Als Beispiel der Base Button:

```javascript{3-7}
import { storiesOf } from "@storybook/vue";

storiesOf("Base Components", module).add("Base Button Primary", () => ({
	components: { BaseButton },
	template: "<div><base-button>Primary</base-button></div>",
	methods: {},
}));
```

Im template sollte dann die Komponente sein. Wenn man mehrere Komponenten auf einer Seite darstellen möchte muss man ein Rahmen tag wie ein `<div></div>` setzten.

Zusätzlich gibts die Optionen durch knobs parameter der Komponente dynamisch zu verändern. So kann man als Beispiel durch das ändern von Texten sich unterschiedliche version ansehen. Knobs kann man nutzten in dem `props: {}`setzt und dem auch einen "default" der ein alias von dem Knobs add-on beinhaltet. Anschließend kann man diese parameter in der Storybook Oberfläche verändern. Ein Beispiel für den Base Button wobei "text" der Knobs alias ist:

```javascript
props: {
	text: {
		default: text("Text", "Primary"),
	},
},
```

Die andere Möglichkeit ist `data: () => ({})` zu setzten um so beispielsweise das v-model ändern zu können. Mehr Details zu Knobs sind in der [Storybook-Knobs-Package Dokumentation](https://www.npmjs.com/package/@storybook/addon-knobs) zu finden.
