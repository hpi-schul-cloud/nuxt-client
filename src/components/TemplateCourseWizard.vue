<template>
	<!-- eslint-disable max-lines -->
	<div class="root">
		<div class="header">
			<div class="header-icon">
				<base-icon source="custom" icon="shuttle" />
			</div>
			<div class="headlines">
				<h3>Kurs anlegen</h3>
				<h6>
					In einem Kurs wird gemeinsam mit den Teilnehmern an Themen,
					Hausaufgaben und Dateien gearbeitet.
				</h6>
			</div>
		</div>
		<div class="steps">
			<step-progress :steps="steps" :current-step="currentStep" />

			<div class="content-wrapper">
				<div v-show="currentStep === 0">
					<base-input
						v-model="course.name"
						name="name"
						label="Kursname"
						type="text"
						placeholder="z.B. 10a"
						maxlength="30"
					/>

					<base-input
						v-model="course.description"
						name="description"
						label="Kursbeschreibung"
						type="textarea"
						placeholder=""
						maxlength="255"
					/>

					<base-select
						:value.sync="teachersSelected"
						:options="teachers"
						:multiple="true"
						placeholder="Unterrichtender Lehrer"
						label="lastName"
						track-by="_id"
					/>

					<base-select
						:value.sync="substitutionsSelected"
						:options="teachers"
						:multiple="true"
						label="lastName"
						placeholder="Vertretungs-Lehrer"
						track-by="_id"
					/>

					<div class="date-wrapper">
						<base-input
							v-model="course.startDate"
							name="startDate"
							label="Startdatum"
							type="date"
							class="date"
							placeholder=""
							maxlength="30"
						/>
						<base-input
							v-model="course.untilDate"
							name="untilDate"
							label="Enddatum"
							type="date"
							class="date"
							placeholder=""
							maxlength="30"
						/>
					</div>

					<template-course-times v-model="course.times" />
				</div>

				<div v-show="currentStep === 1">
					<p>
						Fast geschafft! Jetzt noch die Kursmitglieder hinzufügen und dann
						kann es losgehen. Du kannst diesen Schritt auch überspringen und
						später Kursmitglieder hinzufügen.
					</p>

					<base-select
						:value.sync="classesSelected"
						:options="classes"
						:multiple="true"
						label="displayName"
						track-by="_id"
						placeholder="Klasse auswählen"
					></base-select>

					<base-select
						:value.sync="studentsSelected"
						:options="students"
						:multiple="true"
						:show-on-select="false"
						label="displayName"
						track-by="_id"
						placeholder="Studenten auswählen"
					></base-select>
				</div>

				<div v-show="currentStep === 2" class="final-step">
					<div class="image">
						<img src="@assets/people.png" />
					</div>
					<div>
						<h3>Geschafft!</h3>
						<h4>Was kann ich in einem Kurs machen?</h4>
						<h6>Themen anlegen</h6>
						Themen sind in der Schul-Cloud der Container für dein
						Unterrichtsmaterial.
						<h6>Aufgaben stellen</h6>
						Innerhalb eines Kurses/Themas kannst du Aufgaben an deine Teilnehmer
						stellen.
						<h6>Tools hinzufügen</h6>
						In einem Kurs kannst du außerdem Tools zum interaktiven Unterricht
						hinzufügen.
					</div>
				</div>
			</div>
			<div class="step-wrapper">
				<base-button
					v-if="!firststep"
					type="button"
					class="btn btn-primary"
					@click="lastStep"
					>Zurück</base-button
				>
				<base-button
					v-if="currentStep === 1"
					type="button"
					class="btn btn-primary"
					@click="nextStep"
					>Überspringen</base-button
				>
				<base-button
					v-if="!laststep"
					type="button"
					class="btn btn-primary"
					@click="nextStep"
					>Weiter</base-button
				>
				<base-button
					v-if="laststep"
					type="submit"
					class="btn btn-primary"
					@click="$emit('course-creation-submit')"
				>
					Kurs anlegen und weiter
				</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import StepProgress from "./StepProgress";
import TemplateCourseTimes from "./TemplateCourseTimes";

export default {
	name: "TemplateCourseWizard",
	components: { StepProgress, TemplateCourseTimes },
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
		},
	},
	data() {
		return {
			teachersSelected: [],
			substitutionsSelected: [],
			classesSelected: [],
			studentsSelected: [],
			currentStep: 0,
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
		},
	},
	watch: {
		teachersSelected: function() {
			this.course.teachers = this.teachersSelected.map((teacher) => {
				return teacher["_id"];
			});
		},
		substitutionsSelected: function() {
			this.course.substitutions = this.substitutionsSelected.map(
				(substitution) => {
					return substitution["_id"];
				}
			);
		},
		classesSelected: function() {
			this.course.classes = this.classesSelected.map((c) => {
				return c["_id"];
			});
		},
		studentsSelected: function() {
			this.course.students = this.studentsSelected.map((student) => {
				return student["_id"];
			});
		},
	},
	created() {
		this.teachersSelected.push(this.user);
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

<style lang="scss" scoped>
@import "@variables";
.content-wrapper {
	width: 70%;
	margin: 150px auto 0 auto;
}

.steps {
	padding: 20px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all $duration-animation-medium cubic-bezier(0.25, 0.8, 0.25, 1);
}

.step-wrapper {
	display: flex;
	justify-content: flex-end;
}

.date-wrapper {
	display: flex;
	justify-content: space-between;
}

.date {
	width: 49%;
}

.header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 20px 0;

	.headlines h3 {
		margin-top: 0;
	}

	.header-icon {
		margin-right: 20px;
		font-size: 60px;
	}
}

.final-step {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 30px;
	.image {
		padding: 30px;
	}
}
</style>
