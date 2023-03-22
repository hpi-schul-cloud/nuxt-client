<template>
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
	></VTextarea>
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
	},
	emits: ["change"],
	setup(props, { emit }) {
		const onChange = (newTitle: string) => emit("change", newTitle);

		return {
			onChange,
		};
	},
});
</script>
