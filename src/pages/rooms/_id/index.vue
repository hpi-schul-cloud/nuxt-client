<template>
	<default-wireframe
		ref="main"
		:headline="roomData.title"
		:full-width="true"
		:fab-items="fabItems"
		:breadcrumbs="breadcrumbs"
		:aria-label="roomData.title"
		@fabButtonEvent="fabClick"
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
		<import-lesson-modal
			v-model="importDialog.isOpen"
			class="import-modal"
			@update-room="updateRoom"
		>
		</import-lesson-modal>
	</default-wireframe>
</template>

<script>
import AuthModule from "@/store/auth";
import RoomModule from "@store/room";

import EnvConfigModule from "@/store/env-config";
import { mdiMagnify } from "@mdi/js";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import RoomDashboard from "@components/templates/RoomDashboard.vue";
import ImportLessonModal from "@components/molecules/ImportLessonModal";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import {
	mdiPlus,
	mdiViewListOutline,
	mdiFormatListChecks,
	mdiCloudDownload,
} from "@mdi/js";

export default {
	components: {
		DefaultWireframe,
		RoomDashboard,
		ImportLessonModal,
	},
	layout: "defaultVuetify",
	data() {
		return {
			importDialog: {
				isOpen: false,
			},
			mdiMagnify,
			breadcrumbs: [
				{
					text: this.$t("pages.courses.index.title"),
					to: "/rooms-overview",
				},
			],
		};
	},
	computed: {
		fabItems() {
			if (
				AuthModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
			) {
				const items = {
					icon: mdiPlus,
					title: this.$t("common.actions.create"),
					ariaLabel: this.$t("common.actions.create"),
					testId: "add-content-button",
					actions: [
						{
							label: this.$t("pages.rooms.fab.add.task"),
							icon: mdiFormatListChecks,
							href: `/homework/new?course=${this.roomData.roomId}&returnUrl=rooms/${this.roomData.roomId}`,
							dataTestid: "fab_button_add_task",
							ariaLabel: this.$t("pages.rooms.fab.add.task"),
						},
						{
							label: this.$t("pages.rooms.fab.add.lesson"),
							icon: mdiViewListOutline,
							href: `/courses/${this.roomData.roomId}/topics/add`,
							dataTestid: "fab_button_add_lesson",
							ariaLabel: this.$t("pages.rooms.fab.add.lesson"),
						},
					],
				};
				if (EnvConfigModule.getEnv.FEATURE_LESSON_SHARE) {
					items.actions.push({
						label: this.$t("pages.rooms.fab.import.lesson"),
						icon: mdiCloudDownload,
						dataTestid: "fab_button_import_lesson",
						ariaLabel: this.$t("pages.rooms.fab.import.lesson"),
						customEvent: {
							name: "fabButtonEvent",
							value: true,
						},
					});
				}
				return items;
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
	methods: {
		fabClick() {
			this.importDialog.isOpen = true;
		},
		async updateRoom() {
			await RoomsModule.fetch(courseId);
		},
	},
	head() {
		return {
			title: `${this.roomData.title} - ${this.$theme.short_name}`,
		};
	},
};
</script>
