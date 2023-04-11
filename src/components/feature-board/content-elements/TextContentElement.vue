<template>
	<div>
		<TextContentElementDisplay
			v-if="!isEditMode"
			:value="modelValue.text"
		></TextContentElementDisplay>
		<TextContentElementEdit
			v-if="isEditMode"
			:autofocus="isAutoFocus"
			:value="modelValue.text"
			@update:value="($event) => (modelValue.text = $event)"
		></TextContentElementEdit>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { TextContentElement } from "../types/ContentElement";
import TextContentElementDisplay from "./TextContentElementDisplay.vue";
import TextContentElementEdit from "./TextContentElementEdit.vue";

export default defineComponent({
	name: "TextContentElement",
	components: {
		TextContentElementDisplay,
		TextContentElementEdit,
	},
	props: {
		element: { type: Object as PropType<TextContentElement>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		return { modelValue, isAutoFocus };
	},
});
</script>
