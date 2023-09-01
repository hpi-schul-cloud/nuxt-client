<template>
	<div>
		<v-checkbox v-model="completed" label="erledigt"></v-checkbox>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";

export default defineComponent({
	name: "SubmissionContentElementDisplayStudent",
	props: {
		submissionItems: {
			type: Array as PropType<Array<SubmissionItemResponse>>,
			required: true,
		},
	},
	setup(props) {
		const completed = computed(() => {
			return props.submissionItems[0]?.completed;
		});

		return {
			completed,
		};
	},
});
</script>
