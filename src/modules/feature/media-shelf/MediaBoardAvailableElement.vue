<template>
	<MediaBoardElementDisplay
		:element="displayData"
		@click="onClick"
		@keyup.enter="onClick"
	/>
</template>

<script setup lang="ts">
import {
	MediaAvailableLineElementResponse,
	ToolContextType,
} from "@/serverApi/v3";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { useExternalToolLaunchState } from "@data-external-tool";
import { useErrorNotification } from "@util-error-notification";
import { computed, ComputedRef, onUnmounted, PropType, watch } from "vue";
import { useI18n } from "vue-i18n";
import { MediaElementDisplay, useMediaBoardApi } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

const props = defineProps({
	element: {
		type: Object as PropType<MediaAvailableLineElementResponse>,
		required: true,
	},
});

const { t } = useI18n();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const {
	launchTool,
	fetchSchoolLaunchRequest,
	error: launchError,
} = useExternalToolLaunchState();

const { getMediaBoardForUser } = useMediaBoardApi();

useErrorNotification(launchError);

const displayData: ComputedRef<MediaElementDisplay> = computed(() => ({
	title: props.element.name,
	description: props.element.description,
	thumbnail: props.element?.logoUrl,
}));

const getMediaBoardId = async (): Promise<string> => {
	const mediaBoard = await getMediaBoardForUser();
	return mediaBoard.id;
};

const loadExternalToolData = async (
	element: MediaAvailableLineElementResponse
): Promise<void> => {
	await fetchSchoolLaunchRequest(element.schoolExternalToolId, {
		contextId: await getMediaBoardId(),
		contextType: ToolContextType.MediaBoard,
	});
};

watch(
	() => props.element,
	async (newValue, oldValue) => {
		if (newValue && newValue !== oldValue) {
			await loadExternalToolData(newValue);
		}
	},
	{ immediate: true }
);

const refreshTimeInMs = envConfigModule.getEnv.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await fetchSchoolLaunchRequest(props.element.schoolExternalToolId, {
		contextId: await getMediaBoardId(),
		contextType: ToolContextType.MediaBoard,
	});
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

const onClick = async () => {
	// Loading has failed before
	if (launchError.value) {
		notifierModule.show({
			status: "error",
			text: t("error.generic"),
		});

		return;
	}

	launchTool();

	await fetchSchoolLaunchRequest(props.element.schoolExternalToolId, {
		contextId: await getMediaBoardId(),
		contextType: ToolContextType.MediaBoard,
	});
};
</script>
