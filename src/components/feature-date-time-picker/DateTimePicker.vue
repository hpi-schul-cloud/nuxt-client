<template>
	<div class="d-flex flex-row">
		<date-picker
			class="mr-2 picker-width"
			:required="required"
			:date="date"
			:label="dateInputLabel"
			:aria-label="dateInputAriaLabel"
			:minDate="minDate"
			:maxDate="maxDate"
			@input="handleDateInput"
			@error="handleDateError"
			@valid="handleDateValid"
		/>
		<time-picker
			class="picker-width"
			:required="required"
			:time="time"
			:label="timeInputLabel"
			:aria-label="timeInputAriaLabel"
			:allow-past="allowPast || !dateIsToday"
			@update:time="handleTimeInput"
			@error="handleTimeError"
			@valid="handleTimeValid"
		/>
	</div>
</template>

<script lang="ts">
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";
import { useVModel } from "@vueuse/core";
import { isToday } from "@/plugins/datetime";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { computed, defineComponent, ref } from "vue";
import dayjs from "dayjs";

export default defineComponent({
	name: "DateTimePicker",
	components: {
		DatePicker,
		TimePicker,
	},
	props: {
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
		required: {
			type: Boolean,
		},
		allowPast: { type: Boolean },
	},
	emits: ["input"],
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);
		const locale = i18n.locale;

		const getTime = (dateIsoString: string) => {
			if (dateIsoString === "") {
				return "";
			}
			return new Date(dateIsoString).toLocaleTimeString(locale, {
				timeStyle: "short",
				hourCycle: "h23",
			});
		};

		const dateTime = useVModel(props, "dateTime");
		const date = ref(
			dateTime.value ? dayjs(dateTime.value).format("YYYY-MM-DD") : ""
		);
		const time = ref(dateTime.value ? getTime(dateTime.value) : "");
		const dateError = ref(false);
		const timeError = ref(false);
		const dateIsToday = ref(isToday(date.value));

		const emitDateTime = () => {
			if (date.value !== "" && time.value !== "") {
				const dateTime = new Date(date.value);
				const hoursAndMinutes = time.value.split(":");
				dateTime.setHours(
					parseInt(hoursAndMinutes[0]),
					parseInt(hoursAndMinutes[1])
				);
				emit("input", dateTime.toISOString());
			}
		};

		const handleDateInput = (newDate: string) => {
			date.value = newDate;
			dateIsToday.value = isToday(date.value);
			if (valid.value) {
				emitDateTime();
			}
		};

		const handleDateError = () => {
			dateError.value = true;
		};

		const handleDateValid = () => {
			dateError.value = false;
		};

		const handleTimeInput = (newTime: string) => {
			time.value = newTime;
			if (valid.value) {
				emitDateTime();
			}
		};

		const handleTimeError = () => {
			timeError.value = true;
		};

		const handleTimeValid = () => {
			timeError.value = false;
		};

		const valid = computed(() => !dateError.value && !timeError.value);

		return {
			date,
			time,
			dateIsToday,
			handleDateInput,
			handleDateError,
			handleDateValid,
			handleTimeInput,
			handleTimeError,
			handleTimeValid,
		};
	},
});
</script>

<style lang="scss" scoped>
.picker-width {
	width: 225px;
}
</style>
