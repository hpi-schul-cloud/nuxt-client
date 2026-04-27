<template>
	<v-card
		class="mx-auto mb-4 task-card"
		:class="getStyleClasses()"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		:ripple="false"
		:variant="isDraft ? 'outlined' : 'elevated'"
		hover
		:data-testid="`room-task-card-${taskCardIndex}`"
		@click="handleClick"
		@keydown.enter.self="handleClick"
		@keydown.up.prevent="onKeyPress"
		@keydown.down.prevent="onKeyPress"
		@keydown.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<v-card-text class="pt-2" data-testid="content-card-task-content">
			<div class="top-row-container mb-0">
				<div class="tagline" :data-testid="`task-card-title-${taskCardIndex}`">
					<v-icon size="14" class="fill" :icon="mdiFormatListChecks" />
					{{ cardTitle(task.dueDate) }}
				</div>
				<div class="dot-menu-section">
					<room-dot-menu
						:menu-items="moreActionsMenuItems[userRole]"
						:data-testid="`task-card-menu-${taskCardIndex}`"
						:aria-label="$t('pages.room.taskCard.menu.ariaLabel')"
					/>
				</div>
			</div>
			<h2 class="text-h4 mt-1 mb-1 task-name" tabindex="-1" :data-testid="`task-title-${taskCardIndex}`">
				{{ task.name }}
			</h2>
			<div
				v-if="!isPlanned && !isDraft && !isFinished"
				class="ma-0 submitted-section"
				:data-testid="`task-card-info-${taskCardIndex}`"
			>
				<TaskChipsTeacher v-if="isTeacher" :task />
				<TaskChipsStudent v-if="isStudent" :task />
			</div>
		</v-card-text>
		<v-card-actions v-if="cardActions[userRole]?.length" class="pt-1" data-testid="content-card-task-actions">
			<v-btn
				v-for="(action, index) in cardActions[userRole]"
				:key="index"
				:class="`action-button`"
				variant="text"
				color="primary"
				:data-testid="action.testid"
				@click.stop="action.action"
			>
				{{ action.name }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import TaskChipsStudent from "@/components/tasks/task-chips/TaskChipsStudent.vue";
import TaskChipsTeacher from "@/components/tasks/task-chips/TaskChipsTeacher.vue";
import { formatUtc } from "@/utils/date-time.utils";
import { ImportUserResponseRoleNames as Roles, TaskResponse } from "@api-server";
import { useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import {
	mdiContentCopy,
	mdiFormatListChecks,
	mdiPencilOutline,
	mdiShareVariantOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
} from "@icons/material";
import { RoomDotMenu } from "@ui-room-details";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	task: {
		type: Object as PropType<TaskResponse>,
		required: true,
	},
	room: {
		type: Object,
		default: () => ({}),
	},
	userRole: { type: String, required: true },
	ariaLabel: {
		type: String,
		default: "",
	},
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	taskCardIndex: { type: Number, required: true },
});

const emit = defineEmits<{
	(e: "update-visibility", value: boolean): void;
	(e: "finish-task"): void;
	(e: "restore-task"): void;
	(e: "delete-task"): void;
	(e: "copy-task"): void;
	(e: "share-task", taskId: string): void;
	(e: "on-drag"): void;
	(e: "move-element", payload: { id: string; moveIndex: number }): void;
	(e: "tab-pressed"): void;
}>();

const { t } = useI18n();
const { isStudent, isTeacher } = useAppStoreRefs();

const isDraft = computed(() => props.task.status.isDraft);
const isFinished = computed(() => props.task.status.isFinished);

const isPlanned = computed(() => {
	const scheduledDate = props.task.availableDate;
	const delay = 5 * 1000;
	return scheduledDate && new Date(scheduledDate).getTime() - delay > new Date().getTime();
});

const cardActions = computed(() => {
	const roleBasedActions: Record<string, Array<{ action: () => void; name: string; testid: string }>> = {
		[Roles.TEACHER]: [],
		[Roles.STUDENT]: [],
	};

	if (props.userRole === Roles.TEACHER) {
		if (isPlanned.value || (isDraft.value && !isFinished.value)) {
			roleBasedActions[Roles.TEACHER].push({
				action: () => publishCard(),
				name: t("common.action.publish"),
				testid: `task-card-action-publish-${props.taskCardIndex}`,
			});
		}
		if (!isPlanned.value && !isDraft.value && !isFinished.value) {
			roleBasedActions[Roles.TEACHER].push({
				action: () => finishCard(),
				name: t("pages.room.taskCard.label.done"),
				testid: `task-card-action-done-${props.taskCardIndex}`,
			});
		}
	}

	if (props.userRole === Roles.STUDENT) {
		if (!isFinished.value) {
			roleBasedActions[Roles.STUDENT].push({
				action: () => finishCard(),
				name: t("pages.room.taskCard.label.done"),
				testid: `task-card-action-done-${props.taskCardIndex}`,
			});
		}
	}

	return roleBasedActions;
});

