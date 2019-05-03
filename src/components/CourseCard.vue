<template>
	<div class="course-card">
		<div
			v-if="course.notification !== 0 && course.notification !== null"
			class="caption notification-dot"
			>{{ course.notification }}</div
		>
		<div class="header">
			<div class="tab" :style="background_style">
				<div class="dark-overlay"></div>
				<div class="caption tab-label">{{ course.teacherName }}</div>
			</div>
			<div
				v-if="course.newAssignments !== 0 && course.notification !== null"
				class="assignments-label align-center"
			>
				{{ course.newAssignments }}
				<base-icon source="custom" icon="tasks" />
			</div>
		</div>
		<div class="card-info" :style="background_style">
			<h2 class="abrivation-label">{{ courseAbbreviation }}</h2>
			<h3 class="course-name-label">{{ course.name }}</h3>
		</div>
		<card-footer :course="course"></card-footer>
	</div>
</template>

<script>
import CardFooter from "./CardFooter";

export default {
	components: {
		CardFooter,
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
			if (!!this.course.abbreviation) return this.course.abbreviation;
			else return this.course.name.substring(0, 3).toUpperCase();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.align-center {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.notification-dot {
	position: absolute;
	top: -12px;
	right: -12px;
	display: inline-block;
	min-width: var(--min-size);
	min-height: var(--min-size);
	padding: var(--space-xxs);
	font-size: var(--text-sm);
	font-weight: bold;
	line-height: 1;
	color: white;
	text-align: center;
	background: var(--color-primary);
	border-radius: var(--curve-round);

	--min-size: calc(var(--text-sm) + var(--space-xxs) + var(--space-xxs));
}

.abrivation-label {
	margin: 0;
	font-family: PTSans-Caption, sans-serif;
	font-size: var(--text-xxxl);
	color: white;
}

.course-name-label {
	margin: 0;
	overflow: hidden;
	font-size: var(--text-md);
	color: white;
	text-overflow: ellipsis;
	white-space: nowrap;
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
	box-shadow: var(--shadow-1);
}
.course-card:hover {
	box-shadow: var(--shadow-5);
	transition: box-shadow var(--duration-transition-medium);
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
}

.header {
	position: relative;
	z-index: var(--layer-behind);
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
	z-index: var(--layer-behind);
	width: 100%;
	height: 100%;
	background: black;
	background-size: cover;
	opacity: 0.5;
}
</style>
