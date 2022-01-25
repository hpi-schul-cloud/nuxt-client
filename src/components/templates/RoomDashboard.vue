<template>
	<div class="rooms-container">
		<template v-for="(item, index) of items">
			<room-task-card-teacher
				v-if="item.type === 'task'"
				:key="index"
				:task="item.content"
				:type="item.type"
				:aria-label="
					$t('pages.room.taskCard.aria', {
						itemType: item.type,
						itemName: item.content.name,
					})
				"
			/>
			<v-divider v-if="index < items.length - 1" :key="`divider-${index}`" />
		</template>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import RoomTaskCardTeacher from "@components/molecules/RoomTaskCardTeacher.vue";

export default Vue.extend({
	components: {
		RoomTaskCardTeacher,
	},
	props: {
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
		role: { type: String, default: "" },
	},
	data() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
.rooms-container {
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
