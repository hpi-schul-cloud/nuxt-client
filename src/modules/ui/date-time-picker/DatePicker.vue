<template>
	<VTextField
		:id="datePickerId"
		ref="date-text-field"
		v-bind.attr="$attrs"
		v-model="dateString"
		v-date-input-mask
		:prepend-inner-icon="mdiCalendar"
		:label="label"
		:aria-label="ariaLabelWithFormat"
		:placeholder="t('common.placeholder.dateformat')"
		:disabled="disabled"
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
		:activator="`#${datePickerId}`"
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
import { isRequired, isValidDateFormat } from "@util-validators";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import dayjs from "dayjs";
import { computed, ref, useId, useTemplateRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
	date?: string; // ISO 8601 string
	label?: string;
	ariaLabel?: string;
	required?: boolean;
	disabled?: boolean;
	minDate?: string;
	maxDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
	date: undefined,
	label: undefined,
	ariaLabel: undefined,
	disabled: false,
	required: false,
	minDate: undefined,
	maxDate: undefined,
});

const emit = defineEmits<{
	(e: "update:date", value: string | null): void;
	(e: "error"): void;
}>();

const { t } = useI18n();

const showDatePicker = ref(false);
const dateTextField = useTemplateRef("date-text-field");
const dateString = ref<string>();

const uniqueId = useId();
const datePickerId = computed(() => `menu-activator-${uniqueId}`);

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
		dateString.value = dayjs(date).format(DATETIME_FORMAT.date);
		showDatePicker.value = false;
	},
});

const validationRules = computed(() => [
	props.required ? isRequired(t("components.datePicker.validation.required")) : true,
	isValidDateFormat(t("components.datePicker.validation.format")),
]);

const ariaLabelWithFormat = computed(() => {
	const prefix = props.ariaLabel || props.label || "common.labels.date";
	return `${t(prefix)} (${t("common.placeholder.dateformat")})`;
});

watch(
	() => dateTextField.value?.modelValue,
	async () => {
		if (dateTextField.value === null) return;

		await dateTextField.value.validate();
		const isValid = dateTextField.value.isValid;
		if (isValid) {
			const isoDate = dateString.value ? dayjs(dateString.value, DATETIME_FORMAT.date).toISOString() : null;

			emit("update:date", isoDate);
		} else {
			emit("update:date", null);
			emit("error");
		}
	}
);

watch(
	() => props.required,
	async (required) => {
		if (required === false) {
			await dateTextField.value?.resetValidation();
		}
	}
);
</script>
