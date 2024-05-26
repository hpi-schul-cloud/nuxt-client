<template>
	<MediaBoardElementDisplay
		:element="elementDisplayData"
		@click="onClick"
		@keyup.enter="onClick"
	>
		<template #imageOverlay>
			<div class="pb-1">
				<WarningChip v-if="isToolDeactivated">{{
					$t("common.medium.chip.deactivated")
				}}</WarningChip>
				<WarningChip v-if="isToolNotLicensed">{{
					$t("common.medium.chip.notLicensed")
				}}</WarningChip>
			</div>
			<div>
				<WarningChip v-if="isToolIncomplete">{{
					$t("common.medium.chip.incomplete")
				}}</WarningChip>
			</div>
		</template>
	</MediaBoardElementDisplay>
</template>

<script setup lang="ts">
import WarningChip from "@/modules/ui/chip/WarningChip.vue";
import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import {
	useContextExternalToolConfigurationStatus,
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { useDragAndDrop } from "@feature-board/shared/DragAndDrop.composable";
import { useErrorNotification } from "@util-error-notification";
import { computed, onUnmounted, PropType, Ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ComputedRef } from "vue/dist/vue";
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
	fetchContextLaunchRequest,
	error: launchError,
} = useExternalToolLaunchState();
const { determineMediaBoardElementStatusMessage, isOperational } =
	useContextExternalToolConfigurationStatus();

useErrorNotification(displayError);

const elementDisplayData: Ref<MediaElementDisplay | undefined> = computed(() =>
	displayData.value
		? {
				title: displayData.value.name,
				description: displayData.value.description,
				thumbnail: displayData.value.logoUrl,
			}
		: undefined
);

const loadExternalToolData = async (
	element: MediaExternalToolElementResponse
): Promise<void> => {
	await fetchDisplayData(element.content.contextExternalToolId);

	if (displayData.value && isOperational(displayData.value.status)) {
		await fetchContextLaunchRequest(element.content.contextExternalToolId);
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

const isToolIncomplete: ComputedRef = computed(
	() =>
		displayData.value?.status.isOutdatedOnScopeContext ||
		displayData.value?.status.isOutdatedOnScopeSchool ||
		displayData.value?.status.isIncompleteOnScopeContext
);

const isToolDeactivated: ComputedRef = computed(
	() => displayData.value?.status.isDeactivated
);

const isToolNotLicensed: ComputedRef = computed(
	() =>
		displayData.value?.status.isNotLicensed &&
		!displayData.value?.status.isDeactivated
);

const refreshTimeInMs = envConfigModule.getEnv.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await loadExternalToolData(props.element);
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

const { isDragging } = useDragAndDrop();

const onClick = async () => {
	// Loading has failed before
	if (launchError.value) {
		if (displayData.value?.status) {
			notifierModule.show({
				status: "warning",
				text: determineMediaBoardElementStatusMessage(
					displayData.value?.status
				),
			});
		} else {
			notifierModule.show({
				status: "error",
				text: t("error.generic"),
			});
		}

		return;
	}

	if (isDragging.value) {
		return;
	}

	launchTool();

	await fetchContextLaunchRequest(props.element.content.contextExternalToolId);
};
</script>
