<template>
	<div class="grey lighten-4 px-4 py-3 rounded-t-sm">
		<v-list-item
			class="px-0"
			data-testid="board-submission-element-display"
			inactive
		>
			<v-list-item-icon class="mr-2 my-2">
				<v-icon
					class="grey--text text--darken-2"
					data-testid="board-submission-element-display-icon"
					medium
					>{{ mdiLightbulbOnOutline }}</v-icon
				>
			</v-list-item-icon>

			<v-list-item-content class="py-0">
				<span
					class="subtitle-1 d-inline-block text-truncate grey--text text--darken-2"
					data-testid="board-submission-element-display-content"
					>{{ $t("components.cardElement.submissionElement") }}</span
				>
			</v-list-item-content>
		</v-list-item>

		<v-card-text
			class="pa-0 subtitle-1 font-weight-bold"
			data-testid="board-submission-element-due-date"
		>
			{{ dayjs(dueDate).format("DD.MM.YYYY HH:mm") }}
			<SubmissionContentElementDisplayStudent />
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { mdiLightbulbOnOutline } from "@mdi/js";
import { defineComponent } from "vue";
import SubmissionContentElementDisplayStudent from "./SubmissionContentElementDisplayStudent.vue";
import { useSubmissionItemApi } from "./SubmissionItemApi.composable";
import dayjs from "dayjs";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	props: {
		submissionContainerId: {
			type: String,
			required: true,
		},
		dueDate: {
			type: String,
			required: true,
		},
	},
	components: {
		SubmissionContentElementDisplayStudent,
	},
	setup(props) {
		const { getSubmissionItems, createSubmissionItem } = useSubmissionItemApi();

		const getIt = async () => {
			const submissionItem = await getSubmissionItems(
				props.submissionContainerId
			);
			console.log(submissionItem);
			// now create it
			// createSubmissionItem(props.submissionContainerId);
		};

		getIt();

		return {
			dayjs,
			mdiLightbulbOnOutline,
		};
	},
});
</script>
