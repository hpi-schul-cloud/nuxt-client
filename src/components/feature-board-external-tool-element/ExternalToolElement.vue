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
		<div class="pa-4 d-flex gap-8 grey lighten-4">
			<v-img
				v-if="toolDisplayData && toolDisplayData.logoUrl"
				class="mr-1"
				:src="toolDisplayData.logoUrl"
			></v-img>
			<v-icon v-else>{{ mdiPuzzleOutline }}</v-icon>
			<span class="align-self-center title flex-1">
				{{
					hasLinkedTool
						? toolDisplayName
						: t("feature-board-external-tool-element.placeholder.selectTool")
				}}
			</span>
			<ExternalToolElementMenu
				v-if="isEditMode"
				ref="externalToolElementMenu"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
				@edit:element="onEditElement"
			></ExternalToolElementMenu>
		</div>
		<ExternalToolElementConfigurationDialog
			:is-open="isConfigurationDialogOpen"
			:card-id="cardId"
			:config-id="element.content.contextExternalToolId"
			@close="onConfigurationDialogClose"
			@save="onConfigurationDialogSave"
			ref="board-external-tool-element-configuration-dialog"
		>
		</ExternalToolElementConfigurationDialog>
	</v-card>
</template>

<script lang="ts">
import { useI18n } from "@/composables/i18n.composable";
import { ExternalToolElementResponse } from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useSharedExternalToolElementDisplayState } from "@data-board-external-tool-element";
import { mdiPuzzleOutline } from "@mdi/js";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import {
	computed,
	ComputedRef,
	defineComponent,
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
		cardId: { type: String, required: true },
		isEditMode: { type: Boolean, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();
		const { modelValue } = useContentElementState(props, {
			autoSaveDebounce: 0,
		});
		const displayState = useSharedExternalToolElementDisplayState();

		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<ExternalToolElementResponse> = toRef(props, "element");
		useBoardFocusHandler(element.value.id, ref(null), () => {
			autofocus.value = true;
		});

		const hasLinkedTool: ComputedRef<boolean> = computed(
			() => !!modelValue.value.contextExternalToolId
		);

		const toolDisplayData: Ref<ExternalToolDisplayData | undefined> = computed(
			() =>
				modelValue.value.contextExternalToolId
					? displayState.findDisplayData(
							props.cardId,
							modelValue.value.contextExternalToolId
					  )
					: undefined
		);

		const toolDisplayName: ComputedRef<string> = computed(
			() => toolDisplayData.value?.name ?? "..."
		);

		const isLoading = computed(
			() =>
				hasLinkedTool.value &&
				!toolDisplayData.value &&
				displayState.isLoading.value
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

		const onDeleteElement = async () => {
			const shouldDelete = await askDeleteConfirmation(
				toolDisplayData.value?.name,
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};

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

			await displayState.fetchDisplayData(props.cardId);
		};

		return {
			t,
			hasLinkedTool,
			toolDisplayData,
			toolDisplayName,
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
.gap-8 {
	gap: 8px;
}

.flex-1 {
	flex: 1;
}
</style>
