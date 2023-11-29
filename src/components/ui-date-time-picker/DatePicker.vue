<template>
	<div>
		<v-menu
			v-model="showDateDialog"
			transition="scale-transition"
			:close-on-content-click="false"
		>
			<template #activator="{ props }">
				<v-text-field
					v-bind="props"
					v-model="dateString"
					ref="inputField"
					data-testid="date-input"
					variant="underlined"
					color="primary"
					append-inner-icon="$mdiCalendar"
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="t('common.placeholder.dateformat')"
					:class="{ 'menu-open': showDateDialog }"
					:error-messages="errorMessages"
					v-date-input-mask
					@update:model-value="validate"
					@keydown.space="showDateDialog = true"
					@keydown.prevent.enter="showDateDialog = true"
					@keydown.up.down.stop
					@keydown.tab="showDateDialog = false"
				/>
			</template>
			<v-locale-provider :locale="locale">
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
			</v-locale-provider>
		</v-menu>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, watchEffect } from "vue";
import { useDebounceFn, computedAsync } from "@vueuse/core";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { isValidDateFormat } from "@util-validators";
import { DATETIME_FORMAT } from "@/plugins/datetime";

const props = defineProps({
	date: { type: String, required: true }, // ISO 8601 string
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
	minDate: { type: String },
	maxDate: { type: String },
});
const emit = defineEmits(["update:date", "error"]);

const { t, locale } = useI18n();

const showDateDialog = ref(false);
const inputField = ref<HTMLInputElement | null>(null);
const dateString = ref<undefined | string>();

const dateObject = computed({
	get() {
		if (v$.value.dateString.$invalid) return;
		return dateString.value
			? dayjs(dateString.value, DATETIME_FORMAT.date).toDate()
			: undefined;
	},

	set(newValue) {
		dateString.value = dayjs(newValue).format(DATETIME_FORMAT.date);
	},
});

watchEffect(() => {
	dateString.value = dayjs(props.date).format(DATETIME_FORMAT.date);
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

const errorMessages = computedAsync(async () => {
	return await getErrorMessages(v$.value.dateString);
}, null);

const getErrorMessages = useDebounceFn((validationModel: any) => {
	const messages = validationModel.$errors.map((e: any) => {
		return e.$message;
	});
	return messages;
}, 1000);

const validate = () => {
	v$.value.dateString.$touch();
	v$.value.$validate();

	if (!v$.value.dateString.$invalid) {
		emitDate();
	} else {
		emit("error");
	}
};

const emitDate = () => {
	emit(
		"update:date",
		dayjs(dateString.value, DATETIME_FORMAT.date).toISOString()
	);
};

const closeAndEmit = () => {
	showDateDialog.value = false;
	inputField.value?.focus();

	emit(
		"update:date",
		dayjs(dateString.value, DATETIME_FORMAT.date).toISOString()
	);
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
