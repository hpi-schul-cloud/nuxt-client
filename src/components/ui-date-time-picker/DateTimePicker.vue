<template>
	<div class="wrapper">
		<div class="d-flex flex-row">
			<date-picker
				class="mr-2 picker-width"
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				:minDate="minDate"
				:maxDate="maxDate"
				required
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
			<span v-if="message" class="v-messages theme--light message">
				{{ message }}
			</span>
		</v-slide-y-transition>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import { isDateTimeInPast, DATETIME_FORMAT } from "@/plugins/datetime";
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";

const props = defineProps({
	dateTime: {
		type: String,
		default: "",
	},
	dateInputLabel: { type: String, default: "" },
	dateInputAriaLabel: { type: String, default: "" },
	timeInputLabel: { type: String, default: "" },
	timeInputAriaLabel: { type: String, default: "" },
	minDate: { type: String },
	maxDate: { type: String },
});
const emit = defineEmits(["input"]);

const { locale, t } = useI18n();

const getDate = (dateIsoString: string) => {
	if (!dateIsoString) {
		return "";
	}

	return dateIsoString;
};

const getTime = (dateIsoString: string) => {
	if (!dateIsoString) {
		return "";
	}
	return new Date(dateIsoString).toLocaleTimeString(locale.value, {
		timeStyle: "short",
		hourCycle: "h23",
	});
};

const dateTime = useVModel(props, "dateTime");
const date = ref(getDate(dateTime.value));
const time = ref(getTime(dateTime.value));
const dateRequired = computed(() => time.value !== "");
const dateTimeInPast = ref(dateTime.value && isDateTimeInPast(dateTime.value));

const emitDateTime = () => {
	if (date.value === "" && time.value === "") {
		dateTimeInPast.value = false;
		emit("input", null);
		return;
	}

	if (date.value === "" && dateRequired.value) {
		return;
	}

	const timeValue = time.value || "23:59";
	const dateTime = new Date(date.value);
	const hoursAndMinutes = timeValue.split(":");

	dateTime.setHours(parseInt(hoursAndMinutes[0]), parseInt(hoursAndMinutes[1]));
	dateTimeInPast.value = isDateTimeInPast(dateTime);
	emit("input", dateTime.toISOString());
};

const errors = ref<Array<string>>([]);
const message = computed(() => {
	if (errors.value.length > 0) return "";

	if (dateRequired.value && !date.value) {
		return t("components.datePicker.validation.required");
	}

	if (dateTimeInPast.value) {
		return t("components.datePicker.messages.future");
	}

	return "";
});

const onError = (errorOrigin: string) => {
	if (errors.value.indexOf(errorOrigin) === -1) {
		errors.value.push(errorOrigin);
	}
};

const onDateUpdate = (newDate: string) => {
	date.value = newDate;
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
	width: 225px;
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
