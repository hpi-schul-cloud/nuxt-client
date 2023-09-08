<template>
	<div class="white rounded-b-sm">
		<v-skeleton-loader
			v-if="loading"
			class="mt-5 ml-5 mb-6"
			type="image"
			width="120"
			height="22"
		/>
		<v-container v-else>{{ submissionItems }}</v-container>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SubmissionItemResponse } from "@/serverApi/v3";

export default defineComponent({
	name: "SubmissionItemsTeacherDisplay",
	props: {
		loading: {
			type: Boolean,
			required: true,
		},
		submissionItems: {
			type: Array as PropType<SubmissionItemResponse[]>,
			required: true,
		},
	},
});
</script>
