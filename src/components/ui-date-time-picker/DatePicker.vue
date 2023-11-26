<template>
	<div>
		<v-menu
			v-model="showDateDialog"
			transition="scale-transition"
			min-width="auto"
		>
			<template #activator="{ props }">
				<v-text-field
					v-bind="props"
					ref="inputField"
					:model-value="date"
					:label="label"
					:aria-label="ariaLabel"
					:placeholder="t('common.placeholder.dateformat')"
					:class="{ 'menu-open': showDateDialog }"
					v-date-input-mask
					append-icon="$mdiCalendar"
					:rules="rules"
					data-testid="date-input"
					variant="underlined"
					color="primary"
					@keydown.space="showDateDialog = true"
					@keydown.prevent.enter="showDateDialog = true"
					@keydown.up.down.stop
					@keydown.tab="showDateDialog = false"
					@update:error="onError"
				/>
			</template>
			<v-locale-provider :locale="locale">
				<v-date-picker
					:model-value="modelValue"
					:aria-expanded="showDateDialog"
					color="primary"
					hide-header
					:min="minDate"
					:max="maxDate"
					@update:model-value="onInput"
				/>
			</v-locale-provider>
		</v-menu>
	</div>
</template>

<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { defineProps, defineEmits, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { dateInputMask as vDateInputMask } from "@util-input-masks";
import { isRequired, isValidDateFormat } from "@util-validators";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "@/plugins/datetime";

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

const modelValue = computed({
	get(): Date {
		return dayjs(props.date).toDate();
	},
	set: (newValue: Date) => {
		emitDateDebounced(dayjs(newValue).format(DATETIME_FORMAT.inputDate));
	},
});

/**
 * Necessary because we need to wait for update:error
 */
const emitDateDebounced = useDebounceFn((newValue) => {
	if (valid.value) {
		const dateISO = getISODate(newValue);
		emit("update:date", dateISO);
	}
}, 50);

const showDateDialog = ref(false);
const inputField = ref<HTMLInputElement | null>(null);
const valid = ref(true);

const getISODate = (date: string) => {
	if (!date.includes(".")) return date;

	const [day, month, year] = date.split(".");
	return `${year}-${month}-${day}`;
};

const rules = computed(() => {
	const rules = [
		isValidDateFormat(t("components.datePicker.validation.format")),
	];

	if (props.required) {
		rules.push(isRequired(t("components.datePicker.validation.required")));
	}

	return rules;
});

const onInput = async (date: Date) => {
	modelValue.value = date;
	valid.value = true;
	inputField.value?.focus();
};

const onError = (hasError: boolean) => {
	valid.value = !hasError;
	if (hasError) {
		emit("error");
	}
};
</script>

<style lang="scss" scoped>
:deep {
	.v-input__icon--append .v-icon {
		width: 20px;
		height: 20px;
	}

	.v-messages__message {
		line-height: 14px;
	}
}
</style>
