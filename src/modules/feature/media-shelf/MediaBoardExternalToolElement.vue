<template>
	<MediaBoardElementDisplay :element="elementDisplayData" @click="onClick" @keyup.enter="onClick">
		<template #imageOverlay>
			<div class="d-flex ga-1 flex-column pa-3">
				<WarningChip v-if="isToolDeactivated" data-testid="warning-chip-deactivated">
					{{ $t("common.medium.chip.deactivated") }}
				</WarningChip>
				<WarningChip v-if="isToolNotLicensed" data-testid="warning-chip-not-licensed">
					{{ $t("common.medium.chip.notLicensed") }}
				</WarningChip>
				<WarningChip v-if="isToolIncomplete" data-testid="warning-chip-incomplete">
					{{ $t("common.medium.chip.incomplete") }}
				</WarningChip>
			</div>
		</template>
		<template #menu>
			<MediaBoardExternalToolElementMenu @delete:element="onDelete" />
		</template>
	</MediaBoardElementDisplay>
</template>

<script setup lang="ts">
import { MediaElementDisplay } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import MediaBoardExternalToolElementMenu from "./MediaBoardExternalToolElementMenu.vue";
import { MediaExternalToolElementResponse } from "@/serverApi/v3";
import { notifyError, notifyWarning } from "@data-app";
import { useEnvConfig } from "@data-env";
import {
	useContextExternalToolConfigurationStatus,
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { WarningChip } from "@ui-chip";
import { useDragAndDrop } from "@util-board";
import { useErrorNotification } from "@util-error-notification";
import { computed, ComputedRef, onUnmounted, PropType, Ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	element: {
		type: Object as PropType<MediaExternalToolElementResponse>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
}>();

const { t } = useI18n();

const { fetchDisplayData, displayData, error: displayError } = useExternalToolDisplayState();
const { launchTool, fetchContextLaunchRequest, error: launchError } = useExternalToolLaunchState();
const { determineMediaBoardElementStatusMessage, isOperational } = useContextExternalToolConfigurationStatus();

useErrorNotification(displayError);

const elementDisplayData: Ref<MediaElementDisplay | undefined> = computed(() =>
	displayData.value
		? {
				title: displayData.value.name,
				domain: displayData.value.domain,
				description: displayData.value.description,
				thumbnail: displayData.value.thumbnailUrl || displayData.value.logoUrl,
			}
		: undefined
);

const loadExternalToolData = async (element: MediaExternalToolElementResponse): Promise<void> => {
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

const isToolDeactivated: ComputedRef = computed(() => displayData.value?.status.isDeactivated);

const isToolNotLicensed: ComputedRef = computed(
	() => displayData.value?.status.isNotLicensed && !displayData.value?.status.isDeactivated
);

const refreshTimeInMs = useEnvConfig().value.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await loadExternalToolData(props.element);
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

const { isDragging } = useDragAndDrop();

const onDelete = () => {
	emit("delete:element", props.element.id);
};

const onClick = async () => {
	const hasLaunchRequestFailed = !!launchError.value;
	if (hasLaunchRequestFailed) {
		notifyError(t("error.load"));
		return;
	}

	// Don't launch tools with unknown status/name (most likely an unintended click)
	if (!displayData.value) {
		return;
	}

	const hasValidStatus = isOperational(displayData.value.status);
	if (!hasValidStatus) {
		notifyWarning(determineMediaBoardElementStatusMessage(displayData.value.status));
		return;
	}

	if (isDragging.value) {
		return;
	}

	launchTool();

	const hasLaunchFailed = !!launchError.value;
	if (hasLaunchFailed) {
		notifyError(t("error.generic"));
		return;
	}

	await fetchContextLaunchRequest(props.element.content.contextExternalToolId);
};
</script>
