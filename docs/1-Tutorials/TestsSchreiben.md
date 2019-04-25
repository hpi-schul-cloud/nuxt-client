# Tests schreiben

[[toc]]

## Unit-Tests

### Dokumentation

Für das Unit-Testing verwenden wir [jest](https://jestjs.io/docs/en/using-matchers) mit den [vue-test-utils](https://vue-test-utils.vuejs.org/guides/#getting-started).

Alle Tests liegen direkt neben den Componenten und müssen nach dem folgenden Schema benannt werden `[ComponentName].unit.js` (Bspw. `BaseCard.unit.js` für die Komponente `BaseCard.vue`).

Zusätzlich haben wir einige global verfügbare Matcher eingeführt.

`.toBeAComponent()`, `.toBeAViewComponent()`, ... (siehe `/tests/unit/matchers.js`)

Für die Häufigsten Tests gibt es ebenfalls Hilfsfunktionen. Zu finden unter [`/tests/unit/commonTests.js`](https://github.com/schul-cloud/nuxt-client/blob/aj/improve-test-coverage/tests/unit/commonTests.js)

### Development Script

Zum schreiben von unit-tests ist es empfehlenswert mit folgendem Kommando zu starten:

```bash
yarn test:unit:watch
```

Anschließend werden die entsprechenden Tests die geändert wurden automatisch geprüft.

#### Debugging von Tests

Für Visual Studio Code liegen Debug Konfigurationen Bereit (`.vscode/launch.json`). Wenn die Tests mit diesen gestartet werden, können Breakpoints gesetzt werden und der Test mit allen VS-Code debug features debuggt werden.

- `Test (unit) All`: Lässt alle Unit Tests nacheinander laufen und hält an entsprechenden Breakpoints an.
- `Test (unit) Current File`: Lässt alle Tests in der aktuell fokussierten Datei laufen und stoppt an entsprechenden Breakpoints.

### Beispieltests

```js
// Importieren der zu testenden Komponente
import BaseCard from "./BaseCard";

// Beschreibung, welche Komponente wir testen
describe("@components/BaseCard", () => {
	// Allgemeiner default-test für Komponenten.
	// Testet nur ob die Komponente valide definiert ist.
	it("exports a valid component", () => {
		expect(BaseCard).toBeAComponent();
	});

	// Beschreibung: "Was wird getestet?"
	it("renders its content", () => {
		// Testdaten definieren
		const slotContent = "<p>Hello!</p>";
		// Mounten/Rendern der Komponente, mit Eigenschaften
		const wrapper = shallowMount(BaseCard, {
			slots: {
				default: slotContent,
			},
		});
		// Test ob alles richtige gerendert wurde
		expect(wrapper.element.innerHTML).toContain(slotContent);
	});
});
```

#### Common tests

Die soeben beschriebenen Tests werden so häufig verwendet, dass wir sie ausgelagert haben. Die Nutzung ist folgendermaßen möglich:

```js{4-5}
import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(...rendersDefaultSlotContent(BaseCard));
});
```

#### Test `v-model`

Soll das `v-model` einer Komponente getestet werden, so kann die Komponente nicht direkt gemountet werden, sondern muss per template eingebunden werden. Die Vue-Test-Utils stellen leider keine bessere Möglichkeit bereit. Das setzen der für das v-model verwendeten Prop klappt leider nicht, da der verwendete Wert nicht automatisch durch das `v-model-update-event` verändert wird.

```js{8-13}
import BaseInput from "./BaseInput";

describe("@components/BaseInput", () => {
	it("changing the element's value, updates the v-model", () => {
		const testInput = "test string";
		const wrapper = mount({
			data: () => ({ content: "" }),
			template: `<base-input
				v-model="content"
				label="test"
				type="text"
				name="test"
			/>`,
			components: { BaseInput },
		});
		const input = wrapper.find(`input`);
		input.setValue(testInput);
		expect(wrapper.vm.content).toBe(testInput);
	});
});
```

## e2e-Tests

Aktuell sammeln wir noch, was getestet werden soll: [Liste im Confluence anzeigen](https://docs.schul-cloud.org/pages/viewpage.action?spaceKey=Intern&title=Integrationstest+Status)
