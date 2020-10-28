<template>
	<base-header
		v-bind="$attrs"
		anchor="top-right-bottom-placed"
		source="material"
		icon="more_vert"
	>
		<div class="next-lesson-container">
			<base-icon source="custom" icon="clock"></base-icon>
			<span>{{ nextLessonDate }}</span>
		</div>
		<base-link :href="redirectUrl" class="course-files-link">
			<base-icon source="material" icon="folder"></base-icon>
			Kursdateien
		</base-link>
	</base-header>
</template>
<script>
import BaseHeader from "@components/base/BaseHeader";
import BaseLink from "@components/base/BaseLink";
import BaseIcon from "@components/base/BaseIcon";

export default {
	components: {
		BaseHeader,
		BaseLink,
		BaseIcon,
	},
	props: {
		nextLessonDate: {
			type: String,
			default: () => "Some date",
		},
		courseId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {};
	},
	computed: {
		redirectUrl() {
			return `/files/courses/${this.courseId}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.next-lesson-container {
	display: inline-block;
	margin-right: var(--space-lg);
	font-weight: var(--font-weight-bold);
	color: var(--color-tertiary-light);
	text-align: center;
}

.course-files-link {
	font-weight: var(--font-weight-bold);
	color: var(--color-tertiary-light) !important;

	&:hover {
		color: var(--color-tertiary-dark) !important;
	}
}
</style>
