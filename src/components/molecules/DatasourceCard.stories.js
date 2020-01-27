import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import DatasourceCard from "./DatasourceCard";
import ExampleImage from "@assets/img/datasources/logo-webuntis.svg";

const DatasourceActions = `<BaseButton design="primary text">
<BaseIcon source="material" icon="add"/>
Datenquelle hinzufügen
</BaseButton>`;

storiesOf("Molecules|DatasourceCard", module)
	.add("with knobs", () => ({
		components: { DatasourceCard },
		data: () => ({
			img: ExampleImage,
			title: text("title", "A Title"),
			subtitle: text("subtitle", "I am a subtitle"),
		}),
		template: `<div>
		<DatasourceCard :image="img" :title="title" :subtitle="subtitle">
			<template v-slot:actions>${DatasourceActions}</template>
		</DatasourceCard>
	<div>`,
	}))
	.add("with subtitle", () => ({
		components: { DatasourceCard },
		data: () => ({
			img: ExampleImage,
		}),
		template: `<div>
		Using Props:
		<DatasourceCard :image="img" title="A Title" subtitle="I am a subtitle">
			<template v-slot:actions>${DatasourceActions}</template>
		</DatasourceCard>
		<br/>
		Using Slots:
		<DatasourceCard :image="img">
			<template v-slot:title>Datenquelle</template>
			<template v-slot:subtitle>I am a subtitle</template>
			<template v-slot:actions>${DatasourceActions}</template>
		</DatasourceCard>
	<div>`,
	}))
	.add("without subtitle", () => ({
		components: { DatasourceCard },
		data: () => ({
			img: ExampleImage,
		}),
		template: `<div>
		Using Props:
		<DatasourceCard :image="img" title="A Title">
			<template v-slot:actions>${DatasourceActions}</template>
		</DatasourceCard>
		<br/>
		Using Slots:
		<DatasourceCard :image="img">
		<template v-slot:title>Datenquelle</template>
			<template v-slot:actions>${DatasourceActions}</template>
		</DatasourceCard>
	<div>`,
	}));
