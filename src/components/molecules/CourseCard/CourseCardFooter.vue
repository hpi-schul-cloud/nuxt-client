<template>
	<div class="footer">
		<div v-if="alert" class="alert">
			<pulsating-dot class="alert-dot"></pulsating-dot>

			<div class="alert-label">{{ alert }}</div>
		</div>
		<div v-else class="next-course">
			<template v-if="nextCourseTime">
				<div class="next-course-icon">
					<base-icon source="custom" icon="clock" />
				</div>
				<span class="truncate">
					{{ nextCourseTime }} | {{ nextCourseRoom }}
				</span>
			</template>
		</div>
	</div>
</template>

<script>
import PulsatingDot from "@components/atoms/PulsatingDot";

export default {
	components: { PulsatingDot },
	props: {
		alert: {
			type: String,
			required: false,
			default: ""
		},
		nextCourseTime: {
			type: String,
			required: false,
			default: ""
		},
		nextCourseRoom: {
			type: String,
			required: false,
			default: ""
		}
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.footer {
	padding: var(--space-xs-4) 0;
	overflow: hidden;
	font-family: var(--font-accent);
}

.next-course {
	display: flex;
	align-items: center;
	min-height: calc(1em + 2 * var(--space-xs-3));
	.next-course-icon {
		display: inline-flex;
		align-items: center;
		margin-right: var(--space-xs-3);
	}
}

.alert {
	display: flex;
	align-items: center;
	min-height: calc(1em + 2 * var(--space-xs-3));
	.alert-label {
		flex: 1;
		margin-left: var(--space-xs-3);
		font-weight: var(--font-weight-bold);
		color: var(--color-danger);
	}
}
</style>
