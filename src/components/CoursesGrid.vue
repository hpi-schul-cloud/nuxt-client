<template>
	<div class="grid">
		<div v-for="(course, i) of courses" :key="i" class="tile">
			<NuxtLink
				class="link"
				tag="div"
				:to="{ name: 'courses-id', params: { id: course._id } }"
				v-bind="$attrs"
			>
				<course-card :course="course" />
			</NuxtLink>
		</div>
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
	flex-wrap: wrap;
	justify-content: center;
}

.tile {
	display: flex;
	margin: 10px;
}
</style>
