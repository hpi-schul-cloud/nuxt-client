<template>
	<MediaBoardElementDisplay :element="displayData" @click="onClick" @keyup.enter="onClick" />
</template>

<script setup lang="ts">
import { MediaElementDisplay, useSharedMediaBoardState } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import { MediaAvailableLineElementResponse, ToolContextType } from "@/serverApi/v3";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
import { useExternalToolLaunchState } from "@data-external-tool";
import { useDragAndDrop } from "@util-board";
import { useErrorNotification } from "@util-error-notification";
import { computed, ComputedRef, onUnmounted, PropType, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	element: {
		type: Object as PropType<MediaAvailableLineElementResponse>,
		required: true,
	},
});

const { t } = useI18n();
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const { launchTool, fetchSchoolLaunchRequest, error: launchError } = useExternalToolLaunchState();

const { mediaBoard } = useSharedMediaBoardState();

useErrorNotification(launchError);

const displayData: ComputedRef<MediaElementDisplay> = computed(() => ({
	title: props.element.name,
	domain: props.element.domain,
	description: props.element.description,
	thumbnail: props.element.thumbnailUrl || props.element.logoUrl,
}));

const loadAvailableLineElementData = async (element: MediaAvailableLineElementResponse): Promise<void> => {
	const contextId: string | undefined = mediaBoard.value?.id;
	if (contextId) {
		await fetchSchoolLaunchRequest(element.schoolExternalToolId, {
			contextId,
			contextType: ToolContextType.MediaBoard,
		});
	}
};

watch(
	() => props.element,
	async (newValue, oldValue) => {
		if (newValue && newValue !== oldValue) {
			await loadAvailableLineElementData(newValue);
		}
	},
	{ immediate: true }
);

const refreshTimeInMs = useEnvConfig().value.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await loadAvailableLineElementData(props.element);
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

const { isDragging } = useDragAndDrop();

const onClick = async () => {
	// Loading has failed before
	if (launchError.value) {
		notifierModule.show({
			status: "error",
			text: t("error.generic"),
		});

		return;
	}

	if (isDragging.value) {
		return;
	}

	launchTool();

	await loadAvailableLineElementData(props.element);
};
</script>
