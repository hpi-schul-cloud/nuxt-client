<template>
	<div class="root">
		<div v-for="(time, i) of value" :key="i" class="time-wrapper">
			<base-button design="icon" class="btn-delete" @click="popTime(time)">
				<base-icon icon="delete" source="material" />
			</base-button>
			<base-select
				v-model="time.weekday"
				:options="weekdays"
				:allow-empty="false"
				label="Wochentag"
				class="item"
			/>
			<base-input
				v-model="time.room"
				label="Raum"
				name="room"
				type="text"
				class="item"
			/>
			<base-input
				v-model="time.startTime"
				label="Start"
				name="startTime"
				type="time"
				class="item"
			/>
			<base-input
				v-model="time.duration"
				label="Dauer"
				name="duration"
				type="text"
				class="item"
			/>
		</div>
		<base-button design="primary" @click="addTime">
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
				{ value: 0, label: "Montag" },
				{ value: 1, label: "Dienstag" },
				{ value: 2, label: "Mittwoch" },
				{ value: 3, label: "Donnerstag" },
				{ value: 4, label: "Freitag" },
				{ value: 5, label: "Samstag" },
				{ value: 6, label: "Sonntag" },
			],
		};
	},
	methods: {
		addTime() {
			this.value.push({
				weekday: this.weekdays[0].value,
				startTime: "08:00",
				duration: 60,
				room: "H1",
			});
			this.$emit("input", this.value);
		},
		popTime(t) {
			this.value.pop(t);
		},
	},
};
</script>

<style scoped>
.time-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.btn-delete {
	padding-right: var(--space-sm);
}
.item {
	padding: 0 var(--space-xs-3);
}
</style>
