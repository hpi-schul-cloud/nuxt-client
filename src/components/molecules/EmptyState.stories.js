import { storiesOf } from "@storybook/vue";
import EmptyState from "./EmptyState";
import ExampleImage from "@assets/img/emptystate-graph.svg";

storiesOf("5 Molecules/EmptyState", module).add("default", () => ({
	components: { EmptyState },
	data: () => ({ imgsrc: ExampleImage }),
	template: `<EmptyState :image="imgsrc">
		<template v-slot:description>Noch keine Datenquellen vorhanden. Mit dem Plus unten rechts kannst du eine Datenquelle hinzufügen.</template>
	</EmptyState>`,
}));
