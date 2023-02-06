<template>
	<v-row>
		<v-col class="col-sm-4">
			<date-picker
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				@input="handleDateInput"
			/>
		</v-col>
		<v-col class="col-sm-3">
			<time-picker
				:time="time"
				:label="timeInputLabel"
				:aria-label="timeInputAriaLabel"
				@input="handleTimeInput"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from "@vue/composition-api";
import VueI18n from "vue-i18n";
// import dayjs from "dayjs";
import DatePicker from "@/components/date-time-picker/DatePicker.vue";
import TimePicker from "@/components/date-time-picker/TimePicker.vue";

export default defineComponent({
	name: "DateTimePicker",
	components: {
		DatePicker,
		TimePicker,
	},
	props: {
		// dateTime: {
		// 	type: String,
		// 	required: true,
		// },
		dateInputLabel: { type: String, default: "" },
		dateInputAriaLabel: { type: String, default: "" },
		timeInputLabel: { type: String, default: "" },
		timeInputAriaLabel: { type: String, default: "" },
		// required: {
		// 	type: Boolean,
		// },
	},
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		// const locale = (() => {
		// 	// TODO remove if language code for ukraine is fixed
		// 	if (i18n.locale === "ua") {
		// 		return "uk";
		// 	}

		// 	return i18n.locale;
		// })();
		// console.log(locale);

		// watch(
		// 	() => props.dateTime,
		// 	(newValue) => {
		// 		console.log(newValue, locale);
		// 		// dateTimes.value = newValue;
		// 		// date.value = newValue.substr(0, 10);
		// 		// time.value = new Date(newValue).toLocaleTimeString(locale, {
		// 		// 	timeStyle: "short",
		// 		// 	hour12: false,
		// 		// });
		// 		// console.log(time.value, date.value);
		// 	}
		// );

		// const dateTimes = ref(props.dateTime);
		const dateTimes = ref(new Date());
		const date = ref("");
		const time = ref("");

		watch([date, time], ([newDate, newTime], [prevDate, prevTime]) => {
			if (newDate !== prevDate) {
				dateTimes.value = new Date(newDate);
				if (newTime !== "") {
					const hoursAndMinutes = newTime.split(":");
					dateTimes.value.setHours(hoursAndMinutes[0], hoursAndMinutes[1]);
				}
			}

			if (newTime !== prevTime) {
				const hoursAndMinutes = newTime.split(":");
				dateTimes.value.setHours(hoursAndMinutes[0], hoursAndMinutes[1]);
				date.value = dateTimes.value.toISOString();
			}

			if (newDate !== "" && newTime !== "") {
				emit("input", dateTimes.value.toISOString());
			}
		});

		const handleDateInput = (selectedDate: string) => {
			console.log("dt", selectedDate);
			date.value = selectedDate;
		};

		const handleTimeInput = (selectedTime: string) => {
			console.log("blub", selectedTime);
			time.value = selectedTime;
		};

		return {
			dateTimes,
			date,
			time,
			handleDateInput,
			handleTimeInput,
		};
	},
});
</script>
