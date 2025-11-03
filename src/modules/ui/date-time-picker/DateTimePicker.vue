<template>
	<div class="wrapper">
		<div class="d-flex flex-row">
			<date-picker
				class="mr-4 picker-width"
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				:data-testid="dateInputTestId"
				:min-date="minDate"
				:max-date="maxDate"
				@update:date="onDateUpdate"
				@error="onError('date')"
			/>
			<time-picker
				class="picker-width"
				:time="time"
				:label="timeInputLabel"
				:aria-label="timeInputAriaLabel"
				@update:time="onTimeUpdate"
				@error="onError('time')"
			/>
		</div>
		<v-slide-y-transition>
			<span v-if="hintMessage" class="v-messages theme--light message">
				{{ hintMessage }}
			</span>
		</v-slide-y-transition>
	</div>
</template>

<script setup lang="ts">
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";
import { getTimeFromISOString, isDateTimeInPast } from "@/plugins/datetime";
import { useVModel, watchDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	dateTime: { type: String, default: undefined },
	dateInputLabel: { type: String, default: "" },
	dateInputAriaLabel: { type: String, default: "" },
	dateInputTestId: { type: String, default: "date-input" },
	timeInputLabel: { type: String, default: "" },
	timeInputAriaLabel: { type: String, default: "" },
	minDate: { type: String, default: undefined },
	maxDate: { type: String, default: undefined },
});
const { t } = useI18n();

const dateTime = useVModel(props, "dateTime");
const date = ref(dateTime.value ? dateTime.value : "");
const time = ref(getTimeFromISOString(dateTime.value));
const dateMissing = computed(() => time.value && !date.value);
const dateTimeInPast = computed(() => isDateTimeInPast(dateTime.value));
const errors = ref<Array<string>>([]);
const hintMessage = ref<string>(dateTimeInPast.value ? t("components.dateTimePicker.messages.dateInPast") : "");

const emitDateTime = () => {
	if (!date.value && !time.value) {
		dateTime.value = undefined;
		return;
	}

	if (dateMissing.value) {
		return;
	}

	const dateTimeObject = new Date(date.value);
	const timeValue = time.value || "23:59";
	const hoursAndMinutes = timeValue.split(":");

	dateTimeObject.setHours(parseInt(hoursAndMinutes[0]), parseInt(hoursAndMinutes[1]));
	dateTime.value = dateTimeObject.toISOString();
};

watchDebounced(
	[errors, () => dateMissing.value, () => dateTimeInPast],
	([newErrors, newDateMissing, newDateTimeInPast]) => {
		if (newErrors.length > 0) {
			hintMessage.value = "";
			return;
		}

		if (newDateTimeInPast.value) {
			hintMessage.value = t("components.dateTimePicker.messages.dateInPast");
			return;
		}

		if (newDateMissing) {
			hintMessage.value = t("components.dateTimePicker.messages.dateRequired");
			return;
		}

		hintMessage.value = "";
	},
	{ deep: true, debounce: 700 }
);

const onError = (errorOrigin: string) => {
	if (errors.value.indexOf(errorOrigin) === -1) {
		errors.value.push(errorOrigin);
	}
};

const onDateUpdate = (newDate: string | null) => {
	date.value = newDate ?? "";
	errors.value = errors.value.filter((item) => item !== "date");
	emitDateTime();
};

const onTimeUpdate = (newTime: string) => {
	time.value = newTime;
	errors.value = errors.value.filter((item) => item !== "time");
	emitDateTime();
};
</script>

<style lang="scss" scoped>
.picker-width {
	width: 131px;
}

.wrapper {
	position: relative;
}

.message {
	line-height: 14px;
	position: absolute;
	bottom: 0px;
}
</style>
