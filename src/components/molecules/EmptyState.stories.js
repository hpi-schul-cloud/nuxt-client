import { storiesOf } from "@storybook/vue";
import EmptyState from "./EmptyState";
import { text } from "@storybook/addon-knobs";

storiesOf("5 Molecules/EmptyState", module).add("default", () => ({
	components: { EmptyState },
	data: () => ({
		imgsrc: text(
			"Image Source",
			"https://niedersachsen.cloud/images/empty-states/topics.svg"
		),
		imgAlt: text("Image Alt", "Dummy image"),
		imgHeight: text("Image Height", "200px"),
		title: text("Title", "Keine Datenquellen vorhanden"),
		description: text(
			"Description",
			"Noch keine Datenquellen vorhanden. Mit dem Plus unten rechts kannst du eine Datenquelle hinzufügen."
		),
	}),
	template: `<EmptyState :image="imgsrc" :image-alt="imgAlt" :title="title" :image-height="imgHeight">
		<template v-slot:description>{{ description }}</template>
	</EmptyState>`,
}));
