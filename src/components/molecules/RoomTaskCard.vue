<template>
	<v-card
		class="mx-auto mb-4 task-card"
		:class="getStyleClasses()"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		:variant="isDraft ? 'outlined' : 'elevated'"
		hover
		:data-testid="`room-task-card-${taskCardIndex}`"
		@click="handleClick"
		@keydown.enter.self="handleClick"
		@keydown.up.prevent="onKeyPress"
		@keydown.down.prevent="onKeyPress"
		@keydown.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<v-card-text data-testid="content-card-task-content">
			<div class="top-row-container mb-0">
				<div class="tagline" :data-testid="`task-card-title-${taskCardIndex}`">
					<v-icon size="14" class="fill" :icon="titleIcon" />
					{{ cardTitle(task.dueDate) }}
				</div>
				<div class="dot-menu-section">
					<room-dot-menu
						:menu-items="moreActionsMenuItems[userRole]"
						:data-testid="`task-card-menu-${taskCardIndex}`"
						:aria-label="$t('pages.room.taskCard.menu.ariaLabel')"
					/>
				</div>
			</div>
			<h2
				class="text-h6 mt-1 mb-2 task-name"
				tabindex="-1"
				:data-testid="`task-title-${taskCardIndex}`"
			>
				{{ task.name }}
			</h2>
			<RenderHTML
				v-if="canShowDescription"
				class="text--primary mt-1 mb-0 pb-0 text-description"
				tabindex="0"
				:html="task.description"
			/>
		</v-card-text>
		<v-card-text
			v-if="!isPlanned && !isDraft && !isFinished"
			class="ma-0 pb-0 pt-0 submitted-section"
			:data-testid="`task-card-info-${taskCardIndex}`"
		>
			<div class="chip-items-group">
				<v-chip
					v-for="(chip, index) in chipItems[userRole]"
					:key="index"
					:class="[chip.class]"
					size="small"
					:data-testid="[chip.testid]"
				>
					<v-icon
						v-if="chip.icon"
						start
						size="small"
						class="fill"
						color="rgba(0, 0, 0, 0.87)"
					>
						{{ chip.icon }}
					</v-icon>
					{{ chip.name }}
				</v-chip>
				<v-custom-chip-time-remaining
					v-if="roles.Student === userRole && isCloseToDueDate && !isSubmitted"
					type="warning"
					:due-date="task.dueDate"
					:shorten-unit="$vuetify.display.xs"
				/>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1 mt-2" data-testid="content-card-task-actions">
			<v-btn
				v-for="(action, index) in cardActions[userRole]"
				:key="index"
				:class="`action-button`"
				variant="text"
				color="primary"
				:data-testid="action.testid"
				@click.stop="action.action"
			>
				{{ action.name }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import VCustomChipTimeRemaining from "@/components/atoms/VCustomChipTimeRemaining.vue";
import {
	fromNow,
	fromNowToFuture,
	printDateFromStringUTC,
} from "@/plugins/datetime";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import { RenderHTML } from "@feature-render-html";
import {
	mdiContentCopy,
	mdiFormatListChecks,
	mdiPencilOutline,
	mdiShareVariantOutline,
	mdiTextBoxCheckOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
} from "@icons/material";
import { RoomDotMenu } from "@ui-room-details";

const taskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { RoomDotMenu, VCustomChipTimeRemaining, RenderHTML },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
		room: {
			type: Object,
			default: () => ({}),
		},
		userRole: { type: String, required: true },
		ariaLabel: {
			type: String,
			default: "",
		},
		keyDrag: { type: Boolean, required: true },
		dragInProgress: { type: Boolean, required: true },
		taskCardIndex: { type: Number, required: true },
	},
	emits: [
		"update-visibility",
		"finish-task",
		"restore-task",
		"delete-task",
		"copy-task",
		"share-task",
		"on-drag",
		"move-element",
		"tab-pressed",
	],
	data() {
		return {
			fromNow,
			icons: {
				mdiFormatListChecks,
				mdiPencilOutline,
				mdiUndoVariant,
				mdiTrashCanOutline,
				mdiContentCopy,
				mdiTextBoxCheckOutline,
				mdiShareVariantOutline,
			},
			roles: Roles,
			canShowDescription: false,
		};
	},
	computed: {
		isDraft() {
			return this.task.status.isDraft;
		},
		isOverDue() {
			const dueDate = this.task.dueDate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isFinished() {
			return this.task.status.isFinished;
		},
		isCloseToDueDate() {
			const timeDiff = fromNowToFuture(this.task.dueDate, "hours");
			if (timeDiff !== null) {
				return timeDiff <= 24;
			}
			return false;
		},
		isGraded() {
			return this.task.status.graded;
		},
		isSubmitted() {
			return this.task.status.submitted;
		},
		isSubmittedNotGraded() {
			return this.task.status.submitted && !this.task.status.graded;
		},
		isPlanned() {
			const scheduledDate = this.task.availableDate;
			const delay = 5 * 1000;
			return (
				scheduledDate &&
				new Date(scheduledDate).getTime() - delay > new Date().getTime()
			);
		},
		titleIcon() {
			return "$tasks";
		},
		cardActions() {
			const roleBasedActions = {
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.userRole === Roles.Teacher) {
				if (this.isPlanned || (this.isDraft && !this.isFinished)) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.publishCard(),
						name: this.$t("common.action.publish"),
						testid: `task-card-action-publish-${this.taskCardIndex}`,
					});
				}
				if (!this.isPlanned && !this.isDraft && !this.isFinished) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
						testid: `task-card-action-done-${this.taskCardIndex}`,
					});
				}
			}

			if (this.userRole === Roles.Student) {
				if (!this.isFinished) {
					roleBasedActions[Roles.Student].push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
						testid: `task-card-action-done-${this.taskCardIndex}`,
					});
				}
			}

			return roleBasedActions;
		},
		chipItems() {
			const roleBasedChips = {
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.userRole === Roles.Teacher) {
				roleBasedChips[Roles.Teacher].push({
					name: `${this.task.status.submitted}/${
						this.task.status.maxSubmissions
					} ${this.$t("pages.room.taskCard.teacher.label.submitted")}`,
					testid: `room-task-card-chip-submitted-${this.taskCardIndex}`,
				});

				roleBasedChips[Roles.Teacher].push({
					name: `${this.task.status.graded}/${
						this.task.status.maxSubmissions
					} ${this.$t("pages.room.taskCard.label.graded")}`,
					testid: `room-task-card-chip-graded-${this.taskCardIndex}`,
				});

				if (this.isOverDue) {
					roleBasedChips[Roles.Teacher].push({
						icon: "$taskMissed",
						name: this.$t(`pages.room.taskCard.teacher.label.overdue`),
						class: "overdue",
						testid: `room-task-card-chip-overdue-${this.taskCardIndex}`,
					});
				}
			}

			if (this.userRole === Roles.Student) {
				if (this.isSubmittedNotGraded) {
					roleBasedChips[Roles.Student].push({
						icon: "$taskDone",
						name: this.$t(`pages.room.taskCard.student.label.submitted`),
						class: "submitted",
						testid: `room-task-card-chip-submitted-${this.taskCardIndex}`,
					});
				}

				if (this.isGraded) {
					roleBasedChips[Roles.Student].push({
						icon: "$taskDone",
						name: this.$t(`pages.room.taskCard.student.label.submitted`),
						class: "submitted",
						testid: `room-task-card-chip-submitted-${this.taskCardIndex}`,
					});
					roleBasedChips[Roles.Student].push({
						icon: this.icons.mdiTextBoxCheckOutline,
						name: this.$t(`pages.room.taskCard.label.graded`),
						class: "graded",
						testid: `room-task-card-chip-graded-${this.taskCardIndex}`,
					});
				}

				if (this.isOverDue && !this.isSubmitted) {
					roleBasedChips[Roles.Student].push({
						icon: "$taskMissed",
						name: this.$t(`pages.room.taskCard.student.label.overdue`),
						class: "overdue",
					});
				}
			}

			return roleBasedChips;
		},
		moreActionsMenuItems() {
			const roleBasedMoreActions = {
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.userRole === Roles.Teacher) {
				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiPencilOutline,
					action: () =>
						this.redirectAction(
							`/homework/${this.task.id}/edit?returnUrl=rooms/${this.room.roomId}`
						),
					name: this.$t("pages.room.taskCard.label.edit"),
					dataTestId: `room-task-card-menu-edit-${this.taskCardIndex}`,
				});

				if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiContentCopy,
						action: () => this.copyCard(),
						name: this.$t("common.actions.copy"),
						dataTestId: `room-task-card-menu-copy-${this.taskCardIndex}`,
					});
				}

				if (envConfigModule.getEnv.FEATURE_TASK_SHARE) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiShareVariantOutline,
						action: () => this.$emit("share-task", this.task.id),
						name: this.$t("common.actions.shareCopy"),
						dataTestId: `room-task-card-menu-share-${this.taskCardIndex}`,
					});
				}

				if (!this.isDraft && !this.isFinished) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiUndoVariant,
						action: () => this.unPublishCard(),
						name: this.$t("pages.room.cards.label.revert"),
						dataTestId: `room-task-card-menu-revert-${this.taskCardIndex}`,
					});
				}

				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiTrashCanOutline,
					action: () => this.$emit("delete-task"),
					name: this.$t("common.actions.delete"),
					dataTestId: `room-task-card-menu-remove-${this.taskCardIndex}`,
				});
			}

			if (this.isFinished) {
				roleBasedMoreActions[Roles.Teacher].splice(-1, 0, {
					icon: this.icons.mdiUndoVariant,
					action: () => this.restoreCard(),
					name: this.$t("common.labels.restore"),
					dataTestId: `room-task-card-menu-restore-${this.taskCardIndex}`,
				});
				roleBasedMoreActions[Roles.Student].push({
					icon: this.icons.mdiUndoVariant,
					action: () => this.restoreCard(),
					name: this.$t("common.labels.restore"),
					dataTestId: `room-task-card-menu-restore-${this.taskCardIndex}`,
				});
			}
			return roleBasedMoreActions;
		},
	},
	methods: {
		cardTitle(dueDate) {
			if (this.isFinished) {
				return this.$t("pages.room.taskCard.label.taskDone");
			}

			const titlePrefix = this.$t("common.words.task");
			let titleSuffix = "";

			if (this.isDraft) {
				titleSuffix = this.$t("common.words.draft");
			} else if (dueDate) {
				titleSuffix = this.isPlanned
					? `${this.$t("pages.tasks.labels.planned")} ${printDateFromStringUTC(
							this.task.availableDate
						)}`
					: `${this.$t(
							"pages.room.taskCard.label.due"
						)} ${printDateFromStringUTC(dueDate)}`;
			} else {
				titleSuffix = this.$t("pages.room.taskCard.label.noDueDate");
			}

			return `${titlePrefix} – ${titleSuffix}`;
		},
		handleClick() {
			if (!this.dragInProgress) {
				this.redirectAction(`/homework/${this.task.id}`);
			}
		},
		redirectAction(value) {
			window.location = value;
		},
		publishCard() {
			this.$emit("update-visibility", true);
		},
		unPublishCard() {
			this.$emit("update-visibility", false);
		},
		finishCard() {
			this.$emit("finish-task");
		},
		restoreCard() {
			this.$emit("restore-task");
		},
		copyCard() {
			this.$emit("copy-task");
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
		getStyleClasses() {
			return this.isPlanned || (this.isDraft && !this.isFinished)
				? "task-hidden"
				: "";
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

.top-row-container {
	display: grid;
	grid-template-columns: 94% 6%;
	align-items: center;

	.tagline {
		text-align: left;

		.v-icon {
			padding-bottom: var(--space-xs-4);
		}
	}

	.dot-menu-section {
		text-align: right;
		height: calc(var(--space-base-vuetify) * 9);
	}
}

.task-name {
	line-height: var(--line-height-md);
}

.text-description {
	font-size: var(--text-md);
}

.chip-items-group {
	vertical-align: middle;
}

.v-chip {
	margin-right: var(--space-xs);
}

.v-card__text {
	padding-bottom: var(--space-xs-4);
}

.task-hidden {
	.task-name,
	.text-description,
	.submitted-section {
		opacity: 0.5;
	}

	.tagline {
		opacity: 0.65;
	}
}
</style>
