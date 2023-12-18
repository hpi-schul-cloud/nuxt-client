<template>
	<v-text-field
		ref="inputField"
		v-model="timeValue"
		variant="underlined"
		color="primary"
		:label="label"
		:aria-label="ariaLabel"
		placeholder="HH:MM"
		append-icon="$mdiClockOutline"
		data-testid="time-input"
		:error-messages="errorMessages"
		v-time-input-mask
		@keydown.up.down.stop
		@update:model-value="validate"
	/>
</template>

<script setup lang="ts">
import { computedAsync, useDebounceFn } from "@vueuse/core";
import { computed, ref, watchEffect } from "vue";
// import { useTimePickerState } from "./TimePickerState.composable";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { isValidTimeFormat } from "@util-validators";

const props = defineProps({
	time: { type: String, required: true },
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
});
const emit = defineEmits(["update:time", "error"]);
const { t } = useI18n();

const showTimeDialog = ref(false);
const inputField = ref<HTMLInputElement | null>(null);
const timeValue = ref<undefined | string>();
// const { timesOfDayList } = useTimePickerState();

watchEffect(() => {
	timeValue.value = props.time;
});

const rules = computed(() => ({
	timeValue: {
		requiredIfProp: helpers.withMessage(
			t("components.timePicker.validation.required"),
			requiredIf(props.required)
		),
		validDateFormat: helpers.withMessage(
			t("components.timePicker.validation.format"),
			isValidTimeFormat
		),
	},
}));

const v$ = useVuelidate(rules, { timeValue }, { $lazy: true });

const errorMessages = computedAsync(async () => {
	return await getErrorMessages(v$.value.timeValue);
}, null);

const getErrorMessages = useDebounceFn((validationModel: any) => {
	const messages = validationModel.$errors.map((e: any) => {
		return e.$message;
	});
	return messages;
}, 1000);

const validate = () => {
	v$.value.timeValue.$touch();
	v$.value.$validate();

	if (!v$.value.timeValue.$invalid) {
		emitTime();
	} else {
		emit("error");
	}
};

const emitTime = () => {
	emit("update:time", timeValue.value);
};

// const closeAndEmit = () => {
// 	showDateDialog.value = false;
// 	inputField.value?.focus();

// 	emit(
// 		"update:date",
// 		dayjs(timeValue.value, DATETIME_FORMAT.date).toISOString()
// 	);
// };

// const onSelect = async (selected: string) => {
// 	inputField.value?.focus();
// 	modelValue.value = selected;
// 	valid.value = true;
// 	await closeMenu();
// };
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.time-list-item {
	min-height: 42px;
	text-align: center;
	letter-spacing: $btn-letter-spacing;
}

:deep {
	.v-field__append-inner .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
