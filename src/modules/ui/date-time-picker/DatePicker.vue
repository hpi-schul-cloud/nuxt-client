<template>
	<VTextField
		:id="datePickerId"
		ref="date-text-field"
		v-bind.attr="$attrs"
		v-model="dateString"
		v-maska="dateMask"
		:prepend-inner-icon="!hideIcon ? mdiCalendar : undefined"
		:label="label"
		:aria-label="ariaLabelWithFormat"
		:placeholder="datePlaceHolder"
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
		<UseFocusTrap :options="{ immediate: true }">
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
import { useLocalizedDateTime } from "@/composables/date-time.composables";
import { formatUtc, toDateFromIso, toIsoDate } from "@/utils/date-time.utils";
import { mdiCalendar } from "@icons/material";
import { isRequired, isValidDate } from "@util-validators";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { vMaska } from "maska/vue";
import { computed, ref, useId, useTemplateRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		date?: string; // ISO 8601 string
		label?: string;
		ariaLabel?: string;
		required?: boolean;
		disabled?: boolean;
		minDate?: string;
		maxDate?: string;
		hideIcon?: boolean;
	}>(),
	{
		date: undefined,
		label: undefined,
		ariaLabel: undefined,
		disabled: false,
		required: false,
		minDate: undefined,
		maxDate: undefined,
		hideIcon: false,
	}
);

const emit = defineEmits<{
	(e: "update:date", value: string | undefined): void;
	(e: "error"): void;
}>();

const { dateMask, datePlaceHolder } = useLocalizedDateTime();

const { t } = useI18n();

const showDatePicker = ref(false);
const dateTextField = useTemplateRef("date-text-field");
const dateString = ref<string>();

const uniqueId = useId();
const datePickerId = computed(() => `menu-activator-${uniqueId}`);

watchEffect(() => {
	if (dateString.value === undefined && props.date) dateString.value = formatUtc(props.date, "date");
});

const dateObject = computed({
	get() {
		if (!dateString.value) return undefined;
		return toDateFromIso(dateString.value);
	},
	set(isoString: string) {
		dateString.value = formatUtc(isoString, "date");
		showDatePicker.value = false;
	},
});

const validationRules = computed(() => [
	props.required ? isRequired(t("components.datePicker.validation.required")) : true,
	isValidDate,
]);

const ariaLabelWithFormat = computed(() => {
	const prefix = props.ariaLabel || props.label || t("common.labels.date");
	return `${prefix} (${datePlaceHolder.value})`;
});

const validateAndEmitDate = async () => {
	if (dateTextField.value === null) return;

	await dateTextField.value.validate();
	const isValid = dateTextField.value.isValid;
	if (isValid) {
		const isoDate = toIsoDate(dateString.value);
		emit("update:date", isoDate);
	} else {
		emit("update:date", undefined);
		emit("error");
	}
};

watch(() => dateTextField.value?.modelValue, validateAndEmitDate);

watch(
	() => props.required,
	async (required) => {
		if (required === false) {
			await dateTextField.value?.resetValidation();
		}
	}
);
</script>
