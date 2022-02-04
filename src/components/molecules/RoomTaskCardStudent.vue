<template>
	<v-card
		class="mx-auto mb-4 task-card"
		max-width="100%"
		:aria-label="ariaLabel"
		:href="taskHref(task.id)"
		tabindex="0"
	>
		<v-card-text>
			<div class="top-row-container mb-1">
				<div class="icon-section">
					<v-icon>{{ mdiFormatListChecks }}</v-icon>
				</div>
				<div class="title-section">
					{{ cardTitle(task.duedate) }}
				</div>
				<div class="dot-menu-section">
					<!-- Action menu to be determined with UXers-->
					<v-icon>{{ mdiDotsVertical }}</v-icon>
				</div>
			</div>
			<div class="text-h4 text--primary">{{ task.name }}</div>
			<div class="text--primary mt-1">{{ task.description }}</div>
		</v-card-text>
		<v-card-text v-if="!isFinished" class="ma-0 pb-0 pt-0">
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
				color="#0091EA"
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

// TODO - remove inline css
// TODO - Remove lorem ipsum
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
		};
	},
	computed: {
		isOverDue() {
			const dueDate = this.task.duedate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isFinished() {
			return this.task.status.isFinished;
		},
		cardActions() {
			// TODO: add i18i files
			// TODO: actions must be controled by UX
			if (this.isFinished) {
				return [
					{
						icon: "taskRestore",
						action: "action name",
						name: "Restore",
					},
				];
			}

			if (!this.isFinished) {
				return [
					{
						icon: "taskSend",
						action: "action name",
						name: "Send",
					},
					{
						icon: "taskFinish",
						action: "action name",
						name: "Finish",
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
	grid-template-columns: 5% 90% 5%;
	align-items: center;
	.icon-section {
		overflow: none;
		text-align: left;
	}
	.title-section {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		color: #0091ea;
		text-align: left;
	}
	.dot-menu-section {
		text-align: right;
	}
}

.chip-items-group {
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		minmax(var(--space-xl-4), var(--space-xl-5))
	);
	grid-gap: var(--space-md);
	align-items: center;
	vertical-align: middle;
	.chip-item {
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

@media #{map-get($display-breakpoints, 'xs-only')} {
	.title-section {
		padding-left: var(--text-sm);
	}
}
</style>
