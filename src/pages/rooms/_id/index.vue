<template>
	<default-wireframe
		ref="main"
		:headline="roomData.title"
		:full-width="true"
		:aria-label="roomData.title"
	>
		<room-dashboard :task-list="roomData.elements" />
	</default-wireframe>
</template>

<script lang="ts">
import Vue from "vue";
import RoomModule from "@store/room";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import RoomDashboard from "@components/templates/RoomDashboard.vue";

import { RoomData } from "@store/types/room";

export default Vue.extend({
	components: {
		DefaultWireframe,
		RoomDashboard,
	},
	layout: "defaultVuetify",
	computed: {
		roomData(): RoomData {
			return RoomModule.getRoomData;
		},
	},
	async created() {
		const courseId = this.$route.params.id;
		await RoomModule.fetchTasks(courseId);
	},
	head() {
		return {
			//@ts-ignore
			title: `${this.roomData.title} - ${this.$theme.short_name}`,
		};
	},
});
</script>
