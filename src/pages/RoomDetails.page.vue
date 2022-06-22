<template>
	<default-wireframe
		ref="main"
		:full-width="true"
		:fab-items="fabItems"
		:breadcrumbs="breadcrumbs"
		:aria-label="roomData.title"
		@fabButtonEvent="fabClick"
	>
		<template slot="header">
			<div class="ma-2">
				<div class="text-h3 pb-2 course-title">
					{{ roomData.title }}
				</div>
				<div class="course-title pa-2 pb-1">
					<more-item-menu
						:menu-items="headlineMenuItems"
						:show="true"
						nudge-right="120"
						data-testid="title-menu"
					/>
				</div>
			</div>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						color="secondary"
						class="back-button"
						outlined
						small
						:href="`/files/courses/${roomData.roomId}`"
						:data-testid="`room-${roomData.roomId}-files`"
						>{{ $t("pages.rooms.headerSection.toCourseFiles") }}
					</v-btn>
				</div>
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs v-model="tab" class="tabs-max-width" grow>
					<v-tab>
						<v-icon class="tab-icon mr-sm-3">fa-file-text-o</v-icon>
						<span class="d-none d-sm-inline" data-testid="learnContent">{{
							$t("pages.rooms.tabLabel.learnContent")
						}}</span>
					</v-tab>
					<v-tab :href="`/courses/${roomData.roomId}/?activeTab=tools`">
						<v-icon class="tab-icon mr-sm-3">fa-puzzle-piece</v-icon>
						<span class="d-none d-sm-inline" data-testid="tools">{{
							$t("pages.rooms.tabLabel.tools")
						}}</span>
					</v-tab>
					<v-tab :href="`/courses/${roomData.roomId}/?activeTab=groups`">
						<v-icon class="tab-icon mr-sm-3">fa-users</v-icon>
						<span class="d-none d-sm-inline" data-testid="groups">{{
							$t("pages.rooms.tabLabel.groups")
						}}</span>
					</v-tab>
				</v-tabs>
			</div>
		</template>
		<room-dashboard :room-data-object="roomData" :role="dashBoardRole" />
		<import-lesson-modal v-model="importDialog.isOpen" class="import-modal">
		</import-lesson-modal>
		<v-custom-dialog
			v-model="dialog.isOpen"
			data-testid="title-dialog"
			has-buttons
			:buttons="['close']"
			@dialog-closed="closeDialog"
		>
			<div slot="title" class="dialog-header">
				<h4>{{ dialog.header }}</h4>
			</div>
			<template slot="content">
				<v-divider class="mb-4"></v-divider>
				<div class="modal-text">
					<p class="text-md mt-2">
						{{ dialog.text }}
					</p>
				</div>
				<div>
					<v-text-field
						:value="dialog.inputText"
						outlined
						dense
						data-testid="modal-input"
					></v-text-field>
				</div>
				<div class="modal-text modal-sub-text mb-2">
					{{ dialog.subText }}
				</div>
				<div v-if="dialog.model === 'share' && dialog.qrUrl !== ''">
					<base-qr-code
						:url="dialog.qrUrl"
						data-testid="modal-qrcode"
					></base-qr-code>
				</div>
				<v-divider></v-divider>
			</template>
		</v-custom-dialog>
		<copy-process
			v-if="copyProcess.data.id !== ''"
			:data="copyProcess.data || {}"
			:is-open="copyProcess.isOpen"
			:loading="copyProcess.loading"
			data-testid="copy-process"
			@dialog-closed="onCopyProcessDialogClose"
		>
		</copy-process>
	</default-wireframe>
</template>

