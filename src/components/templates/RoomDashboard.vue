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
								itemType: $t('pages.room.taskCard.label.task'),
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
					/>
					<room-lesson-card
						v-if="item.type === cardTypes.Lesson"
						:ref="`item_${index}`"
						:role="role"
						:lesson="item.content"
						:room="lessonData"
						:aria-label="
							$t('pages.room.lessonCard.aria', {
								itemType: $t('pages.room.lessonCard.label.lesson'),
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
						@delete-lesson="openDeleteDialog(item.content)"
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
							itemType: $t('pages.room.taskCard.label.task'),
							itemName: item.content.name,
						})
					"
					:key-drag="isDragging"
					class="task-card"
					:drag-in-progress="dragInProgress"
					@post-task="postDraftElement(item.content.id)"
					@revert-task="revertPublishedElement(item.content.id)"
				/>
				<room-lesson-card
					v-if="item.type === cardTypes.Lesson"
					:ref="`item_${index}`"
					:role="role"
					:lesson="item.content"
					:room="lessonData"
					:aria-label="
						$t('pages.room.lessonCard.aria', {
							itemType: $t('pages.room.lessonCard.label.lesson'),
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
		<vCustomDialog
			ref="customDialog"
			:is-open="lessonShare.isOpen"
			class="room-dialog"
			has-buttons
			:buttons="['close', 'back']"
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
			v-model="lessonDelete.isOpen"
			data-testid="delete-dialog"
			:size="375"
			has-buttons
			confirm-btn-title-key="common.actions.remove"
			@dialog-confirmed="deleteLesson"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ $t("pages.room.lessonsDelete.title") }}
			</h2>
			<template slot="content">
				<p class="text-md mt-2">
					{{
						$t("pages.room.lessonsDelete.text", {
							lessonTitle: lessonDelete.lessonData.name,
						})
					}}
				</p>
			</template>
		</v-custom-dialog>
	</div>
</template>

<script>
import RoomTaskCard from "@components/molecules/RoomTaskCard.vue";
import RoomLessonCard from "@components/molecules/RoomLessonCard.vue";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import RoomModule from "@store/room";
import draggable from "vuedraggable";
import { ImportUserResponseRoleNamesEnum } from "@/serverApi/v3";
import { BoardElementResponseTypeEnum } from "@/serverApi/v3";

export default {
	components: {
		RoomTaskCard,
		RoomLessonCard,
		vCustomDialog,
		draggable,
	},
	props: {
		roomData: {
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
			lessonDelete: { isOpen: false, lessonData: {} },
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
	},
	created() {
		if (this.isTouchDevice) {
			window.addEventListener("contextmenu", (e) => e.preventDefault());
		}
	},
	methods: {
		async postDraftElement(elementId) {
			await RoomModule.publishCard({ elementId, visibility: true });
		},
		async revertPublishedElement(elementId) {
			await RoomModule.publishCard({ elementId, visibility: false });
		},
		async onSort(items) {
			const idList = {};
			idList.elements = items.map((item) => {
				return item.content.id;
			});

			await RoomModule.sortElements(idList);
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

			await RoomModule.sortElements({ elements: items });
			this.$refs[`item_${position}`][0].$el.focus();
		},
		async getSharedLesson(lessonId) {
			await RoomModule.fetchSharedLesson(lessonId);
			const sharedLesson = RoomModule.getSharedLessonData;

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
		openDeleteDialog(lesson) {
			this.lessonDelete.lessonData = lesson;
			this.lessonDelete.isOpen = true;
		},
		async deleteLesson() {
			await RoomModule.deleteLesson(this.lessonDelete.lessonData.id);
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
