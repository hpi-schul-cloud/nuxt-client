<template>
	<v-row>
		<div>
			<v-icon :color="iconColor" class="icon">{{ mdiCalendarClock }} </v-icon>
		</div>
		<v-col class="col-sm-4">
			<date-picker
				required
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				@input="handleDateInput"
				@error="hasErrors = true"
			/>
		</v-col>
		<v-col class="col-sm-3">
			<time-picker
				required
				:time="time"
				:label="timeInputLabel"
				:aria-label="timeInputAriaLabel"
				@input="handleTimeInput"
				@error="hasErrors = true"
			/>
		</v-col>
	</v-row>
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
	emits: ["input"],
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
		});

		watch(selectedDateTime, (newDate, prevDate) => {
			if (newDate !== prevDate) {
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

		const hasErrors = ref(false);
		const iconColor = computed(() => {
			return hasErrors.value === true ? "error" : "";
		});

		return {
			mdiCalendarClock,
			selectedDateTime,
			date,
			time,
			handleDateInput,
			handleTimeInput,
			iconColor,
			hasErrors,
		};
	},
});
</script>

<style lang="scss" scoped>
.icon {
	top: 26px;
}
</style>
