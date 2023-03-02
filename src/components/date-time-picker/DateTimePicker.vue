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
			@input="handleDateInput"
			@error="dateError = true"
		/>
		<time-picker
			required
			:time="time"
			:label="timeInputLabel"
			:aria-label="timeInputAriaLabel"
			@input="handleTimeInput"
			@error="timeError = true"
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
		dateTime: {
			type: String,
			required: true,
		},
		defaultDate: {
			type: String,
			default: new Date().toISOString(),
		},
		dateInputLabel: { type: String, default: "" },
		dateInputAriaLabel: { type: String, default: "" },
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

		const setDateTime = (s: string) => {
			date.value = s;
			time.value = new Date(s).toLocaleTimeString(locale, {
				timeStyle: "short",
				hourCycle: "h23",
			});
		};
		setDateTime(props.dateTime || props.defaultDate);

		watch(
			() => props.dateTime,
			(newDateTime) => {
				setDateTime(newDateTime);
			}
		);

		// watch([date, time], ([newDate, newTime], [prevDate, prevTime]) => {
		// 	if (newDate !== prevDate) {
		// 		selectedDateTime.value = new Date(newDate);
		// 		if (newTime !== "") {
		// 			const hoursAndMinutes = newTime.split(":");
		// 			selectedDateTime.value.setHours(
		// 				parseInt(hoursAndMinutes[0]),
		// 				parseInt(hoursAndMinutes[1])
		// 			);
		// 		}
		// 	}

		// 	if (newTime !== prevTime) {
		// 		const hoursAndMinutes = newTime.split(":");
		// 		selectedDateTime.value.setHours(
		// 			parseInt(hoursAndMinutes[0]),
		// 			parseInt(hoursAndMinutes[1])
		// 		);

		// 		date.value = selectedDateTime.value.toISOString();
		// 	}
		// });

		// watch(selectedDateTime, (newDateTime, prevDateTime) => {
		// 	if (newDateTime !== prevDateTime) {
		// 		hasErrors.value = false;
		// 		emit("input", selectedDateTime.value.toISOString());
		// 	}
		// });

		const generateDateTime = () => {
			const d = new Date(date.value);
			const hoursAndMinutes = time.value.split(":");
			d.setHours(parseInt(hoursAndMinutes[0]), parseInt("12"));
			// console.log(d.toISOString());
			emit("input", d.toISOString());
		};

		const handleDateInput = (newDate: string) => {
			dateError.value = false;
			date.value = newDate;
			if (!dateError.value && !timeError.value) {
				generateDateTime();
			}
		};

		const handleTimeInput = (newTime: string) => {
			timeError.value = false;
			time.value = newTime;
			if (!dateError.value && !timeError.value) {
				generateDateTime();
			}
		};

		const iconColor = computed(() => {
			return dateError.value || timeError.value ? "error" : "";
		});

		return {
			mdiCalendarClock,
			date,
			time,
			handleDateInput,
			handleTimeInput,
			iconColor,
			dateError,
			timeError,
		};
	},
});
</script>

<style lang="scss" scoped>
.icon {
	top: 18px;
}
</style>
