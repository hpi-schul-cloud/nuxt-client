<template>
	<v-card
		class="mx-auto mb-4 lesson-card"
		:class="{ 'hidden-lesson': isHidden }"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		:variant="isHidden ? 'outlined' : 'elevated'"
		hover
		:data-testid="`room-lesson-card-${lessonCardIndex}`"
		@click="handleClick"
		@keydown.enter.self="handleClick"
		@keydown.up.prevent="onKeyPress"
		@keydown.down.prevent="onKeyPress"
		@keydown.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<v-card-text class="pb-0" data-testid="content-card-lesson-content">
			<div class="top-row-container mb-0">
				<div class="title-section">
					{{ $t("common.words.topic") }}
				</div>
				<div class="dot-menu-section">
					<RoomDotMenu
						v-if="userRole === Roles.Teacher"
						:menu-items="moreActionsMenuItems"
						:data-testid="`lesson-card-menu-${lessonCardIndex}`"
						:aria-label="$t('pages.room.lessonCard.menu.ariaLabel')"
					/>
				</div>
			</div>
			<div
				class="text-h6 text--primary mb-2 lesson-name"
				role="heading"
				aria-level="2"
				tabindex="-1"
				:data-testid="`lesson-name-${lessonCardIndex}`"
			>
				{{ lesson.name }}
			</div>
		</v-card-text>
		<v-card-text
			v-if="showChip"
			class="ma-0 pb-0 pt-0 submitted-section"
			data-testid="content-card-lesson-info"
		>
			<div class="chip-items-group">
				<div class="bg-grey-lighten-2 chip-item px-1 mr-1 mb-0">
					<div class="chip-value">
						{{ taskChipValue }}
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-actions
			v-if="userRole === Roles.Teacher"
			class="pt-1"
			:data-testid="`lesson-card-actions-${lessonCardIndex}`"
		>
			<v-btn
				v-for="(action, index) in cardActions"
				:key="index"
				:class="`action-button action-button-${action.name
					.split(' ')
					.join('-')}`"
				variant="text"
				color="primary"
				:data-testid="action.dataTestId"
				@click.stop="action.action"
			>
				{{ action.name }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { envConfigModule } from "@/store";
import { RoomData } from "@/store/types/room";
import {
	mdiContentCopy,
	mdiPencilOutline,
	mdiShareVariantOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
} from "@icons/material";
import { RoomDotMenu } from "@ui-room-details";
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { LessonData } from "./types";

const props = defineProps({
	lesson: {
		type: Object as PropType<LessonData>,
		required: true,
		validator: (lesson: LessonData) =>
			["createdAt", "id", "name"].every((key) => key in lesson),
	},
	room: {
		type: Object as PropType<Partial<RoomData>>,
		required: true,
	},
	userRole: { type: String as PropType<Roles>, required: true },
	ariaLabel: {
		type: String,
		default: "",
	},
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	lessonCardIndex: { type: Number, required: true },
});

const emit = defineEmits([
	"tab-pressed",
	"on-drag",
	"move-element",
	"copy-lesson",
	"update-visibility",
	"delete-lesson",
	"open-modal",
]);

const { t } = useI18n();

const isHidden = computed(() => {
	return props.lesson.hidden;
});

const cardActions = computed(() => {
	const actions = [];

	if (isHidden.value) {
		actions.push({
			icon: "lessonSend",
			action: () => publishLesson(),
			name: t("common.action.publish"),
			dataTestId: `lesson-card-action-publish-${
				toRef(props, "lessonCardIndex").value
			}`,
		});
	}

	return actions;
});

const moreActionsMenuItems = computed(() => {
	const actions = [];

	actions.push({
		icon: mdiPencilOutline,
		action: () =>
			redirectAction(
				`/courses/${props.room.roomId}/topics/${props.lesson.id}/edit?returnUrl=rooms/${props.room.roomId}`
			),
		name: t("pages.room.taskCard.label.edit"),
		dataTestId: `lesson-card-menu-action-edit-${
			toRef(props, "lessonCardIndex").value
		}`,
	});

	if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
		actions.push({
			icon: mdiContentCopy,
			action: () => copyCard(),
			name: t("common.actions.duplicate"),
			dataTestId: `lesson-card-menu-action-copy-${
				toRef(props, "lessonCardIndex").value
			}`,
		});
	}

	if (!isHidden.value) {
		actions.push({
			icon: mdiUndoVariant,
			action: () => unPublishCard(),
			name: t("pages.room.cards.label.revert"),
			dataTestId: `lesson-card-menu-action-revert-${
				toRef(props, "lessonCardIndex").value
			}`,
		});
	}

	if (envConfigModule.getEnv.FEATURE_LESSON_SHARE) {
		actions.push({
			icon: mdiShareVariantOutline,
			action: () => emit("open-modal", props.lesson.id),
			name: t("common.actions.shareCopy"),
			dataTestId: `lesson-card-menu-action-share-${
				toRef(props, "lessonCardIndex").value
			}`,
		});
	}

	actions.push({
		icon: mdiTrashCanOutline,
		action: () => emit("delete-lesson"),
		name: t("common.actions.delete"),
		dataTestId: `lesson-card-menu-action-remove-${
			toRef(props, "lessonCardIndex").value
		}`,
	});

	return actions;
});

const showChip = computed(() => {
	return (
		(props.lesson.numberOfPublishedTasks !== 0 &&
			props.lesson.numberOfPublishedTasks !== undefined) ||
		(props.lesson.numberOfPlannedTasks !== 0 &&
			props.lesson.numberOfPlannedTasks !== undefined) ||
		(props.lesson.numberOfDraftTasks !== 0 &&
			props.lesson.numberOfDraftTasks !== undefined)
	);
});

const taskChipValue = computed(() => {
	const chipValueArray = [];

	if (props.lesson.numberOfPublishedTasks) {
		chipValueArray.push(
			`${props.lesson.numberOfPublishedTasks} ${
				isHidden.value ? t("common.words.ready") : t("common.words.published")
			}`
		);
	}

	if (props.lesson.numberOfPlannedTasks) {
		chipValueArray.push(
			`${props.lesson.numberOfPlannedTasks} ${t("common.words.planned")}`
		);
	}

	if (props.lesson.numberOfDraftTasks) {
		chipValueArray.push(
			`${props.lesson.numberOfDraftTasks} ${
				props.lesson.numberOfDraftTasks === 1
					? t("common.words.draft")
					: t("common.words.drafts")
			}`
		);
	}

	let chipStr = chipValueArray.length ? `${t("common.words.tasks")}: ` : "";

	chipStr += chipValueArray.join(" / ");

	if (isHidden.value && props.lesson.numberOfDraftTasks === 0) {
		chipStr += ` (${t("pages.room.lessonCard.label.notVisible")})`;
	}

	return chipStr;
});

const handleClick = () => {
	if (!props.dragInProgress) {
		window.location.href = `/courses/${props.room.roomId}/topics/${props.lesson.id}`;
	}
};

const redirectAction = (value: string) => {
	window.location.href = value;
};

const publishLesson = () => {
	emit("update-visibility", true);
};

const copyCard = () => {
	emit("copy-lesson");
};

const unPublishCard = () => {
	emit("update-visibility", false);
};

const onKeyPress = (e: KeyboardEvent) => {
	switch (e.key) {
		case " ":
			emit("on-drag");
			break;
		case "ArrowUp":
			if (props.keyDrag)
				emit("move-element", {
					id: props.lesson.id,
					moveIndex: -1,
				});
			break;
		case "ArrowDown":
			if (props.keyDrag)
				emit("move-element", {
					id: props.lesson.id,
					moveIndex: 1,
				});
			break;
		default:
			break;
	}
};
</script>

<style lang="scss" scoped>
.top-row-container {
	display: grid;
	grid-template-columns: 94% 6%;
	align-items: center;

	.title-section {
		line-height: var(--line-height-md);
		text-align: left;
	}

	.dot-menu-section {
		align-self: start;
		text-align: right;
		height: 36px;
	}
}

.chip-items-group {
	vertical-align: middle;

	.chip-item {
		display: inline-block;
		width: fit-content;
		text-align: center;
		border-radius: 4px;
		font-size: var(--text-xs);

		.chip-value {
			font-size: var(--text-xs);
			/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
			color: rgba(0, 0, 0, 0.87);
		}
	}
}

.v-card__text {
	padding-bottom: 2px;
}

.hidden-lesson {
	.lesson-name {
		opacity: 0.5;
	}

	.submitted-section,
	.title-section {
		opacity: 0.65;
	}
}
</style>
