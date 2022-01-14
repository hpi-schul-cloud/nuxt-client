<template>
	<div class="rooms-container">
		<template v-for="(item, index) of taskList">
			<v-task-item-teacher
				v-if="item.type === 'task'"
				:key="index"
				:task="item.content"
			/>
			<v-divider v-if="index < taskList.length - 1" :key="`divider-${index}`" />
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
		taskList: {
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
	// max-width: 600px;
	margin: 0 auto;
}
</style>
