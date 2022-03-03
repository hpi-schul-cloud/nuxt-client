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
				class="elements"
				@input="onSort"
				@change="onChange"
			>
				<div v-for="(item, index) of roomData.elements" :key="index">
					<room-task-card
						v-if="item.type === 'task'"
						:role="role"
						:task="item.content"
						:aria-label="
							$t('pages.room.taskCard.aria', {
								itemType: $t('pages.room.taskCard.label.task'),
								itemName: item.content.name,
							})
						"
						class="task-card"
						@post-task="postDraftElement(item.content.id)"
						@revert-task="revertPublishedElement(item.content.id)"
					/>
					<room-lesson-card
						v-if="item.type === 'lesson'"
						:role="role"
						:lesson="item.content"
						:room="lessonData"
						:aria-label="
							$t('pages.room.lessonCard.aria', {
								itemType: $t('pages.room.lessonCard.label.lesson'),
								itemName: item.content.name,
							})
						"
						class="lesson-card"
						@post-lesson="postDraftElement(item.content.id)"
						@revert-lesson="revertPublishedElement(item.content.id)"
					/>
				</div>
			</draggable>
		</div>
	</div>
</template>

<script>
import RoomTaskCard from "@components/molecules/RoomTaskCard.vue";
import RoomLessonCard from "@components/molecules/RoomLessonCard.vue";
import RoomModule from "@store/room";
import draggable from "vuedraggable";

export default {
	components: {
		RoomTaskCard,
		RoomLessonCard,
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
		return {};
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
			return this.role === "teacher" || false;
		},
		touchDelay() {
			return this.isTouchDevice ? 200 : 0;
		},
	},
	methods: {
		async postDraftElement(elementId) {
			await RoomModule.publishCard({ elementId, visibility: true });
		},
		async revertPublishedElement(elementId) {
			await RoomModule.publishCard({ elementId, visibility: false });
		},
		async onSort(items) {
			const idList = items.map((item) => {
				return item.content.id;
			});

			await RoomModule.sortElements(idList);
		},
		async onChange(items) {
			console.table(items);
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
</style>
