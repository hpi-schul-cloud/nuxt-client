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
			<SubmissionContentElementDisplay v-if="!isEditMode" />
			<SubmissionContentElementEdit
				v-if="isEditMode"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveFileEditDown"
				@move-up:element="onMoveFileEditUp"
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
import { useBoardFocusHandler } from "../shared/BoardFocusHandler.composable";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";
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
		deleteElement: {
			type: Function as PropType<(elementId: string) => Promise<void>>,
			required: true,
		},
	},
	emits: ["move-down:edit", "move-up:edit", "move-keyboard:edit"],
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const submissionContentElement = ref();
		useBoardFocusHandler(props.element.id, submissionContentElement);

		const { askDeleteBoardNodeConfirmation } = useDeleteBoardNodeConfirmation();

		const onKeydownArrow = (event: KeyboardEvent) => {
			if (props.isEditMode) {
				event.preventDefault();
				emit("move-keyboard:edit", event);
			}
		};

		const onMoveFileEditDown = () => {
			emit("move-down:edit");
		};

		const onMoveFileEditUp = () => {
			emit("move-up:edit");
		};

		const onDeleteElement = async (): Promise<void> => {
			const shouldDelete = await askDeleteBoardNodeConfirmation(
				i18n.t("components.cardElement.submissionElement").toString(),
				"boardElement"
			);

			if (shouldDelete) {
				await deleteSubmissionElement();
			}
		};

		const deleteSubmissionElement = () => {
			return props.deleteElement(props.element.id);
		};

		return {
			onDeleteElement,
			onKeydownArrow,
			onMoveFileEditDown,
			onMoveFileEditUp,
		};
	},
});
</script>

<style lang="scss" scoped>
.submission {
	color: rgba(0, 0, 0, 0.87);
	font-size: 1rem;
	padding: 0.05px; // prevent margin collapse
}
</style>
