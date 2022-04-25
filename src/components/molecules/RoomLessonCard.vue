<template>
	<v-card
		class="mx-auto mb-4 lesson-card"
		:class="getStyleClasses()"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		@click="handleClick"
		@keydown.enter="handleClick"
		@keydown.up.prevent="onKeyPress"
		@keydown.down.prevent="onKeyPress"
		@keydown.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<v-card-text class="pb-0">
			<div class="top-row-container mb-0">
				<div class="text-h5 title-section text--primary" tabindex="0">
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
		<v-card-actions class="pt-0">
			<v-btn
				v-for="(action, index) in cardActions[role]"
				:key="index"
				:class="`action-button action-button-${action.name
					.split(' ')
					.join('-')}`"
				text
				@click.stop="action.action"
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import {
	mdiPencilOutline,
	mdiUndoVariant,
	mdiShareVariant,
	mdiTrashCanOutline,
} from "@mdi/js";
import MoreItemMenu from "./MoreItemMenu";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
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
		keyDrag: { type: Boolean, required: true },
		dragInProgress: { type: Boolean, required: true },
	},
	data() {
		return {
			icons: {
				mdiPencilOutline,
				mdiUndoVariant,
				mdiShareVariant,
				mdiTrashCanOutline,
			},
			defaultTitleColor: "--color-secondary",
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
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.role === Roles.Teacher) {
				if (this.isHidden) {
					roleBasedActions[Roles.Teacher].push({
						icon: "lessonSend",
						action: () => this.postLesson(),
						name: this.$t("pages.room.lessonCard.label.post"),
					});
				}
			}

			if (this.role === Roles.Student) {
				// if action is needed for the students add actions like above
			}
			return roleBasedActions;
		},
		moreActionsMenuItems() {
			const roleBasedMoreActions = {
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.role === Roles.Teacher) {
				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiPencilOutline,
					action: () =>
						this.redirectAction(
							`/courses/${this.room.roomId}/topics/${this.lesson.id}/edit?returnUrl=rooms/${this.room.roomId}`
						),
					name: this.$t("pages.room.taskCard.label.edit"),
				});

				if (!this.isHidden) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiUndoVariant,
						action: () => this.revertPublishedCard(),
						name: this.$t("pages.room.cards.label.revert"),
					});
				}

				if (EnvConfigModule.getEnv.FEATURE_LESSON_SHARE) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiShareVariant,
						action: () => this.$emit("open-modal", this.lesson.id),
						name: this.$t("pages.room.lessonCard.label.share"),
					});
				}

				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiTrashCanOutline,
					action: () => this.$emit("delete-lesson"),
					name: this.$t("common.actions.remove"),
				});
			}

			if (this.role === Roles.Student) {
				// if more action is needed for the students add actions like above
			}

			return roleBasedMoreActions;
		},
	},
	methods: {
		handleClick() {
			if (!this.dragInProgress) {
				window.location = `/courses/${this.room.roomId}/topics/${this.lesson.id}`;
			}
		},
		redirectAction(value) {
			window.location = value;
		},
		postLesson() {
			this.$emit("post-lesson");
		},
		revertPublishedCard() {
			this.$emit("revert-lesson");
		},
		onKeyPress(e) {
			switch (e.keyCode) {
				case 32:
					this.$emit("on-drag");
					break;
				case 38:
					if (this.keyDrag)
						this.$emit("move-element", {
							id: this.lesson.id,
							moveIndex: -1,
						});
					break;
				case 40:
					if (this.keyDrag)
						this.$emit("move-element", {
							id: this.lesson.id,
							moveIndex: 1,
						});
					break;

				default:
					break;
			}
		},
		getStyleClasses() {
			return this.isHidden ? "hidden-lesson" : "";
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
		align-self: start;
		text-align: right;
	}
}
.action-button {
	color: var(--color-primary);
}
.v-card {
	border-bottom: var(--border-width) solid var(--color-primary-dark);
	border-radius: 0;
	box-shadow: unset !important;

	&:hover {
		border-bottom: var(--border-width) solid transparent;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-m) !important;
	}
}
.hidden-lesson {
	z-index: var(--layer-page);
	opacity: 0.6;
}
</style>
