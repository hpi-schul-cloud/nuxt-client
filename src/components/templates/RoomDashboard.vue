<template>
	<div>
		<div v-if="role === Roles.Teacher">
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
							v-if="item.type === cardTypes.ColumnBoard"
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
								$t(
									'pages.room.cards.aria',
									boardLayoutAriaLabel(item.content.layout)
								)
							"
							@move-element="moveByKeyboard"
							@on-drag="isDragging = !isDragging"
							@tab-pressed="isDragging = false"
							@copy-board="copyBoard(item.content.id)"
							@update-visibility="updateCardVisibility(item.content.id, $event)"
							@delete-board="openItemDeleteDialog(item.content, item.type)"
							@share-board="getSharedBoard(item.content.columnBoardId)"
						/>
						<RoomTaskCard
							v-if="item.type === cardTypes.Task"
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
							@delete-task="openItemDeleteDialog(item.content, item.type)"
							@finish-task="finishTask(item.content.id)"
							@restore-task="restoreTask(item.content.id)"
							@copy-task="copyTask(item.content.id)"
							@share-task="getSharedTask(item.content.id)"
						/>
						<RoomLessonCard
							v-if="item.type === cardTypes.Lesson"
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
							@open-modal="getSharedLesson"
							@delete-lesson="openItemDeleteDialog(item.content, item.type)"
							@copy-lesson="copyLesson(item.content.id)"
						/>
					</div>
				</template>
			</draggable>
		</div>
		<div v-if="role === Roles.Student">
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
				<RoomTaskCard
					v-if="item.type === cardTypes.Task"
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
					v-if="item.type === cardTypes.Lesson"
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
		<EmptyState
			v-if="roomIsEmpty"
			data-testid="empty-state-item"
			:title="$t(`pages.room.learningContent.emptyState`)"
		>
			<template #media>
				<TopicsEmptyStateSvg />
			</template>
		</EmptyState>
		<share-modal type="columnBoard" />
		<share-modal type="lessons" />
		<share-modal type="tasks" />
		<v-custom-dialog
			v-model:is-open="itemDelete.isOpen"
			data-testid="delete-dialog-item"
			:size="375"
			has-buttons
			confirm-btn-title-key="common.actions.delete"
			@dialog-confirmed="deleteItem"
		>
			<template #title>
				<h2 class="text-h4 my-2">
					{{
						deleteDialogTitle(
							itemDelete.itemType,
							itemDelete.itemData.name || itemDelete.itemData.title
						)
					}}
				</h2>
			</template>
		</v-custom-dialog>
	</div>
</template>

<script>
import RoomTaskCard from "@/components/molecules/RoomTaskCard.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import {
	BoardElementResponseTypeEnum,
	BoardLayout,
	ImportUserResponseRoleNamesEnum,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { envConfigModule, courseRoomDetailsModule } from "@/store";
import { CopyParamsTypeEnum } from "@/store/copy";
import { SHARE_MODULE_KEY } from "@/utils/inject";
import { RoomBoardCard, RoomLessonCard } from "@ui-room-details";
import draggable from "vuedraggable";
import { EmptyState } from "@ui-empty-state";
import TopicsEmptyStateSvg from "@/assets/img/empty-state/TopicsEmptyStateSvg.vue";

