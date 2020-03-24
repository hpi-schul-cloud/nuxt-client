<template>
	<base-grid v-if="courses.length" class="courses-grid">
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
	<empty-state v-else :image="emptystateImg" class="mt--lg">
		<template v-slot:description>
			{{ $t("componente.molecules.CoursesGrid.emptystate") }}
		</template>
	</empty-state>
</template>

<script>
import BaseGrid from "@components/base/BaseGrid";
import CourseCard from "@components/molecules/CourseCard";
import EmptyState from "@components/molecules/EmptyState";
import ImageEmptyState from "@assets/img/empty-state/emptyStateSvg_teacher_female_hand_raised.svg";

export default {
	components: {
		BaseGrid,
		CourseCard,
		EmptyState,
	},
	props: {
		courses: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			emptystateImg: ImageEmptyState,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.courses-grid {
	margin-top: var(--space-xl);
}
</style>
