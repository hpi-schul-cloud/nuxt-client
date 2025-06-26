<template>
	<v-card
		ref="submissionContentElement"
		class="mb-4"
		data-testid="board-submission-element"
		dense
		elevation="0"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		@keydown.up.down="onKeydownArrow"
	>
		<div>
			<SubmissionContentElementDisplay
				v-if="!isEditMode"
				:due-date="modelValue.dueDate"
				:loading="loading"
				:submissions="submissions"
				:student-submission="studentSubmission"
				:is-overdue="isOverdue"
				@update:completed="onUpdateCompleted"
			/>
			<SubmissionContentElementEdit
				v-if="isEditMode"
				:due-date="modelValue.dueDate"
				:loading="loading"
				:submissions="submissions"
				:is-overdue="isOverdue"
				@update:due-date="($event) => (modelValue.dueDate = $event)"
			>
				<BoardMenu
					:scope="BoardMenuScope.SUBMISSION_ELEMENT"
					has-background
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<KebabMenuActionMoveUp
						v-if="isNotFirstElement"
						@click="onMoveElementUp"
					/>
					<KebabMenuActionMoveDown
						v-if="isNotLastElement"
						@click="onMoveElementDown"
					/>
					<KebabMenuActionDelete
						scope-language-key="components.cardElement.submissionElement"
						@click="onDeleteElement"
					/>
				</BoardMenu>
			</SubmissionContentElementEdit>
		</div>
	</v-card>
</template>

<script lang="ts">
import { SubmissionContainerElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { defineComponent, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useSubmissionContentElementState } from "../composables/SubmissionContentElementState.composable";
import SubmissionContentElementDisplay from "./SubmissionContentElementDisplay.vue";
import SubmissionContentElementEdit from "./SubmissionContentElementEdit.vue";

export default defineComponent({
	name: "SubmissionContentElement",
	components: {
		BoardMenu,
		KebabMenuActionMoveUp,
		KebabMenuActionMoveDown,
		KebabMenuActionDelete,
		SubmissionContentElementDisplay,
		SubmissionContentElementEdit,
	},
	props: {
		element: {
			type: Object as PropType<SubmissionContainerElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		isNotFirstElement: { type: Boolean, requried: false },
		isNotLastElement: { type: Boolean, requried: false },
		columnIndex: { type: Number, required: true },
		rowIndex: { type: Number, required: true },
		elementIndex: { type: Number, required: true },
	},
	emits: [
		"move-keyboard:edit",
		"move-down:edit",
		"move-up:edit",
		"delete:element",
	],
	setup(props, { emit }) {
		const { t } = useI18n();
		const submissionContentElement = ref(null);
		const element = toRef(props, "element");
		useBoardFocusHandler(element.value.id, submissionContentElement);

		const { modelValue } = useContentElementState(props);

		const {
			loading,
			submissions,
			studentSubmission,
			isOverdue,
			updateSubmissionItem,
		} = useSubmissionContentElementState(element.value.id, modelValue);

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveElementDown = () => emit("move-down:edit");

		const onMoveElementUp = () => emit("move-up:edit");

		const onDeleteElement = async (confirmation: Promise<boolean>) => {
			const shouldDelete = await confirmation;
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
			studentSubmission,
			loading,
			isOverdue,
			onKeydownArrow,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
			onUpdateCompleted,
			t,
		};
	},
	computed: {
		BoardMenuScope() {
			return BoardMenuScope;
		},
	},
});
</script>
