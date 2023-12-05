<template>
	<date-picker
		class="mr-2"
		:date="dateSelection.$gte"
		label="first date"
		@update:date="onUpdateDate($event, 'from')"
	/>

	<date-picker
		class="mr-2"
		:date="dateSelection.$lte"
		label="until date"
		@update:date="onUpdateDate($event, 'until')"
	/>

	<FilterActionButtons
		class="ma-2"
		@remove:filter="onRemoveFilter"
		@dialog-closed="onClose"
		@update:filter="onUpdateFilter"
	/>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FilterActionButtons from "./FilterActionButtons.vue";
import DatePicker from "@/components/ui-date-time-picker/DatePicker.vue";

const dateSelection = ref({
	$gte: new Date().toDateString(),
	$lte: "",
});

const emit = defineEmits(["update:filter", "dialog-closed", "remove:filter"]);

const onUpdateDate = (date: string, fromUntil: string) => {
	if (fromUntil == "from") dateSelection.value.$gte = date;
	if (fromUntil == "until") dateSelection.value.$lte = date;
};

const onUpdateFilter = () => {
	emit("update:filter", dateSelection.value);
};

const onClose = () => {
	emit("dialog-closed", false);
};

const onRemoveFilter = () => {
	emit("remove:filter");
};
</script>
