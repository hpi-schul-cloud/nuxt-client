<template>
	<div ref="elementHost">
		<!-- <text-content-element-edit></text-content-element-edit> -->
		<!-- <text-content-element-display></text-content-element-display> -->
		{{ element.id }} {{ element.content.text }} {{ isEditMode }}
		<input class="w-full" ref="input" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useContentElementInteractionHandler } from "../ContentElementInteractionHandler.composable";
import { useContentElementState } from "../state/ContentElementState.composable";
import { TextContentElement } from "../types/ContentElement";

export default defineComponent({
	name: "TextContentElement",
	props: {
		element: { type: Object as PropType<TextContentElement>, required: true },
		isEditMode: { type: Boolean, required: true },
	},
	setup(props) {
		const { updateElement } = useContentElementState<"text">(props.element.id);
		const input = ref<HTMLInputElement | undefined>();

		const onFocusCallback = () => {
			input.value?.focus();
		};

		useContentElementInteractionHandler(onFocusCallback);

		return { updateElement, input };
	},
});
</script>
