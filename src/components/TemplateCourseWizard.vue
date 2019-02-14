<template>
	<div class="root">
		<h2>Kurs anlegen</h2>
		<h6
			>In einem Kurs wird gemeinsam mit den Teilnehmern an Themen, Hausaufgaben
			und Dateien gearbeitet.</h6
		>
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

					<h6>Start und Enddatum</h6>

					<div class="date_wrapper">
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

					{{
						course.classes.map((c) => {
							return c["_id"];
						})
					}}

					{{
						course.students.map((c) => {
							return c["_id"];
						})
					}}
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
import "../styles/base.scss";
import StepProgress from "./StepProgress.vue";
import BaseInput from "./ui/BaseInput";
import BaseButton from "./ui/BaseButton";
import BaseSelect from "./ui/BaseSelect";

export default {
	name: "TemplateCourseWizard",
	components: { StepProgress},
	props: {
		currentStep: {
			type: Number,
			default: 0,
		},
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
		},
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
		},
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
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-wrapper{
	margin-top: 150px;
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

.date_wrapper {
	display: flex;
	justify-content:space-between;
}

.date{
	width: 49%;
}
</style>