const moreActionsMenuItems = computed(() => {
	const roleBasedMoreActions: Record<
		string,
		Array<{
			icon: string;
			action: () => void;
			name: string;
			dataTestId: string;
		}>
	> = {
		[Roles.TEACHER]: [],
		[Roles.STUDENT]: [],
	};

	if (props.userRole === Roles.TEACHER) {
		roleBasedMoreActions[Roles.TEACHER].push({
			icon: mdiPencilOutline,
			action: () => redirectAction(`/homework/${props.task.id}/edit?returnUrl=rooms/${props.room.roomId}`),
			name: t("pages.room.taskCard.label.edit"),
			dataTestId: `room-task-card-menu-edit-${props.taskCardIndex}`,
		});

		if (useEnvConfig().value.FEATURE_COPY_SERVICE_ENABLED) {
			roleBasedMoreActions[Roles.TEACHER].push({
				icon: mdiContentCopy,
				action: () => copyCard(),
				name: t("common.actions.duplicate"),
				dataTestId: `room-task-card-menu-copy-${props.taskCardIndex}`,
			});
		}

		if (useEnvConfig().value.FEATURE_TASK_SHARE) {
			roleBasedMoreActions[Roles.TEACHER].push({
				icon: mdiShareVariantOutline,
				action: () => emit("share-task", props.task.id),
				name: t("common.actions.shareCopy"),
				dataTestId: `room-task-card-menu-share-${props.taskCardIndex}`,
			});
		}

		if (!isDraft.value && !isFinished.value) {
			roleBasedMoreActions[Roles.TEACHER].push({
				icon: mdiUndoVariant,
				action: () => unPublishCard(),
				name: t("pages.room.cards.label.revert"),
				dataTestId: `room-task-card-menu-revert-${props.taskCardIndex}`,
			});
		}

		roleBasedMoreActions[Roles.TEACHER].push({
			icon: mdiTrashCanOutline,
			action: () => emit("delete-task"),
			name: t("common.actions.delete"),
			dataTestId: `room-task-card-menu-remove-${props.taskCardIndex}`,
		});
	}

	if (isFinished.value) {
		roleBasedMoreActions[Roles.TEACHER].splice(-1, 0, {
			icon: mdiUndoVariant,
			action: () => restoreCard(),
			name: t("common.labels.restore"),
			dataTestId: `room-task-card-menu-restore-${props.taskCardIndex}`,
		});
		roleBasedMoreActions[Roles.STUDENT].push({
			icon: mdiUndoVariant,
			action: () => restoreCard(),
			name: t("common.labels.restore"),
			dataTestId: `room-task-card-menu-restore-${props.taskCardIndex}`,
		});
	}
	return roleBasedMoreActions;
});

const cardTitle = (dueDate: string | undefined) => {
	if (isFinished.value) {
		return t("pages.room.taskCard.label.taskDone");
	}

	const titlePrefix = t("common.words.task");
	let titleSuffix: string;

	if (isDraft.value) {
		titleSuffix = t("common.words.draft");
	} else if (dueDate) {
		titleSuffix = isPlanned.value
			? `${t("pages.tasks.labels.planned")} ${formatUtc(props.task.availableDate, "dateYY")}`
			: `${t("pages.room.taskCard.label.due")} ${formatUtc(dueDate, "dateYY")}`;
	} else {
		titleSuffix = t("pages.room.taskCard.label.noDueDate");
	}

	return `${titlePrefix} – ${titleSuffix}`;
};

const handleClick = () => {
	if (!props.dragInProgress) {
		redirectAction(`/homework/${props.task.id}`);
	}
};

const redirectAction = (value: string) => {
	window.location.assign(value);
};

const publishCard = () => {
	emit("update-visibility", true);
};

const unPublishCard = () => {
	emit("update-visibility", false);
};

const finishCard = () => {
	emit("finish-task");
};

const restoreCard = () => {
	emit("restore-task");
};

const copyCard = () => {
	emit("copy-task");
};

const onKeyPress = (e: KeyboardEvent) => {
	switch (e.keyCode) {
		case 32: // Space
			emit("on-drag");
			break;
		case 38: // Up Arrow
			if (props.keyDrag) emit("move-element", { id: props.task.id, moveIndex: -1 });
			break;
		case 40: // Down Arrow
			if (props.keyDrag) emit("move-element", { id: props.task.id, moveIndex: 1 });
			break;
		default:
			break;
	}
};

const getStyleClasses = () => (isPlanned.value || (isDraft.value && !isFinished.value) ? "task-hidden" : "");
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

.top-row-container {
	display: grid;
	grid-template-columns: 94% 6%;
	align-items: center;

	.tagline {
		text-align: left;

		.v-icon {
			padding-bottom: 2px;
		}
	}

	.dot-menu-section {
		text-align: right;
		height: 36px;
	}
}

.text-description {
	font-size: var(--text-md);
}

.v-card__text {
	padding-bottom: 2px;
}

.task-hidden {
	.task-name,
	.text-description,
	.submitted-section {
		opacity: 0.5;
	}

	.tagline {
		opacity: 0.65;
	}
}
</style>
