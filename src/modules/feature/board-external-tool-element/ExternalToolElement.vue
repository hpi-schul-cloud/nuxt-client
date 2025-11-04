<template>
	<v-card
		v-show="showTool || isEditMode"
		ref="externalToolElement"
		class="mb-4"
		:data-testid="`board-external-tool-element-${toolDisplayName}`"
		elevation="0"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		role="button"
		:loading="isLoading"
		:aria-label="ariaLabel"
		@keyup.enter="onClickElement"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
		@click="onClickElement"
	>
		<ExternalToolElementAlert
			:tool-display-name="toolDisplayName"
			:error="displayError || launchError"
			:tool-status="toolConfigurationStatus"
			data-testid="board-external-tool-element-alert"
		/>
		<ContentElementBar :has-grey-background="true" :icon="getIcon">
			<template v-if="displayData && displayData.logoUrl" #logo>
				<VImg data-testid="board-external-tool-element-logo" height="100%" class="mx-auto" :src="displayData.logoUrl" />
			</template>
			<template #title>
				{{ toolTitle }}
			</template>
			<template v-if="displayData" #subtitle>
				<LineClamp data-testid="board-external-tool-element-domain">
					{{ displayData.domain }}
				</LineClamp>
			</template>
			<template #menu>
				<ExternalToolElementMenu
					v-if="isEditMode"
					ref="externalToolElementMenu"
					:display-name="displayData?.name"
					:column-index="columnIndex"
					:row-index="rowIndex"
					:element-index="elementIndex"
					:is-not-first-element="isNotFirstElement"
					:is-not-last-element="isNotLastElement"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
					@edit:element="onEditElement"
				/>
			</template>
		</ContentElementBar>
		<ExternalToolElementConfigurationDialog
			:is-open="isConfigurationDialogOpen"
			:context-id="element.id"
			:config-id="element.content.contextExternalToolId"
			data-testid="board-external-tool-element-configuration-dialog"
			@close="onConfigurationDialogClose"
			@save="onConfigurationDialogSave"
		/>
	</v-card>
</template>

