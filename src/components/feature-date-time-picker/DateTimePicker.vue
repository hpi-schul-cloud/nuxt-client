<template>
	<div class="d-flex flex-row">
		<date-picker
			class="mr-2 picker-width"
			:required="dateRequired"
			:date="date"
			:label="dateInputLabel"
			:aria-label="dateInputAriaLabel"
			:minDate="minDate"
			:maxDate="maxDate"
			:date-time-in-past="dateTimeInPast"
			@update:date="onDateUpdate"
		/>
		<time-picker
			class="picker-width"
			:time="time"
			:label="timeInputLabel"
			:aria-label="timeInputAriaLabel"
			@update:time="onTimeUpdate"
		/>
	</div>
</template>

<script lang="ts">
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";
import { useVModel } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
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
	},
	emits: ["input"],
	setup(props, { emit }) {
		const { locale } = useI18n();

		const dateTimeInPast = ref(false);

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
		const dateRequired = computed(() => time.value !== "");

		const emitDateTime = () => {
			if (date.value === "") {
				return;
			}

			let timeValue = time.value;
			if (timeValue === "") {
				timeValue = "23:59";
			}

			const dateTime = new Date(date.value);
			const hoursAndMinutes = timeValue.split(":");
			dateTime.setHours(
				parseInt(hoursAndMinutes[0]),
				parseInt(hoursAndMinutes[1])
			);
			dateTimeInPast.value = dateTime < new Date();
			emit("input", dateTime.toISOString());
		};

		const onDateUpdate = (newDate: string) => {
			date.value = newDate;
			emitDateTime();
		};

		const onTimeUpdate = (newTime: string) => {
			time.value = newTime;
			emitDateTime();
		};

		return {
			date,
			time,
			onDateUpdate,
			onTimeUpdate,
			dateRequired,
			dateTimeInPast,
		};
	},
});
</script>

<style lang="scss" scoped>
.picker-width {
	width: 225px;
}
</style>
