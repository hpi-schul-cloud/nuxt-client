<template>
	<div>completed: {{ completed }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSubmissionItemState } from "./SubmissionItemState.composable";

export default defineComponent({
	name: "SubmissionContentElementDisplayStudent",
	props: {},
	setup() {
		const { updateSubmissionItem } = useSubmissionItemState();

		// const getIt = async () => {
		// 	const submissionItem = await getSubmissionItems(
		// 		props.submissionContainerId
		// 	);
		// 	console.log(submissionItem);
		// 	// now create it
		// 	// createSubmissionItem(props.submissionContainerId);
		// };

		// getIt();

		const completed = true;
		return {
			completed,
		};
	},
});
</script>
