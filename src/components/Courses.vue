<template>
	<div id="app">
		<CourseCard
			v-for="course in courses_obj"
			:key="course._id"
			:course="course"
		/>
	</div>
</template>

<script>
import CourseCard from "./CourseCard.vue";

export default {
	components: {
		CourseCard,
	},
	props: {
		courses: {
			type: String,
			default: "",
		},
	},
	computed: {
		courses_obj() {
			return JSON.parse(this.courses);
		},
	},
};
</script>

<style>
#app {
	display: flex;
	flex-wrap: wrap;
}
</style>
