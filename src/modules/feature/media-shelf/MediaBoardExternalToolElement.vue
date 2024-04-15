<template>
	<MediaBoardElementDisplay :element="displayData" />
</template>

<script setup lang="ts">
import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { useContextExternalToolApi } from "@data-external-tool";
import { PropType, Ref, ref, watch } from "vue";
import { MediaElementDisplay } from "./data/types";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

const props = defineProps({
	element: {
		type: Object as PropType<MediaExternalToolElementResponse>,
		required: true,
	},
});

const { fetchDisplayDataCall } = useContextExternalToolApi();

const displayData: Ref<MediaElementDisplay | undefined> = ref();

const loadExternalToolDisplayData = async (
	element: MediaExternalToolElementResponse
): Promise<void> => {
	try {
		const contextExternalTool: ExternalToolDisplayData =
			await fetchDisplayDataCall(element.content.contextExternalToolId);

		if (contextExternalTool) {
			displayData.value = {
				title: contextExternalTool.name,
				description: undefined, //TODO
				thumbnail: undefined,
			};
		}
	} catch (error) {
		// TODO
		console.error(error);
	}
};

watch(
	() => props.element,
	async (newValue, oldValue) => {
		if (newValue && newValue !== oldValue) {
			await loadExternalToolDisplayData(newValue);
		}
	},
	{ immediate: true }
);
</script>
