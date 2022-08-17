<template>
	<div class="rooms-container">
		<div v-if="role === Roles.Teacher">
			<draggable
				v-model="roomData.elements"
				:animation="400"
				:delay="touchDelay"
				:sort="sortable"
				:force-fallback="true"
				ghost-class="ghost"
				class="elements"
				@input="onSort"
				@start="dragInProgress = true"
				@end="endDragging"
			>
				<div v-for="(item, index) of roomData.elements" :key="index">
					<room-task-card
						v-if="item.type === cardTypes.Task"
						:ref="`item_${index}`"
						:role="role"
						:room="taskData"
						:task="item.content"
						:aria-label="
							$t('pages.room.taskCard.aria', {
								itemType: $t('common.words.tasks'),
								itemName: item.content.name,
							})
						"
						:key-drag="isDragging"
						class="task-card"
						:drag-in-progress="dragInProgress"
						@post-task="postDraftElement(item.content.id)"
						@revert-task="revertPublishedElement(item.content.id)"
						@move-element="moveByKeyboard"
						@on-drag="isDragging = !isDragging"
						@tab-pressed="isDragging = false"
						@delete-task="openItemDeleteDialog(item.content, item.type)"
						@finish-task="finishTask(item.content.id)"
						@restore-task="restoreTask(item.content.id)"
						@copy-task="copyTask(item.content.id)"
					/>
					<room-lesson-card
						v-if="item.type === cardTypes.Lesson"
						:ref="`item_${index}`"
						:role="role"
						:lesson="item.content"
						:room="lessonData"
						:aria-label="
							$t('pages.room.lessonCard.aria', {
								itemType: $t('common.words.topic'),
								itemName: item.content.name,
							})
						"
						:key-drag="isDragging"
						class="lesson-card"
						:drag-in-progress="dragInProgress"
						@post-lesson="postDraftElement(item.content.id)"
						@revert-lesson="revertPublishedElement(item.content.id)"
						@move-element="moveByKeyboard"
						@on-drag="isDragging = !isDragging"
						@tab-pressed="isDragging = false"
						@open-modal="getSharedLesson"
						@delete-lesson="openItemDeleteDialog(item.content, item.type)"
						@copy-lesson="copyLesson(item.content.id)"
					/>
				</div>
			</draggable>
		</div>
		<div v-if="role === Roles.Student">
			<div v-for="(item, index) of roomData.elements" :key="index">
				<room-task-card
					v-if="item.type === cardTypes.Task"
					:ref="`item_${index}`"
					:role="role"
					:task="item.content"
					:aria-label="
						$t('pages.room.taskCard.aria', {
							itemType: $t('common.words.tasks'),
							itemName: item.content.name,
						})
					"
					:key-drag="isDragging"
					class="task-card"
					:drag-in-progress="dragInProgress"
					@post-task="postDraftElement(item.content.id)"
					@revert-task="revertPublishedElement(item.content.id)"
					@finish-task="finishTask(item.content.id)"
					@restore-task="restoreTask(item.content.id)"
				/>
				<room-lesson-card
					v-if="item.type === cardTypes.Lesson"
					:ref="`item_${index}`"
					:role="role"
					:lesson="item.content"
					:room="lessonData"
					:aria-label="
						$t('pages.room.lessonCard.aria', {
							itemType: $t('common.words.topic'),
							itemName: item.content.name,
						})
					"
					:key-drag="isDragging"
					class="lesson-card"
					:drag-in-progress="dragInProgress"
					@post-lesson="postDraftElement(item.content.id)"
					@revert-lesson="revertPublishedElement(item.content.id)"
				/>
			</div>
		</div>
		<v-custom-empty-state
			v-if="roomIsEmpty"
			:image="emptyState.image"
			:title="emptyState.title"
			:img-height="emptyState.maxHeight"
			data-testid="empty-state-item"
			class="mt-16"
		/>
		<vCustomDialog
			ref="customDialog"
			:is-open="lessonShare.isOpen"
			class="room-dialog"
			has-buttons
			:buttons="['close']"
			@dialog-closed="lessonShare.isOpen = false"
		>
			<div slot="title" class="room-title">
				<h4>{{ $t("pages.room.lessonShare.confirm") }}</h4>
			</div>
			<template slot="content">
				<v-divider class="mb-4"></v-divider>
				<div class="share-info-text">
					<p>
						{{ $t("pages.room.lessonShare.modal.info") }}
					</p>
				</div>
				<div>
					<v-text-field :value="lessonShare.token" outlined></v-text-field>
				</div>
				<v-divider></v-divider>
			</template>
		</vCustomDialog>
		<v-custom-dialog
			v-model="itemDelete.isOpen"
			data-testid="delete-dialog-item"
			:size="375"
			has-buttons
			confirm-btn-title-key="common.actions.remove"
			@dialog-confirmed="deleteItem"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ $t("pages.room.itemDelete.title") }}
			</h2>
			<template slot="content">
				<p class="text-md mt-2">
					{{
						$t("pages.room.itemDelete.text", {
							itemTitle: itemDelete.itemData.name,
						})
					}}
				</p>
			</template>
		</v-custom-dialog>
		<copy-process
			:is-open="copyProcess.isOpen"
			:loading="isCopyModalLoading"
			data-testid="copy-process"
			@dialog-closed="onCopyProcessDialogClose"
		>
		</copy-process>
	</div>
