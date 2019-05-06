<template>
	<BaseCard
		:badge="course.notification"
		:color="[course.color, course.colorGradient]"
	>
		<template v-slot:header-in>{{ course.teacherName }}</template>
		<template v-slot:header-out>
			<div v-if="course.newAssignments" class="assignments">
				<span class="assignments-label">{{ course.newAssignments }}</span>
				<base-icon source="custom" icon="tasks" />
			</div>
		</template>

		<div>
			<h2 class="abbreviation">{{ courseAbbreviation }}</h2>
			<h3 class="course-name">{{ course.name }}</h3>
		</div>

		<template v-slot:footer>
			<card-footer :course="course"></card-footer>
		</template>
	</BaseCard>
</template>

<script>
import BaseCard from "@basecomponents/BaseCard";
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
		courseAbbreviation() {
			if (!!this.course.abbreviation) return this.course.abbreviation;
			else return this.course.name.substring(0, 3).toUpperCase();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.assignments {
	position: relative;
	display: flex;
	align-items: center;
	float: right;
	margin: auto 5px;
	font-size: 16px;
	vertical-align: middle;
}

.assignments-label {
	display: inline-block;
	margin-right: 5px;
}

.abbreviation {
	margin: 0;
	font-size: 48px;
	color: white;
}

.course-name {
	margin: 0;
	overflow: hidden;
	font-size: 20px;
	color: white;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
