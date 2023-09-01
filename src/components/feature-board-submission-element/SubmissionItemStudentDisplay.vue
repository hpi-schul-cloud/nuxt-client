<template>
	<div>
		<v-checkbox v-model="modelValue" label="erledigt"></v-checkbox>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVModel } from "@vueuse/core";

export default defineComponent({
	name: "SubmissionContentElementDisplayStudent",
	props: {
		completed: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:completed"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "completed", emit);

		return {
			modelValue,
		};
	},
});
</script>
