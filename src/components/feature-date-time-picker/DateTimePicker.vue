<template>
	<div>
		<div class="d-flex flex-row">
			<date-picker
				class="mr-2 picker-width"
				:required="dateRequired"
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				:minDate="minDate"
				:maxDate="maxDate"
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
		<div v-if="dateTimeInPast" class="date-hint">
			Das Datum liegt in der Vergangenheit
		</div>
	</div>
</template>

<script lang="ts">
import DatePicker from "./DatePicker.vue";
import TimePicker from "./TimePicker.vue";
import { useVModel } from "@vueuse/core";
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
		const dateTimeInPast = ref(false);
		const dateRequired = computed(() => time.value !== "");

		const emitDateTime = () => {
			let timeValue = time.value;
			if (timeValue === "") {
				timeValue = "23:59";
			}

			if (date.value !== "") {
				const dateTime = new Date(date.value);
				const hoursAndMinutes = timeValue.split(":");
				dateTime.setHours(
					parseInt(hoursAndMinutes[0]),
					parseInt(hoursAndMinutes[1])
				);
				emit("input", dateTime.toISOString());

				dateTimeInPast.value = dateTime < new Date();
			}
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
.date-hint {
	color: red;
	display: block;
}
</style>
