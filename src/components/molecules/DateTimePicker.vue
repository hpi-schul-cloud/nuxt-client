<template>
	<v-row>
		<v-col v-if="enableDatePicker" class="col-3">
			<v-menu
				v-model="showDatePicker"
				:close-on-content-click="false"
				:nudge-right="40"
				transition="scale-transition"
				offset-y
				min-width="auto"
			>
				<template #activator="{ on, attrs }">
					<v-text-field
						:value="formattedDate"
						label="Zu erledigen bis"
						:append-icon="mdiCalendar"
						readonly
						v-bind="attrs"
						v-on="on"
					></v-text-field>
				</template>
				<v-date-picker
					v-model="date"
					no-title
					color="primary"
					@input="showDatePicker = false"
				></v-date-picker>
			</v-menu>
		</v-col>
		<v-col v-if="enableTimePicker" class="col-2">
			<v-menu
				v-model="showTimePicker"
				:close-on-content-click="false"
				:nudge-right="40"
				transition="scale-transition"
				offset-y
				min-width="auto"
			>
				<template #activator="{ on, attrs }">
					<v-text-field v-model="time" type="time" v-bind="attrs" v-on="on" />
				</template>
				<v-list height="200">
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
import VueI18n from "vue-i18n";
import {
	defineComponent,
	inject,
	ref,
	computed,
	watch,
} from "@vue/composition-api";
import moment from "moment";
import { mdiCalendar } from "@mdi/js";
export default defineComponent({
	name: "DateTimePicker",
	props: {
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
		// date: {
		// 	type: string,
		// 	default: "",
		// },
		// time: {
		// 	type: string,
		// 	default: "",
		// },
	},
	emits: ["updateDateTime"],
	setup(props, context) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		const date = ref("");
		const time = ref("");
		const showDatePicker = ref(false);
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

		const formattedDate = computed(() => {
			return date.value ? moment(date.value).format(i18n.t("format.date")) : "";
		});

		const selectTime = (selectedTime: string) => {
			time.value = selectedTime;
			showTimePicker.value = false;
		};

		const dateTime = computed(() => {
			return date.value + " " + time.value;
		});

		watch(dateTime, () => {
			context.emit("update-date-time", dateTime.value);
		});

		return {
			mdiCalendar,
			showDatePicker,
			showTimePicker,
			date,
			formattedDate,
			time,
			timesOfDayList,
			selectedItem,
			selectTime,
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
	min-height: 24px;
}
</style>
