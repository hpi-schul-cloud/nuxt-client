<template>
	<DefaultWireframe ref="main" :full-width="true">
		<MediaBoard :board="mediaBoard" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { ref, Ref } from "vue";
import MediaBoard from "./MediaBoard.vue";
import { IMediaBoard } from "./types";

useTitle(buildPageTitle("Mein Medienregal"));

const mediaBoard: Ref<IMediaBoard> = ref({
	id: "board1",
	lines: [
		{
			id: "line1",
			title: "Meine Favoriten",
			elements: [
				{
					id: "element1",
					title: "Windows Hintergründe",
					description: "Die besten Hintergründe",
					thumbnailUrl: "https://i.wfcdn.de/teaser/1920/67538.png",
				},
				{
					id: "element2",
					title: "Die Leere",
				},
			],
		},
		{
			id: "line2",
			title: "Alles Andere",
			elements: [
				{
					id: "element3",
					title: "Grüne Wiesen",
					thumbnailUrl: "https://i.wfcdn.de/teaser/1920/67538.png",
				},
				{
					id: "element4",
					title: "Enthusiasmus - Eine Sammlung der besten Text",
					thumbnailUrl: "https://i.wfcdn.de/teaser/1920/67538.png",
					description:
						"Die Beschreibung ist viel zu lang für dieses Element und ich hoffe, dass niemand einen ganzen Roman in diese Zeile schreiben wird.",
				},
				{
					id: "element5",
					title: "Ein hauch von Nichts",
				},
				{
					id: "element6",
					title: "Bücherstapel",
					thumbnailUrl:
						"https://i.pinimg.com/originals/8e/df/4b/8edf4b2330d25b1ca1d85b69f7538d2e.png",
				},
				{
					id: "element7",
					title: "Element 7",
				},
				{
					id: "element8",
					title: "Element 8",
				},
				{
					id: "element9",
					title: "Element 9",
				},
				{
					id: "element10",
					title: "Element 10",
				},
			],
		},
	],
});
</script>
