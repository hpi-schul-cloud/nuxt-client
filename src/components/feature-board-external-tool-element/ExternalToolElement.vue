<template>
	<v-card
		v-show="hasLinkedTool || isEditMode"
		class="mb-4"
		data-testid="board-external-tool-element"
		dense
		elevation="0"
		outlined
		ref="externalToolElement"
		:ripple="false"
		tabindex="0"
		:loading="isLoading"
		@keydown.up.down="onKeydownArrow"
		@click="onClickElement"
	>
		<div class="card-container d-flex gap-8 grey lighten-4">
			<div
				v-if="displayData && displayData.logoUrl"
				class="logo-container my-auto mr-1"
			>
				<v-img height="100%" class="mx-auto" :src="displayData.logoUrl" cover />
			</div>
			<v-icon v-else>{{ mdiPuzzleOutline }}</v-icon>
			<span class="align-self-center title flex-1 break-word">
				{{
					hasLinkedTool
						? toolDisplayName
						: t("feature-board-external-tool-element.placeholder.selectTool")
				}}
			</span>
			<ExternalToolElementMenu
				v-if="isEditMode"
				ref="externalToolElementMenu"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
				@edit:element="onEditElement"
			/>
		</div>
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
import { useI18n } from "vue-i18n";
import { ExternalToolElementResponse } from "@/serverApi/v3";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useExternalToolElementDisplayState } from "@data-external-tool";
import { mdiPuzzleOutline } from "@mdi/js";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	PropType,
	Ref,
	ref,
	toRef,
} from "vue";
import ExternalToolElementConfigurationDialog from "./ExternalToolElementConfigurationDialog.vue";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";

export default defineComponent({
	components: {
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
		const { modelValue } = useContentElementState(props, {
			autoSaveDebounce: 0,
		});
		const {
			fetchDisplayData,
			displayData,
			isLoading: isDisplayDataLoading,
		} = useExternalToolElementDisplayState();

		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<ExternalToolElementResponse> = toRef(props, "element");
		useBoardFocusHandler(element.value.id, ref(null), () => {
			autofocus.value = true;
		});

		const hasLinkedTool: ComputedRef<boolean> = computed(
			() => !!modelValue.value.contextExternalToolId
		);

		const toolDisplayName: ComputedRef<string> = computed(
			() => displayData.value?.name ?? "..."
		);

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

		const onClickElement = () => {
			if (props.isEditMode) {
				if (!hasLinkedTool.value) {
					isConfigurationDialogOpen.value = true;
				}
			} else {
				// TODO N21-1285: launch tool
			}
		};

		const onConfigurationDialogClose = () => {
			isConfigurationDialogOpen.value = false;
		};

		const onConfigurationDialogSave = async (tool: ContextExternalTool) => {
			modelValue.value.contextExternalToolId = tool.id;

			await fetchDisplayData(modelValue.value.contextExternalToolId);
		};

		onMounted(async () => {
			if (modelValue.value.contextExternalToolId) {
				await fetchDisplayData(modelValue.value.contextExternalToolId);
			}
		});

		return {
			t,
			hasLinkedTool,
			toolDisplayName,
			displayData,
			isLoading,
			isConfigurationDialogOpen,
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

<style scoped lang="scss">
$card-padding: 16px;
$logo-size: 24px;

.card-container {
	max-width: 100%;
	min-height: calc($card-padding * 2 + $logo-size);
	padding: $card-padding;
}

.logo-container {
	width: $logo-size;
	height: $logo-size;
}

.gap-8 {
	gap: 8px;
}

.flex-1 {
	flex: 1;
}

.break-word {
	word-break: break-word;
}
</style>
