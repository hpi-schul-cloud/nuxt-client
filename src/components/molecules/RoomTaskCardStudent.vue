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
				<div class="title-section" :style="`color: ${titleColor}`" tabindex="0">
					<v-icon size="20" :color="task.displayColor" dark>{{
						mdiFormatListChecks
					}}</v-icon>
					{{ cardTitle(task.duedate) }}
				</div>
				<div class="dot-menu-section">
					<!-- Action menu to be determined with UXers-->
					<v-icon>{{ mdiDotsVertical }}</v-icon>
				</div>
			</div>
			<div class="text-h6 text--primary">
				{{ task.name }}
			</div>
			<!-- eslint-disable vue/no-v-html -->
			<div
				v-if="!isFinished"
				class="text--primary mt-1 text-description"
				v-html="task.description"
			></div>
		</v-card-text>
		<v-card-text v-if="showChips" class="ma-0 pb-0 pt-0 submitted-section">
			<div class="chip-items-group">
				<div class="grey lighten-2 chip-item pa-1">
					<div
						v-for="(state, index) in taskStates"
						:key="index"
						class="chip-value"
					>
						<v-icon class="icon-color">
							{{ state.icon }}
						</v-icon>
						{{ $t(`pages.room.taskCard.label.${state.name}`) }}
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1">
			<v-btn
				v-for="(action, index) in cardActions"
				:key="index"
				class="action-button"
				text
				:color="titleColor"
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { mdiDotsVertical } from "@mdi/js";
import { printDateFromStringUTC } from "@plugins/datetime";
import { mdiFormatListChecks } from "@mdi/js";

const taskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: {},
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
		type: {
			type: String,
			default: "",
		},
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			fromNow,
			iconStyle: { height: "20px", minWidth: "20px", width: "20px" },
			mdiDotsVertical: mdiDotsVertical,
			mdiFormatListChecks: mdiFormatListChecks,
			defaultTitleColor: "#54616e",
			// showChips is false until decided in next iterations
			showChips: false,
		};
	},
	computed: {
		titleColor() {
			return this.task.displayColor || this.defaultTitleColor;
		},
		isOverDue() {
			const dueDate = this.task.duedate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isFinished() {
			return this.task.status.isFinished;
		},
		cardActions() {
			if (this.isFinished) {
				return [
					{
						icon: "taskRestore",
						action: "action name",
						name: this.$t("pages.room.taskCard.label.reopen"),
					},
				];
			}

			if (!this.isFinished) {
				return [
					{
						icon: "taskFinish",
						action: "action name",
						name: this.$t("pages.room.taskCard.label.done"),
					},
				];
			}
			return [];
		},
		taskStates() {
			const { status } = this.task;
			if (status.submitted && !status.graded) {
				return [
					{
						icon: "$taskDone",
						name: "submitted",
					},
				];
			}

			if (status.graded) {
				return [
					{
						icon: "$taskDoneFilled",
						name: "graded",
					},
				];
			}

			if (this.isOverDue) {
				return [
					{
						icon: "$taskMissed",
						name: "overdue",
					},
				];
			}

			return [
				{
					icon: "$taskOpenFilled",
					name: "open",
				},
			];
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
			.icon-color {
				fill: #0091ea;
			}
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
