<template>
	<div class="course-card">
		<div
			v-if="course.notification != 0 && course.notification != null"
			class="caption dot"
			>{{ course.notification }}</div
		>
		<div class="header">
			<div class="tab" :style="background_style">
				<div class="dark-overlay"></div>
				<div class="caption tab-label">{{ course.teacherName }}</div>
			</div>
			<div
				v-if="course.newAssignments != 0 && course.notification != null"
				class="assignments-label align-center"
			>
				<div class="align-center">{{ course.newAssignments }}</div>
				<div class="align-center pl-6">
					<TasksIcon />
				</div>
			</div>
		</div>
		<div class="card-info" :style="background_style">
			<h2 class="mt-5 mb-15 abrivation-label">{{ courseAbbreviation }}</h2>
			<h6 class="mt-4 mb-5 ml-4 course-name-label">{{ course.name }}</h6>
		</div>
		<CardFooter :course="course"></CardFooter>
	</div>
</template>

<script>
import CardFooter from "./CardFooter.vue";
import TasksIcon from "@assets/tasks.svg";

export default {
	name: "CourseCard",
	components: {
		CardFooter,
		TasksIcon,
	},
	props: {
		course: {
			type: Object,
			default: () => ({
				color: "#01B1AA",
				colorGradient: "#03B2D6",
				abbreviation: "DEF",
				newAssignments: 0,
				name: "default name",
				teacherName: "MusterMensch",
				alert: "Default Alert!",
				notification: 0,
			}),
		},
	},
	computed: {
		background_style() {
			if (this.course.colorGradient) {
				return (
					"background-image: linear-gradient(-225deg, " +
					this.course.color +
					" 0%, " +
					this.course.colorGradient +
					" 100%);"
				);
			} else {
				return "background-color: " + this.course.color + ";";
			}
		},
		courseAbbreviation() {
			if (this.course.abbreviation == "") return this.course.abbreviation;
			else return this.course.name.substring(0, 3).toUpperCase();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.mt-0 {
	margin-top: 0 !important;
}

.mb-0 {
	margin-bottom: 0 !important;
}

.mb-15 {
	margin-bottom: -15px !important;
}

.mb-5 {
	margin-bottom: -5px !important;
}

.mt-5 {
	margin-top: -5px !important;
}

.mt-4 {
	margin-top: 4px !important;
}
.ml-4 {
	margin-left: 4px !important;
}
.pl-6 {
	padding-left: 6px !important;
}

.align-center {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.dot {
	position: absolute;
	top: -12px;
	right: -12px;
	z-index: 10;
	display: inline-block;
	width: 25px;
	height: 25px;
	font-weight: bold;
	line-height: 25px;
	color: white;
	text-align: center;
	background: #b1063a;
	border-radius: 50%;
}

.abrivation-label {
	font-family: PTSans-Caption, sans-serif;
	color: white;
}

.course-name-label {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: white;
}

.assignments-label {
	position: relative;
	display: flex;
	align-items: center;
	float: right;
	margin: auto 0;
	font-family: "PT Sans Caption", sans-serif;
	font-size: 16px;
	vertical-align: middle;
}
.course-card {
	position: relative;
	width: 240px;
	padding: 10px;
	margin: 15px;
	cursor: pointer;
	border-radius: 4px;
	box-shadow: $shadow-1;
}
.course-card:hover {
	box-shadow: $shadow-5;
	transition: box-shadow 0.3s;
}
.card-info {
	padding: 10px;
	margin-top: -5px;
	color: white;
	border-radius: 4px;
}

.card-info p {
	margin: 0;
	font-family: "Asul", sans-serif;
}

.tab-label {
	position: absolute;
	display: inline-block;
	float: left;
	width: 100px;
	padding: 5.5px 10px;
	overflow: hidden;
	color: white;
	text-overflow: ellipsis;
	white-space: nowrap;
	transform: skewX(-25deg);
	transform-origin: bottom left;
	z-index: 1;
}

.header {
	position: relative;
	z-index: -1;
	height: 34px;
	overflow: hidden;
	border-radius: 5px;
	border-bottom-left-radius: 0;
}

.tab {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 125px;
	content: "";
	border-top-right-radius: 5px;
	transform: skewX(25deg);
	transform-origin: bottom left;
}
.dark-overlay {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #000;
	background-size: cover;
	opacity: 0.5;
	z-index: -1;
}
</style>
