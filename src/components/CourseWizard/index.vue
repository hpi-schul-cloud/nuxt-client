<template>
	<div class="root">
		<div class="header">
			<div class="header-icon">
				<base-icon source="custom" icon="shuttle" />
			</div>
			<div class="headlines">
				<h1 class="h3">Kurs anlegen</h1>
				<h2 class="h5">
					In einem Kurs wird gemeinsam mit den Teilnehmern an Themen,
					Hausaufgaben und Dateien gearbeitet.
				</h2>
			</div>
		</div>
		<step-progress :steps="steps" :current-step="currentStep" />

		<div class="content-wrapper">
			<step-data
				v-show="currentStep === 0"
				:course="course"
				:available-teachers="teachers"
			/>

			<step-members
				v-show="currentStep === 1"
				:course="course"
				:available-classes="classes"
				:available-students="students"
			/>

			<step-done v-show="currentStep === 2" />
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
</template>

<script>
import StepProgress from "@components/StepProgress";
import StepData from "./StepData";
import StepMembers from "./StepMembers";
import StepDone from "./StepDone";

export default {
	components: { StepProgress, StepData, StepMembers, StepDone },
	props: {
		steps: {
			type: Array,
			default: () => [],
		},
		course: {
			type: Object,
			default: () => ({
				name: "",
				description: "",
				startDate: "",
				untilDate: "",
				times: [],
				teachers: [],
			}),
		},
		user: {
			type: Object,
			required: true,
			validator: (user) => ["_id"].every((key) => user[key] !== undefined),
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
			currentStep: 0,
		};
	},
	computed: {
		firststep() {
			return this.currentStep === 0;
		},
		laststep() {
			return this.currentStep === this.steps.length - 1;
		},
	},
	created() {
		this.course.teachers.push(this.user._id);
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
@import "@styles";
.content-wrapper {
	max-width: 100ch;
	margin: var(--space-xxxl) auto 0;
}

.step-wrapper {
	display: flex;
	justify-content: flex-end;
	max-width: 80ch;
	margin: 0 auto;
}

.header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: var(--space-lg) 0;

	.headlines h3 {
		margin-top: 0;
	}

	.header-icon {
		margin-right: var(--space-sm);
		font-size: var(--heading-3);
	}
}
</style>
