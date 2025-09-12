<template>
	<v-card
		class="mx-auto mb-4 task-card"
		:class="getStyleClasses()"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
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
		<v-card-text data-testid="content-card-task-content">
			<div class="top-row-container mb-0">
				<div class="tagline" :data-testid="`task-card-title-${taskCardIndex}`">
					<v-icon size="14" class="fill" :icon="titleIcon" />
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
			<h2
				class="text-h4 mt-1 mb-2 task-name"
				tabindex="-1"
				:data-testid="`task-title-${taskCardIndex}`"
			>
				{{ task.name }}
			</h2>
			<RenderHTML
				v-if="canShowDescription"
				class="text--primary mt-1 mb-0 pb-0 text-description"
				tabindex="0"
				:html="task.description"
			/>
		</v-card-text>
		<v-card-text
			v-if="!isPlanned && !isDraft && !isFinished"
			class="ma-0 pb-0 pt-0 submitted-section"
			:data-testid="`task-card-info-${taskCardIndex}`"
		>
			<div class="chip-items-group">
				<v-chip
					v-for="(chip, index) in chipItems[userRole]"
					:key="index"
					:class="[chip.class]"
					size="small"
					:data-testid="[chip.testid]"
				>
					<v-icon
						v-if="chip.icon"
						start
						size="small"
						class="fill"
						color="rgba(0, 0, 0, 0.87)"
					>
						{{ chip.icon }}
					</v-icon>
					{{ chip.name }}
				</v-chip>
				<v-custom-chip-time-remaining
					v-if="roles.Student === userRole && isCloseToDueDate && !isSubmitted"
					type="warning"
					:due-date="task.dueDate"
					:shorten-unit="$vuetify.display.xs"
				/>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1 mt-2" data-testid="content-card-task-actions">
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
import VCustomChipTimeRemaining from "@/components/atoms/VCustomChipTimeRemaining.vue";
import { fromNowToFuture, printDateFromStringUTC } from "@/plugins/datetime";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import { RenderHTML } from "@feature-render-html";
import {
	mdiContentCopy,
	mdiPencilOutline,
	mdiShareVariantOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
	mdiTextBoxCheckOutline,
} from "@icons/material";
import { RoomDotMenu } from "@ui-room-details";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	task: {
		type: Object,
		required: true,
		validator: (task) =>
			["createdAt", "id", "name"].every(
				(key) => key in (task as Record<string, unknown>)
			),
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

const roles = ref(Roles);
const canShowDescription = ref(false);
const isDraft = computed(() => props.task.status.isDraft);
const isOverDue = computed(() => {
	const dueDate = props.task.dueDate;
	return dueDate && new Date(dueDate) < new Date();
});
const isFinished = computed(() => props.task.status.isFinished);
const isCloseToDueDate = computed(() => {
	const timeDiff = fromNowToFuture(props.task.dueDate, "hours");
	if (timeDiff !== null) {
		return timeDiff <= 24;
	}
	return false;
});
const isGraded = computed(() => props.task.status.graded);
const isSubmitted = computed(() => props.task.status.submitted);
const isSubmittedNotGraded = computed(
	() => props.task.status.submitted && !props.task.status.graded
);
const isPlanned = computed(() => {
	const scheduledDate = props.task.availableDate;
	const delay = 5 * 1000;
	return (
		scheduledDate &&
		new Date(scheduledDate).getTime() - delay > new Date().getTime()
	);
});
const titleIcon = computed(() => "$tasks");
const cardActions = computed(() => {
	const roleBasedActions: Record<
		string,
		Array<{ action: () => void; name: string; testid: string }>
	> = {
		[Roles.Teacher]: [],
		[Roles.Student]: [],
	};

	if (props.userRole === Roles.Teacher) {
		if (isPlanned.value || (isDraft.value && !isFinished.value)) {
			roleBasedActions[Roles.Teacher].push({
				action: () => publishCard(),
				name: t("common.action.publish"),
				testid: `task-card-action-publish-${props.taskCardIndex}`,
			});
		}
		if (!isPlanned.value && !isDraft.value && !isFinished.value) {
			roleBasedActions[Roles.Teacher].push({
				action: () => finishCard(),
				name: t("pages.room.taskCard.label.done"),
				testid: `task-card-action-done-${props.taskCardIndex}`,
			});
		}
	}

	if (props.userRole === Roles.Student) {
		if (!isFinished.value) {
			roleBasedActions[Roles.Student].push({
				action: () => finishCard(),
				name: t("pages.room.taskCard.label.done"),
				testid: `task-card-action-done-${props.taskCardIndex}`,
			});
		}
	}

	return roleBasedActions;
});

const chipItems = computed(() => {
	const roleBasedChips: Record<
		string,
		Array<{ name: string; class?: string; icon?: string; testid?: string }>
	> = {
		[Roles.Teacher]: [],
		[Roles.Student]: [],
	};

	if (props.userRole === Roles.Teacher) {
		roleBasedChips[Roles.Teacher].push({
			name: `${props.task.status.submitted}/${props.task.status.maxSubmissions} ${t("pages.room.taskCard.teacher.label.submitted")}`,
			testid: `room-task-card-chip-submitted-${props.taskCardIndex}`,
		});

		roleBasedChips[Roles.Teacher].push({
			name: `${props.task.status.graded}/${props.task.status.maxSubmissions} ${t("pages.room.taskCard.label.graded")}`,
			testid: `room-task-card-chip-graded-${props.taskCardIndex}`,
		});

		if (isOverDue.value) {
			roleBasedChips[Roles.Teacher].push({
				icon: "$taskMissed",
				name: t(`pages.room.taskCard.teacher.label.overdue`),
				class: "overdue",
				testid: `room-task-card-chip-overdue-${props.taskCardIndex}`,
			});
		}
	}

	if (props.userRole === Roles.Student) {
		if (isSubmittedNotGraded.value) {
			roleBasedChips[Roles.Student].push({
				icon: "$taskDone",
				name: t(`pages.room.taskCard.student.label.submitted`),
				class: "submitted",
				testid: `room-task-card-chip-submitted-${props.taskCardIndex}`,
			});
		}

		if (isGraded.value) {
			roleBasedChips[Roles.Student].push({
				icon: "$taskDone",
				name: t(`pages.room.taskCard.student.label.submitted`),
				class: "submitted",
				testid: `room-task-card-chip-submitted-${props.taskCardIndex}`,
			});
			roleBasedChips[Roles.Student].push({
				icon: mdiTextBoxCheckOutline,
				name: t(`pages.room.taskCard.label.graded`),
				class: "graded",
				testid: `room-task-card-chip-graded-${props.taskCardIndex}`,
			});
		}

		if (isOverDue.value && !isSubmitted.value) {
			roleBasedChips[Roles.Student].push({
				icon: "$taskMissed",
				name: t(`pages.room.taskCard.student.label.overdue`),
				class: "overdue",
			});
		}
	}

	return roleBasedChips;
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
		[Roles.Teacher]: [],
		[Roles.Student]: [],
	};

	if (props.userRole === Roles.Teacher) {
		roleBasedMoreActions[Roles.Teacher].push({
			icon: mdiPencilOutline,
			action: () =>
				redirectAction(
					`/homework/${props.task.id}/edit?returnUrl=rooms/${props.room.roomId}`
				),
			name: t("pages.room.taskCard.label.edit"),
			dataTestId: `room-task-card-menu-edit-${props.taskCardIndex}`,
		});

		if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
			roleBasedMoreActions[Roles.Teacher].push({
				icon: mdiContentCopy,
				action: () => copyCard(),
				name: t("common.actions.duplicate"),
				dataTestId: `room-task-card-menu-copy-${props.taskCardIndex}`,
			});
		}

		if (envConfigModule.getEnv.FEATURE_TASK_SHARE) {
			roleBasedMoreActions[Roles.Teacher].push({
				icon: mdiShareVariantOutline,
				action: () => emit("share-task", props.task.id),
				name: t("common.actions.shareCopy"),
				dataTestId: `room-task-card-menu-share-${props.taskCardIndex}`,
			});
		}

		if (!isDraft.value && !isFinished.value) {
			roleBasedMoreActions[Roles.Teacher].push({
				icon: mdiUndoVariant,
				action: () => unPublishCard(),
				name: t("pages.room.cards.label.revert"),
				dataTestId: `room-task-card-menu-revert-${props.taskCardIndex}`,
			});
		}

		roleBasedMoreActions[Roles.Teacher].push({
			icon: mdiTrashCanOutline,
			action: () => emit("delete-task"),
			name: t("common.actions.delete"),
			dataTestId: `room-task-card-menu-remove-${props.taskCardIndex}`,
		});
	}

	if (isFinished.value) {
		roleBasedMoreActions[Roles.Teacher].splice(-1, 0, {
			icon: mdiUndoVariant,
			action: () => restoreCard(),
			name: t("common.labels.restore"),
			dataTestId: `room-task-card-menu-restore-${props.taskCardIndex}`,
		});
		roleBasedMoreActions[Roles.Student].push({
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
	let titleSuffix = "";

	if (isDraft.value) {
		titleSuffix = t("common.words.draft");
	} else if (dueDate) {
		titleSuffix = isPlanned.value
			? `${t("pages.tasks.labels.planned")} ${printDateFromStringUTC(
					props.task.availableDate
				)}`
			: `${t("pages.room.taskCard.label.due")} ${printDateFromStringUTC(
					dueDate
				)}`;
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
			if (props.keyDrag)
				emit("move-element", { id: props.task.id, moveIndex: -1 });
			break;
		case 40: // Down Arrow
			if (props.keyDrag)
				emit("move-element", { id: props.task.id, moveIndex: 1 });
			break;
		default:
			break;
	}
};

const getStyleClasses = () => {
	return isPlanned.value || (isDraft.value && !isFinished.value)
		? "task-hidden"
		: "";
};
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

.task-name {
	line-height: var(--line-height-md);
}

.text-description {
	font-size: var(--text-md);
}

.chip-items-group {
	vertical-align: middle;
}

.v-chip {
	margin-right: 8px;
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
