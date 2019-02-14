<template>
	<div class="root">
		<h2>Kurs anlegen</h2>
		<h6>In einem Kurs wird gemeinsam mit den Teilnehmern an Themen, Hausaufgaben
			und Dateien gearbeitet.</h6>
		<div class="steps">
			<StepProgress :steps="steps" :current-step="currentStep" />

			<div class="content-wrapper">
				<div v-show="currentStep == 0">
					<BaseInput
						v-model="course.name"
						name="name"
						label="Kursname"
						type="text"
						placeholder="z.B. 10a"
						maxlength="30"
					></BaseInput>

					<BaseInput
						v-model="course.description"
						name="description"
						label="Kursbeschreibung"
						type="textarea"
						placeholder=""
						maxlength="255"
					></BaseInput>

					<h6>Unterrichtender Lehrer</h6>
					<BaseSelect
						:value.sync="course.teachers"
						:options="teachers"
						:multiple="true"
						label="lastName"
						track-by="_id"
					></BaseSelect>

					<h6>Vertretungs-Lehrer</h6>
					<BaseSelect
						:value.sync="course.substitutions"
						:options="teachers"
						:multiple="true"
						label="lastName"
						track-by="_id"
					></BaseSelect>

					<div class="date-wrapper">
						<BaseInput
							v-model="course.startDate"
							name="startDate"
							label="Startdatum"
							type="date"
							class="date"
							placeholder=""
							maxlength="30"
						></BaseInput>

						<BaseInput
							v-model="course.untilDate"
							name="untilDate"
							label="Enddatum"
							type="date"
							class="date"
							placeholder=""
							maxlength="30"
						></BaseInput>
					</div>

					<div v-for="(time,i) of course.times" :key="i" class="time-wrapper">
						<BaseSelect
							:value.sync = "time.weekday"
							:options="weekdays"
							:allow-empty="false"
							label="name"
						></BaseSelect>
						<BaseInput v-model="time.room" label="Raum" name="room" type="text"/>
						<BaseInput v-model="time.startTime" label="Start" name="startTime" type="time"/>
						<BaseInput v-model="time.duration" label="Dauer" name="duration" type="text"/>
						<a style="cursor: pointer" @click="popTime(time)">Remove</a>
					</div>
					<BaseButton
						type="button"
						class="btn btn-primary"
						@click="addTime">
						Schulstundentermin im Stundenplan anlegen
					</BaseButton>

				</div>

				<div v-show="currentStep == 1">
					<h3>Step 2</h3>

					<h6>Klasse auswählen</h6>
					<BaseSelect
						:value.sync = "course.classes"
						:options="classes"
						:multiple="true"
						label="displayName"
						track-by="_id"
					></BaseSelect>

					<h6>Studenten auswählen</h6>
					<BaseSelect
						:value.sync = "course.students"
						:options="students"
						:multiple="true"
						label="displayName"
						track-by="_id"
					></BaseSelect>
				</div>

				<div v-show="currentStep == 2">
					<h3>Geschafft!</h3>
				</div>
			</div>
			<div class="step-wrapper">
				<BaseButton
					v-if="!firststep"
					type="button"
					class="btn btn-primary"
					@click="lastStep"
				>
					Zurück
				</BaseButton>
				<BaseButton
					v-if="!laststep"
					type="button"
					class="btn btn-primary"
					@click="nextStep"
				>
					Weiter
				</BaseButton>
				<BaseButton
					v-if="laststep"
					type="submit"
					class="btn btn-primary"
					@click="$emit('course-creation-submit')"
				>
					Kurs anlegen und weiter
				</BaseButton>
			</div>
		</div>
	</div>
</template>

<script>
import StepProgress from "./StepProgress.vue";
import BaseInput from "./ui/BaseInput";
import BaseButton from "./ui/BaseButton";
import BaseSelect from "./ui/BaseSelect";

export default {
	name: "TemplateCourseWizard",
	components: {StepProgress},
	props: {
		steps: {
			type: Array,
			default: () => [],
		},
		step: {
			type: Number,
			default: 0,
		},
		course: {
			type: Object,
			default: () => {},
		},
		user: {
			type: Object,
			default: () => {},
		},
		teachers: {
			type: Array,
			default: () => [],
		},
		classes: {
			type: Array,
			default: () => [],
		},
		students: {
			type: Array,
			default: () => [],
		}
	},
	data() {
		return {
			//weekdays: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag" ]
			weekdays: [
				{ value: 0, name: "Montag" },
				{ value: 1, name: "Dienstag" },
				{ value: 2, name: "Mittwoch" },
				{ value: 3, name: "Donnerstag" },
				{ value: 4, name: "Freitag" },
				{ value: 5, name: "Samstag" },
				{ value: 6, name: "Sonntag" },
			],
			currentStep: 0
		};
	},
	computed: {
		firststep() {
			return this.currentStep == 0;
		},
		laststep() {
			return this.currentStep == this.steps.length - 1;
		},
		fullname() {
			return this.user.firstName + " " + this.user.lastName;
		}
	},
	created() {
		this.course.teachers.push(this.user);
	},
	methods: {
		nextStep() {
			this.currentStep = this.currentStep + 1;
		},

		lastStep() {
			this.currentStep = this.currentStep - 1;
		},
		addTime() {
			let time = {weekday: this.weekdays[0], startTime: "08:00", duration: "60", room: "H1"};
			this.course.times.push(time);
		},
		popTime(t) {
			this.course.times.pop(t);
		},
		guidGenerator() {
    	let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    	};
    	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
		}
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-wrapper{
	width: 70%;
	margin: 150px auto 0px auto;
}

.steps {
	padding: 20px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-wrapper {
	display: flex;
	justify-content: flex-end;
}

.date-wrapper {
	display: flex;
	justify-content:space-between;
}

.time-wrapper {
	display: flex;
	flex-direction: row;
}

.date{
	width: 49%;
}
</style>
