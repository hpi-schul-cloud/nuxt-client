<template>
	<v-row>
		<v-col class="col-sm-4">
			<date-picker
				:date="dateTime"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				@input="handleDateInput"
			/>
		</v-col>
		<v-col class="col-sm-3">
			<time-picker
				:label="timeInputLabel"
				:aria-label="timeInputAriaLabel"
				@input="handleTimeInput"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import DatePicker from "@/components/date-time-picker/DatePicker.vue";
import TimePicker from "@/components/date-time-picker/TimePicker.vue";

export default defineComponent({
	name: "DateTimePicker",
	components: {
		DatePicker,
		TimePicker,
	},
	props: {
		dateInputLabel: { type: String, default: "" },
		dateInputAriaLabel: { type: String, default: "" },
		timeInputLabel: { type: String, default: "" },
		timeInputAriaLabel: { type: String, default: "" },
		// required: {
		// 	type: Boolean,
		// },
		date: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			default: "",
		},
	},
	emits: ["updateDateTime"],
	setup(props, { emit }) {
		watch(
			() => props.date,
			(newValue) => {
				dateTime.value = newValue;
			}
		);

		const dateTime = ref(props.date);

		const handleDateInput = (selectedDate: string) => {
			emit("date-input", selectedDate);
		};
		const handleTimeInput = (selectedTime: string) => {
			// emit("date-input", selectedTime);
			console.log("blub", selectedTime);
		};

		const dateTsime = computed(() => {
			return props.date + " " + props.time;
		});

		watch(dateTsime, () => {
			emit("update-date-time", dateTsime.value);
		});

		return {
			dateTime,
			handleDateInput,
			handleTimeInput,
		};
	},
});
</script>
