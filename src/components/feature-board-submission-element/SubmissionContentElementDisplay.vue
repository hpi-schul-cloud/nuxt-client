<template>
	<div class="grey lighten-4 pa-4 rounded">
		<v-card-title
			class="pa-0"
			data-testid="board-submission-element-display"
			inactive
		>
			<v-icon
				color="black"
				size="18"
				class="mr-2"
				data-testid="board-submission-element-display-icon"
			>
				$mdiLightbulbOnOutline
			</v-icon>
			<span
				class="subtitle-1 d-inline-block text-truncate black--text font-weight-bold"
				data-testid="board-submission-element-display-content"
			>
				{{ $t("components.cardElement.submissionElement") }}
			</span>
		</v-card-title>
		<v-card-subtitle
			class="pa-0 mt-1 subtitle-1"
			data-testid="board-submission-element-due-date"
		>
			{{ formattedDueDate }}
		</v-card-subtitle>
	</div>
</template>

<script lang="ts">
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
	setup(props) {
		const formattedDueDate = dayjs(props.dueDate).format(
			"dddd, DD.MM.YYYY - HH:mm"
		);
		return {
			formattedDueDate,
		};
	},
});
</script>
