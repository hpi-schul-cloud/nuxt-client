<template>
	<div class="course-card">
		<div
			v-if="course.notification != 0 || course.notification == null"
			class="dot"
			>{{ course.notification }}</div
		>
		<div class="tab">
			<div class="tab-label">{{ course.teacherName }}</div>
			<div
				v-if="course.newAssignments != 0 || course.notification == null"
				class="assignments-label align-center"
				><div class="align-center"> {{ course.newAssignments }} </div
				><div class="align-center pl-6 "><CalanderIcon /> </div>
			</div>
		</div>
		<div class="card-info" :style="background_style">
			<div class="mt-5 mb-15 abrivation-label"> {{ course.abbreviation }}</div>
			<div class="mt-5 mb-5 ml-4 course-name-label"> {{ course.name }}</div>
		</div>
		<CardFooter :course="course"></CardFooter>
	</div>
</template>

<script>
import CardFooter from "./CardFooter.vue";
import CalanderIcon from "../assets/calander.svg";

export default {
	name: "CourseCard",
	components: {
		CardFooter,
		CalanderIcon,
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
					this.course.colorGradient +
					" 0%, " +
					this.course.color +
					" 100%);"
				);
			} else {
				return "background-color: " + this.course.color + ";";
			}
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
	display: inline-block;
	width: 25px;
	height: 25px;
	// padding: 1px 9px 2px;
	font-family: PTSans-CaptionBold, sans-serif;
	font-size: 14px;
	font-weight: bold;
	color: white;
	text-align: center;
	line-height: 25px;
	background: #b1063a;
	border-radius: 50%;
	z-index: 10;
	position: absolute;
	top: -12px;
	right: -12px;
}

.abrivation-label {
	font-family: "PT Sans Caption", sans-serif;
	font-size: 60px;
	font-weight: bold;
}

.course-name-label {
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 20px;
	font-weight: bold;
}

.assignments-label {
	display: flex;
	align-items: center;
	position: relative;
	float: right;
	margin: auto 0;
	font-family: "PT Sans Caption", sans-serif;
	font-size: 16px;
	vertical-align: middle;
}
.course-card {
	width: 260px;
	padding: 10px;
	font-size: 16px;
	cursor: pointer;
	border-radius: 4px;
	box-shadow: $shadow-1;
	position: relative;
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
	float: left;
	width: 100px;
	padding: 7.5px 10px;
	overflow: hidden;
	font-family: "PT Sans Narrow", sans-serif;
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
