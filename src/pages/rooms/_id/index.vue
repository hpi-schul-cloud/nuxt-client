<template>
	<default-wireframe
		ref="main"
		:headline="roomData.title"
		:full-width="true"
		:aria-label="roomData.title"
	>
		<template slot="header">
			<h1 class="text-h3 pt-2">
				{{ roomData.title }}
			</h1>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						color="secondary"
						class="back-button"
						outlined
						small
						:href="`/courses/${roomData.roomId}`"
						:data-testid="`room-${roomData.roomId}`"
						>{{ $t("pages.rooms.headerSection.legacyView") }}
					</v-btn>
				</div>
			</div>
		</template>
		<room-dashboard :items="roomData.elements" :role="dashBoardRole" />
	</default-wireframe>
</template>

<script lang="ts">
import Vue from "vue";
import AuthModule from "@/store/auth";
import RoomModule from "@store/room";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import RoomDashboard from "@components/templates/RoomDashboard.vue";

export default Vue.extend({
	components: {
		DefaultWireframe,
		RoomDashboard,
	},
	layout: "defaultVuetify",
	data() {
		return {};
	},
	computed: {
		roomData() {
			return RoomModule.getRoomData;
		},
		dashBoardRole() {
			if (AuthModule.getUserRoles.includes("teacher")) return "teacher";
			if (AuthModule.getUserRoles.includes("student")) return "student";
			return "";
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
