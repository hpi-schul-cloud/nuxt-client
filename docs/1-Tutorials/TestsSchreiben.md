# Tests schreiben

[[toc]]

## Unit-Tests

### Dokumentation

Für das Unit-Testing verwenden wir [jest](https://jestjs.io/docs/en/using-matchers) mit den [vue-test-utils](https://vue-test-utils.vuejs.org/guides/#getting-started).

Alle Tests liegen direkt neben den Componenten und müssen nach dem folgenden Schema benannt werden `[ComponentName].unit.js` (Bspw. `BaseCard.unit.js` für die Komponente `BaseCard.vue`).

Zusätzlich haben wir einige global verfügbare Matcher eingeführt.

`.toBeAComponent()`, `.toBeAViewComponent()`, ... (siehe `/tests/unit/matchers.js`)

### Development Script

Zum schreiben von unit-tests ist es empfehlenswert mit folgendem Kommando zu starten:

```bash
yarn test:unit:watch
```

Anschließend werden die entsprechenden Tests die geändert wurden automatisch geprüft.

### Beispieltest

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
		const { element } = shallowMount(BaseCard, {
			slots: {
				default: slotContent,
			},
		});
		// Test ob alles richtige gerendert wurde
		expect(element.innerHTML).toContain(slotContent);
	});
});
```

## e2e-Tests
