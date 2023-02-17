<template>
	<v-menu
		v-model="showTimeDialog"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		min-width="85"
		@input="onMenuToggle"
	>
		<template #activator="{ on, attrs }">
			<v-text-field
				v-model="inputTime"
				data-testid="time-input"
				placeholder="HH:MM"
				:label="label"
				:aria-label="ariaLabel"
				:append-icon="mdiClockOutline"
				:errors="errors.length > 0"
				:error-messages="errors"
				v-bind="attrs"
				v-on="on"
				@input="onInput"
				@keydown.prevent.space="showTimeDialog = true"
				@keydown.prevent.enter="showTimeDialog = true"
				@focus="resetErrors"
			/>
		</template>
		<v-list height="200" class="col-12 pt-1 px-0">
			<v-list-item-group v-model="selectedTime" color="primary">
				<div
					v-for="(timeOfDay, index) in timesOfDayList"
					:key="`time-select-${index}`"
					:data-testid="`time-select-${index}`"
				>
					<v-list-item class="time-list-item" @click="selectTime(timeOfDay)">
						<v-list-item-title>{{ timeOfDay }}</v-list-item-title>
					</v-list-item>
					<v-divider v-if="index < timesOfDayList.length - 1" />
				</div>
			</v-list-item-group>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import dayjs from "dayjs";
import { mdiClockOutline } from "@mdi/js";

// TODO - validation (numbers, colon)
export default defineComponent({
	name: "TimePicker",
	props: {
		time: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, default: "" },
		required: { type: Boolean },
	},
	setup(props, { emit }) {
		const timesOfDayList = computed(() => {
			const times = [];

			for (let hour = 0; hour < 24; hour++) {
				times.push(dayjs().hour(hour).minute(0).format("HH:mm"));
				times.push(dayjs().hour(hour).minute(30).format("HH:mm"));
			}

			return times;
		});

		const inputTime = ref(props.time);
		const showTimeDialog = ref(false);
		const selectedTime = ref(null);

		const selectTime = (selected: string) => {
			inputTime.value = selected;
			showTimeDialog.value = false;

			emit("input", inputTime.value);
		};

		let inputTimeout: number | null = null;
		const onInput = (input: string) => {
			if (inputTimeout) clearTimeout(inputTimeout);

			inputTime.value = input;
			showTimeDialog.value = false;

			const validated = validate(inputTime.value);
			inputTimeout = setTimeout(() => {
				if (validated) {
					emit("input", inputTime.value);
				}
			}, 1000);
		};

		const onMenuToggle = (menuOpen: boolean) => {
			if (menuOpen === false) {
				validate(inputTime.value);
			}
		};

		const errors = ref<string[]>([]);
		const validate = (timeValue: string) => {
			resetErrors();

			if (!props.required) {
				return true;
			}
			// is empty
			if (timeValue === "") {
				errors.value.push("required");
				return false;
			}

			// fits hh:mm format
			const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/g;
			const found = timeValue.match(regex);
			if (!found) {
				errors.value.push("please enter proper time format like 08:36");
				return false;
			}

			return true;
		};

		const resetErrors = () => {
			errors.value = [];
		};

		watch(
			() => props.time,
			(newValue) => {
				inputTime.value = newValue;
			}
		);

		return {
			mdiClockOutline,
			showTimeDialog,
			timesOfDayList,
			inputTime,
			selectedTime,
			selectTime,
			onInput,
			onMenuToggle,
			validate,
			errors,
			resetErrors,
		};
	},
});
</script>

<style lang="scss" scoped>
::v-deep .v-input__icon--append .v-icon {
	width: 20px;
	height: 20px;
}

.time-list-item {
	min-height: 36px;
	text-align: center;
	letter-spacing: $btn-letter-spacing;
}
</style>
