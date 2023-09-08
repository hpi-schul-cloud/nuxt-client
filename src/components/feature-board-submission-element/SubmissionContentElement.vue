<template>
	<v-card
		class="mb-4"
		data-testid="board-submission-element"
		dense
		elevation="0"
		outlined
		ref="submissionContentElement"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<div>
			<SubmissionContentElementDisplay
				v-if="!isEditMode"
				:dueDate="element.content.dueDate"
				:completed="completed"
				:loading="loading"
				:submissionItems="submissionItems"
				@update:completed="updateCompletionState"
			/>
			<SubmissionContentElementEdit
				v-if="isEditMode"
				:dueDate="element.content.dueDate"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveSubmissionEditDown"
				@move-up:element="onMoveSubmissionEditUp"
				@delete:element="onDeleteElement"
			/>
		</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { SubmissionContainerElementResponse } from "@/serverApi/v3";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useBoardFocusHandler } from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default defineComponent({
	name: "SubmissionContentElement",
	components: {
		SubmissionContentElementDisplay,
		SubmissionContentElementEdit,
	},
	props: {
		element: {
			type: Object as PropType<SubmissionContainerElementResponse>,
			required: true,
		},
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
		const i18n = injectStrict(I18N_KEY);
		const submissionContentElement = ref(null);
		useBoardFocusHandler(props.element.id, submissionContentElement);
		const { completed, updateSubmissionItem, loading, submissionItems } =
			useSubmissionContentElementState(props.element.id);

		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveSubmissionEditDown = () => {
			emit("move-down:edit");
		};

		const onMoveSubmissionEditUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = async (): Promise<void> => {
			const shouldDelete = await askDeleteConfirmation(
				i18n.t("components.cardElement.submissionElement").toString(),
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", props.element.id);
			}
		};

		const updateCompletionState = (completed: boolean) => {
			updateSubmissionItem(completed);
		};

		return {
			submissionContentElement,
			completed,
			submissionItems,
			loading,
			onDeleteElement,
			onKeydownArrow,
			onMoveSubmissionEditDown,
			onMoveSubmissionEditUp,
			updateCompletionState,
		};
	},
});
</script>
