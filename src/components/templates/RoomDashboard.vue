<template>
	<div class="rooms-container">
		<div v-if="role === undefined">No content available</div>
		<div v-else>
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
					class="card-teacher"
				/>
				<room-lesson-card-teacher
					v-if="item.type === 'lesson'"
					:lesson="item.content"
					:room="lessonData"
					:aria-label="
						$t('pages.room.lessonCard.aria', {
							itemType: $t('pages.room.lessonCard.label.lesson'),
							itemName: item.content.name,
						})
					"
					class="card-teacher"
				/>
			</div>
			<!-- <div v-if="role === 'student'">
				<div v-for="(item, index) of roomData.elements" :key="index">
					<room-task-card
						v-if="item.type === 'task'"
						:task="item.content"
						:aria-label="
							$t('pages.room.taskCard.aria', {
								itemType: $t('pages.room.taskCard.label.task'),
								itemName: item.content.name,
							})
						"
						class="card-student"
					/>
					<room-lesson-card-student
						v-if="item.type === 'lesson'"
						:lesson="item.content"
						:room="lessonData"
						:aria-label="
							$t('pages.room.lessonCard.aria', {
								itemType: $t('pages.room.lessonCard.label.lesson'),
								itemName: item.content.name,
							})
						"
						class="card-student"
					/>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
// import RoomTaskCardTeacher from "@components/molecules/RoomTaskCardTeacher.vue";
import RoomTaskCard from "@components/molecules/RoomTaskCard.vue";
// import RoomTaskCardStudent from "@components/molecules/RoomTaskCardStudent.vue";
import RoomLessonCardTeacher from "@components/molecules/RoomLessonCardTeacher.vue";
// import RoomLessonCardStudent from "@components/molecules/RoomLessonCardStudent.vue";

export default {
	components: {
		// RoomTaskCardTeacher,
		// RoomTaskCardStudent,
		RoomLessonCardTeacher,
		// RoomLessonCardStudent,
		RoomTaskCard,
	},
	props: {
		roomData: {
			type: Object,
			required: true,
			default: () => {},
		},
		role: { type: String, required: true, default: "" },
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
