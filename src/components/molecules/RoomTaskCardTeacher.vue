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
					<span>{{ cardTitle(task.duedate) }}</span>
				</div>
				<div class="dot-menu-section">
					<!-- Action menu to be determined with UXers-->
					<v-icon>{{ mdiDotsVertical }}</v-icon>
				</div>
			</div>
			<div class="text-h4 text--primary">{{ task.name }}</div>
			<div class="text--primary mt-1">{{ task.description }}</div>
		</v-card-text>
		<v-card-text
			v-if="showSubmittedSection"
			class="ma-0 pb-0 pt-0 submitted-section"
		>
			<div class="chip-items-group">
				<div class="grey lighten-2 chip-item pa-1">
					<div class="chip-title">
						{{ $t("pages.room.teacherTaskCard.submitted") }}
					</div>
					<div class="chip-value">
						{{ task.status.submitted }}/{{ task.status.maxSubmissions }}
					</div>
				</div>
				<div class="grey lighten-2 chip-item pa-1">
					<div class="chip-title">
						{{ $t("pages.room.teacherTaskCard.graded") }}
					</div>
					<div class="chip-value">
						{{ task.status.graded }}/{{ task.status.maxSubmissions }}
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1">
			<!-- Action menu to be determined with UXers-->
			<v-btn
				v-for="(action, index) in actions"
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
		actions: {
			type: Array,
			required: true,
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
		showSubmittedSection() {
			return !this.task.status.isDraft;
		},
	},
	methods: {
		cardTitle(dueDate) {
			const dueTitle = !dueDate
				? this.$t("pages.room.teacherTaskCard.noDueDate")
				: `${this.$t(
						"pages.room.teacherTaskCard.due"
				  )} - ${printDateFromStringUTC(dueDate)}`;

			return `${this.$t("pages.room.teacherTaskCard.task")} - ${dueTitle}`;
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
		}
	}
}
</style>
