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
			<TodoElementDisplay
				v-if="!isEditMode"
				:dueDate="element.content.dueDate"
				:completed="completed"
				:loading="loading"
				@update:completed="updateCompletionState"
			/>
			<TodoElementEdit
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
import { computed, defineComponent, PropType, ref, toRef } from "vue";
import { SubmissionContainerElementResponse } from "@/serverApi/v3";
import TodoElementDisplay from "./TodoElementDisplay.vue";
import TodoElementEdit from "./TodoElementEdit.vue";
import { useSubmissionContentElementState } from "./SubmissionContentElementState.composable";
import { useBoardFocusHandler } from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default defineComponent({
	name: "TodoElement",
	components: {
		TodoElementDisplay,
		TodoElementEdit,
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
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, submissionContentElement);
		const { completed, updateSubmissionItem, loading } =
			useSubmissionContentElementState(element.value.id);

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
				emit("delete:element", element.value.id);
			}
		};

		const updateCompletionState = (completed: boolean) => {
			updateSubmissionItem(completed);
		};

		return {
			submissionContentElement,
			completed,
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
