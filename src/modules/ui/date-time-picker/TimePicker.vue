<template>
	<VTextField
		ref="time-text-field"
		v-model="timeValue"
		v-maska="timeMask"
		data-testid="time-input"
		:prepend-inner-icon="mdiClockOutline"
		:label="label"
		:placeholder="timePlaceHolder"
		:rules="validationRules"
		@update:model-value="validate"
		@keydown.up.down.stop
	/>
</template>

<script setup lang="ts">
import { useLocalizedDateTime } from "@/composables/date-time.composables";
import { mdiClockOutline } from "@icons/material";
import { isRequired, isValidTime } from "@util-validators";
import { vMaska } from "maska/vue";
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	time: { type: String, default: "" },
	label: { type: String, default: "" },
	required: { type: Boolean },
});

const emit = defineEmits<{
	(e: "update:time", value: string | undefined): void;
}>();

const { t } = useI18n();
const { timeMask, timePlaceHolder } = useLocalizedDateTime();

const timeValue = ref<string>();
const timeTextField = useTemplateRef("time-text-field");

watchEffect(() => {
	timeValue.value = props.time;
});

const validationRules = computed(() => [
	props.required ? isRequired(t("components.timePicker.validation.required")) : true,
	isValidTime,
]);

const validate = async () => {
	if (timeTextField.value === null) return;

	await timeTextField.value.validate();
	const isValid = timeTextField.value.isValid;

	if (isValid) {
		emit("update:time", timeValue.value);
	}
};
</script>
