<template>
	<div class="container">
		<base-title>{{ $t("pages.courses.index.title") }}</base-title>
		<div class="grid">
			<div v-for="(course, i) of courses" :key="i" class="">
				<BaseLink
					class="link tile"
					:to="{ name: 'courses-id', params: { id: course._id } }"
					v-bind="$attrs"
				>
					<course-card :course="course" />
				</BaseLink>
			</div>
		</div>
	</div>
</template>

<script>
import CourseCard from "./CourseCard";
import BaseTitle from "@components/base/BaseTitle";

export default {
	components: {
		CourseCard,
		BaseTitle,
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
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 0 var(--space-xl-3);
}

.tile {
	display: flex;
}
</style>
