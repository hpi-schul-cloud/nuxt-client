<template>
	<div class="footer">
		<div v-if="course.alert" class="alert">
			<pulsating-dot class="alert-dot"></pulsating-dot>

			<div class="alert-label">{{ course.alert }}</div>
		</div>
		<div v-else-if="course.nextCourseTime" class="next-course truncate">
			<div class="next-course-icon">
				<base-icon source="custom" icon="clock" />
			</div>
			{{ course.nextCourseTime }} | {{ course.nextCourseRoom }}
		</div>
	</div>
</template>

<script>
import PulsatingDot from "@components/PulsatingDot";

export default {
	components: { PulsatingDot },
	props: {
		course: {
			type: Object,
			default: () => ({
				alert: "",
				nextCourseTime: "",
				nextCourseRoom: "",
			}),
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.footer {
	overflow: hidden;
}

.next-course {
	display: flex;
	align-items: center;
	.next-course-icon {
		display: inline-flex;
		align-items: center;
	}
}

.alert {
	display: flex;
	align-items: center;
	.alert-label {
		flex: 1;
		font-weight: bold;
		color: var(--color-error);
	}
}
</style>
