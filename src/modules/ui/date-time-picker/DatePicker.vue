<template>
	<v-menu
		v-model="showDateDialog"
		transition="scale-transition"
		:close-on-content-click="false"
	>
		<template #activator="{ props: menuProps }">
			<v-text-field
				v-bind="menuProps"
				v-bind.attr="$attrs"
				ref="inputField"
				v-model="dateString"
				v-date-input-mask
				:append-inner-icon="mdiCalendar"
				:label="label"
				:aria-label="ariaLabel"
				:placeholder="t('common.placeholder.dateformat')"
				:error-messages="errorMessages"
				@update:model-value="validate"
				@keydown.space="showDateDialog = true"
				@keydown.prevent.enter="showDateDialog = true"
				@keydown.up.down.stop
				@keydown.tab="showDateDialog = false"
			/>
		</template>
		<v-date-picker
			v-model="dateObject"
			:aria-expanded="showDateDialog"
			:min="minDate"
			:max="maxDate"
			color="primary"
			hide-header
			show-adjacent-months
			elevation="6"
			@update:model-value="closeAndEmit"
		/>
	</v-menu>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, unref, PropType, toRef } from "vue";
import { useDebounceFn, computedAsync } from "@vueuse/core";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { useVuelidate, ErrorObject } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { isValidDateFormat } from "@util-validators";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import { mdiCalendar } from "@icons/material";

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
const inputField = ref<HTMLInputElement | null>(null);
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

const validate = () => {
	v$.value.dateString.$touch();
	v$.value.$validate();

	if (isValid.value) {
		emitDate();
	} else {
		emit("error");
	}
};

const emitDate = () => {
	const date = dateString.value
		? dayjs(dateString.value, DATETIME_FORMAT.date).toISOString()
		: undefined;

	emit("update:date", date);
};

const closeAndEmit = () => {
	showDateDialog.value = false;
	inputField.value?.focus();

	emitDate();
};
</script>

<style lang="scss" scoped>
:deep {
	.v-field__append-inner .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
