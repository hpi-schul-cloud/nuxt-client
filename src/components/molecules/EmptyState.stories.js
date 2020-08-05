import { storiesOf } from "@storybook/vue";
import EmptyState from "./EmptyState";
import { text } from "@storybook/addon-knobs";

storiesOf("5 Molecules/EmptyState", module).add("default", () => ({
	components: { EmptyState },
	data: () => ({
		imgsrc: text(
			"Image Source (starting with @assets for internal or url for external)",
			"@assets/img/empty-state/emptystate-graph.svg"
		),
		imgAlt: text("Image Alt", "Dummy image"),
		imgHeight: text("Image Height", "200px"),
		title: text("Title", "Keine Datenquellen vorhanden"),
		description: text(
			"Description",
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
		),
	}),
	template: `<EmptyState :image="imgsrc" :image-alt="imgAlt" :image-height="imgHeight" :title="title">
		<template v-slot:description>{{ description }}</template>
	</EmptyState>`,
}));
