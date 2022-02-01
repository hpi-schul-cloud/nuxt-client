<template>
	<div class="rooms-container">
		<template v-for="(item, index) of items">
			<v-task-item-teacher
				v-if="item.type === 'task'"
				:key="index"
				:task="item.content"
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
import VTaskItemTeacher from "@components/molecules/vTaskItemTeacher.vue";

export default Vue.extend({
	components: {
		VTaskItemTeacher,
	},
	props: {
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
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
