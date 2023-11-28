<template>
	<v-text-field
		ref="inputField"
		data-testid="date-input"
		variant="underlined"
		color="primary"
		append-inner-icon="$mdiCalendar"
		v-model="dateValue"
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
	<!-- <div>
		<v-menu
			v-model="showDateDialog"
			transition="scale-transition"
			:close-on-content-click="false"
		>
			<template #activator="{ props }">
				<v-text-field
					v-bind="props"
					ref="inputField"
					data-testid="date-input"
					variant="underlined"
					color="primary"
					append-inner-icon="$mdiCalendar"
					:model-value="dateValue"
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="t('common.placeholder.dateformat')"
					:class="{ 'menu-open': showDateDialog }"
					:error-messages="getErrorMessages(v$.dateValue)"
					v-date-input-mask
					@update:model-value="test"
					@keydown.space="showDateDialog = true"
					@keydown.prevent.enter="showDateDialog = true"
					@keydown.up.down.stop
					@keydown.tab="showDateDialog = false"
				/>
			</template>
			<v-locale-provider :locale="locale">
				<v-date-picker
					:aria-expanded="showDateDialog"
					:min="minDate"
					:max="maxDate"
					color="primary"
					hide-header
					show-adjacent-months
					elevation="6"
				/>
			</v-locale-provider>
		</v-menu>
	</div> -->
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import { useDebounceFn, computedAsync } from "@vueuse/core";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { isValidDateFormat } from "@util-validators";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import { watchEffect } from "vue";

const props = defineProps({
	date: { type: String, required: true },
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
const dateValue = ref();

watchEffect(() => {
	dateValue.value = props.date;
});

const rules = computed(() => ({
	dateValue: {
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

const v$ = useVuelidate(rules, { dateValue }, { $lazy: true });

const errorMessages = computedAsync(async () => {
	return await getErrorMessages(v$.value.dateValue);
}, null);

const getErrorMessages = useDebounceFn((validationModel: any) => {
	const messages = validationModel.$errors.map((e: any) => {
		return e.$message;
	});
	return messages;
}, 1000);

const validate = () => {
	v$.value.dateValue.$touch();
	v$.value.$validate();

	if (!v$.value.dateValue.$invalid) {
		emitDate();
	}
};

const emitDate = () => {
	emit(
		"update:date",
		dayjs(dateValue.value, DATETIME_FORMAT.date).format(
			DATETIME_FORMAT.inputDate
		)
	);
};

// const onInput = async (date: Date) => {
// 	dateValue.value = date;
// 	valid.value = true;
// 	inputField.value?.focus();
// 	await closeMenu();
// };

// const closeMenu = useDebounceFn(() => {
// 	showDateDialog.value = false;
// }, 50);
</script>

<style lang="scss" scoped>
:deep {
	.v-field__append-inner .v-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
