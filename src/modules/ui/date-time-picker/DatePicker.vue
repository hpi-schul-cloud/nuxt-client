<template>
	<VTextField
		id="menu-activator"
		ref="date-text-field"
		v-bind.attr="$attrs"
		v-model="dateString"
		v-date-input-mask
		:prepend-inner-icon="mdiCalendar"
		:label="label"
		:aria-label="ariaLabel"
		:placeholder="t('common.placeholder.dateformat')"
		:rules="validationRules"
		@keydown.space="showDatePicker = true"
		@keydown.prevent.enter="showDatePicker = true"
		@keydown.up.down.stop
		@keydown.tab="showDatePicker = false"
	/>
	<VMenu
		v-model="showDatePicker"
		transition="scale-transition"
		:close-on-content-click="false"
		activator="#menu-activator"
	>
		<UseFocusTrap>
			<VDatePicker
				v-model="dateObject"
				:aria-expanded="showDatePicker"
				:min="minDate"
				:max="maxDate"
				color="primary"
				hide-header
				show-adjacent-months
				elevation="6"
			/>
		</UseFocusTrap>
	</VMenu>
</template>

<script setup lang="ts">
import { DATETIME_FORMAT } from "@/plugins/datetime";
import { mdiCalendar } from "@icons/material";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { logger } from "@util-logger";
import { isRequired, isValidDateFormat } from "@util-validators";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import dayjs from "dayjs";
import { computed, ref, useTemplateRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

// Todo: Props + emit types, aria-label default hinzufügen
const props = defineProps({
	date: { type: String, default: undefined }, // ISO 8601 string
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
	minDate: { type: String, default: undefined },
	maxDate: { type: String, default: undefined },
});
const emit = defineEmits(["update:date", "error"]);
const { t } = useI18n();

const showDatePicker = ref(false);
const dateTextField = useTemplateRef("date-text-field");
const dateString = ref<string>();

const { error, log } = logger; // TODO REMOVE

watchEffect(() => {
	if (dateString.value === undefined && props.date) dateString.value = dayjs(props.date).format(DATETIME_FORMAT.date);
});

const dateObject = computed({
	get() {
		if (!dateString.value) return undefined;
		const parsed = dayjs(dateString.value, DATETIME_FORMAT.date, true);
		return parsed.isValid() ? parsed.toDate() : undefined;
	},
	set(date: Date) {
		log("onPickDate", date);
		dateString.value = dayjs(date).format(DATETIME_FORMAT.date);
		showDatePicker.value = false;
	},
});

const validationRules = computed(() => [
	props.required ? isRequired(t("components.datePicker.validation.required")) : true,
	isValidDateFormat(t("components.datePicker.validation.format")),
]);

watch(
	() => dateTextField.value?.modelValue,
	async () => {
		if (dateTextField.value === null) return;
		await dateTextField.value.validate();
		const isValid = dateTextField.value.isValid;

		log("is Valid", isValid);

		if (isValid) {
			const formattedDate = dateString.value ? dayjs(dateString.value, DATETIME_FORMAT.date).toISOString() : null;

			emit("update:date", formattedDate);
		} else {
			emit("update:date", null);
			emit("error");
		}
	}
);

// watchEffect(async () => {
// 	if (props.isDateRequired === true) {
// 		if (dateTextField.value === null) return;
// 		await dateTextField.value.validate();
// 	}
// });
</script>
