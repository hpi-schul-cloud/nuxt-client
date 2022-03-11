<template>
	<div class="rooms-container">
		<div v-if="role === undefined">No content available</div>
		<div v-else>
			<draggable
				v-model="roomData.elements"
				:animation="400"
				:delay="touchDelay"
				:sort="sortable"
				:force-fallback="true"
				ghost-class="ghost"
				class="elements"
				@input="onSort"
			>
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
						@post-lesson="postDraftElement(item.content.id)"
						@revert-lesson="revertPublishedElement(item.content.id)"
						@move-element="moveByKeyboard"
						@on-drag="isDragging = !isDragging"
						@tab-pressed="isDragging = false"
					/>
					<room-locked-card
						v-if="item.type === cardTypes.Lockedtask"
						:ref="`item_${index}`"
						:task="item.content"
						:room="lessonData"
						:aria-label="
							$t('pages.room.taskCard.aria', {
								itemType: $t('pages.room.taskCard.label.task'),
								itemName: item.content.name,
							})
						"
						:key-drag="isDragging"
						class="locked-card"
						@move-element="moveByKeyboard"
						@on-drag="isDragging = !isDragging"
						@tab-pressed="isDragging = false"
					/>
				</div>
			</draggable>
		</div>
	</div>
</template>

<script>
import RoomTaskCard from "@components/molecules/RoomTaskCard.vue";
import RoomLessonCard from "@components/molecules/RoomLessonCard.vue";
import RoomLockedCard from "@components/molecules/RoomLockedCard.vue";
import RoomModule from "@store/room";
import draggable from "vuedraggable";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { BoardElementResponseTypeEnum } from "@/serverApi/v3";

export default {
	components: {
		RoomTaskCard,
		RoomLessonCard,
		RoomLockedCard,
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
		};
	},
	computed: {
		lessonData() {
			return {
				roomId: this.roomData.roomId,
				displayColor: this.roomData.displayColor,
			};
		},
		isTouchDevice() {
			return window.ontouchstart !== undefined;
		},
		sortable() {
			return this.role === Roles.Teacher || false;
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
</style>
