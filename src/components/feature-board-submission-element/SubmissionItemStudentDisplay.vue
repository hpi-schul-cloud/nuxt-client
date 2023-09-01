<template>
	<div>{{ submissionItems[0]?.completed }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";

export default defineComponent({
	name: "SubmissionContentElementDisplayStudent",
	props: {
		submissionItems: {
			type: Array as PropType<Array<SubmissionItemResponse>>,
			required: true,
		},
	},
});
</script>
