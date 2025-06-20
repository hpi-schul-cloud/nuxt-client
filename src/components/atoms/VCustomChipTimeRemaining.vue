<template>
	<v-chip
		v-if="type === 'warning'"
		color="orange-lighten-3"
		size="small"
		variant="flat"
		data-test-id="dueDateHintLabel"
	>
		<v-icon start size="small"> {{ mdiTimerSandComplete }} </v-icon>
		{{ hintDueDate(dueDate, shortenUnit) }}
	</v-chip>
</template>

<script setup lang="ts">
import { fromNowToFuture } from "@/plugins/datetime";
import dayjs from "dayjs";
import { mdiTimerSandComplete } from "@icons/material";
import { useI18n } from "vue-i18n";

defineProps({
	type: {
		type: String,
		required: true,
		validator: (value: string) => ["warning"].includes(value),
	},
	dueDate: {
		type: String,
		required: true,
		validator: (value: string) => dayjs(value).isValid(),
	},
	shortenUnit: {
		type: Boolean,
		default: false,
	},
});

const { t } = useI18n();
const hintDueDate = (dueDate: string, shorten = false) => {
	const diffHrs = fromNowToFuture(dueDate, "hours");
	if (diffHrs === 0) {
		const diffMins = fromNowToFuture(dueDate, "minutes");

		const label = shorten
			? t("components.atoms.VCustomChipTimeRemaining.hintMinShort")
			: t("components.atoms.VCustomChipTimeRemaining.hintMinutes", diffMins);

		return `${t(
			"components.atoms.VCustomChipTimeRemaining.hintDueTime"
		)}${diffMins} ${label}`;
	} else {
		const label = shorten
			? t("components.atoms.VCustomChipTimeRemaining.hintHoursShort")
			: t("components.atoms.VCustomChipTimeRemaining.hintHours", diffHrs);
		return `${t(
			"components.atoms.VCustomChipTimeRemaining.hintDueTime"
		)}${diffHrs} ${label}`;
	}
};
</script>