<script>
import { authModule, envConfigModule, roomModule, copyModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import RoomDashboard from "@components/templates/RoomDashboard.vue";
import ImportLessonModal from "@components/molecules/ImportLessonModal";
import MoreItemMenu from "@components/molecules/MoreItemMenu";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import BaseQrCode from "@components/base/BaseQrCode.vue";
import CopyProcess from "@components/organisms/CopyProcess";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import {
	mdiPlus,
	mdiViewListOutline,
	mdiFormatListChecks,
	mdiCloudDownload,
	mdiSquareEditOutline,
	mdiEmailPlusOutline,
	mdiShareVariant,
	mdiContentCopy,
} from "@mdi/js";

export default {
	components: {
		DefaultWireframe,
		RoomDashboard,
		ImportLessonModal,
		MoreItemMenu,
		vCustomDialog,
		BaseQrCode,
		CopyProcess,
	},
	layout: "defaultVuetify",
	data() {
		return {
			importDialog: {
				isOpen: false,
			},
			dialog: {
				isOpen: false,
				model: "",
				header: "",
				text: "",
				inputText: "",
				subText: "",
				qrUrl: "",
				courseInvitationLink: "",
				courseShareToken: "",
			},
			icons: {
				mdiSquareEditOutline,
				mdiEmailPlusOutline,
				mdiShareVariant,
				mdiContentCopy,
			},
			breadcrumbs: [
				{
					text: this.$t("pages.courses.index.title"),
					to: "/rooms-overview",
				},
			],
			courseId: this.$route.params.id,
			tab: null,
			copyProcess: {
				data: {},
				isOpen: false,
				loading: false,
			},
		};
	},
	computed: {
		fabItems() {
			if (
				authModule.getUserPermissions.includes("COURSE_CREATE".toLowerCase())
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
							href: `/courses/${this.roomData.roomId}/topics/add?returnUrl=rooms/${this.roomData.roomId}`,
							dataTestid: "fab_button_add_lesson",
							ariaLabel: this.$t("pages.rooms.fab.add.lesson"),
						},
					],
				};
				if (envConfigModule.getEnv.FEATURE_LESSON_SHARE) {
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
			return roomModule.getRoomData;
		},
		scopedPermissions() {
			return roomModule.getPermissionData || [];
		},
		roles() {
			return authModule.getUserRoles;
		},
		dashBoardRole() {
			if (this.roles.includes(Roles.Teacher)) return Roles.Teacher;
			if (this.roles.includes(Roles.Student)) return Roles.Student;
			return undefined;
		},
		headlineMenuItems() {
			if (!this.scopedPermissions.includes("COURSE_EDIT")) return [];
			const items = [
				{
					icon: this.icons.mdiSquareEditOutline,
					action: () =>
						(window.location.href = `/courses/${this.courseId}/edit`),
					name:
						this.$t("common.actions.edit") +
						"/" +
						this.$t("common.actions.remove"),
					dataTestId: "title-menu-edit-delete",
				},
				{
					icon: this.icons.mdiEmailPlusOutline,
					action: () => this.inviteCourse(),
					name: this.$t("common.actions.invite"),
					dataTestId: "title-menu-invite",
				},
			];

			if (envConfigModule.getEnv.FEATURE_COURSE_COPY) {
				items.push({
					icon: this.icons.mdiContentCopy,
					action: () =>
						envConfigModule.getEnv.FEATURE_COURSE_COPY_ENABLED
							? this.copyRoom()
							: (window.location.href = `/courses/${this.courseId}/copy`),
					name: this.$t("common.actions.duplicate"),
					dataTestId: "title-menu-copy",
				});
			}
			if (envConfigModule.getEnv.FEATURE_COURSE_SHARE) {
				items.push({
					icon: this.icons.mdiShareVariant,
					action: () => this.shareCourse(),
					name: this.$t("common.actions.share"),
					dataTestId: "title-menu-share",
				});
			}
			return items;
		},
	},
	async created() {
		await roomModule.fetchContent(this.courseId);
		await roomModule.fetchScopePermission({
			courseId: this.courseId,
			userId: authModule.getUser.id,
		});
	},
	methods: {
		fabClick() {
			this.importDialog.isOpen = true;
		},
		async inviteCourse() {
			await roomModule.createCourseInvitation(this.courseId);
			this.dialog.courseInvitationLink = roomModule.getCourseInvitationLink;
			this.dialog.model = "invite";
			this.dialog.header = this.$t("pages.room.modal.course.invite.header");
			this.dialog.text = this.$t("pages.room.modal.course.invite.text");
			this.dialog.inputText = this.dialog.courseInvitationLink;
			this.dialog.subText = "";
			this.dialog.isOpen = true;
		},
		async shareCourse() {
			await roomModule.createCourseShareToken(this.courseId);
			this.dialog.courseShareToken = roomModule.getCourseShareToken;
			this.dialog.model = "share";
			this.dialog.header = this.$t("pages.room.modal.course.share.header");
			this.dialog.text = this.$t("pages.room.modal.course.share.text");
			this.dialog.inputText = this.dialog.courseShareToken;
			this.dialog.subText = this.$t("pages.room.modal.course.share.subText");
			this.dialog.qrUrl = `${window.location.origin}/courses?import=${this.dialog.courseShareToken}`;
			this.dialog.isOpen = true;
		},
		closeDialog() {
			this.dialog.model = "";
			this.dialog.header = "";
			this.dialog.text = "";
			this.dialog.inputText = "";
			this.dialog.subText = "";
		},
		async copyRoom() {
			this.copyProcess.isOpen = true;
			this.copyProcess.loading = roomModule.getLoading;
			copyModule && console.log("");
			await copyModule.copyRoom(this.courseId);
			const copyResult = copyModule.getCopyResult;
			const businessError = copyModule.getBusinessError;

			if (businessError.statusCode !== "") {
				this.$notifier({
					text: this.$t("components.organisms.FormNews.errors.create"),
					status: "error",
				});
				return;
			}

			if (copyResult.id !== "") {
				this.copyProcess.data = copyResult;
				this.copyProcess.loading = copyModule.getLoading;
			}
		},
		async onCopyProcessDialogClose() {
			if (this.copyProcess.data.id === "") return;
			this.$notifier({
				text: this.$t("pages.room.copy.course.message.created"),
				status: "success",
			});
			this.$router.push(`/rooms/${this.copyProcess.data.id}`);
			this.courseId = this.copyProcess.data.id;
			this.copyProcess.isOpen = false;
			this.copyProcess.data = {};
		},
	},
	head() {
		return {
			title: `${this.roomData.title} - ${this.$theme.short_name}`,
		};
	},
};
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@variables";

.course-title {
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
}
.modal-text {
	font-size: var(--space-md);
	color: var(--color-black);
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	.tabs-max-width {
		max-width: var(--size-content-width-max);
	}
}

.tab-icon {
	fill: currentColor;
}

// even out border
.v-tabs {
	margin-bottom: -2px; // stylelint-disable sh-waqar/declaration-use-variable
	font-family: var(--heading-font-family);
}

.v-tab {
	font-size: var(--text-base-size);
	text-transform: none !important;
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
	display: none !important;
}

.border-bottom {
	margin-right: calc(-1 * var(--space-lg));
	margin-left: calc(-1 * var(--space-lg));
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
