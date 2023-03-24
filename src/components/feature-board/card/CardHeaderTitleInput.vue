<template>
	<div class="d-flex flex-grow-1">
		<h3 class="d-sr-only" :aria-hidden="isEditMode">
			{{ value }}
		</h3>

		<VTextarea
			label="Titel"
			hide-details="auto"
			:value="value"
			@change="onChange"
			solo
			dense
			:rows="1"
			auto-grow
			class="ml-n3 mb-0 w-full"
			flat
			background-color="transparent"
			:aria-hidden="!isEditMode"
			:readonly="!isEditMode"
		></VTextarea>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useContentElementInteractionHandler } from "../ContentElementInteractionHandler.composable";

export default defineComponent({
	name: "CardHeaderTitleInput",
	props: {
		value: {
			type: String,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["change", "start-edit-mode"],
	setup(props, { emit }) {
		const onChange = (newTitle: string) => emit("change", newTitle);
		const onDoubleClick = () => {
			// emit("start-edit-mode");
			console.log("double clicked");
			// clearSelection();
		};

		const onFocusCallback = (interactionBoundary: { x: number; y: number }) => {
			console.log(interactionBoundary);
		};

		useContentElementInteractionHandler(onFocusCallback);

		// const clearSelection = () => {
		// 	const sel = document.getSelection(); //window.getSelection();
		// 	console.log("selection", sel);
		// 	// sel?.removeAllRanges();
		// };
		return {
			onChange,
			onDoubleClick,
		};
	},
});
</script>
