<template src="./TemplateCourseWizard.html"></template>

<script>
import StepProgress from "./StepProgress.vue";
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
.content-wrapper {
	width: 70%;
	margin: 150px auto 0 auto;
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
