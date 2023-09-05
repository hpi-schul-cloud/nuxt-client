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
import { useI18n } from "@/composables/i18n.composable";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";

export default defineComponent({
	name: "SubmissionContentElementDisplay",
	components: { SubmissionContentElementTitle },
	props: {
		dueDate: {
			type: String,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const formattedDueDate = props.dueDate
			? dayjs(props.dueDate).format(`dddd, ${t("format.date")} - HH:mm`)
			: undefined;

		return {
			formattedDueDate,
		};
	},
});
</script>
