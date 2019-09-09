<template>
	<div class="course-card">
		<div v-if="course.notification" class="caption notification-dot">
			{{ course.notification }}
		</div>
		<div class="header">
			<div class="tab" :style="background_style">
				<div class="caption tab-label truncate">{{ course.teacherName }}</div>
			</div>
			<div v-if="course.newAssignments" class="assignments-label">
				{{ course.newAssignments }}
				<base-icon source="custom" icon="tasks" />
			</div>
		</div>
		<div class="card-info" :style="background_style">
			<h2 class="abrivation-label">{{ courseAbbreviation }}</h2>
			<h3 class="course-name-label">{{ course.name }}</h3>
		</div>
		<course-card-footer :course="course" />
	</div>
</template>

<script>
import CourseCardFooter from "./CourseCardFooter";

export default {
	components: {
		CourseCardFooter,
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
			if (this.course.abbreviation) return this.course.abbreviation;
			else return this.course.name.substring(0, 3).toUpperCase();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.course-card {
	position: relative;
	width: 240px;
	padding: var(--space-xs);
	padding-bottom: 0;
	margin: var(--space-sm);
	cursor: pointer;
	border-radius: var(--radius-md);
	box-shadow: var(--shadow-sm);
	transition: box-shadow var(--duration-transition-medium);
}
.course-card:hover {
	box-shadow: var(--shadow-lg);
}

/* ------------------------
  Header
------------------------ */

.header {
	position: relative;
	// text-size + padding top/bottom + overlap
	height: calc(var(--text-md) + 2 * var(--space-xxs) + var(--space-xs));
	overflow: hidden;
	border-radius: var(--radius-sm);
	border-bottom-left-radius: 0;
}

// Course Name (left)
.tab {
	position: absolute;
	z-index: var(--layer-behind);
	width: 80%;
	height: 100%;
	border-top-right-radius: var(--radius-sm);
	transform: skewX(25deg);
	transform-origin: bottom left;

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
		background: var(--color-overlay);
		border-top-right-radius: var(--radius-sm);
	}

	.tab-label {
		display: inline-block;
		width: 100%;
		padding: var(--space-xxs) var(--space-sm);
		font-size: var(--text-md);
		color: var(--color-white);
		transform: skewX(-25deg);
		transform-origin: bottom left;
	}
}

// Info (right)
.assignments-label {
	display: flex;
	align-items: center;
	float: right;
}

// Notification Bubble
.notification-dot {
	--min-size: calc(var(--text-sm) + (2 * var(--space-xxs)));

	position: absolute;
	bottom: 100%;
	left: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: var(--min-size);
	min-height: var(--min-size);
	padding: 0 var(--space-xxs);
	font-size: var(--text-sm);
	font-weight: var(--font-weight-bold);
	color: var(--color-white);
	background: var(--color-primary);
	border-radius: var(--radius-round);
	transform: translate(-50%, 50%);
}

/* ------------------------
  Body
------------------------ */

.card-info {
	padding: var(--space-xs);
	padding-top: 0;
	margin-top: calc(var(--space-xs) * -1);
	color: var(--color-white);
	border-radius: var(--radius-sm);
	p {
		margin: 0;
		font-family: var(--font-primary);
	}
}

.abrivation-label {
	margin: 0;
	font-family: var(--font-primary);
	font-size: var(--heading-2);
	color: var(--color-white);
	text-transform: uppercase;
}

.course-name-label {
	margin: 0;
	overflow: hidden;
	font-size: var(--text-md);
	color: var(--color-white);
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
