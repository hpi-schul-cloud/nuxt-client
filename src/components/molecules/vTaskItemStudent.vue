<template>
	<v-hover v-model="isHovering" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			v-click-outside="() => handleFocus(false)"
			:href="href"
			class="mx-n4 mx-sm-0"
			v-bind="$attrs"
			:ripple="false"
			:aria-label="`${$t('common.words.task')} ${task.name}`"
			role="article"
			@focus="handleFocus(true)"
			@keydown.tab.shift="handleFocus(false)"
		>
			<v-list-item-avatar>
				<v-icon class="fill" :color="iconColor">{{ taskIcon }}</v-icon>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-subtitle data-testid="taskSubtitle">
					{{ task.courseName }}
				</v-list-item-subtitle>
				<v-list-item-title data-testid="taskTitle" v-text="task.name" />
				<v-list-item-subtitle>
					{{ topic }}
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-list-item-action-text
					class="subtitle-2"
					data-test-id="dueDateLabel"
					v-text="dueDateLabel"
				/>
				<v-spacer />
				<v-custom-chip-time-remaining
					v-if="taskState === 'warning'"
					:type="taskState"
					:due-date="task.duedate"
					:shorten-date="$vuetify.breakpoint.xsOnly"
				/>
			</v-list-item-action>
			<v-list-item-action :id="`task-menu-${task.id}`" class="context-menu-btn">
				<v-menu
					bottom
					left
					offset-y
					attach
					@update:return-value="toggleMenu(false)"
				>
					<template v-slot:activator="{ on, attrs, value }">
						<v-btn
							v-show="showMenu"
							id="task-menu-btn"
							v-bind="attrs"
							icon
							:data-testId="`task-menu-${task.name}`"
							v-on="on"
							@click.prevent="toggleMenu(!value)"
							@keydown.space.stop="toggleMenu(!value)"
							@focus="handleFocus(true)"
							@blur="handleFocus(false)"
						>
							<v-icon>{{ mdiDotsVertical }}</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							class="task-action"
							:data-testId="`task-finish-${task.name}`"
							@click.stop.prevent="handleFinish"
						>
							<v-list-item-title>
								<template v-if="task.status.isFinished">
									<v-icon class="task-action-icon">{{ mdiUndo }}</v-icon>
									{{ $t("components.molecules.TaskItemMenu.restore") }}
								</template>
								<template v-else>
									<v-icon class="task-action-icon"> $taskFinished </v-icon>
									{{ $t("components.molecules.TaskItemMenu.finish") }}
								</template>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-list-item-action>
		</v-list-item>
	</v-hover>
</template>

<script>
import VCustomChipTimeRemaining from "@components/atoms/VCustomChipTimeRemaining";
import {
	printDateFromStringUTC as dateFromUTC,
	printDateTimeFromStringUTC as dateTimeFromUTC,
	fromNowToFuture,
} from "@plugins/datetime";
import { mdiDotsVertical, mdiUndo } from "@mdi/js";
import FinishedTaskModule from "@/store/finished-tasks";
import TaskModule from "@/store/tasks";

const taskRequiredKeys = ["courseName", "createdAt", "id", "name"];

export default {
	components: { VCustomChipTimeRemaining },
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
	},
	data() {
		return {
			mdiDotsVertical,
			mdiUndo,
			isMenuActive: false,
			isHovering: false,
			isActive: false,
		};
	},
	computed: {
		href() {
			return `/homework/${this.task.id}`;
		},
		iconColor() {
			const defaultColor = "#54616e";
			return this.task.displayColor || defaultColor;
		},
		isCloseToDueDate() {
			const timeDiff = fromNowToFuture(this.task.duedate, "hours");
			if (timeDiff === null) {
				return false;
			} else return timeDiff <= 24;
		},
		isOverDue() {
			const dueDate = this.task.duedate;
			return dueDate && new Date(dueDate) < new Date();
		},
		isGradedButMissed() {
			const { status } = this.task;
			return this.isOverDue && !status.submitted && status.graded;
		},
		taskState() {
			const { status } = this.task;

			if (this.isCloseToDueDate) return "warning";
			if (this.isGradedButMissed) return "gradedOverdue";
			if (this.isOverDue) return "overdue";
			if (status.submitted && !status.graded) return "submitted";
			if (status.graded) return "graded";
			return undefined;
		},
		taskIcon() {
			const stateIcons = {
				warning: "$taskOpenFilled",
				overdue: "$taskMissed",
				submitted: "$taskDone",
				graded: "$taskDoneFilled",
				gradedOverdue: "$taskMissedFilled",
				open: "$taskOpenFilled",
			};
			return stateIcons[this.taskState] || stateIcons["open"];
		},
		topic() {
			return this.task.description
				? `${this.$t("pages.tasks.subtitleTopic")} ${this.task.description}`
				: "";
		},
		dueDateLabel() {
			const dueDate = this.task.duedate;
			const convertedDueDate = this.$vuetify.breakpoint.xsOnly
				? dateFromUTC(dueDate)
				: dateTimeFromUTC(dueDate);

			return !dueDate
				? this.$t("pages.tasks.labels.noDueDate")
				: `${this.$t("pages.tasks.labels.due")} ${convertedDueDate}`;
		},
		showMenu() {
			return (
				this.$vuetify.breakpoint.mobile ||
				this.isHovering ||
				this.isActive ||
				this.isMenuActive
			);
		},
	},
	methods: {
		toggleMenu(stateValue) {
			this.isMenuActive = stateValue;
			this.isHovering = stateValue;
		},
		handleFocus(value) {
			this.isActive = value;
		},
		handleFinish() {
			if (this.task.status.isFinished) {
				FinishedTaskModule.restoreTask(this.task.id);
			} else {
				TaskModule.finishTask(this.task.id);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

// stylelint-disable sh-waqar/declaration-use-variable
.context-menu-btn {
	min-width: 45px;
}

.task-action {
	min-height: 25px;
}

.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
	color: rgba(0, 0, 0, 0.87);
}
</style>
