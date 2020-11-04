<template>
	<base-header
		v-bind="$attrs"
		anchor="top-right-bottom-placed"
		source="material"
		icon="more_vert"
		v-on="$listeners"
	>
		<div class="subtitle-container">
			<div class="next-lesson-container" :style="calculateColor">
				<base-icon class="clock-icon" source="custom" icon="clock"></base-icon>
				<template v-if="nextLessonDate">
					{{ nextLessonDate }}
				</template>
				<template v-else>
					{{ $t("pages.courses._id.header.noLessonDate") }}
				</template>
			</div>
			<base-link :href="redirectUrl" class="course-files-link">
				<base-icon source="material" icon="folder"></base-icon>
				{{ $t("components.molecules.courseheader.coursedata") }}
			</base-link>
		</div>
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
			default: () => undefined,
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
		calculateColor() {
			if (this.nextLessonDate) {
				return {
					color: "var(--color-tertiary)",
				};
			}
			return {
				color: "var(--color-disabled-dark)",
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.subtitle-container {
	display: flex;
	align-items: center;
}

.clock-icon {
	margin-right: var(--space-xs-3);
}

.next-lesson-container {
	display: flex;
	align-items: center;
	margin-right: var(--space-lg);
	font-family: var(--font-accent);
	font-weight: var(--font-weight-bold);
}

.course-files-link {
	font-family: var(--font-accent);
	font-weight: var(--font-weight-bold);
	color: var(--color-tertiary) !important;

	&:hover {
		color: var(--color-tertiary-dark) !important;
	}
}
</style>
