<template>
	<v-card
		class="mx-auto mb-4 task-card"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		outlined
		@click="handleClick"
		@keydown.enter="handleClick"
		@keydown.up.prevent="onKeyPress"
		@keydown.down.prevent="onKeyPress"
		@keydown.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<v-card-text>
			<div class="top-row-container mb-0">
				<div class="title-section" tabindex="0" :style="`color: ${titleColor}`">
					<v-icon size="20" :color="task.displayColor" dark>{{
						icons.mdiFormatListChecks
					}}</v-icon>
					{{ cardTitle(task.duedate) }}
				</div>
				<div class="dot-menu-section">
					<more-item-menu
						:menu-items="moreActionsMenuItems[role]"
						:show="true"
					/>
				</div>
			</div>
			<div class="text-h6 text--primary">{{ task.name }}</div>
			<!-- eslint-disable vue/no-v-html -->
			<div
				v-if="canShowDescription"
				class="text--primary mt-1 mb-0 pb-0 text-description"
				tabindex="0"
				v-html="task.description"
			></div>
		</v-card-text>
		<v-card-text v-if="!isDraft" class="ma-0 pb-0 pt-0 submitted-section">
			<div class="chip-items-group">
				<div
					v-if="roles.Teacher === role"
					class="grey lighten-2 chip-item pa-1 mr-1 mb-0"
					tabindex="0"
				>
					<div class="chip-value">
						{{
							`${task.status.submitted}/${task.status.maxSubmissions} ${$t(
								"pages.room.taskCard.label.submitted"
							)}`
						}}
					</div>
				</div>
				<div
					v-if="roles.Teacher === role"
					class="grey lighten-2 chip-item pa-1 mr-1 mb-0"
					tabindex="0"
				>
					<div class="chip-value">
						{{
							`${task.status.graded}/${task.status.maxSubmissions} ${$t(
								"pages.room.taskCard.label.graded"
							)}`
						}}
					</div>
				</div>
				<div
					v-if="isOverDue"
					class="grey lighten-2 chip-item pa-1 mr-1 mb-0 overdue"
					tabindex="0"
				>
					<div class="chip-value">
						{{ $t(`pages.room.taskCard.${role}.label.overdue`) }}
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1">
			<v-btn
				v-for="(action, index) in cardActions[role]"
				:key="index"
				:class="`action-button action-button-${action.name
					.split(' ')
					.join('-')}`"
				text
				:color="titleColor"
				@click.stop="action.action"
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import MoreItemMenu from "./MoreItemMenu";
import {
	mdiPencilOutline,
	mdiFormatListChecks,
	mdiUndoVariant,
	mdiTrashCanOutline,
	mdiContentCopy,
} from "@mdi/js";
import { printDateFromStringUTC } from "@plugins/datetime";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";

const taskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { MoreItemMenu },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
		room: {
			type: Object,
			default: () => {},
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
			fromNow,
			icons: {
				mdiFormatListChecks,
				mdiPencilOutline,
				mdiUndoVariant,
				mdiTrashCanOutline,
				mdiContentCopy,
			},
			defaultTitleColor: "--color-secondary",
			roles: Roles,
			canShowDescription: false,
		};
	},
	computed: {
		titleColor() {
			return this.task.displayColor || this.defaultTitleColor;
		},
		isDraft() {
			return this.task.status.isDraft;
		},
		isOverDue() {
			const dueDate = this.task.duedate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isFinished() {
			return this.task.status.isFinished;
		},
		cardActions() {
			const roleBasedActions = {
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.role === Roles.Teacher) {
				if (this.isDraft && !this.isFinished) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.publishDraftCard(),
						name: this.$t("pages.room.taskCard.label.post"),
					});
				}
				if (!this.isDraft) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
					});
				}
				if (this.isFinished) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.restoreCard(),
						name: this.$t("pages.room.taskCard.label.reopen"),
					});
				}
			}

			if (this.role === Roles.Student) {
				if (this.isFinished) {
					roleBasedActions[Roles.Student].push({
						action: () => this.restoreCard(),
						name: this.$t("pages.room.taskCard.label.reopen"),
					});
				}

				if (!this.isFinished) {
					roleBasedActions[Roles.Student].push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
					});
				}
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
							`/homework/${this.task.id}/edit?returnUrl=rooms/${this.room.roomId}`
						),
					name: this.$t("pages.room.taskCard.label.edit"),
				});

				if (!this.isDraft && !this.isFinished) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiUndoVariant,
						action: () => this.revertPublishedCard(),
						name: this.$t("pages.room.cards.label.revert"),
					});
				}

				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiTrashCanOutline,
					action: () => this.$emit("delete-task"),
					name: this.$t("common.actions.remove"),
				});

				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiContentCopy,
					action: () =>
						this.redirectAction(
							`/homework/${this.task.id}/copy?returnUrl=rooms/${this.room.roomId}`
						),
					name: this.$t("common.actions.copy"),
				});
			}

			if (this.role === Roles.Student) {
				// if more action is needed for the students add actions like above
			}
			return roleBasedMoreActions;
		},
	},
	methods: {
		cardTitle(dueDate) {
			const dueTitle = !dueDate
				? this.$t("pages.room.taskCard.label.noDueDate")
				: `${this.$t(
						"pages.room.taskCard.label.due"
				  )} - ${printDateFromStringUTC(dueDate)}`;

			return `${this.$t("pages.room.taskCard.label.task")} - ${dueTitle}`;
		},
		handleClick() {
			if (!this.dragInProgress) {
				window.location = `/homework/${this.task.id}`;
			}
		},
		redirectAction(value) {
			window.location = value;
		},
		publishDraftCard() {
			this.$emit("post-task");
		},
		revertPublishedCard() {
			this.$emit("revert-task");
		},
		finishCard() {
			this.$emit("finish-task");
		},
		restoreCard() {
			this.$emit("restore-task");
		},
		onKeyPress(e) {
			switch (e.keyCode) {
				case 32:
					this.$emit("on-drag");
					break;
				case 38:
					if (this.keyDrag)
						this.$emit("move-element", {
							id: this.task.id,
							moveIndex: -1,
						});
					break;
				case 40:
					if (this.keyDrag)
						this.$emit("move-element", {
							id: this.task.id,
							moveIndex: 1,
						});
					break;

				default:
					break;
			}
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
	.icon-section {
		overflow: none;
		text-align: left;
	}
	.title-section {
		color: var(--color-primary);
		text-align: left;
	}
	.dot-menu-section {
		text-align: right;
	}
}
.text-description {
	font-size: var(--text-md);
}
.chip-items-group {
	vertical-align: middle;
	.chip-item {
		display: inline-block;
		width: fit-content;
		text-align: center;
		border-radius: var(--radius-sm);
		.chip-value {
			font-size: var(--text-sm);
			/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
			color: rgba(0, 0, 0, 0.87);
		}
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
