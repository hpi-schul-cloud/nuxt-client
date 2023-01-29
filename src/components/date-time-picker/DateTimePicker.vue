<template>
	<v-row>
		<v-col class="col-sm-4">
			<date-picker
				:date="date"
				:label="dateInputLabel"
				:aria-label="dateInputAriaLabel"
				@input="handleInput"
			/>
		</v-col>
		<v-col v-if="enableTimePicker" class="col-sm-3">
			<v-menu
				v-model="showTimePicker"
				:close-on-content-click="false"
				transition="scale-transition"
				offset-y
				min-width="100"
			>
				<template #activator="{ on, attrs }">
					<v-text-field v-model="time" type="time" v-bind="attrs" v-on="on" />
				</template>
				<v-list height="200" class="col-12">
					<v-list-item-group v-model="selectedItem" color="primary">
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
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import moment from "moment";
import DatePicker from "@/components/date-time-picker/DatePicker.vue";

export default defineComponent({
	name: "DateTimePicker",
	components: {
		DatePicker,
	},
	props: {
		dateInputLabel: { type: String, default: "" },
		dateInputAriaLabel: { type: String, default: "" },
		// required: {
		// 	type: Boolean,
		// },
		// TODO - make either or required
		enableDatePicker: {
			type: Boolean,
		},
		enableTimePicker: {
			type: Boolean,
		},
		date: {
			type: String,
			required: true,
		},
		// time: {
		// 	type: string,
		// 	default: "",
		// },
	},
	emits: ["updateDateTime"],
	setup(props, { emit }) {
		const time = ref("");
		const showTimePicker = ref(false);
		const selectedItem = ref(null);

		const timesOfDayList = computed(() => {
			const times = [];

			for (let hour = 0; hour < 24; hour++) {
				times.push(moment({ hour }).format("HH:mm"));
				times.push(
					moment({
						hour,
						minute: 30,
					}).format("HH:mm")
				);
			}

			return times;
		});

		const selectTime = (selectedTime: string) => {
			time.value = selectedTime;
			showTimePicker.value = false;
		};

		const dateTime = computed(() => {
			return props.date + " " + time.value;
		});

		watch(dateTime, () => {
			emit("update-date-time", dateTime.value);
		});

		const handleInput = (selectedDate: string) => {
			console.log("dt", selectedDate);
			emit("date-input", selectedDate);
		};

		return {
			showTimePicker,
			time,
			timesOfDayList,
			selectedItem,
			selectTime,
			handleInput,
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