</template>

<script>
import {
	BoardElementResponseTypeEnum,
	ImportUserResponseRoleNamesEnum,
} from "@/serverApi/v3";
import { copyModule, roomModule, taskModule } from "@/store";
import topicsEmptyStateImage from "@assets/img/empty-state/topics-empty-state.svg";
import RoomLessonCard from "@components/molecules/RoomLessonCard.vue";
import RoomTaskCard from "@components/molecules/RoomTaskCard.vue";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import CopyProcess from "@components/organisms/CopyProcess";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import draggable from "vuedraggable";

export default {
	components: {
		RoomTaskCard,
		RoomLessonCard,
		vCustomDialog,
		draggable,
		vCustomEmptyState,
		CopyProcess,
	},
	props: {
		roomDataObject: {
			type: Object,
			required: true,
			default: () => {},
		},
		role: { type: String, required: true },
	},
	data() {
		return {
			cardTypes: BoardElementResponseTypeEnum,
			isDragging: false,
			Roles: ImportUserResponseRoleNamesEnum,
			lessonShare: { isOpen: false, token: "", lessonData: {} },
			itemDelete: { isOpen: false, itemData: {}, itemType: "" },
			dragInProgressDelay: 100,
			dragInProgress: false,
			copyProcess: {
				id: "",
				isOpen: false,
			},
		};
	},
	computed: {
		lessonData() {
			return {
				roomId: this.roomData.roomId,
				displayColor: this.roomData.displayColor,
			};
		},
		isCopyModalLoading() {
			return copyModule?.getLoading ?? false;
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
		roomIsEmpty: () => roomModule.roomIsEmpty,
		emptyState() {
			const image = topicsEmptyStateImage;
			const title = this.$t(`pages.room.${this.role}.emptyState`);
			const maxHeight = "200px";
			return {
				image,
				title,
				maxHeight,
			};
		},
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
		async postDraftElement(elementId) {
			await roomModule.publishCard({ elementId, visibility: true });
		},
		async revertPublishedElement(elementId) {
			await roomModule.publishCard({ elementId, visibility: false });
		},
		async onSort(items) {
			const idList = {};
			idList.elements = items.map((item) => {
				return item.content.id;
			});

			await roomModule.sortElements(idList);
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

			await roomModule.sortElements({ elements: items });
			this.$refs[`item_${position}`][0].$el.focus();
		},
		async getSharedLesson(lessonId) {
			await roomModule.fetchSharedLesson(lessonId);
			const sharedLesson = roomModule.getSharedLessonData;

			this.lessonShare.token = sharedLesson.code;
			this.lessonShare.lessonName = sharedLesson.lessonName;
			this.lessonShare.status = sharedLesson.status;
			this.lessonShare.message = sharedLesson.message;

			this.lessonShare.isOpen = true;
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
				await taskModule.deleteTask(this.itemDelete.itemData.id);
				await roomModule.fetchContent(this.roomData.roomId);
				return Promise.resolve();
			}
			await roomModule.deleteLesson(this.itemDelete.itemData.id);
		},
		async finishTask(itemId) {
			await roomModule.finishTask({ itemId, action: "finish" });
		},
		async restoreTask(itemId) {
			await roomModule.finishTask({ itemId, action: "restore" });
		},
		async copyTask(itemId) {
			this.copyProcess.isOpen = true;
			await copyModule.copyTask({ id: itemId, courseId: this.roomData.roomId });
			const copyResult = copyModule.getCopyResult;
			const businessError = copyModule.getBusinessError;

			if (businessError.statusCode !== "") {
				this.$notifier({
					text: this.$t("components.molecules.copyResult.error"),
					status: "error",
				});
				return;
			}

			if (copyResult.id !== "") {
				this.copyProcess.id = copyResult.id;

				this.$notifier({
					text: this.$t("pages.room.copy.task.message.copied"),
					status: "success",
				});
			}
		},
		async onCopyProcessDialogClose() {
			this.copyProcess.isOpen = false;
			this.copyProcess.id = "";
			await roomModule.fetchContent(this.roomData.roomId);
		},
		redirectTask(itemId) {
			window.location.href = `/homework/${itemId}/edit?returnUrl=rooms/${this.roomDataObject.roomId}`;
		},
		async deleteTask(itemId) {
			await taskModule.deleteTask(itemId);
			await roomModule.fetchContent(this.roomData.roomId);
		},
		async copyLesson(itemId) {
			this.copyProcess.isOpen = true;
			await copyModule.copyLesson({
				id: itemId,
				courseId: this.roomData.roomId,
			});
			const copyResult = copyModule.getCopyResult;
			const businessError = copyModule.getBusinessError;

			if (businessError.statusCode !== "") {
				this.$notifier({
					text: this.$t("components.molecules.copyResult.error"),
					status: "error",
				});
				return;
			}

			if (copyResult.id !== "") {
				this.copyProcess.id = copyResult.id;

				this.$notifier({
					text: this.$t("pages.room.copy.lesson.message.copied"),
					status: "success",
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";

.rooms-container {
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}

.ghost {
	opacity: 0;
}

.share-info-text {
	// min-height: var(--sidebar-width);
	font-size: var(--space-md);
	color: var(--color-black);
}

.share-cancel-button {
	text-align: right;
}
</style>
