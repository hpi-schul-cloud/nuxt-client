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
			title: "Title 1",
			elements: [
				{
					id: "element1",
					title: "Element 1",
					description: "This is element 1",
					thumbnailUrl: "https://i.wfcdn.de/teaser/1920/67538.png",
				},
				{
					id: "element2",
					title: "Element 2",
				},
			],
		},
		{
			id: "line2",
			title: "Title 2",
			elements: [
				{
					id: "element3",
					title: "Element 3",
					thumbnailUrl: "https://i.wfcdn.de/teaser/1920/67538.png",
				},
				{
					id: "element4",
					title: "Element 4",
					thumbnailUrl: "https://i.wfcdn.de/teaser/1920/67538.png",
					description:
						"This is a way too long description for an element of this size and I hope that people will not paste a 500 word assay into this field",
				},
				{
					id: "element5",
					title: "Element 5",
				},
				{
					id: "element6",
					title: "Element 6",
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
