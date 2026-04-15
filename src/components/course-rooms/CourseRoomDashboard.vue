<template>
	<div>
		<div v-if="role === Roles.TEACHER">
			<draggable
				v-model="roomData.elements"
				item-key="id"
				:animation="400"
				:delay="touchDelay"
				:sort="sortable"
				:force-fallback="true"
				ghost-class="opacity-0"
				class="elements"
				@update:model-value="onSort"
				@start="dragInProgress = true"
				@end="endDragging"
			>
				<template #item="{ element: item, index }">
					<div>
						<RoomBoardCard
							v-if="item.type === cardTypes.COLUMN_BOARD"
							:ref="`item_${index}`"
							:board-card-index="index"
							:user-role="role"
							:key-drag="isDragging"
							:drag-in-progress="dragInProgress"
							:column-board-item="item.content"
							:course-data="{
								courseName: roomData.title,
								courseId: roomData.roomId,
							}"
							:aria-label="t('pages.room.cards.aria', boardLayoutAriaLabel(item.content.layout))"
							@move-element="moveByKeyboard"
							@on-drag="isDragging = !isDragging"
							@tab-pressed="isDragging = false"
							@copy-board="copyBoard(item.content.id)"
							@update-visibility="updateCardVisibility(item.content.id, $event)"
							@delete-board="onDeleteItem(item.content, item.type)"
							@share-board="getSharedBoard(item.content.columnBoardId)"
						/>
						<CourseRoomTaskCard
							v-if="item.type === cardTypes.TASK"
							:ref="`item_${index}`"
							:task-card-index="index"
							:user-role="role"
							:room="taskData"
							:task="item.content"
							:aria-label="
								t('pages.room.cards.aria', {
									itemType: t('common.words.tasks'),
									itemName: getContentName(item.content),
								})
							"
							:key-drag="isDragging"
							class="task-card"
							:drag-in-progress="dragInProgress"
							@update-visibility="updateCardVisibility(item.content.id, $event)"
							@move-element="moveByKeyboard"
							@on-drag="isDragging = !isDragging"
							@tab-pressed="isDragging = false"
							@delete-task="onDeleteItem(item.content, item.type)"
							@finish-task="finishTask(item.content.id)"
							@restore-task="restoreTask(item.content.id)"
							@copy-task="copyTask(item.content.id)"
							@share-task="getSharedTask(item.content.id)"
						/>
						<RoomLessonCard
							v-if="item.type === cardTypes.LESSON"
							:ref="`item_${index}`"
							:lesson-card-index="index"
							:user-role="role"
							:lesson="item.content as BoardLessonResponse"
							:room="lessonData"
							:aria-label="
								t('pages.room.cards.aria', {
									itemType: t('common.words.topic'),
									itemName: getContentName(item.content),
								})
							"
							:key-drag="isDragging"
							class="lesson-card"
							:drag-in-progress="dragInProgress"
							@update-visibility="updateCardVisibility(item.content.id, $event)"
							@move-element="moveByKeyboard"
							@on-drag="isDragging = !isDragging"
							@tab-pressed="isDragging = false"
							@open-modal="getSharedLesson"
							@delete-lesson="onDeleteItem(item.content, item.type)"
							@copy-lesson="copyLesson(item.content.id)"
						/>
					</div>
				</template>
			</draggable>
		</div>
		<div v-if="role === Roles.STUDENT">
			<div v-for="(item, index) of roomData.elements" :key="index">
				<RoomBoardCard
					v-if="boardCardIsVisibleToStudent(item)"
					:ref="`item_${index}`"
					:board-card-index="index"
					:user-role="role"
					:key-drag="isDragging"
					:drag-in-progress="dragInProgress"
					:column-board-item="item.content"
					:course-data="{
						courseName: roomData.title,
						courseId: roomData.roomId,
					}"
					:aria-label="
						t('pages.room.cards.aria', {
							itemType: t('pages.room.boardCard.label.columnBoard'),
							itemName: t('pages.room.boardCard.label.courseBoard'),
						})
					"
				/>
				<CourseRoomTaskCard
					v-if="item.type === cardTypes.TASK"
					:ref="`item_${index}`"
					:task-card-index="index"
					:user-role="role"
					:task="item.content"
					:aria-label="
						t('pages.room.cards.aria', {
							itemType: t('common.words.tasks'),
							itemName: getContentName(item.content),
						})
					"
					:key-drag="isDragging"
					class="task-card"
					:drag-in-progress="dragInProgress"
					@finish-task="finishTask(item.content.id)"
					@restore-task="restoreTask(item.content.id)"
				/>
				<RoomLessonCard
					v-if="item.type === cardTypes.LESSON"
					:ref="`item_${index}`"
					:lesson-card-index="index"
					:user-role="role"
					:lesson="item.content as BoardLessonResponse"
					:room="lessonData"
					:aria-label="
						t('pages.room.cards.aria', {
							itemType: t('common.words.topic'),
							itemName: getContentName(item.content),
						})
					"
					:key-drag="isDragging"
					class="lesson-card"
					:drag-in-progress="dragInProgress"
				/>
			</div>
		</div>
		<EmptyState v-if="roomIsEmpty" data-testid="empty-state-item" :title="t('pages.room.learningContent.emptyState')">
			<template #media>
				<LearningContentEmptyStateSvg />
			</template>
		</EmptyState>
		<ShareModal :type="ShareTokenBodyParamsParentType.COLUMN_BOARD" />
		<ShareModal :type="ShareTokenBodyParamsParentType.LESSONS" />
		<ShareModal :type="ShareTokenBodyParamsParentType.TASKS" />
	</div>
