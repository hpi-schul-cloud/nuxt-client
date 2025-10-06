<template>
	<div>
		<v-text-field
			v-model="timeValue"
			v-time-input-mask
			data-testid="time-input"
			:append-inner-icon="mdiClockOutline"
			:label="label"
			:aria-label="ariaLabel"
			placeholder="HH:MM"
			:error-messages="errorMessages"
			@update:model-value="validate"
			@keydown.up.down.stop
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiClockOutline } from "@icons/material";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { isValidTimeFormat } from "@util-validators";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers, requiredIf } from "@vuelidate/validators";
import { computedAsync, useDebounceFn } from "@vueuse/core";
import { computed, ref, unref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	time: { type: String, required: true },
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
});
const emit = defineEmits(["update:time", "error"]);

const { t } = useI18n();
const timeValue = ref<undefined | string>();

watchEffect(() => {
	timeValue.value = props.time;
});

const rules = computed(() => ({
	timeValue: {
		requiredIfProp: helpers.withMessage(t("components.timePicker.validation.required"), requiredIf(props.required)),
		validDateFormat: helpers.withMessage(t("components.timePicker.validation.format"), isValidTimeFormat),
	},
}));

const v$ = useVuelidate(rules, { timeValue }, { $lazy: true });

const errorMessages = computedAsync(async () => await getErrorMessages(v$.value.timeValue.$errors), null);

const getErrorMessages = useDebounceFn((errors: ErrorObject[] | undefined) => {
	const messages = errors?.map((e: ErrorObject) => unref(e.$message));
	return messages;
}, 700);

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
</script>
