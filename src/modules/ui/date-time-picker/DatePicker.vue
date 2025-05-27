<template>
	<v-menu
		v-model="showDateDialog"
		transition="scale-transition"
		:close-on-content-click="false"
	>
		<template #activator="{ props: menuProps }">
			<v-text-field
				ref="date-text-field"
				v-bind="menuProps"
				v-bind.attr="$attrs"
				v-model="dateString"
				v-date-input-mask
				:prepend-inner-icon="mdiCalendar"
				:label="label"
				:aria-label="ariaLabel"
				:placeholder="t('common.placeholder.dateformat')"
				:error-messages="errorMessages"
				@update:model-value="onUpdateTextfield"
				@keydown.space="showDateDialog = true"
				@keydown.prevent.enter="showDateDialog = true"
				@keydown.up.down.stop
				@keydown.tab="showDateDialog = false"
			/>
		</template>
		<UseFocusTrap>
			<v-date-picker
				v-model="dateObject"
				:aria-expanded="showDateDialog"
				:min="minDate"
				:max="maxDate"
				color="primary"
				hide-header
				show-adjacent-months
				elevation="6"
				@update:model-value="onPickDate"
			/>
		</UseFocusTrap>
	</v-menu>
</template>

<script setup lang="ts">
import {
	computed,
	ref,
	watchEffect,
	unref,
	PropType,
	toRef,
	useTemplateRef,
} from "vue";
import { useDebounceFn, computedAsync } from "@vueuse/core";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { useVuelidate, ErrorObject } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { isValidDateFormat } from "@util-validators";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import { mdiCalendar } from "@icons/material";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps({
	date: { type: String, default: undefined }, // ISO 8601 string
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
	minDate: { type: String, default: undefined },
	maxDate: { type: String, default: undefined },
	errors: { type: Array as PropType<ErrorObject[]>, default: () => [] },
});
const emit = defineEmits(["update:date", "error"]);
const { t } = useI18n();

const showDateDialog = ref(false);
const dateTextField = useTemplateRef("date-text-field");
const dateString = ref<string>();
const externalErrors = toRef(props, "errors");
watchEffect(() => {
	dateString.value = props.date
		? dayjs(props.date).format(DATETIME_FORMAT.date)
		: undefined;
});

const dateObject = computed({
	get() {
		if (isValid.value) {
			return dateString.value
				? dayjs(dateString.value, DATETIME_FORMAT.date).toDate()
				: undefined;
		}

		return props.date ? new Date(props.date) : undefined;
	},
	set(newValue) {
		dateString.value = dayjs(newValue).format(DATETIME_FORMAT.date);
	},
});

const rules = computed(() => ({
	dateString: {
		requiredIfProp: helpers.withMessage(
			t("components.datePicker.validation.required"),
			requiredIf(props.required)
		),
		validDateFormat: helpers.withMessage(
			t("components.datePicker.validation.format"),
			isValidDateFormat
		),
	},
}));

const v$ = useVuelidate(rules, { dateString }, { $lazy: true });

const isValid = computed(() => {
	return !v$.value.dateString.$invalid;
});

const combinedErrors = computed(() => {
	return v$.value.dateString.$errors.concat(externalErrors.value);
});

const errorMessages = computedAsync<string[] | null>(async () => {
	const messages = await getErrorMessages(combinedErrors.value);
	return messages ?? [];
}, null);

const getErrorMessages = useDebounceFn(
	async (errors: ErrorObject[] | undefined) => {
		const messages = errors?.map((e: ErrorObject) => {
			return unref(e.$message);
		});

		return messages;
	},
	700
);

watchEffect(async () => {
	if (props.required === true) {
		v$.value.dateString.$touch();
		await v$.value.$validate();
	}
});

const onUpdateTextfield = async () => {
	await emitDate();
};

const onPickDate = async () => {
	dateString.value = dateObject.value
		? dayjs(dateObject.value).format(DATETIME_FORMAT.date)
		: undefined;
	await emitDate();
	showDateDialog.value = false;
	dateTextField.value?.focus();
};

const emitDate = async () => {
	v$.value.dateString.$touch();
	const isValid = await v$.value.$validate();
	if (isValid) {
		const formattedDate = dateString.value
			? dayjs(dateString.value, DATETIME_FORMAT.date).toISOString()
			: null;

		emit("update:date", formattedDate);
	} else {
		emit("update:date", null);
		emit("error");
	}
};
</script>
