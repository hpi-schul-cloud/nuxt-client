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
							:aria-label="$t('pages.room.cards.aria', boardLayoutAriaLabel(item.content.layout))"
							@move-element="moveByKeyboard"
							@on-drag="isDragging = !isDragging"
							@tab-pressed="isDragging = false"
							@copy-board="copyBoard(item.content.id)"
							@update-visibility="updateCardVisibility(item.content.id, $event)"
							@delete-board="onDeleteItem(item.content, item.type)"
							@share-board="shareBoard(item.content.columnBoardId)"
						/>
						<CourseRoomTaskCard
							v-if="item.type === cardTypes.TASK"
							:ref="`item_${index}`"
							:task-card-index="index"
							:user-role="role"
							:room="taskData"
							:task="item.content"
							:aria-label="
								$t('pages.room.cards.aria', {
									itemType: $t('common.words.tasks'),
									itemName: item.content.name,
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
							@share-task="shareTask(item.content.id)"
						/>
						<RoomLessonCard
							v-if="item.type === cardTypes.LESSON"
							:ref="`item_${index}`"
							:lesson-card-index="index"
							:user-role="role"
							:lesson="item.content"
							:room="lessonData"
							:aria-label="
								$t('pages.room.cards.aria', {
									itemType: $t('common.words.topic'),
									itemName: item.content.name,
								})
							"
							:key-drag="isDragging"
							class="lesson-card"
							:drag-in-progress="dragInProgress"
							@update-visibility="updateCardVisibility(item.content.id, $event)"
							@move-element="moveByKeyboard"
							@on-drag="isDragging = !isDragging"
							@tab-pressed="isDragging = false"
							@open-modal="shareLesson(item.content.id)"
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
						$t('pages.room.cards.aria', {
							itemType: $t('pages.room.boardCard.label.columnBoard'),
							itemName: $t('pages.room.boardCard.label.courseBoard'),
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
						$t('pages.room.cards.aria', {
							itemType: $t('common.words.tasks'),
							itemName: item.content.name,
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
					:lesson="item.content"
					:room="lessonData"
					:aria-label="
						$t('pages.room.cards.aria', {
							itemType: $t('common.words.topic'),
							itemName: item.content.name,
						})
					"
					:key-drag="isDragging"
					class="lesson-card"
					:drag-in-progress="dragInProgress"
				/>
			</div>
		</div>
		<EmptyState v-if="roomIsEmpty" data-testid="empty-state-item" :title="$t(`pages.room.learningContent.emptyState`)">
			<template #media>
				<LearningContentEmptyStateSvg />
			</template>
		</EmptyState>
	</div>
</template>

<script>
import CourseRoomTaskCard from "./CourseRoomTaskCard.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { courseRoomDetailsModule } from "@/store";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { askDeletionForItem } from "@/utils/confirmation-dialog.utils.ts";
import {
	BoardElementResponseType,
	BoardLayout,
	ImportUserResponseRoleNames,
	ShareTokenBodyParamsParentType,
} from "@api-server";
import { useTaskActions } from "@data-tasks";
import { EmptyState, LearningContentEmptyStateSvg } from "@ui-empty-state";
import { RoomBoardCard, RoomLessonCard } from "@ui-room-details";
import draggable from "vuedraggable";

export default {
	components: {
		RoomBoardCard,
		CourseRoomTaskCard,
		RoomLessonCard,
		draggable,
		EmptyState,
		ShareModal,
		LearningContentEmptyStateSvg,
	},
	props: {
		roomDataObject: {
			type: Object,
			required: true,
		},
		role: { type: String, required: true },
	},
	emits: ["copy-board-element", "share-board-element"],
	data() {
		return {
			cardTypes: BoardElementResponseType,
			isDragging: false,
			Roles: ImportUserResponseRoleNames,
			dragInProgressDelay: 100,
			dragInProgress: false,
		};
	},
	computed: {
		lessonData() {
			return {
				roomId: this.roomData.roomId,
				displayColor: this.roomData.displayColor,
			};
		},
		taskData() {
			return {
				roomId: this.roomData.roomId,
			};
		},
		isTouchDevice() {
			return window.ontouchstart !== undefined;
		},
		sortable() {
			return this.role === this.Roles.TEACHER || false;
		},
		touchDelay() {
			return this.isTouchDevice ? 200 : 20;
		},
		roomIsEmpty: () => courseRoomDetailsModule.roomIsEmpty,
		roomData() {
			return { ...this.roomDataObject };
		},
	},
	created() {
		if (this.isTouchDevice) {
			window.addEventListener("contextmenu", (e) => e.preventDefault());
		}
	},
	methods: {
		async updateCardVisibility(elementId, visibility) {
			await courseRoomDetailsModule.publishCard({ elementId, visibility });
		},
		async onSort(items) {
			const idList = {};
			idList.elements = items.map((item) => item.content.id);

			await courseRoomDetailsModule.sortElements(idList);
		},
		async moveByKeyboard(e) {
			if (this.role === this.Roles.STUDENT) return;
			const items = this.roomData.elements.map((item) => item.content.id);
			const itemIndex = items.findIndex((item) => item === e.id);
			const position = itemIndex + e.moveIndex;
			if (position < 0 || position > items.length - 1) {
				return;
			}

			[items[itemIndex], items[itemIndex + e.moveIndex]] = [items[itemIndex + e.moveIndex], items[itemIndex]];

			await courseRoomDetailsModule.sortElements({ elements: items });
			this.$refs[`item_${position}`].$el.focus();
		},
		boardLayoutAriaLabel(itemLayout) {
			const columnBoardInfo = {
				itemType: this.$t("pages.room.boardCard.label.columnBoard"),
			};
			const listBoardInfo = {
				itemType: this.$t("pages.room.boardCard.label.listBoard"),
			};
			if (itemLayout === BoardLayout.LIST) {
				return listBoardInfo;
			} else {
				return columnBoardInfo;
			}
		},
		shareBoard(boardId) {
			this.$emit("share-board-element", {
				id: boardId,
				type: ShareTokenBodyParamsParentType.COLUMN_BOARD,
			});
		},
		shareLesson(lessonId) {
			this.$emit("share-board-element", {
				id: lessonId,
				type: ShareTokenBodyParamsParentType.LESSONS,
			});
		},
		shareTask(taskId) {
			this.$emit("share-board-element", {
				id: taskId,
				type: ShareTokenBodyParamsParentType.TASKS,
			});
		},
		endDragging() {
			setTimeout(() => {
				this.dragInProgress = false;
			}, this.dragInProgressDelay);
		},
		async onDeleteItem(itemContent, itemType) {
			let typeKey;
			switch (itemType) {
				case this.cardTypes.TASK:
					typeKey = "common.words.task";
					break;
				case this.cardTypes.LESSON:
					typeKey = "common.words.topic";
					break;
				case this.cardTypes.COLUMN_BOARD:
					typeKey = "common.words.board";
					break;
				default:
					return;
			}

			if (itemType === this.cardTypes.LESSON || itemType === this.cardTypes.COLUMN_BOARD) {
				const confirmed = await askDeletionForItem(itemContent.name || itemContent.title, typeKey);
				if (!confirmed) return;
			}

			if (itemType === this.cardTypes.TASK) {
				await useTaskActions().deleteTask(itemContent.id, itemContent.name);
			} else if (itemType === this.cardTypes.LESSON) {
				await courseRoomDetailsModule.deleteLesson(itemContent.id);
			} else if (itemType === this.cardTypes.COLUMN_BOARD) {
				await courseRoomDetailsModule.deleteBoard(itemContent.columnBoardId);
			}
			await courseRoomDetailsModule.fetchContent(this.roomData.roomId);
		},
		async finishTask(itemId) {
			await courseRoomDetailsModule.finishTask({ itemId, action: "finish" });
		},
		async restoreTask(itemId) {
			await courseRoomDetailsModule.finishTask({ itemId, action: "restore" });
		},
		copyTask(taskId) {
			this.$emit("copy-board-element", {
				id: taskId,
				type: ContentItemTypeEnum.Task,
				courseId: this.roomData.roomId,
			});
		},
		copyLesson(lessonId) {
			this.$emit("copy-board-element", {
				id: lessonId,
				type: ContentItemTypeEnum.Lesson,
				courseId: this.roomData.roomId,
			});
		},
		copyBoard(columnBoardId) {
			this.$emit("copy-board-element", {
				id: columnBoardId,
				type: ContentItemTypeEnum.ColumnBoard,
				courseId: this.roomData.roomId,
			});
		},
		boardCardIsVisibleToStudent(card) {
			const isBoardCard = card.type === this.cardTypes.COLUMN_BOARD;
			const isVisibleToStudent = card.content.published;
			return isBoardCard && isVisibleToStudent;
		},
	},
};
</script>
