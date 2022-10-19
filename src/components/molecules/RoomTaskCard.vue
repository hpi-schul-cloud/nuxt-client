<template>
	<v-card
		class="mx-auto mb-4 task-card"
		:class="getStyleClasses()"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		:outlined="isDraft"
		hover
		data-testid="content-card-task"
		@click="handleClick"
		@keydown.enter.self="handleClick"
		@keydown.up.prevent="onKeyPress"
		@keydown.down.prevent="onKeyPress"
		@keydown.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<v-card-text data-testid="content-card-task-content">
			<div class="top-row-container mb-0">
				<div class="title-section" tabindex="0">
					<v-icon size="14">{{ icons.mdiFormatListChecks }}</v-icon>
					{{ cardTitle(task.duedate) }}
				</div>
				<div class="dot-menu-section">
					<more-item-menu
						:menu-items="moreActionsMenuItems[role]"
						:show="true"
						data-testid="content-card-task-menu"
					/>
				</div>
			</div>
			<div class="text-h6 text--primary mb-2 task-name">
				{{ task.name }}
			</div>
			<!-- eslint-disable vue/no-v-html -->
			<div
				v-if="canShowDescription"
				class="text--primary mt-1 mb-0 pb-0 text-description"
				tabindex="0"
				v-html="task.description"
			></div>
		</v-card-text>
		<v-card-text
			v-if="!isPlanned && !isDraft && !isFinished"
			class="ma-0 pb-0 pt-0 submitted-section"
			data-testid="content-card-task-info"
		>
			<div class="chip-items-group">
				<v-chip
					v-for="(chip, index) in chipItems[role]"
					:key="index"
					:class="[chip.class]"
					small
					:data-testid="[chip.testid]"
				>
					<v-icon
						v-if="chip.icon"
						left
						small
						class="fill"
						color="rgba(0, 0, 0, 0.87)"
						d
					>
						{{ chip.icon }}
					</v-icon>
					{{ chip.name }}
				</v-chip>

				<v-custom-chip-time-remaining
					v-if="roles.Student === role && isCloseToDueDate && !isSubmitted"
					type="warning"
					:due-date="task.duedate"
					:shorten-unit="$vuetify.breakpoint.xsOnly"
				/>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1 mt-2" data-testid="content-card-task-actions">
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
import { fromNow } from "@plugins/datetime";
import MoreItemMenu from "./MoreItemMenu";
import {
	mdiPencilOutline,
	mdiFormatListChecks,
	mdiUndoVariant,
	mdiTrashCanOutline,
	mdiContentCopy,
	mdiTextBoxCheckOutline,
} from "@mdi/js";
import { printDateFromStringUTC, fromNowToFuture } from "@plugins/datetime";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import VCustomChipTimeRemaining from "@components/atoms/VCustomChipTimeRemaining";
import { envConfigModule } from "@/store";

const taskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { MoreItemMenu, VCustomChipTimeRemaining },
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
				mdiTextBoxCheckOutline,
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
			const dueDate = this.task.duedate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isFinished() {
			return this.task.status.isFinished;
		},
		isCloseToDueDate() {
			const timeDiff = fromNowToFuture(this.task.duedate, "hours");
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
			return scheduledDate && new Date(scheduledDate) > new Date();
		},
		cardActions() {
			const roleBasedActions = {
				[Roles.Teacher]: [],
				[Roles.Student]: [],
			};

			if (this.role === Roles.Teacher) {
				if (this.isPlanned || (this.isDraft && !this.isFinished)) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.publishCard(),
						name: this.$t("common.action.publish"),
					});
				}
				if (!this.isPlanned && !this.isDraft && !this.isFinished) {
					roleBasedActions[Roles.Teacher].push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
					});
				}
			}

			if (this.role === Roles.Student) {
				if (!this.isFinished) {
					roleBasedActions[Roles.Student].push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
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

			if (this.role === Roles.Teacher) {
				roleBasedChips[Roles.Teacher].push({
					name: `${this.task.status.submitted}/${
						this.task.status.maxSubmissions
					} ${this.$t("pages.room.taskCard.teacher.label.submitted")}`,
					testid: "room-detail-task-chip-submitted",
				});

				roleBasedChips[Roles.Teacher].push({
					name: `${this.task.status.graded}/${
						this.task.status.maxSubmissions
					} ${this.$t("pages.room.taskCard.label.graded")}`,
					testid: "room-detail-task-chip-graded",
				});

				if (this.isOverDue) {
					roleBasedChips[Roles.Teacher].push({
						icon: "$taskMissed",
						name: this.$t(`pages.room.taskCard.teacher.label.overdue`),
						class: "overdue",
					});
				}
			}

			if (this.role === Roles.Student) {
				if (this.isSubmittedNotGraded) {
					roleBasedChips[Roles.Student].push({
						icon: "$taskDone",
						name: this.$t(`pages.room.taskCard.student.label.submitted`),
						class: "submitted",
						testid: "room-detail-task-chip-submitted",
					});
				}

				if (this.isGraded) {
					roleBasedChips[Roles.Student].push({
						icon: "$taskDone",
						name: this.$t(`pages.room.taskCard.student.label.submitted`),
						class: "submitted",
						testid: "room-detail-task-chip-submitted",
					});
					roleBasedChips[Roles.Student].push({
						icon: this.icons.mdiTextBoxCheckOutline,
						name: this.$t(`pages.room.taskCard.label.graded`),
						class: "graded",
						testid: "room-detail-task-chip-graded",
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

			if (this.role === Roles.Teacher) {
				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiPencilOutline,
					action: () =>
						this.redirectAction(
							`/homework/${this.task.id}/edit?returnUrl=rooms/${this.room.roomId}`
						),
					name: this.$t("pages.room.taskCard.label.edit"),
					dataTestId: "content-card-task-menu-edit",
				});

				if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiContentCopy,
						action: () => this.copyCard(),
						name: this.$t("common.actions.copy"),
						dataTestId: "content-card-task-menu-copy",
					});
				}

				if (!this.isDraft && !this.isFinished) {
					roleBasedMoreActions[Roles.Teacher].push({
						icon: this.icons.mdiUndoVariant,
						action: () => this.revertPublishedCard(),
						name: this.$t("pages.room.cards.label.revert"),
						dataTestId: "content-card-task-menu-revert",
					});
				}

				roleBasedMoreActions[Roles.Teacher].push({
					icon: this.icons.mdiTrashCanOutline,
					action: () => this.$emit("delete-task"),
					name: this.$t("common.actions.remove"),
					dataTestId: "content-card-task-menu-remove",
				});
			}

			if (this.role === Roles.Student) {
				// if more action is needed for the students add actions like above
			}

			if (this.isFinished) {
				roleBasedMoreActions[Roles.Teacher].splice(-1, 0, {
					icon: this.icons.mdiUndoVariant,
					action: () => this.restoreCard(),
					name: this.$t("common.labels.restore"),
					dataTestId: "content-card-task-menu-restore",
				});
				roleBasedMoreActions[Roles.Student].push({
					icon: this.icons.mdiUndoVariant,
					action: () => this.restoreCard(),
					name: this.$t("common.labels.restore"),
					dataTestId: "content-card-task-menu-restore",
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
				window.location = `/homework/${this.task.id}`;
			}
		},
		redirectAction(value) {
			window.location = value;
		},
		publishCard() {
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
	grid-template-columns: 95% 5%;
	align-items: center;

	.title-section {
		text-align: left;

		.v-icon {
			padding-bottom: var(--space-xs-4);
		}
	}

	.dot-menu-section {
		text-align: right;
	}
}

.task-name {
	line-height: var(--line-height-md);
}

.text-description {
	font-size: var(--text-md);
}

.action-button {
	color: var(--v-primary-base);
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

	.title-section {
		opacity: 0.65;
	}
}
</style>
