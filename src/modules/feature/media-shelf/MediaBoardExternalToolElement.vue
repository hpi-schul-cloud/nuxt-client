<template>
	<MediaBoardElementDisplay
		:element="elementDisplayData"
		@click="onClick"
		@keyup.enter="onClick"
	/>
</template>

<script setup lang="ts">
import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import {
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { useErrorNotification } from "@util-error-notification";
import { computed, onUnmounted, PropType, Ref, watch } from "vue";
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

const {
	fetchDisplayData,
	displayData,
	error: displayError,
} = useExternalToolDisplayState();
const {
	launchTool,
	fetchLaunchRequest,
	error: launchError,
} = useExternalToolLaunchState();

useErrorNotification(displayError);

const elementDisplayData: Ref<MediaElementDisplay | undefined> = computed(() =>
	displayData.value
		? {
				title: displayData.value.name,
				description: displayData.value.description,
				thumbnail: undefined,
			}
		: undefined
);

const loadExternalToolData = async (
	element: MediaExternalToolElementResponse
): Promise<void> => {
	await fetchDisplayData(element.content.contextExternalToolId);
	await fetchLaunchRequest(element.content.contextExternalToolId);
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
