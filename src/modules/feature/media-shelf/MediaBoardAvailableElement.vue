<template>
	<MediaBoardElementDisplay :element="displayData" />
</template>

<script setup lang="ts">
import { MediaAvailableLineElementResponse } from "@/serverApi/v3";
import { computed, ComputedRef, PropType } from "vue";
import { MediaElementDisplay } from "./data/types";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

const props = defineProps({
	element: {
		type: Object as PropType<MediaAvailableLineElementResponse>,
		required: true,
	},
});

const displayData: ComputedRef<MediaElementDisplay> = computed(() => ({
	title: props.element.name,
	description: props.element.description,
	thumbnail: undefined,
}));
</script>
