<template>
	<v-card
		class="mx-auto mb-4 lesson-card"
		max-width="100%"
		:aria-label="ariaLabel"
		:href="lessonHref(lesson.id, room.roomId)"
		tabindex="0"
		outlined
	>
		<v-card-text>
			<div class="top-row-container mb-1">
				<div class="text-h6 title-section text--primary" tabindex="0">
					{{ lesson.name }}
				</div>
				<div class="dot-menu-section">
					<more-item-menu
						:menu-items="moreActionsMenuItems[role]"
						:show="true"
					/>
				</div>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1">
			<v-btn
				v-for="(action, index) in cardActions[role]"
				:key="index"
				class="action-button"
				text
				:color="titleColor"
				@click.prevent="action.action"
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mdiDotsVertical, mdiPencilOutline } from "@mdi/js";
import MoreItemMenu from "./MoreItemMenu";
const lessonRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { MoreItemMenu },
	props: {
		lesson: {
			type: Object,
			required: true,
			validator: (lesson) => lessonRequiredKeys.every((key) => key in lesson),
		},
		room: {
			type: Object,
			required: true,
		},
		role: { type: String, required: true },
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			mdiDotsVertical,
			mdiPencilOutline,
			defaultTitleColor: "#54616e",
		};
	},
	computed: {
		titleColor() {
			return this.room.displayColor || this.defaultTitleColor;
		},
		isHidden() {
			return this.lesson.hidden;
		},
		cardActions() {
			const roleBasedActions = {
				teacher: [],
				student: [],
			};

			if (this.role == "teacher") {
				if (this.isHidden) {
					roleBasedActions.teacher.push({
						icon: "lessonSend",
						action: () => this.postLesson(),
						name: this.$t("pages.room.lessonCard.label.post"),
					});
				}
			}

			if (this.role == "student") {
				// if action is needed for the students add actions like above
			}
			return roleBasedActions;
		},
		moreActionsMenuItems() {
			const roleBasedMoreActions = {
				teacher: [],
				student: [],
			};

			if (this.role == "teacher") {
				roleBasedMoreActions.teacher.push({
					icon: this.mdiPencilOutline,
					action: () =>
						this.redirectAction(
							`/courses/${this.room.roomId}/topics/${this.lesson.id}/edit`
						),
					name: this.$t("pages.room.taskCard.label.edit"),
				});
			}

			if (this.role == "student") {
				// if more action is needed for the students add actions like above
			}

			return roleBasedMoreActions;
		},
	},
	methods: {
		lessonHref: (id, roomId) => {
			return `/courses/${roomId}/topics/${id}`;
		},
		redirectAction(value) {
			window.location = value;
		},
		postLesson() {
			console.log("post lesson");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
.top-row-container {
	display: grid;
	grid-template-columns: 95% 5%;
	align-items: center;
	.title-section {
		text-align: left;
	}
	.dot-menu-section {
		text-align: right;
	}
}
.action-button {
	color: var(--color-primary);
}
.v-card {
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;

	&:hover {
		box-shadow: var(--shadow-m);
	}
}
.v-card__text {
	padding-bottom: var(--space-xs-4);
}
</style>
