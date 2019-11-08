<template>
	<div class="grid">
		<div v-for="(course, i) of courses" :key="i" class="">
			<BaseLink
				class="link tile"
				:to="{ name: 'courses-id', params: { id: course._id } }"
				v-bind="$attrs"
			>
				<course-card v-bind="course" />
			</BaseLink>
		</div>
	</div>
</template>

<script>
import CourseCard from "./CourseCard";

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

<style lang="scss" scoped>
@import "@variables";

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
	grid-gap: var(--space-lg);
	border: 2px dotted green;
}
</style>
