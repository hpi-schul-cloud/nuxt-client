<template>
	<div class="white">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<v-checkbox
			v-else
			v-model="modelValue"
			class="px-4"
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
		loading: {
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
