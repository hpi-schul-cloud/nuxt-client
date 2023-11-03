<template>
	<div class="wrapper">
		<div class="d-flex flex-row">
			<date-picker
				class="mr-2 picker-width"
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				:minDate="minDate"
				:maxDate="maxDate"
				@update:date="onDateUpdate"
				@error="onError('date')"
			/>
			<time-picker
				class="picker-width"
				:time="time"
				:label="timeInputLabel"
				:aria-label="timeInputAriaLabel"
				@update:time="onTimeUpdate"
				@error="onError('time')"
			/>
		</div>
		<v-slide-y-transition>
			<span v-if="message" class="v-messages theme--light message">
				{{ message }}
			</span>
		</v-slide-y-transition>
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
		const { locale, t } = useI18n();

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
		const dateTimeInPast = ref(
			dateTime.value && new Date(dateTime.value) < new Date()
		);
		const date = ref(
			dateTime.value ? dayjs(dateTime.value).format("YYYY-MM-DD") : ""
		);
		const time = ref(dateTime.value ? getTime(dateTime.value) : "");
		const dateRequired = computed(() => time.value !== "");

		const emitDateTime = () => {
			if (date.value === "" && dateRequired.value) {
				return;
			}

			let timeValue = time.value;
			if (timeValue === "" && date.value) {
				timeValue = "23:59";
			}

			if (date.value === "" && timeValue === "") {
				dateTimeInPast.value = false;
				emit("input", null);
				return;
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

		const errors = ref<Array<string>>([]);
		const message = computed(() => {
			if (errors.value.length > 0) return "";

			if (dateRequired.value && !date.value) {
				return t("components.datePicker.validation.required");
			}

			if (dateTimeInPast.value) {
				return t("components.datePicker.messages.future");
			}

			return "";
		});

		const onError = (errorOrigin: string) => {
			if (errors.value.indexOf(errorOrigin) === -1) {
				errors.value.push(errorOrigin);
			}
		};

		const onDateUpdate = (newDate: string) => {
			date.value = newDate;
			errors.value = errors.value.filter((item) => item !== "date");

			emitDateTime();
		};

		const onTimeUpdate = (newTime: string) => {
			time.value = newTime;
			errors.value = errors.value.filter((item) => item !== "time");
			emitDateTime();
		};

		return {
			date,
			time,
			onDateUpdate,
			onTimeUpdate,
			dateRequired,
			message,
			errors,
			onError,
		};
	},
});
</script>

<style lang="scss" scoped>
.picker-width {
	width: 225px;
}

.wrapper {
	position: relative;
}

.message {
	line-height: 14px;
	position: absolute;
	bottom: 0px;
}
</style>