<script setup lang="ts">
import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";
import ExternalToolElementConfigurationDialog from "./ExternalToolElementConfigurationDialog.vue";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";
import { ExternalToolElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useEnvConfig } from "@data-env";
import {
	ContextExternalTool,
	ContextExternalToolConfigurationStatus,
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { mdiPuzzleOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { LineClamp } from "@ui-line-clamp";
import { useSharedLastCreatedElement } from "@util-board";
import { computed, ComputedRef, onMounted, onUnmounted, PropType, Ref, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	element: {
		type: Object as PropType<ExternalToolElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits<{
	(e: "delete:element", id: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const { t } = useI18n();
const { modelValue } = useContentElementState(props, {
	autoSaveDebounce: 0,
});
const {
	fetchDisplayData,
	displayData,
	isLoading: isDisplayDataLoading,
	error: displayError,
} = useExternalToolDisplayState();

const { launchTool, fetchContextLaunchRequest, error: launchError } = useExternalToolLaunchState(() => loadCardData());

const element: Ref<ExternalToolElementResponse> = toRef(props, "element");
const externalToolElement = ref<HTMLElement | null>(null);
useBoardFocusHandler(element.value.id, externalToolElement);

const getIcon: ComputedRef<string | undefined> = computed(() => {
	if (!displayData.value?.logoUrl) {
		return mdiPuzzleOutline;
	}
	return undefined;
});

const { lastCreatedElementId, resetLastCreatedElementId } = useSharedLastCreatedElement();

const hasLinkedTool: ComputedRef<boolean> = computed(
	() => modelValue.value.contextExternalToolId !== null || props.element.content.contextExternalToolId !== null
);

const isDeepLinkingTool: ComputedRef<boolean> = computed(() => !!displayData.value?.isLtiDeepLinkingTool);

const hasDeepLink: ComputedRef<boolean> = computed(() => !!displayData.value?.ltiDeepLink);

const showTool: ComputedRef<boolean> = computed(() => {
	if (!displayData.value || !hasLinkedTool.value) {
		return false;
	}

	return isDeepLinkingTool.value ? hasDeepLink.value : true;
});

const toolDisplayName: ComputedRef<string> = computed(() => displayData.value?.name ?? "...");

const isToolLaunchable: ComputedRef<boolean> = computed(
	() =>
		!displayData.value?.status.isOutdatedOnScopeSchool &&
		!displayData.value?.status.isOutdatedOnScopeContext &&
		!displayData.value?.status.isIncompleteOnScopeContext &&
		!displayData.value?.status.isDeactivated &&
		!displayData.value?.status.isNotLicensed
);

const toolConfigurationStatus: ComputedRef<ContextExternalToolConfigurationStatus> = computed(
	() =>
		displayData.value?.status ?? {
			isOutdatedOnScopeSchool: false,
			isOutdatedOnScopeContext: false,
			isIncompleteOnScopeContext: false,
			isIncompleteOperationalOnScopeContext: false,
			isDeactivated: false,
			isNotLicensed: false,
		}
);

const isLoading = computed(() => hasLinkedTool.value && !displayData.value && isDisplayDataLoading.value);

const isConfigurationDialogOpen: Ref<boolean> = ref(false);

const toolTitle: ComputedRef<string> = computed(() => {
	if (!hasLinkedTool.value) {
		return t("feature-board-external-tool-element.placeholder.selectTool");
	}

	if (isDeepLinkingTool.value) {
		return hasDeepLink.value
			? toolDisplayName.value
			: t("feature-board-external-tool-element.placeholder.selectContent", {
					toolName: toolDisplayName.value,
				});
	}

	return toolDisplayName.value;
});

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveElementDown = () => emit("move-down:edit");

const onMoveElementUp = () => emit("move-up:edit");

const onDeleteElement = () => emit("delete:element", element.value.id);

const onEditElement = () => (isConfigurationDialogOpen.value = true);

const onClickElement = async () => {
	if (hasLinkedTool.value && (!props.isEditMode || (props.isEditMode && isDeepLinkingTool.value))) {
		launchTool();

		if (isToolLaunchable.value && modelValue.value.contextExternalToolId) {
			await fetchContextLaunchRequest(modelValue.value.contextExternalToolId);
		}
	}

	if (!hasLinkedTool.value && props.isEditMode) {
		isConfigurationDialogOpen.value = true;
	}
};

const onConfigurationDialogClose = () => (isConfigurationDialogOpen.value = false);

const onConfigurationDialogSave = async (tool: ContextExternalTool) => {
	modelValue.value.contextExternalToolId = tool.id;

	await loadCardData();
};

const loadCardData = async () => {
	if (element.value.content.contextExternalToolId) {
		await fetchDisplayData(element.value.content.contextExternalToolId);

		if (isToolLaunchable.value) {
			await fetchContextLaunchRequest(element.value.content.contextExternalToolId);
		}
	}
};

onMounted(() => {
	loadCardData();
	if (lastCreatedElementId.value === props.element.id && !props.element.content.contextExternalToolId) {
		isConfigurationDialogOpen.value = true;
		resetLastCreatedElementId();
	}
});

const refreshTimeInMs = useEnvConfig().value.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await loadCardData();
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

watch(
	() => element.value.content.contextExternalToolId,
	async () => {
		if (element.value.content.contextExternalToolId !== null) {
			modelValue.value.contextExternalToolId = element.value.content.contextExternalToolId;
			await loadCardData();
		}
	}
);

const ariaLabel = computed(() => {
	const elementName = t("components.cardElement.externalToolElement");
	const information = [elementName];

	if (!hasLinkedTool.value) {
		information.push(t("feature-board-external-tool-element.placeholder.selectTool"));
	} else if (displayData.value) {
		const toolName = displayData.value.name;
		information.push(toolName);

		if (displayData.value.openInNewTab) {
			information.push(t("common.ariaLabel.newTab"));
		} else {
			information.push(t("common.ariaLabel.sameTab"));
		}
	} else {
		information.push("common.loading.text");
	}

	return information.join(", ");
});
</script>