</template>

<script setup lang="ts">
import CourseRoomTaskCard from "./CourseRoomTaskCard.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { CopyParamsTypeEnum } from "@/store/copy";
import { askDeletionForItem } from "@/utils/confirmation-dialog.utils";
import { SHARE_MODULE_KEY } from "@/utils/inject";
import {
	BoardColumnBoardResponse,
	BoardElementResponseType,
	BoardLayout,
	BoardLessonResponse,
	BoardTaskResponse,
	ImportUserResponseRoleNames,
	ShareTokenBodyParamsParentType,
	SingleColumnBoardResponse,
} from "@api-server";
import { useCourseRoomDetailsStore } from "@data-course-rooms";
import { useEnvConfig } from "@data-env";
import { EmptyState, LearningContentEmptyStateSvg } from "@ui-empty-state";
import { RoomBoardCard, RoomLessonCard } from "@ui-room-details";
import { storeToRefs } from "pinia";
import { computed, inject, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import draggable from "vuedraggable";

// Props
const props = defineProps<{
	roomDataObject: SingleColumnBoardResponse;
	role: string;
}>();

// Emits
const emit = defineEmits<{
	"copy-board-element": [payload: { id: string; type: CopyParamsTypeEnum; courseId: string }];
}>();

// Inject
const shareModule = inject(SHARE_MODULE_KEY)!;

// i18n
const { t } = useI18n();

// Store
const courseRoomDetailsStore = useCourseRoomDetailsStore();
const { roomIsEmpty } = storeToRefs(courseRoomDetailsStore);

// Constants
const cardTypes = BoardElementResponseType;
const Roles = ImportUserResponseRoleNames;
const dragInProgressDelay = 100;

// Reactive state
const isDragging = ref(false);
const dragInProgress = ref(false);

// Template refs - dynamic refs for items
const itemRefs = ref<Record<string, { $el?: HTMLElement } | null>>({});

// Computed
const roomData = computed(() => ({ ...props.roomDataObject }));

const lessonData = computed(() => ({
	roomId: roomData.value.roomId,
	displayColor: roomData.value.displayColor,
}));

const taskData = computed(() => ({
	roomId: roomData.value.roomId,
}));

const isTouchDevice = computed(() => window.ontouchstart !== undefined);

const sortable = computed(() => props.role === Roles.TEACHER || false);

const touchDelay = computed(() => (isTouchDevice.value ? 200 : 20));

// Type guards and helpers
const getContentName = (content: BoardTaskResponse | BoardLessonResponse | BoardColumnBoardResponse): string =>
	"name" in content ? content.name : content.title;

// Lifecycle
onMounted(() => {
	if (isTouchDevice.value) {
		window.addEventListener("contextmenu", (e) => e.preventDefault());
	}
});

// Methods
const updateCardVisibility = async (elementId: string, visibility: boolean) => {
	await courseRoomDetailsStore.publishCard(elementId, visibility);
};

const onSort = async (items: Array<{ content: { id: string } }>) => {
	const idList = {
		elements: items.map((item) => item.content.id),
	};
	await courseRoomDetailsStore.sortElements(idList);
};

const moveByKeyboard = async (e: { id: string; moveIndex: number }) => {
	if (props.role === Roles.STUDENT) return;
	const items = roomData.value.elements.map((item) => item.content.id);
	const itemIndex = items.findIndex((item: string) => item === e.id);
	const position = itemIndex + e.moveIndex;
	if (position < 0 || position > items.length - 1) {
		return;
	}

	[items[itemIndex], items[itemIndex + e.moveIndex]] = [items[itemIndex + e.moveIndex], items[itemIndex]];

	await courseRoomDetailsStore.sortElements({ elements: items });
	itemRefs.value[`item_${position}`]?.$el?.focus();
};

const boardLayoutAriaLabel = (itemLayout: BoardLayout) => {
	const columnBoardInfo = {
		itemType: t("pages.room.boardCard.label.columnBoard"),
	};
	const listBoardInfo = {
		itemType: t("pages.room.boardCard.label.listBoard"),
	};
	if (itemLayout === BoardLayout.LIST) {
		return listBoardInfo;
	} else {
		return columnBoardInfo;
	}
};

const getSharedBoard = (boardId: string) => {
	if (useEnvConfig().value.FEATURE_COLUMN_BOARD_SHARE) {
		shareModule.startShareFlow({
			id: boardId,
			type: ShareTokenBodyParamsParentType.COLUMN_BOARD,
		});
	}
};

const getSharedLesson = (lessonId: string) => {
	if (useEnvConfig().value.FEATURE_LESSON_SHARE) {
		shareModule.startShareFlow({
			id: lessonId,
			type: ShareTokenBodyParamsParentType.LESSONS,
		});
	}
};

const getSharedTask = (taskId: string) => {
	if (useEnvConfig().value.FEATURE_TASK_SHARE) {
		shareModule.startShareFlow({
			id: taskId,
			type: ShareTokenBodyParamsParentType.TASKS,
		});
	}
};

const endDragging = () => {
	setTimeout(() => {
		dragInProgress.value = false;
	}, dragInProgressDelay);
};

const onDeleteItem = async (
	itemContent: { id: string; columnBoardId?: string; name?: string; title?: string },
	itemType: BoardElementResponseType
) => {
	let typeKey: string;
	switch (itemType) {
		case cardTypes.TASK:
			typeKey = "common.words.task";
			break;
		case cardTypes.LESSON:
			typeKey = "common.words.topic";
			break;
		case cardTypes.COLUMN_BOARD:
			typeKey = "common.words.board";
			break;
		default:
			return;
	}

	const confirmed = await askDeletionForItem(itemContent.name || itemContent.title || "", typeKey);

	if (!confirmed) return;

	if (itemType === cardTypes.TASK) {
		await courseRoomDetailsStore.deleteTask(itemContent.id);
	} else if (itemType === cardTypes.LESSON) {
		await courseRoomDetailsStore.deleteLesson(itemContent.id);
	} else if (itemType === cardTypes.COLUMN_BOARD) {
		await courseRoomDetailsStore.deleteBoard(itemContent.columnBoardId!);
	}
	await courseRoomDetailsStore.fetchContent(roomData.value.roomId);
};

const finishTask = async (itemId: string) => {
	await courseRoomDetailsStore.finishTask(itemId, "finish");
};

const restoreTask = async (itemId: string) => {
	await courseRoomDetailsStore.finishTask(itemId, "restore");
};

const copyTask = (taskId: string) => {
	emit("copy-board-element", {
		id: taskId,
		type: CopyParamsTypeEnum.Task,
		courseId: roomData.value.roomId,
	});
};

const copyLesson = (lessonId: string) => {
	emit("copy-board-element", {
		id: lessonId,
		type: CopyParamsTypeEnum.Lesson,
		courseId: roomData.value.roomId,
	});
};

const copyBoard = (columnBoardId: string) => {
	emit("copy-board-element", {
		id: columnBoardId,
		type: CopyParamsTypeEnum.ColumnBoard,
		courseId: roomData.value.roomId,
	});
};

const boardCardIsVisibleToStudent = (card: SingleColumnBoardResponse["elements"][number]) => {
	const isBoardCard = card.type === cardTypes.COLUMN_BOARD;
	if (!isBoardCard) return false;
	return (card.content as BoardColumnBoardResponse).published;
};
</script>
