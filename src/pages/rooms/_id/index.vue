<template>
	<default-wireframe
		ref="main"
		:headline="roomData.title"
		:full-width="true"
		:fab-items="fab"
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
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { mdiPlus, mdiViewListOutline, mdiFormatListChecks } from "@mdi/js";

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
		fab() {
			if (
				AuthModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
			) {
				return {
					icon: mdiPlus,
					ariaLabel: this.$t("pages.rooms.fab.add"),
					testId: "add-content-button",
					actions: [
						{
							label: this.$t("pages.rooms.fab.add.task"),
							icon: mdiFormatListChecks,
							href: `/homework/new?course=${this.roomData.roomId}`,
							dataTestid: "fab_button_add_task",
							ariaLabel: this.$t("pages.rooms.fab.add.aria.task"),
						},						{
							label: this.$t("pages.rooms.fab.add.lesson"),
							icon: mdiViewListOutline,
							href: `/courses/${this.roomData.roomId}/topics/add`,
							dataTestid: "fab_button_add_lesson",
							ariaLabel: this.$t("pages.rooms.fab.add.aria.lesson"),
						},
					],
				};
				return {
					icon: mdiPlus,
					title: this.$t("common.labels.course"),
					href: "/courses/add",
					ariaLabel: this.$t("pages.courses.new.title"),
					testId: "add-course-button",
				};
			}

			return null;
		},
		roomData() {
			return RoomModule.getRoomData;
		},
		dashBoardRole() {
			const roles = AuthModule.getUserRoles;
			if (roles.includes(Roles.Teacher)) return Roles.Teacher;
			if (roles.includes(Roles.Student)) return Roles.Student;
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
