<template>
	<base-grid class="courses-grid">
		<div v-for="(course, i) of courses" :key="i" class="">
			<BaseLink
				class="link tile"
				:to="{ name: 'courses-id', params: { id: course._id } }"
				v-bind="$attrs"
			>
				<course-card v-bind="course" />
			</BaseLink>
		</div>
	</base-grid>
</template>

<script>
import BaseGrid from "@components/base/BaseGrid";
import CourseCard from "@components/molecules/CourseCard";

export default {
	components: {
		BaseGrid,
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
