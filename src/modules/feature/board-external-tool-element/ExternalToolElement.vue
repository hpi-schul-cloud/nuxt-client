<template>
	<v-card
		v-show="hasLinkedTool || isEditMode"
		class="mb-4"
		data-testid="board-external-tool-element"
		elevation="0"
		variant="outlined"
		ref="externalToolElement"
		:ripple="false"
		tabindex="0"
		:loading="isLoading"
		@keyup.enter="onClickElement"
		@keydown.up.down="onKeydownArrow"
		@click="onClickElement"
	>
		<ContentElementBar :has-grey-background="true" :icon="getIcon">
			<template #logo v-if="displayData && displayData.logoUrl">
				<v-img height="100%" class="mx-auto" :src="displayData.logoUrl" cover />
			</template>
			<template #title>
				{{
					hasLinkedTool
						? toolDisplayName
						: t("feature-board-external-tool-element.placeholder.selectTool")
				}}
			</template>
			<template #menu>
				<ExternalToolElementMenu
					v-if="isEditMode"
					ref="externalToolElementMenu"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
					@edit:element="onEditElement"
				/>
			</template>
		</ContentElementBar>
		<ExternalToolElementAlert
			:toolDisplayName="toolDisplayName"
			:error="displayError || launchError"
			:tool-status="toolConfigurationStatus"
			data-testid="board-external-tool-element-alert"
		/>
		<ExternalToolElementConfigurationDialog
			:is-open="isConfigurationDialogOpen"
			:context-id="element.id"
			:config-id="element.content.contextExternalToolId"
			@close="onConfigurationDialogClose"
			@save="onConfigurationDialogSave"
			data-testid="board-external-tool-element-configuration-dialog"
		/>
	</v-card>
</template>

<script lang="ts">
import { ExternalToolElementResponse } from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	ContextExternalTool,
	ContextExternalToolConfigurationStatus,
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { mdiPuzzleOutline } from "@mdi/js";
import { ContentElementBar } from "@ui-board";
import { useSharedLastCreatedElement } from "@util-board";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	Ref,
	ref,
	toRef,
} from "vue";
import { useI18n } from "vue-i18n";
import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";
import ExternalToolElementConfigurationDialog from "./ExternalToolElementConfigurationDialog.vue";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";

export default defineComponent({
	components: {
		ContentElementBar,
		ExternalToolElementAlert,
		ExternalToolElementConfigurationDialog,
		ExternalToolElementMenu,
	},
	props: {
		element: {
			type: Object as PropType<ExternalToolElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const { modelValue } = useContentElementState(props, {
			autoSaveDebounce: 0,
		});
		const {
			fetchDisplayData,
			displayData,
			isLoading: isDisplayDataLoading,
			error: displayError,
		} = useExternalToolDisplayState();

		const {
			launchTool,
			fetchContextLaunchRequest,
			error: launchError,
		} = useExternalToolLaunchState();

		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<ExternalToolElementResponse> = toRef(props, "element");
		useBoardFocusHandler(element.value.id, ref(null), () => {
			autofocus.value = true;
		});

		const getIcon: ComputedRef<string | undefined> = computed(() => {
			if (!displayData.value?.logoUrl) {
				return mdiPuzzleOutline;
			}
			return undefined;
		});

		const { lastCreatedElementId, resetLastCreatedElementId } =
			useSharedLastCreatedElement();

		const hasLinkedTool: ComputedRef<boolean> = computed(
			() => !!modelValue.value.contextExternalToolId
		);

		const toolDisplayName: ComputedRef<string> = computed(
			() => displayData.value?.name ?? "..."
		);

		const isToolLaunchable: ComputedRef<boolean> = computed(
			() =>
				!displayData.value?.status.isOutdatedOnScopeSchool &&
				!displayData.value?.status.isOutdatedOnScopeContext &&
				!displayData.value?.status.isIncompleteOnScopeContext
		);

		const toolConfigurationStatus: ComputedRef<ContextExternalToolConfigurationStatus> =
			computed(() => {
				return (
					displayData.value?.status ?? {
						isOutdatedOnScopeSchool: false,
						isOutdatedOnScopeContext: false,
						isIncompleteOnScopeContext: false,
						isIncompleteOperationalOnScopeContext: false,
						isDeactivated: false,
						isNotLicensed: false,
					}
				);
			});

		const isLoading = computed(
			() =>
				hasLinkedTool.value && !displayData.value && isDisplayDataLoading.value
		);

		const isConfigurationDialogOpen: Ref<boolean> = ref(false);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveElementDown = () => {
			emit("move-down:edit");
		};

		const onMoveElementUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = () => emit("delete:element", element.value.id);

		const onEditElement = () => {
			isConfigurationDialogOpen.value = true;
		};

		const onClickElement = async () => {
			if (hasLinkedTool.value && !props.isEditMode) {
				launchTool();

				if (isToolLaunchable.value && modelValue.value.contextExternalToolId) {
					await fetchContextLaunchRequest(
						modelValue.value.contextExternalToolId
					);
				}
			}

			if (!hasLinkedTool.value && props.isEditMode) {
				isConfigurationDialogOpen.value = true;
			}
		};

		const onConfigurationDialogClose = () => {
			isConfigurationDialogOpen.value = false;
		};

		const onConfigurationDialogSave = async (tool: ContextExternalTool) => {
			modelValue.value.contextExternalToolId = tool.id;

			await loadCardData();
		};

		const loadCardData = async () => {
			if (modelValue.value.contextExternalToolId) {
				await fetchDisplayData(modelValue.value.contextExternalToolId);

				if (isToolLaunchable.value) {
					await fetchContextLaunchRequest(
						modelValue.value.contextExternalToolId
					);
				}
			}
		};

		onMounted(() => {
			loadCardData();
			if (lastCreatedElementId.value === props.element.id) {
				isConfigurationDialogOpen.value = true;
				resetLastCreatedElementId();
			}
		});

		const refreshTimeInMs = envConfigModule.getEnv.CTL_TOOLS_RELOAD_TIME_MS;

		const timer = setInterval(async () => {
			await loadCardData();
		}, refreshTimeInMs);

		onUnmounted(() => {
			clearInterval(timer);
		});

		return {
			t,
			getIcon,
			hasLinkedTool,
			toolDisplayName,
			displayData,
			displayError,
			launchError,
			isLoading,
			isConfigurationDialogOpen,
			toolConfigurationStatus,
			mdiPuzzleOutline,
			onMoveElementDown,
			onMoveElementUp,
			onKeydownArrow,
			onDeleteElement,
			onEditElement,
			onClickElement,
			onConfigurationDialogClose,
			onConfigurationDialogSave,
		};
	},
});
</script>
