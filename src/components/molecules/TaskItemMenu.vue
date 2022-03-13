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
				v-if="isTeacher"
				id="task-action-copy"
				:href="copyLink"
				class="task-action"
				data-testId="task-copy"
			>
				<v-list-item-title>
					<v-icon class="task-action-icon">
						{{ mdiContentCopy }}
					</v-icon>
					{{ $t("common.actions.copy") }}
				</v-list-item-title>
			</v-list-item>
			<v-list-item
				id="task-action-finish"
				class="task-action"
				data-testId="task-finish"
				@click.stop.prevent="handleFinish"
			>
				<v-list-item-title>
					<template v-if="taskIsFinished">
						<v-icon class="task-action-icon">{{ mdiUndo }}</v-icon>
						{{ $t("components.molecules.TaskItemMenu.restore") }}
					</template>
					<template v-else>
						<v-icon class="task-action-icon"> $taskFinished </v-icon>
						{{ $t("components.molecules.TaskItemMenu.finish") }}
					</template>
				</v-list-item-title>
			</v-list-item>
			<v-list-item
				v-if="isTeacher"
				id="task-action-delete"
				class="task-action"
				data-testId="task-delete"
				@click.stop.prevent="handleDelete"
			>
				<v-list-item-title>
					<v-icon class="task-action-icon">
						{{ mdiTrashCanOutline }}
					</v-icon>
					{{ $t("common.actions.remove") }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
import {
	mdiDotsVertical,
	mdiPencilOutline,
	mdiUndo,
	mdiTrashCanOutline,
	mdiContentCopy,
} from "@mdi/js";
import { taskModule, finishedTaskModule } from "@/store";

export default {
	components: {},
	props: {
		taskId: {
			type: String,
			required: true,
		},
		taskIsFinished: {
			type: Boolean,
			required: true,
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
			mdiTrashCanOutline,
			mdiContentCopy,
		};
	},
	computed: {
		editLink() {
			return `/homework/${this.taskId}/edit`;
		},
		copyLink() {
			return `/homework/${this.taskId}/copy`;
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
			if (this.taskIsFinished) {
				finishedTaskModule.restoreTask(this.taskId);
			} else {
				taskModule.finishTask(this.taskId);
			}
		},
		handleDelete() {
			taskModule.deleteTask(this.taskId);
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
