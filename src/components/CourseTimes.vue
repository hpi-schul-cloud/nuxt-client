<template>
	<div class="root">
		<div v-for="(time, i) of value" :key="i" class="time-wrapper">
			<a style="cursor: pointer" class="icon-button" @click="popTime(time)">
				<base-icon icon="trash" />
			</a>
			<base-select
				:value.sync="time.weekday"
				:options="weekdays"
				:allow-empty="false"
				label="name"
				input-label="Tag"
				class="item"
				@update:value="timeUpdate"
			></base-select>
			<base-input
				v-model="time.room"
				label="Raum"
				name="room"
				type="text"
				class="item"
				@update="timeUpdate"
			/>
			<base-input
				v-model="time.startTime"
				label="Start"
				name="startTime"
				type="time"
				class="item"
				@update="timeUpdate"
			/>
			<base-input
				v-model="time.duration"
				label="Dauer"
				name="duration"
				type="text"
				class="item"
				@update="timeUpdate"
			/>
		</div>
		<base-button type="button" class="btn btn-primary" @click="addTime">
			Schulstundentermin im Stundenplan anlegen
		</base-button>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			weekdays: [
				{ value: 0, name: "Montag" },
				{ value: 1, name: "Dienstag" },
				{ value: 2, name: "Mittwoch" },
				{ value: 3, name: "Donnerstag" },
				{ value: 4, name: "Freitag" },
				{ value: 5, name: "Samstag" },
				{ value: 6, name: "Sonntag" },
			],
		};
	},
	computed: {
		weekdayOptions() {
			return this.weekdays.map((weekday) => ({
				value: weekday.value,
				label: weekday.name,
			}));
		},
	},
	methods: {
		addTime() {
			this.value.push({
				weekday: this.weekdays[0],
				startTime: "08:00",
				duration: "60",
				room: "H1",
			});
		},
		popTime(t) {
			this.value.pop(t);
		},
		timeUpdate() {
			// TODO
			//console.log("update time");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.icon-button {
	padding-right: 10px;
}
.item {
	padding: 0 2px;
}
</style>
