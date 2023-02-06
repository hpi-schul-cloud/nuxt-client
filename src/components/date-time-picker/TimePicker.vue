<template>
	<v-menu
		v-model="showTimeDialog"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		min-width="85"
	>
		<template #activator="{ on, attrs }">
			<v-text-field
				v-model="inputTime"
				data-testid="time-input"
				placeholder="--:--"
				:label="label"
				:aria-label="ariaLabel"
				:append-icon="mdiClockOutline"
				v-bind="attrs"
				v-on="on"
				@input="onInput"
				@keydown.prevent.space="showTimeDialog = true"
				@keydown.prevent.enter="showTimeDialog = true"
			/>
		</template>
		<v-list height="200" class="col-12 pt-1">
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
		ariaLabel: { type: String, required: true },
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

		const onInput = (input: string) => {
			inputTime.value = input;
			showTimeDialog.value = false;
			emit("input", inputTime.value);
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
