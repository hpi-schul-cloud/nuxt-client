<template>
	<div>
		<v-menu
			bottom
			left
			offset-y
			attach
			@update:return-value="toggleMenu(false)"
		>
			<template #activator="{ on, attrs, value }">
				<v-btn
					id="task-menu-btn"
					v-bind="attrs"
					icon
					data-testid="task-menu"
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
					v-if="isTeacher && copyServiceEnabled"
					id="task-action-copy"
					class="task-action"
					data-testId="task-copy"
					@click.stop.prevent="onCopyTask"
				>
					<v-list-item-title>
						<v-icon class="task-action-icon"> {{ mdiContentCopy }} </v-icon>
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
							<v-icon class="task-action-icon">{{ mdiUndoVariant }}</v-icon>
							{{ $t("common.labels.restore") }}
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
					@click.stop.prevent="() => (confirmDeleteDialogIsOpen = true)"
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
		<v-custom-dialog
			v-model="confirmDeleteDialogIsOpen"
			:size="375"
			has-buttons
			confirm-btn-title-key="common.actions.remove"
			@dialog-confirmed="handleDelete"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ $t("components.molecules.TaskItemMenu.confirmDelete.title") }}
			</h2>
			<template slot="content">
				<p class="text-md mt-2">
					{{
						$t("components.molecules.TaskItemMenu.confirmDelete.text", {
							taskTitle,
						})
					}}
				</p>
			</template>
		</v-custom-dialog>
	</div>
</template>

<script>
import { envConfigModule, finishedTaskModule } from "@/store";
import vCustomDialog from "@/components/organisms/vCustomDialog";
import {
	mdiContentCopy,
	mdiDotsVertical,
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
} from "@mdi/js";
import { defineComponent } from "vue";
import { useCopy } from "../../composables/copy";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	setup() {
		const { copy } = useCopy();
		return {
			copy,
		};
	},
	components: { vCustomDialog },
	props: {
		taskId: {
			type: String,
			required: true,
		},
		taskIsFinished: {
			type: Boolean,
			required: true,
		},
		taskTitle: {
			type: String,
			required: false,
			default: "",
		},
		courseId: {
			type: String,
			default: "",
		},
		userRole: {
			type: String,
			required: true,
			validator: (role) => ["student", "teacher"].includes(role),
		},
	},
	inject: ["taskModule"],
	data() {
		return {
			confirmDeleteDialogIsOpen: false,
			mdiDotsVertical,
			mdiPencilOutline,
			mdiUndoVariant,
			mdiTrashCanOutline,
			mdiContentCopy,
		};
	},
	computed: {
		editLink() {
			return `/homework/${this.taskId}/edit`;
		},
		copyLink() {
			return `/homework/${this.taskId}/copy?returnUrl=/tasks`;
		},
		isTeacher() {
			return this.userRole === "teacher";
		},
		copyServiceEnabled() {
			return envConfigModule?.getEnv.FEATURE_COPY_SERVICE_ENABLED;
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
				this.taskModule.finishTask(this.taskId);
			}
		},
		handleDelete() {
			this.taskModule.deleteTask(this.taskId);
		},
		onCopyTask() {
			if (!this.copyServiceEnabled) {
				window.location.href = this.copyLink;
				return;
			}

			const payload = {
				id: this.taskId,
				courseId: this.courseId === "" ? undefined : this.courseId,
				type: "task",
			};

			this.$emit("copy-task", payload);
		},
	},
});
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
