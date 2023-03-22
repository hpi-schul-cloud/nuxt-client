<template>
	<div>
		<!-- <text-content-element-edit></text-content-element-edit> -->
		<!-- <text-content-element-display></text-content-element-display> -->
		{{ element.content.text }}
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { TextContentElement } from "../types/ContentElement";

export default defineComponent({
	name: "TextContentElement",
	props: {
		element: { type: Object as PropType<TextContentElement>, required: true },
	},
	setup(props) {
		const { updateElement } = useContentElementState<"text">(props.element.id);

		return { updateElement };
	},
});
</script>
