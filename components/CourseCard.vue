<template>
	<div class="course-card">
		<div class="tab">
			<div class="tab-label">{{ course.teacherName }}</div>
			<div v-if="course.newAssignments != 0" class="assignments-label"
				>{{ course.newAssignments }}
				<FontAwesomeIcon :icon="['far', 'calendar-check']" size="lg" />
			</div>
		</div>
		<div class="card-info" :style="background_style">
			<h1 class="mt-0 mb-10"> {{ course.abbreviation }}</h1>
			<h3 class="mt-0 mb-0"> {{ course.name }}</h3>
		</div>
		<CardFooter :course="course"></CardFooter>
	</div>
</template>

<script>
import CardFooter from "./CardFooter.vue";

export default {
	name: "CourseCard",
	components: {
		CardFooter,
	},
	props: {
		msg: String,
		course: {
			type: Object,
			default: () => ({
				color: "#01B1AA",
				abbreviation: "DEF",
				newAssignments: 0,
				name: "default name",
				teacherName: "MusterMensch",
				courseAlert: "Default Alert!",
			}),
		},
	},
	computed: {
		background_style() {
			return "background: " + this.course.color;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@variables";
.mt-0 {
	margin-top: 0 !important;
}

.mb-0 {
	margin-bottom: 0 !important;
}

.mb-10 {
	margin-bottom: -10px !important;
}

.assignments-label {
	float: right;
	padding: 5px;
	font-family: PT Sans Caption, -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, Ubuntu, "Helvetica Neue", Arial, sans-serif;
}

.course-card {
	width: 260px;
	padding: 10px;
	font-size: 16px;
	cursor: pointer;
	border-radius: 4px;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 4px 0 rgba(0, 0, 0, 0.2);
}

.card-info {
	padding: 10px;
	margin-top: -5px;
	color: white;
	border-radius: 4px;

	/* background-image: linear-gradient(-225deg, #E42C85 0%, #3B1E65 100%); */
}

.card-info p {
	margin: 0;
	font-family: "Asul", sans-serif;
}

.card-border:hover {
	box-shadow: 0 4px 14px rgb(126, 124, 124);
}

.tab-label {
	float: left;
	width: 100px;
	padding: 7.5px 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	transform: skewX(0deg);
	transform-origin: bottom left;
}

.tab {
	position: relative;
	z-index: -1;
	height: 34px;
	overflow: hidden;
	border-radius: 5px;
	border-bottom-left-radius: 0;
}

.tab::before {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 125px;
	content: "";
	background-color: #dedede;
	border-top-right-radius: 5px;
	transform: skewX(25deg);
	transform-origin: bottom left;
}
</style>
