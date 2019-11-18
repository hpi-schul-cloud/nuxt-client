<template>
	<base-card class="course-card">
		<div v-if="notification" class="notification-dot">
			{{ notification }}
		</div>
		<div class="header">
			<card-tab :background-style="background_style">{{ cardLabel }}</card-tab>
			<div v-if="newAssignments" class="assignments-label">
				{{ newAssignments }}
				<base-icon source="custom" icon="tasks" />
			</div>
		</div>
		<div class="card-info" :style="background_style">
			<h2 class="abrivation-label">{{ courseAbbreviation }}</h2>
			<h3 class="course-name-label">{{ name }}</h3>
		</div>
		<course-card-footer v-bind="$attrs" />
	</base-card>
</template>

<script>
import CourseCardFooter from "./CourseCardFooter";
import CardTab from "@components/atoms/CardTab";

export default {
	components: {
		CourseCardFooter,
		CardTab,
	},
	props: {
		color: {
			type: String,
			required: true,
		},
		colorGradient: {
			type: String,
			required: false,
			default: "",
		},
		teacherIds: {
			type: Array,
			required: false,
			default: () => [],
		},
		abbreviation: {
			type: String,
			required: false,
			default: "",
		},
		name: {
			type: String,
			required: true,
		},
		notification: {
			type: Number,
			default: 0,
			required: false,
		},
		newAssignments: {
			type: Number,
			default: 0,
			required: false,
		},
		teacherName: {
			type: String,
			required: false,
			default: "",
		},
	},
	data() {
		return {
			cardLabel: "",
		};
	},
	computed: {
		background_style() {
			if (this.colorGradient) {
				return (
					"background-image: linear-gradient(-225deg, " +
					this.color +
					" 0%, " +
					this.colorGradient +
					" 100%);"
				);
			} else {
				return "background-color: " + this.color + ";";
			}
		},
		courseAbbreviation() {
			if (this.abbreviation) return this.abbreviation;
			else return this.name.substring(0, 3).toUpperCase();
		},
	},
	created(ctx) {
		this.update();
	},
	methods: {
		async update() {
			try {
				this.teacherName
					? (this.cardLabel = this.teacherName)
					: (this.cardLabel = (await this.$store.dispatch(
							"users/getById",
							this.teacherIds[0]
					  )).displayName);
			} catch (err) {}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.course-card {
	position: relative;
	padding-bottom: 0;
	cursor: pointer;
}

/* ------------------------
  Header
------------------------ */

.header {
	position: relative;
	// text-size + padding top/bottom + overlap
	height: calc(var(--text-md) + 2 * var(--space-xs-2) + var(--space-xs));
	overflow: hidden;
	border-radius: var(--radius-sm);
	border-bottom-left-radius: 0;
}

// Info (right)
.assignments-label {
	display: flex;
	align-items: center;
	float: right;
	padding: var(--space-xs-2) var(--space-xs);
}

// Notification Bubble
.notification-dot {
	--min-size: calc(var(--text-sm) + (2 * var(--space-xs-2)));

	position: absolute;
	bottom: 100%;
	left: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: var(--min-size);
	min-height: var(--min-size);
	padding: 0 var(--space-xs-2);
	font-size: var(--text-sm);
	font-weight: var(--font-weight-bold);
	color: var(--color-white);
	background: var(--color-primary);
	border-radius: var(--radius-round);
	transform: translate(-50%, 50%);
}

/* ------------------------
  Body
------------------------ */

.card-info {
	position: relative;
	padding: var(--space-sm) var(--space-xs);
	margin-top: calc(var(--space-xs) * -1);
	color: var(--color-white);
	border-radius: var(--radius-sm);
	p {
		margin: 0;
		font-family: var(--font-primary);
	}
}

.abrivation-label {
	margin: 0;
	font-family: var(--font-primary);
	font-size: var(--heading-1);
	font-weight: var(--font-weight-bold);
	color: var(--color-white);
	text-transform: uppercase;
}

.course-name-label {
	margin: var(--space-xs-3) 0 0 0;
	overflow: hidden;
	font-size: var(--text-lg);
	font-weight: var(--font-weight-bold);
	line-height: inherit;
	color: var(--color-white);
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
