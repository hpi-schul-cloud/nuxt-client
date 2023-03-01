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
			@error="hasErrors = true"
		/>
		<time-picker
			required
			:time="time"
			:label="timeInputLabel"
			:aria-label="timeInputAriaLabel"
			@input="handleTimeInput"
			@error="onError"
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

		const initDate = props.dateTime || props.defaultDate;
		const selectedDateTime = ref(new Date(initDate));
		const date = ref("");
		const time = ref("");
		const hasErrors = ref(false);

		watch(
			() => props.dateTime,
			(newValue) => {
				selectedDateTime.value = new Date(newValue);
				date.value = newValue;
				time.value = new Date(newValue).toLocaleTimeString(locale, {
					timeStyle: "short",
					hourCycle: "h23",
				});
			}
		);

		watch([date, time], ([newDate, newTime], [prevDate, prevTime]) => {
			if (newDate !== prevDate) {
				selectedDateTime.value = new Date(newDate);
				if (newTime !== "") {
					const hoursAndMinutes = newTime.split(":");
					selectedDateTime.value.setHours(
						parseInt(hoursAndMinutes[0]),
						parseInt(hoursAndMinutes[1])
					);
				}
			}

			if (newTime !== prevTime) {
				const hoursAndMinutes = newTime.split(":");
				selectedDateTime.value.setHours(
					parseInt(hoursAndMinutes[0]),
					parseInt(hoursAndMinutes[1])
				);

				date.value = selectedDateTime.value.toISOString();
			}

			if (newDate !== "" && newTime !== "") {
				emit("input", selectedDateTime.value.toISOString());
			}
		});

		const handleDateInput = (selectedDate: string) => {
			hasErrors.value = false;
			date.value = selectedDate;
		};

		const handleTimeInput = (selectedTime: string) => {
			hasErrors.value = false;
			time.value = selectedTime;
		};

		const iconColor = computed(() => {
			return hasErrors.value === true ? "error" : "";
		});

		const onError = () => {
			hasErrors.value = true;
			emit("error");
		};

		return {
			mdiCalendarClock,
			selectedDateTime,
			date,
			time,
			handleDateInput,
			handleTimeInput,
			iconColor,
			hasErrors,
			onError,
		};
	},
});
</script>

<style lang="scss" scoped>
.icon {
	top: 18px;
}
</style>
