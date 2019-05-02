<template>
	<div class="app">
		<div class="grid">
			<div v-for="(course, i) of courses" :key="i" class="tile">
				<course-card :course="course" />
			</div>
		</div>
	</div>
</template>

<script>
import CourseCard from "./CourseCard.vue";

export default {
	name: "CoursesGrid",
	components: {
		CourseCard,
	},
	props: {
		courses: {
			type: Array,
			default: () => [],
		},
	},
	computed: {},
};
</script>

<style lang="scss">
@import "@variables";

.grid {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	min-width: $size-content-width-min;
	max-width: $size-content-width-max;
	margin: 0 auto;
}

.tile {
	display: flex;
	margin: 10px;
}
</style>
