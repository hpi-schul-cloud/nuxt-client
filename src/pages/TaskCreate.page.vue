<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Create Task"
	>
		<v-form>
			<v-text-field v-model="name" :label="$t('common.labels.title')" />
			<v-textarea
				v-model="description"
				:label="$t('common.labels.description')"
			/>
			<v-row>
				<v-col class="col-3">
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
							v-model="dueDate"
							no-title
							color="primary"
							@input="showDatePicker = false"
						></v-date-picker>
					</v-menu>
				</v-col>
				<v-col class="col-2">
					<v-menu
						v-model="showTimePicker"
						:close-on-content-click="false"
						:nudge-right="40"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template #activator="{ on, attrs }">
							<v-text-field
								v-model="dueTime"
								type="time"
								v-bind="attrs"
								v-on="on"
							/>
						</template>
						<v-list height="200">
							<v-list-item-group v-model="selectedTime" color="primary">
								<template v-for="(time, index) in timesOfDayList">
									<v-list-item
										:key="index"
										class="time-list-item"
										@click="selectTime(time)"
									>
										<v-list-item-title>{{ time }}</v-list-item-title>
									</v-list-item>
								</template>
							</v-list-item-group>
						</v-list>
					</v-menu>
				</v-col>
			</v-row>
			<v-btn color="secondary" outlined @click="cancel">
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn class="float-right" color="primary" depressed @click="save">
				{{ $t("common.actions.save") }}
			</v-btn>
		</v-form>
	</default-wireframe>
</template>

<script>
import { inject, ref, onBeforeMount, computed } from "@vue/composition-api";
import moment from "moment";
import { taskModule, authModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import { mdiCalendar } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default {
	name: "TaskCreatePage",
	components: { DefaultWireframe },
	setup(props, context) {
		const router = context.root.$router;

		onBeforeMount(() => {
			if (
				!authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
				router.go(-1);
			}
		});

		const i18n = inject("i18n");
		const name = ref("");
		const description = ref("");
		const dueDate = ref("");
		const dueTime = ref("");
		const showDatePicker = ref(false);
		const showTimePicker = ref(false);
		const selectedTime = ref(null);

		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

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
		console.log(timesOfDayList);

		const formattedDate = computed(() => {
			return dueDate.value
				? moment(dueDate.value).format(i18n.t("format.date"))
				: "";
		});

		const selectTime = (time) => {
			dueTime.value = time;
			showTimePicker.value = false;
		};

		const save = async () => {
			const dueDateTime = dueDate.value + " " + dueTime.value;
			await taskModule.createTask({
				name: name.value,
				description: description.value,
				dueDate: dueDateTime,
			});

			//router.go(-1);
		};

		const cancel = () => {
			router.go(-1);
		};

		return {
			mdiCalendar,
			formattedDate,
			breadcrumbs,
			name,
			description,
			dueDate,
			dueTime,
			showDatePicker,
			showTimePicker,
			timesOfDayList,
			selectedTime,
			selectTime,
			save,
			cancel,
		};
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
};
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
