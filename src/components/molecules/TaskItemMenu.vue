<template>
	<KebabMenu :aria-label="ariaLabel" data-testid="task-menu">
		<v-list-item
			v-if="isTeacher"
			id="task-action-edit"
			:href="editLink"
			class="task-action"
			data-testId="task-edit"
			role="menuitem"
			:draggable="false"
		>
			<v-list-item-title>
				<v-icon :icon="mdiPencilOutline" class="task-action-icon" />
				{{ $t("common.actions.edit") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher && copyServiceEnabled"
			id="task-action-copy"
			class="task-action"
			data-testId="task-copy"
			@click="onCopyTask"
			role="menuitem"
		>
			<v-list-item-title>
				<v-icon :icon="mdiContentCopy" class="task-action-icon" />
				{{ $t("common.actions.copy") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher && shareTaskEnabled"
			id="task-action-share"
			class="task-action"
			data-testId="task-share"
			@click="onShareTask"
			role="menuitem"
		>
			<v-list-item-title>
				<v-icon :icon="mdiShareVariantOutline" class="task-action-icon" />
				{{ $t("common.actions.shareCopy") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher && taskIsPublished"
			id="task-action-revert"
			class="task-action"
			data-testId="task-revert"
			@click="handleRevertPublished"
			role="menuitem"
		>
			<v-list-item-title>
				<v-icon :icon="mdiUndoVariant" class="task-action-icon" />
				{{ $t("pages.room.cards.label.revert") }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			id="task-action-finish"
			class="task-action"
			data-testId="task-finish"
			@click="handleFinish"
			role="menuitem"
		>
			<v-list-item-title>
				<template v-if="taskIsFinished">
					<v-icon :icon="mdiUndoVariant" class="task-action-icon" />
					{{ $t("common.labels.restore") }}
				</template>
				<template v-else>
					<v-icon :icon="mdiArchiveOutline" class="task-action-icon" />
					{{ $t("components.molecules.TaskItemMenu.finish") }}
				</template>
			</v-list-item-title>
		</v-list-item>
		<v-list-item
			v-if="isTeacher"
			id="task-action-delete"
			class="task-action"
			data-testId="task-delete"
			@click="() => (confirmDeleteDialogIsOpen = true)"
			role="menuitem"
		>
			<v-list-item-title>
				<v-icon :icon="mdiTrashCanOutline" class="task-action-icon" />
				{{ $t("common.actions.delete") }}
			</v-list-item-title>
		</v-list-item>
	</KebabMenu>
	<v-custom-dialog
		v-model:is-open="confirmDeleteDialogIsOpen"
		:size="375"
		has-buttons
		confirm-btn-title-key="common.actions.delete"
		@dialog-confirmed="handleDelete"
	>
		<template #title>
			<h2 class="text-h4 my-2">
				{{ $t("components.molecules.TaskItemMenu.confirmDelete.title") }}
			</h2>
		</template>
		<template #content>
			<p class="text-md mt-2">
				{{
					$t("components.molecules.TaskItemMenu.confirmDelete.text", {
						taskTitle,
					})
				}}
			</p>
		</template>
	</v-custom-dialog>
</template>

<script>
import vCustomDialog from "@/components/organisms/vCustomDialog";
import { envConfigModule, finishedTasksModule } from "@/store";
import { CopyParamsTypeEnum } from "@/store/copy";
import {
	mdiArchiveOutline,
	mdiContentCopy,
	mdiPencilOutline,
	mdiShareVariantOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
} from "@icons/material";
import { defineComponent } from "vue";
import { KebabMenu } from "@ui-kebab-menu";

export default defineComponent({
	emits: ["toggledMenu", "focusChanged", "copyTask", "shareTask"],
	components: { vCustomDialog, KebabMenu },
	props: {
		taskId: {
			type: String,
			required: true,
		},
		taskIsFinished: {
			type: Boolean,
			required: true,
		},
		taskIsPublished: {
			type: Boolean,
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
	inject: ["tasksModule"],
	data() {
		return {
			confirmDeleteDialogIsOpen: false,
			mdiPencilOutline,
			mdiUndoVariant,
			mdiTrashCanOutline,
			mdiContentCopy,
			mdiShareVariantOutline,
			mdiArchiveOutline,
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
		shareTaskEnabled() {
			return envConfigModule?.getEnv.FEATURE_TASK_SHARE;
		},
		ariaLabel() {
			// VUE3_UPGRADE we need a proper label here. was missing before.
			return `${this.$t("common.words.task")}`;
		},
	},
	methods: {
		handleFinish() {
			if (this.taskIsFinished) {
				finishedTasksModule.restoreTask(this.taskId);
			} else {
				this.tasksModule.finishTask(this.taskId);
			}
		},
		handleRevertPublished() {
			this.tasksModule.revertPublishedTask(this.taskId);
		},
		handleDelete() {
			this.tasksModule.deleteTask(this.taskId);
		},
		onCopyTask() {
			if (!this.copyServiceEnabled) {
				window.location.href = this.copyLink;
				return;
			}

			const payload = {
				id: this.taskId,
				courseId: this.courseId === "" ? undefined : this.courseId,
				type: CopyParamsTypeEnum.Task,
			};

			this.$emit("copy-task", payload);
		},
		onShareTask() {
			if (this.shareTaskEnabled) {
				this.$emit("share-task", this.taskId);
			}
		},
	},
});
</script>

<style lang="scss" scoped>
// stylelint-disable sh-waqar/declaration-use-variable
.task-action {
	min-height: 25px !important;
}

.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
}
</style>
