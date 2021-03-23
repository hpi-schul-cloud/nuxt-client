import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import DatasourceCard from "./DatasourceCard";
import ContextMenu from "@components/molecules/ContextMenu";
import ExampleImage from "@assets/img/datasources/logo-ldap.svg";

const DatasourceActions = `<BaseButton design="primary text">
<BaseIcon source="material" icon="add"/>
Datenquelle hinzufügen
</BaseButton>`;

storiesOf("5 Molecules/DatasourceCard", module)
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
	</div>`,
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
		</div>`,
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
		</div>`,
	}))
	.add(
		"with context menu",
		() => ({
			components: { DatasourceCard, ContextMenu },
			data: () => ({
				img: ExampleImage,
				contextOpen: true,
				actions: [
					{ text: "Action 1", event: "event1" },
					{ text: "Action 2", event: "event2" },
				],
			}),
			template: `
				<DatasourceCard :image="img" title="A Title" style="width: 500px">
					<template v-slot:actions>
						<BaseButton design="primary text">
							<BaseIcon source="material" icon="add"/>
							Datenquelle hinzufügen
						</BaseButton>
						<span style="position: relative">
							<BaseButton design="text icon" @click="contextOpen = true">
								<base-icon
									class="footer__content-icon"
									source="material"
									icon="more_vert"
								/>
							</BaseButton>
							<context-menu
								:show.sync="contextOpen"
								anchor="top-right"
								:actions="actions"
							/>
						</span>
					</template>
				</DatasourceCard>`,
		}),
		{ layout: "centered" }
	);
