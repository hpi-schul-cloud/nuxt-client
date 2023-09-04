<template>
	<div class="white px-4">
		<v-checkbox
			v-model="modelValue"
			:disabled="!editable"
			:label="$t('components.cardElement.submissionElement.completed')"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVModel } from "@vueuse/core";

export default defineComponent({
	name: "SubmissionContentElementDisplayStudent",
	props: {
		editable: {
			type: Boolean,
			required: true,
		},
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
