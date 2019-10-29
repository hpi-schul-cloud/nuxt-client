<template>
	<div class="root">
		<div v-for="(time, i) of value" :key="i" class="time-wrapper">
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
				type="number"
				class="item"
			/>
			<base-button design="icon" class="btn-delete" @click="popTime(i)">
				<base-icon icon="delete" source="material" />
			</base-button>
		</div>

		<base-button design="primary outline" @click="addTime">
			<base-icon source="material" icon="add_circle_outline" />
			Schulstundentermin anlegen
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
			cache: "",
		};
	},
	watch: {
		value: {
			handler(to) {
				const staticCopy = JSON.stringify(to);
				if (staticCopy !== this.cache) {
					this.cache = staticCopy;
					this.$emit("input", to);
				}
			},
			deep: true,
		},
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

		popTime(i) {
			this.value.splice(i, 1);
			this.$emit("input", this.value);
		},
	},
};
</script>

<style scoped>
.time-wrapper {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	padding: var(--space-md) 0;
}
.btn-delete {
	align-self: center;
	padding-right: var(--space-sm);
	margin-left: var(--space-md);
}
.item {
	padding: 0 var(--space-xs-3);
}
</style>
