<template>
	<v-chip
		v-if="type === 'warning'"
		color="orange lighten-3"
		small
		data-test-id="dueDateHintLabel"
	>
		<v-icon left small> $hourglassBottomBlack </v-icon>
		{{ hintDueDate(dueDate, shortenUnit) }}
	</v-chip>
	<v-chip
		v-else-if="type === 'overdue'"
		color="error lighten-5"
		text-color="black"
		small
		data-test-id="overDueDateLabel"
	>
		<v-icon left small> $hourglassDisabled </v-icon>
		{{ $t("pages.homeworks.labels.overdue") }}
	</v-chip>
	<v-chip
		v-else-if="type === 'graded'"
		color="blue lighten-4"
		text-color="black"
		small
		data-test-id="gradedLabel"
	>
		{{ $t("pages.homeworks.labels.graded") }}
	</v-chip>
</template>

<script>
import { fromNowToFuture } from "@plugins/datetime";
import dayjs from "dayjs";

export default {
	props: {
		type: {
			type: String,
			required: true,
			validator: (value) => ["warning", "overdue", "graded"].includes(value),
		},
		dueDate: {
			type: String,
			required: false,
			validator: (value) => dayjs(value).isValid(),
		},
		shortenUnit: {
			type: Boolean,
			required: false,
		},
	},
	methods: {
		hintDueDate(dueDate, shorten = false) {
			const diffHrs = fromNowToFuture(dueDate, "hours");
			if (diffHrs === 0) {
				const diffMins = fromNowToFuture(dueDate, "minutes");

				const label = shorten
					? this.$t("components.molecules.VCustomChipTaskState.hintMinShort")
					: this.$tc(
							"components.molecules.VCustomChipTaskState.hintMinutes",
							diffMins
					  );

				return `${this.$t(
					"components.molecules.VCustomChipTaskState.hintDueTime"
				)} ${diffMins} ${label}`;
			} else {
				const label = shorten
					? this.$t("components.molecules.VCustomChipTaskState.hintHoursShort")
					: this.$tc(
							"components.molecules.VCustomChipTaskState.hintHours",
							diffHrs
					  );
				return `${this.$t(
					"components.molecules.VCustomChipTaskState.hintDueTime"
				)} ${diffHrs} ${label}`;
			}
		},
	},
};
</script>
