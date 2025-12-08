<template>
	<DatePicker
		class="mr-2"
		:date="dateSelection.$gte"
		:label="t('utils.adminFilter.date.label.from')"
		data-testid="date-picker-from"
		@update:date="onUpdateDate($event, '$gte')"
	/>

	<DatePicker
		class="mr-2"
		:date="dateSelection.$lte"
		:label="t('utils.adminFilter.date.label.until')"
		data-testid="date-picker-until"
		@update:date="onUpdateDate($event, '$lte')"
	/>

	<FilterActionButtons
		class="ma-2"
		@remove:filter="onRemoveFilter"
		@dialog-closed="onClose"
		@update:filter="onUpdateFilter"
	/>
</template>
<script setup lang="ts">
import { DateSelection } from "../types";
import FilterActionButtons from "./FilterActionButtons.vue";
import { DatePicker } from "@ui-date-time-picker";
import { onMounted, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	selectedDate: {
		type: Object as PropType<DateSelection>,
		default: undefined,
	},
});

const { t } = useI18n();

const defaultDates = {
	$gte: "1900-01-01T23:00:00.000Z",
	$lte: "2099-12-31T23:00:00.000Z",
};

const dateSelection = ref<{ $gte: string; $lte: string }>({
	$gte: new Date().toISOString(),
	$lte: "",
});

const emit = defineEmits(["update:filter", "dialog-closed", "remove:filter"]);

const onUpdateDate = (date: string | null, fromUntil: "$gte" | "$lte") => {
	dateSelection.value[fromUntil] = date ?? "";
};

const onUpdateFilter = () => {
	if (dateSelection.value.$gte === "" && dateSelection.value.$lte === "") {
		onRemoveFilter();
		onClose();
		return;
	}
	if (dateSelection.value.$gte === "") dateSelection.value.$gte = defaultDates.$gte;
	if (dateSelection.value.$lte === "") dateSelection.value.$lte = defaultDates.$lte;

	const convertedDates = {
		$gte: new Date(dateSelection.value.$gte),
		$lte: new Date(dateSelection.value.$lte),
	};

	emit("update:filter", convertedDates);
};

const onClose = () => {
	emit("dialog-closed", false);
};

const onRemoveFilter = () => {
	emit("remove:filter");
};

onMounted(() => {
	if (props.selectedDate) {
		dateSelection.value = {
			$gte: props.selectedDate.$gte instanceof Date ? props.selectedDate.$gte.toISOString() : props.selectedDate.$gte,
			$lte: props.selectedDate.$lte instanceof Date ? props.selectedDate.$lte.toISOString() : props.selectedDate.$lte,
		};
	}
});
</script>
