<template>
	<div class="rooms-container">
		<template v-for="(item, index) of taskItems">
			<div v-if="item.type === 'task' && role.type !== ''" :key="index">
				<room-task-card-teacher
					v-if="item.type === 'task'"
					:task="item.content"
					:type="item.type"
					:actions="item.actions"
					:aria-label="
						$t('pages.room.taskCard.aria', {
							itemType: item.type,
							itemName: item.content.name,
						})
					"
				/>
				<v-divider
					v-if="index < roomData.elements.length - 1"
					:key="`divider-${index}`"
				/>
			</div>
		</template>
	</div>
</template>

<script>
import RoomTaskCardTeacher from "@components/molecules/RoomTaskCardTeacher.vue";

export default {
	components: {
		RoomTaskCardTeacher,
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
		taskItems() {
			return this.roomData.elements.map((item) => {
				if (item.content.status && item.content.status.isDraft) {
					return {
						...item,
						actions: [
							{
								icon: "taskSend",
								to: "some.url here",
								name: "Send", // TODO:add i18i files
							},
							{
								icon: "Delete",
								to: "some.url here",
								name: "Delete", // TODO:add i18i files
							},
						],
					};
				}

				return {
					...item,
					actions: [
						{
							icon: "taskFinish",
							to: "some.url here",
							name: "Finish", // TODO:add i18i files
						},
						{
							icon: "taskDelete",
							to: "some.url here",
							name: "Delete", // TODO:add i18i files
						},
						{
							icon: "Copy",
							to: "some.url here",
							name: "Copy", // TODO:add i18i files
						},
					],
				};
			});
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
