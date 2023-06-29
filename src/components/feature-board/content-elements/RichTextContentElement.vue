<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			class="rich_text"
			:value="modelValue.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			class="rich_text offset"
			:autofocus="isAutoFocus"
			:value="modelValue.text"
			@update:value="($event) => (modelValue.text = $event)"
			@delete:element="onDeleteElement"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { RichTextElementResponse } from "@/serverApi/v3";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { useDeleteBoardNodeConfirmation } from "../shared/DeleteBoardNodeConfirmation.composable";

export default defineComponent({
	name: "RichTextContentElement",
	components: {
		RichTextContentElementDisplay,
		RichTextContentElementEdit,
	},
	props: {
		element: {
			type: Object as PropType<RichTextElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		deleteElement: {
			type: Function as PropType<(elementId: string) => Promise<void>>,
			required: true,
		},
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { askDeleteBoardNodeConfirmation } = useDeleteBoardNodeConfirmation();

		const onDeleteElement = async (): Promise<void> => {
			const shouldDelete = await askDeleteBoardNodeConfirmation(
				"",
				"boardElement"
			);

			if (shouldDelete) {
				await deleteRichTextElement();
			}
		};

		const deleteRichTextElement = () => {
			return props.deleteElement(props.element.id);
		};

		return {
			modelValue,
			isAutoFocus,
			onDeleteElement,
		};
	},
});
</script>

<style lang="scss" scoped>
.offset {
	margin-left: -0.6em;
}

.rich_text {
	color: rgba(0, 0, 0, 0.87);
	font-size: 1rem;
}

::v-deep {
	.ck.ck-editor__editable_inline > :first-child {
		margin-top: 0;
	}
}
</style>
