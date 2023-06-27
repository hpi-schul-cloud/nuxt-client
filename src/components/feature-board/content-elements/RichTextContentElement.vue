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
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { RichTextElementResponse } from "@/serverApi/v3";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { useSharedFocusedId } from "../shared/BoardFocusHandler.composable";

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
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		const { focusedId } = useSharedFocusedId();
		const isFocused = focusedId.value === props.element.id;

		return { modelValue, isAutoFocus, isFocused };
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
