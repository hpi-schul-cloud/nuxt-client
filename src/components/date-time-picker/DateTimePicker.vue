<template>
	<div class="d-flex flex-row">
		<v-icon :color="iconColor" class="icon mr-2">
			{{ mdiCalendarClock }}
		</v-icon>
		<date-picker
			class="mr-2"
			required
			:date="date"
			:label="dateInputLabel"
			:aria-label="dateInputAriaLabel"
			:minDate="minDate"
			:maxDate="maxDate"
			@input="handleDateInput"
			@error="handleDateError"
		/>
		<time-picker
			required
			:time="time"
			:label="timeInputLabel"
			:aria-label="timeInputAriaLabel"
			@input="handleTimeInput"
			@error="handleTimeError"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch, computed } from "vue";
import VueI18n from "vue-i18n";
import DatePicker from "@/components/date-time-picker/DatePicker.vue";
import TimePicker from "@/components/date-time-picker/TimePicker.vue";
import { mdiCalendarClock } from "@mdi/js";

export default defineComponent({
	name: "DateTimePicker",
	components: {
		DatePicker,
		TimePicker,
	},
	props: {
		// Refactor info (to be removed)
		// I didnt get what the second property with defaultDate was for
		// cant we have dateTime optional and have current date as default?
		dateTime: {
			type: String,
			default: new Date().toISOString(),
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
	},
	emits: ["input", "error"],
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const locale = (() => {
			// TODO remove if language code for ukraine is fixed
			if (i18n.locale === "ua") {
				return "uk";
			}

			return i18n.locale;
		})();

		const date = ref("");
		const time = ref("");
		const dateError = ref(false);
		const timeError = ref(false);

		const setDateTime = (dateIsoString: string) => {
			date.value = dateIsoString;
			time.value = new Date(dateIsoString).toLocaleTimeString(locale, {
				timeStyle: "short",
				hourCycle: "h23",
			});
		};

		setDateTime(props.dateTime);
		watch(
			() => props.dateTime,
			(newDateTime) => {
				setDateTime(newDateTime);
			}
		);

		const emitDateTime = () => {
			const dateTime = new Date(date.value);
			const hoursAndMinutes = time.value.split(":");
			dateTime.setHours(
				parseInt(hoursAndMinutes[0]),
				parseInt(hoursAndMinutes[1])
			);
			emit("input", dateTime.toISOString());
		};

		// Refactor info (to be removed)
		// instead of the watchers: we know that date or time has changed (and has no error)
		// when date or time emits input
		// so lets just emit input with new dateTime when both have no error / dateTime is valid
		const handleDateInput = (newDate: string) => {
			dateError.value = false;
			date.value = newDate;
			if (valid.value) {
				emitDateTime();
			}
		};

		const handleTimeInput = (newTime: string) => {
			timeError.value = false;
			time.value = newTime;
			if (valid.value) {
				emitDateTime();
			}
		};

		const handleDateError = () => {
			dateError.value = true;
			emit("error");
		};

		const handleTimeError = () => {
			timeError.value = true;
			emit("error");
		};

		const valid = computed(() => !dateError.value && !timeError.value);

		const iconColor = computed(() => {
			return valid.value ? "" : "error";
		});

		return {
			date,
			time,
			handleDateInput,
			handleTimeInput,
			handleDateError,
			handleTimeError,
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
</style>
