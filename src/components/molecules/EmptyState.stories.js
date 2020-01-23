import { storiesOf } from "@storybook/vue";
import EmptyState from "./EmptyState";
import ExampleImage from "@assets/img/emptystate-graph.svg";

storiesOf("Molecules|EmptyState", module).add("default", () => ({
	components: { EmptyState },
	data: () => ({ imgsrc: ExampleImage }),
	template: `<EmptyState :image="imgsrc" alt="Platzhalter Bild für nicht vorhandene Datenquellen"> <template v-slot:description>Noch keine Datenquellen vorhanden. Mit dem Plus unten rechts kannst du eine Datenquelle hinzufügen.</template> </EmptyState>`,
}));
