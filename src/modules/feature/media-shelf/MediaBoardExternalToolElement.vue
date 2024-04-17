<template>
	<MediaBoardElementDisplay :element="displayData" />
</template>

<script setup lang="ts">
import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { useContextExternalToolApi } from "@data-external-tool";
import { PropType, Ref, ref, watch } from "vue";
import { MediaElementDisplay } from "./data";
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
		const externalToolDisplayData: ExternalToolDisplayData =
			await fetchDisplayDataCall(element.content.contextExternalToolId);

		if (externalToolDisplayData) {
			displayData.value = {
				title: externalToolDisplayData.name,
				description: externalToolDisplayData.description,
				thumbnail: undefined,
			};
		}
	} catch (error) {
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
