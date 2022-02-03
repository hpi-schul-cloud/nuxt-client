<template>
	<v-card
		class="mx-auto mb-4"
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
					<span> {{ cardTitle(task.duedate) }} </span>
				</div>
				<div class="dot-menu-section">
					<!-- Action menu to be determined with UXers-->
					<v-icon>{{ mdiDotsVertical }}</v-icon>
				</div>
			</div>
			<div class="text-h4 text--primary">{{ task.name }}</div>
			<div class="text--primary mt-1">{{ task.description }}</div>
		</v-card-text>
		<v-card-text class="ma-0 pb-0 pt-0">
			<div class="chip-items-group">
				<div class="grey lighten-2 chip-item pa-1">
					<div v-if="taskState === submitted" class="chip-value">
						<v-icon class="icon-color">{{ taskIcon }}</v-icon>
						{{ $t("pages.room.studentTaskCard.submitted") }}
					</div>
					<div v-else-if="taskState === graded" class="chip-value">
						<v-icon class="icon-color">{{ taskIcon }}</v-icon>
						{{ $t("pages.room.studentTaskCard.graded") }}
					</div>
					<div v-else-if="taskState === overdue" class="chip-value">
						<v-icon class="icon-color">{{ taskIcon }}</v-icon>
						{{ $t("pages.room.studentTaskCard.overdue") }}
					</div>
					<div v-else class="chip-value">
						<v-icon class="icon-color">{{ taskIcon }}</v-icon>
						{{ $t("pages.room.studentTaskCard.open") }}
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-actions v-if="!isFinished" class="pt-0">
			<v-btn text color="#0091EA">
				{{ $t("pages.room.studentTaskCard.done") }}
			</v-btn>
		</v-card-actions>
		<v-card-actions v-else class="pt-0">
			<v-btn text color="#0091EA">
				{{ $t("pages.room.studentTaskCard.reopen") }}
			</v-btn>
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
		avatarIcon() {
			return this.isDraft ? "$taskDraft" : "$taskOpenFilled";
		},
		iconColor() {
			return this.task.displayColor || this.defaultIconColor;
		},
		defaultIconColor() {
			return "#54616e";
		},
		isOverDue() {
			const dueDate = this.task.duedate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isFinished() {
			return this.task.status.isFinished;
		},
		taskState() {
			const { status } = this.task;

			if (status.submitted && !status.graded) return "submitted";
			if (status.graded) return "graded";
			if (this.isOverDue) return "overdue";
			return "open";
		},
		taskIcon() {
			const stateIcons = {
				overdue: "$taskMissed",
				submitted: "$taskDone",
				graded: "$taskDoneFilled",
				open: "$taskOpenFilled",
			};
			return stateIcons[this.taskState];
		},
	},
	methods: {
		cardTitle(dueDate) {
			const dueTitle = !dueDate
				? this.$t("pages.room.studentTaskCard.noDueDate")
				: `${this.$t(
						"pages.room.studentTaskCard.due"
				  )} - ${printDateFromStringUTC(dueDate)}`;

			return `${this.$t("pages.room.studentTaskCard.task")} - ${dueTitle}`;
		},
		taskHref: (id) => {
			return `/homework/${id}`;
		},
	},
};
</script>

<style lang="scss" scoped>
.top-row-container {
	display: grid;
	grid-template-columns: 5% 90% 5%;
	align-items: center;
	.icon-section {
		overflow: none;
		text-align: left;
	}
	.title-section {
		overflow: none;
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
	grid-template-columns: repeat(2, var(--space-xl-5));
	gap: var(--space-md);
	align-items: center;
	.chip-item {
		text-align: center;
		border-radius: var(--radius-sm);
		.chip-title {
			font-size: var(--text-xs);
			/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
			color: rgba(0, 0, 0, 0.6);
		}
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
</style>
