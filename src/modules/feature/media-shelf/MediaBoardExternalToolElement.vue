<template>
	<MediaBoardElementDisplay
		:element="displayData"
		@click="onClick"
		@keyup.enter="onClick"
	/>
</template>

<script setup lang="ts">
import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import {
	useContextExternalToolApi,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { onUnmounted, PropType, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { MediaElementDisplay } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

const props = defineProps({
	element: {
		type: Object as PropType<MediaExternalToolElementResponse>,
		required: true,
	},
});

const { t } = useI18n();
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const { fetchDisplayDataCall } = useContextExternalToolApi();
const {
	launchTool,
	fetchLaunchRequest,
	error: launchError,
} = useExternalToolLaunchState();

const displayData: Ref<MediaElementDisplay | undefined> = ref();

const loadExternalToolData = async (
	element: MediaExternalToolElementResponse
): Promise<void> => {
	try {
		const externalToolDisplayData: ExternalToolDisplayData =
			await fetchDisplayDataCall(element.content.contextExternalToolId);

		displayData.value = {
			title: externalToolDisplayData.name,
			description: externalToolDisplayData.description,
			thumbnail: undefined,
		};

		await fetchLaunchRequest(element.content.contextExternalToolId);
	} catch (error) {
		console.error(error);
	}
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
	await loadExternalToolData(props.element);
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

	await fetchLaunchRequest(props.element.content.contextExternalToolId);
};
</script>
