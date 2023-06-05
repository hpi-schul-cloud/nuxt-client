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
			@move-down:element="onTryMoveRichTextEditDown"
			@move-up:element="onTryMoveRichTextEditUp"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { RichTextElementResponse } from "@/serverApi/v3";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";

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
	},
	emits: ["move-down:rich-text-edit", "move-up:rich-text-edit"],
	setup(props, { emit }) {
		const { modelValue, isAutoFocus } = useContentElementState(props);

		const onTryMoveRichTextEditDown = () => {
			emit("move-down:rich-text-edit");
		};

		const onTryMoveRichTextEditUp = () => {
			emit("move-up:rich-text-edit");
		};

		return {
			modelValue,
			isAutoFocus,
			onTryMoveRichTextEditDown,
			onTryMoveRichTextEditUp,
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
</style>
