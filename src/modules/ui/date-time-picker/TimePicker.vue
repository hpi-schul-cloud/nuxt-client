<template>
	<div>
		<VTextField
			ref="time-text-field"
			v-model="timeValue"
			v-time-input-mask
			data-testid="time-input"
			:prepend-inner-icon="mdiClockOutline"
			:label="label"
			:aria-label="ariaLabel"
			placeholder="HH:MM"
			:rules="validationRules"
			@update:model-value="validate"
			@keydown.up.down.stop
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiClockOutline } from "@icons/material";
import { timeInputMask as vTimeInputMask } from "@util-input-masks";
import { isRequired, isValidTimeFormat } from "@util-validators";
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	time: { type: String, required: true },
	label: { type: String, default: "" },
	ariaLabel: { type: String, default: "" },
	required: { type: Boolean },
});

const emit = defineEmits<{
	(e: "update:time", value: string | undefined): void;
	(e: "error"): void;
}>();

const { t } = useI18n();

const timeValue = ref<string>();
const timeTextField = useTemplateRef("time-text-field");

watchEffect(() => {
	timeValue.value = props.time;
});

const validationRules = computed(() => [
	props.required ? isRequired(t("components.timePicker.validation.required")) : true,
	isValidTimeFormat(),
]);

const validate = async () => {
	if (timeTextField.value === null) return;

	await timeTextField.value.validate();
	const isValid = timeTextField.value.isValid;

	if (isValid) {
		emit("update:time", timeValue.value);
	} else {
		emit("error");
	}
};
</script>
