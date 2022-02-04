<template>
	<v-menu bottom left offset-y attach @update:return-value="toggleMenu(false)">
		<template v-slot:activator="{ on, attrs, value }">
			<v-btn
				v-show="show"
				id="task-menu-btn"
				v-bind="attrs"
				icon
				data-testId="task-menu"
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
				v-if="isTeacher"
				id="task-action-edit"
				:href="editLink"
				class="task-action"
				data-testId="task-edit"
			>
				<v-list-item-title>
					<v-icon class="task-action-icon">
						{{ mdiPencilOutline }}
					</v-icon>
					{{ $t("common.actions.edit") }}
				</v-list-item-title>
			</v-list-item>
			<v-list-item
				id="task-action-finish"
				class="task-action"
				data-testId="task-finish"
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
</template>

<script>
import { mdiDotsVertical, mdiPencilOutline, mdiUndo } from "@mdi/js";
import FinishedTaskModule from "@/store/finished-tasks";
import TaskModule from "@/store/tasks";

// TODO - different requiredKeys for finished and other tasks?
const taskRequiredKeys = ["courseName", "createdAt", "id", "name", "status"];
const finishedTaskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: {},
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => {
				return task.status.isFinished
					? finishedTaskRequiredKeys.every((key) => key in task)
					: taskRequiredKeys.every((key) => key in task);
			},
		},
		show: {
			type: Boolean,
			required: true,
		},
		userRole: {
			type: String,
			required: true,
			validator: (role) => ["student", "teacher"].includes(role),
		},
	},
	data() {
		return {
			mdiDotsVertical,
			mdiPencilOutline,
			mdiUndo,
		};
	},
	computed: {
		editLink() {
			return `/homework/${this.task.id}/edit`;
		},
		isTeacher() {
			return this.userRole === "teacher";
		},
	},
	methods: {
		toggleMenu(value) {
			this.$emit("toggled-menu", value);
		},
		handleFocus(value) {
			this.$emit("focus-changed", value);
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
// stylelint-disable sh-waqar/declaration-use-variable
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
