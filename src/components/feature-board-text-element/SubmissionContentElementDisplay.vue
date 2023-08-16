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
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { mdiLightbulbOnOutline } from "@mdi/js";
import { defineComponent } from "vue";
import dayjs from "dayjs";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	props: {
		dueDate: {
			type: String,
			required: true,
		},
	},
	setup() {
		return {
			dayjs,
			mdiLightbulbOnOutline,
		};
	},
});
</script>
