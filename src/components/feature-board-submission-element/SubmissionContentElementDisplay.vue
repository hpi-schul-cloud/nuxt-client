<template>
	<div class="grey lighten-4 pa-4 rounded">
		<SubmissionContentElementTitle />
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
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	components: { SubmissionContentElementTitle },
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