export default {
	components: {
		RoomBoardCard,
		RoomTaskCard,
		RoomLessonCard,
		vCustomDialog,
		draggable,
		EmptyState,
		ShareModal,
		TopicsEmptyStateSvg,
	},
	inject: {
		shareModule: { from: SHARE_MODULE_KEY },
	},
	props: {
		roomDataObject: {
			type: Object,
			required: true,
			default: () => ({}),
		},
		role: { type: String, required: true },
	},
	emits: ["copy-board-element"],
	data() {
		return {
			cardTypes: BoardElementResponseTypeEnum,
			isDragging: false,
			Roles: ImportUserResponseRoleNamesEnum,
			itemDelete: { isOpen: false, itemData: {}, itemType: "" },
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
			return this.role === this.Roles.Teacher || false;
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
			idList.elements = items.map((item) => {
				return item.content.id;
			});

			await courseRoomDetailsModule.sortElements(idList);
		},
		async moveByKeyboard(e) {
			if (this.role === this.Roles.Student) return;
			const items = this.roomData.elements.map((item) => {
				return item.content.id;
			});
			const itemIndex = items.findIndex((item) => item === e.id);
			const position = itemIndex + e.moveIndex;
			if (position < 0 || position > items.length - 1) {
				return;
			}

			[items[itemIndex], items[itemIndex + e.moveIndex]] = [
				items[itemIndex + e.moveIndex],
				items[itemIndex],
			];

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
			if (itemLayout === BoardLayout.List) {
				return listBoardInfo;
			} else {
				return columnBoardInfo;
			}
		},
		getSharedBoard(boardId) {
			if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SHARE) {
				this.shareModule.startShareFlow({
					id: boardId,
					type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
				});
			}
		},
		getSharedLesson(lessonId) {
			if (envConfigModule.getEnv.FEATURE_LESSON_SHARE) {
				this.shareModule.startShareFlow({
					id: lessonId,
					type: ShareTokenBodyParamsParentTypeEnum.Lessons,
				});
			}
		},
		getSharedTask(taskId) {
			if (envConfigModule.getEnv.FEATURE_TASK_SHARE) {
				this.shareModule.startShareFlow({
					id: taskId,
					type: ShareTokenBodyParamsParentTypeEnum.Tasks,
				});
			}
		},
		endDragging() {
			setTimeout(() => {
				this.dragInProgress = false;
			}, this.dragInProgressDelay);
		},
		openItemDeleteDialog(itemContent, itemType) {
			this.itemDelete.itemData = itemContent;
			this.itemDelete.isOpen = true;
			this.itemDelete.itemType = itemType;
		},
		async deleteItem() {
			if (this.itemDelete.itemType === this.cardTypes.Task) {
				await courseRoomDetailsModule.deleteTask(this.itemDelete.itemData.id);
			} else if (this.itemDelete.itemType === this.cardTypes.Lesson) {
				await courseRoomDetailsModule.deleteLesson(this.itemDelete.itemData.id);
			} else if (this.itemDelete.itemType === this.cardTypes.ColumnBoard) {
				await courseRoomDetailsModule.deleteBoard(
					this.itemDelete.itemData.columnBoardId
				);
			} else {
				return;
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
				type: CopyParamsTypeEnum.Task,
				courseId: this.roomData.roomId,
			});
		},
		copyLesson(lessonId) {
			this.$emit("copy-board-element", {
				id: lessonId,
				type: CopyParamsTypeEnum.Lesson,
				courseId: this.roomData.roomId,
			});
		},
		copyBoard(columnBoardId) {
			this.$emit("copy-board-element", {
				id: columnBoardId,
				type: CopyParamsTypeEnum.ColumnBoard,
				courseId: this.roomData.roomId,
			});
		},
		boardCardIsVisibleToStudent(card) {
			const isBoardCard = card.type === this.cardTypes.ColumnBoard;
			const isVisibleToStudent = card.content.published;
			return isBoardCard && isVisibleToStudent;
		},
		deleteDialogTitle(itemType, itemTitle) {
			let translatedItemType = "";

			switch (itemType) {
				case this.cardTypes.Task:
					translatedItemType = this.$t("common.words.task");
					break;
				case this.cardTypes.Lesson:
					translatedItemType = this.$t("common.words.topic");
					break;
				case this.cardTypes.ColumnBoard:
					translatedItemType = this.$t("components.board");
					break;
			}

			return this.$t("pages.room.itemDelete.text", {
				itemType: translatedItemType,
				itemTitle,
			});
		},
	},
};
</script>
