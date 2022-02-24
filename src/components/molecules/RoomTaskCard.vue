<template>
	<v-card
		class="mx-auto mb-4 task-card"
		max-width="100%"
		:aria-label="ariaLabel"
		:href="taskHref(task.id)"
		tabindex="0"
		outlined
	>
		<v-card-text>
			<div class="top-row-container mb-1">
				<div class="title-section" tabindex="0" :style="`color: ${titleColor}`">
					<v-icon size="20" :color="task.displayColor" dark>{{
						mdiFormatListChecks
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
				class="text--primary mt-1 text-description"
				tabindex="0"
				v-html="task.description"
			></div>
		</v-card-text>
		<v-card-text v-if="!isDraft" class="ma-0 pb-0 pt-0 submitted-section">
			<div class="chip-items-group">
				<div class="grey lighten-2 chip-item pa-1 mr-1 mb-1" tabindex="0">
					<div class="chip-value">
						{{
							`${task.status.submitted}/${task.status.maxSubmissions} ${$t(
								"pages.room.taskCard.label.submitted"
							)}`
						}}
					</div>
				</div>
				<div class="grey lighten-2 chip-item pa-1 mr-1 mb-1" tabindex="0">
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
					class="grey lighten-2 chip-item pa-1 mr-1 mb-1 overdue"
					tabindex="0"
				>
					<div class="chip-value">
						{{ $t("pages.room.taskCard.teacher.label.overdue") }}
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
				@click.prevent="action.action"
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import MoreItemMenu from "./MoreItemMenu";
import { mdiPencilOutline, mdiFormatListChecks } from "@mdi/js";
import { printDateFromStringUTC } from "@plugins/datetime";

const taskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: { MoreItemMenu },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
		role: { type: String, required: true },
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			fromNow,
			iconStyle: { height: "20px", minWidth: "20px", width: "20px" },
			mdiFormatListChecks,
			mdiPencilOutline,
			defaultTitleColor: "#54616e",
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
				teacher: [],
				student: [],
			};

			if (this.role == "teacher") {
				if (this.isDraft && !this.isFinished) {
					roleBasedActions.teacher.push({
						action: () => this.publishDraftCard(),
						name: this.$t("pages.room.taskCard.label.post"),
					});
				}
				if (!this.isDraft) {
					roleBasedActions.teacher.push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
					});
				}
				if (this.isFinished) {
					roleBasedActions.teacher.push({
						action: () => this.restoreCard(),
						name: this.$t("pages.room.taskCard.label.reopen"),
					});
				}
			}

			if (this.role == "student") {
				if (this.isFinished) {
					roleBasedActions.student.push({
						action: () => this.restoreCard(),
						name: this.$t("pages.room.taskCard.label.reopen"),
					});
				}

				if (!this.isFinished) {
					roleBasedActions.student.push({
						action: () => this.finishCard(),
						name: this.$t("pages.room.taskCard.label.done"),
					});
				}
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
					action: () => this.redirectAction(`/homework/${this.task.id}/edit`),
					name: this.$t("pages.room.taskCard.label.edit"),
				});

				if (!this.isDraft && !this.isFinished) {
					roleBasedMoreActions.teacher.push({
						icon: this.mdiPencilOutline,
						action: () => this.revertPublishedCard(),
						name: this.$t("pages.room.taskCard.label.revert"),
					});
				}
			}

			if (this.role == "student") {
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
		taskHref: (id) => {
			return `/homework/${id}`;
		},
		redirectAction(value) {
			window.location = value;
		},
		publishDraftCard() {
			console.log("posted");
		},
		revertPublishedCard() {
			console.log("reverted");
		},
		finishCard() {
			console.log("finish");
		},
		restoreCard() {
			console.log("restore");
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
