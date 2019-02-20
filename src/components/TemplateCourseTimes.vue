<template>
	<div class="root">
		<div v-for="(time,i) of value" :key="i" class="time-wrapper">
			<a style="cursor: pointer" @click="popTime(time)"><DeleteIcon/></a>
			<BaseSelect
				:value.sync = "time.weekday"
				:options="weekdays"
				:allow-empty="false"
				label="name"
				input-label="Tag"
				 @update:value="timeUpdate"
			></BaseSelect>
			<BaseInput v-model="time.room" label="Raum" name="room" type="text"  @update="timeUpdate"/>
			<BaseInput v-model="time.startTime" label="Start" name="startTime" type="time"  @update="timeUpdate"/>
			<BaseInput v-model="time.duration" label="Dauer" name="duration" type="text"  @update="timeUpdate"/>
		</div>
		<BaseButton
			type="button"
			class="btn btn-primary"
			@click="addTime">
			Schulstundentermin im Stundenplan anlegen
		</BaseButton>
	</div>
</template>

<script>
import BaseInput from "./ui/BaseInput";
import BaseButton from "./ui/BaseButton";
import BaseSelect from "./ui/BaseSelect";

import DeleteIcon from "@assets/calander.svg";


export default {
	name: "TemplateCourseTimes",
	components: {DeleteIcon},
	props: {
		value: {
			type: Array,
			default: () => [],
			required: true
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
			]
		};
	},
	methods: {
		addTime() {
			let time = {weekday: this.weekdays[0], startTime: "08:00", duration: "60", room: "H1"};
			this.value.push(time);
		},
		popTime(t) {
			this.value.pop(t);
		},
		guidGenerator() {
    	let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    	};
    	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		},
		timeUpdate(){
			console.log('update time');
		}
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.time-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
