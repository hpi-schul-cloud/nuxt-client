<template>
	<div class="d-flex flex-row">
		<v-icon :color="iconColor" class="icon mr-2">
			{{ mdiCalendarClock }}
		</v-icon>
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
			@input="handleTimeInput"
			@error="handleTimeError"
			@valid="handleTimeValid"
		/>
	</div>
</template>

<script lang="ts">
import DatePicker from "@/components/common/date-time-picker/DatePicker.vue";
import TimePicker from "@/components/common/date-time-picker/TimePicker.vue";
import { isToday } from "@/plugins/datetime";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiCalendarClock } from "@mdi/js";
import { computed, defineComponent, ref } from "vue";

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
		minDate: { type: String },
		maxDate: { type: String },
		timeInputLabel: { type: String, default: "" },
		timeInputAriaLabel: { type: String, default: "" },
		required: {
			type: Boolean,
		},
		allowPast: { type: Boolean, default: false },
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

		const date = ref(props.dateTime);
		const time = ref(getTime(props.dateTime));
		const dateError = ref(false);
		const timeError = ref(false);
		const dateIsToday = ref(isToday(props.dateTime));

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

		const iconColor = computed(() => {
			return valid.value ? "" : "error";
		});

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
			iconColor,
			mdiCalendarClock,
		};
	},
});
</script>

<style lang="scss" scoped>
.icon {
	top: 18px;
}

.picker-width {
	width: 225px;
}
</style>
