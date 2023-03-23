<template>
	<div>
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
			class="ml-n3 mb-0"
			flat
			:aria-hidden="!isEditMode"
			:readonly="!isEditMode"
		></VTextarea>
		<!-- @dlbclick="onDoubleClick" -->
		{{ isEditMode }}
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

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
