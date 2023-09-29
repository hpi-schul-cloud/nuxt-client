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
				:dueDate="modelValue.dueDate"
				:loading="loading"
				:submissions="submissions"
				:editable="editable"
				@update:completed="onUpdateCompleted"
			/>
			<SubmissionContentElementEdit
				v-if="isEditMode"
				:dueDate="modelValue.dueDate"
				:loading="loading"
				:submissions="submissions"
				:editable="editable"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@update:dueDate="($event) => (modelValue.dueDate = $event)"
				@move-down:element="onMoveSubmissionEditDown"
				@move-up:element="onMoveSubmissionEditUp"
				@delete:element="onDeleteElement"
			/>
		</div>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef } from "vue";
import { SubmissionContainerElementResponse } from "@/serverApi/v3";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";
import { useSubmissionContentElementState } from "../composables/SubmissionContentElementState.composable";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { useI18n } from "@/composables/i18n.composable";

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
		const { t } = useI18n();
		const submissionContentElement = ref(null);
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, submissionContentElement);

		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const { modelValue } = useContentElementState(props);

		const { loading, submissions, editable, updateSubmissionItem } =
			useSubmissionContentElementState(element.value.id, modelValue);

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
				t("components.cardElement.submissionElement").toString(),
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};

		const onUpdateCompleted = (completed: boolean) => {
			updateSubmissionItem(completed);
		};

		return {
			modelValue,
			submissionContentElement,
			submissions,
			loading,
			editable,
			onDeleteElement,
			onKeydownArrow,
			onMoveSubmissionEditDown,
			onMoveSubmissionEditUp,
			onUpdateCompleted,
		};
	},
});
</script>
