<template>
	<default-wireframe
		ref="main"
		:headline="roomData.title"
		:full-width="true"
		:aria-label="roomData.title"
	>
		<template slot="header">
			<h1 class="text-h3 pt-2 course-title">
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
		<room-dashboard :room-data="roomData" :role="dashBoardRole" />
	</default-wireframe>
</template>

<script>
import AuthModule from "@/store/auth";
import RoomModule from "@store/room";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import RoomDashboard from "@components/templates/RoomDashboard.vue";

export default {
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
			return undefined;
		},
	},
	async created() {
		const courseId = this.$route.params.id;
		await RoomModule.fetchContent(courseId);
	},
	head() {
		return {
			title: `${this.roomData.title} - ${this.$theme.short_name}`,
		};
	},
};
</script>
