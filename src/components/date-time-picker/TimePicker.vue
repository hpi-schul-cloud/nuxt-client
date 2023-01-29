<template>
	<v-menu
		v-model="showTimeDialog"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		min-width="100"
	>
		<template #activator="{ on, attrs }">
			<v-text-field
				v-model="time"
				placeholder="--:--"
				:label="label"
				:aria-label="ariaLabel"
				:append-icon="mdiClockOutline"
				v-bind="attrs"
				v-on="on"
				@input="onInput"
			/>
		</template>
		<v-list height="200" class="col-12">
			<v-list-item-group v-model="selectedTime" color="primary">
				<v-list-item
					v-for="(time, index) in timesOfDayList"
					:key="index"
					class="time-list-item"
					@click="selectTime(time)"
				>
					<v-list-item-title>{{ time }}</v-list-item-title>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import dayjs from "dayjs";
import { mdiClockOutline } from "@mdi/js";

export default defineComponent({
	name: "TimePicker",
	props: {
		// date: { type: String, required: true },
		label: { type: String, default: "" },
		ariaLabel: { type: String, required: true },
	},
	setup(props, { emit }) {
		const time = ref("");
		const showTimeDialog = ref(false);
		const selectedTime = ref(null);

		const timesOfDayList = computed(() => {
			const times = [];

			for (let hour = 0; hour < 24; hour++) {
				times.push(dayjs().hour(hour).minute(0).format("HH:mm"));
				times.push(dayjs().hour(hour).minute(30).format("HH:mm"));
			}

			return times;
		});

		const selectTime = (selected: string) => {
			time.value = selected;
			showTimeDialog.value = false;
			emit("input", time.value);
		};

		const onInput = (inputTime: string) => {
			time.value = inputTime;
			emit("input", time.value);
		};

		return {
			showTimeDialog,
			time,
			timesOfDayList,
			selectedTime,
			selectTime,
			mdiClockOutline,
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
