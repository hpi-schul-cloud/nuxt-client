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
			:focus="isFocused"
			:value="modelValue.text"
			@update:value="($event) => (modelValue.text = $event)"
			@delete:element="onDeleteElement"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { RichTextElementResponse } from "@/serverApi/v3";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { useSharedFocusedId } from "../shared/BoardFocusHandler.composable";
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
		const { focusedId } = useSharedFocusedId();
    
		const isFocused = computed(() => {
			return focusedId.value === props.element.id;
		});

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
      isFocused,
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
