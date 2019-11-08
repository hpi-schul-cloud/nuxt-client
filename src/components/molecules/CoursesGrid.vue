<template>
	<grid-layout class="courses-grid">
		<div v-for="(course, i) of courses" :key="i" class="">
			<BaseLink
				class="link tile"
				:to="{ name: 'courses-id', params: { id: course._id } }"
				v-bind="$attrs"
			>
				<course-card v-bind="course" />
			</BaseLink>
		</div>
	</grid-layout>
</template>

<script>
import GridLayout from "@components/molecules/GridLayout";
import CourseCard from "@components/molecules/CourseCard";

export default {
	components: {
		GridLayout,
		CourseCard,
	},
	props: {
		courses: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.courses-grid {
	margin-top: var(--space-xl);
}
</style>
