<template>
	<div>
		{{ isDragging }}
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { useElementBounding, VueInstance } from "@vueuse/core";
import { defineComponent, onMounted } from "vue";
import { useDragAndDropListManager } from "../composables/DragAndDropListHandler.composable";

export default defineComponent({
	name: "DragAndDropList",
	props: {
		groupName: {
			type: String,
			required: true,
		},
	},
	emits: ["drag-end", "drag-start"],
	setup(props, { slots }) {
		const { elements, isDragging } = useDragAndDropListManager();

		onMounted(() => {
			if (!slots.default || slots.default().length === 0) {
				return;
			}

			const childElements: VueInstance[] = [
				...(slots
					.default()
					.map((s) => s.componentInstance)
					.filter((defined) => defined) as VueInstance[]),
			];

			childElements.forEach((c) => c.$el.setAttribute("style", ""));

			console.log(childElements);

			const boundingBoxes = [
				...childElements.map((ce) => useElementBounding(ce)),
			];
			console.log(boundingBoxes);
		});
		return { isDragging };
	},
});
</script>
