<template>
	<default-wireframe
		ref="main"
		:full-width="true"
		:fab-items="getCurrentFabItems"
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
				<v-tabs v-model="tabIndex" class="tabs-max-width" grow>
					<v-tab
						v-for="(tabItem, index) in tabItems"
						:key="index"
						:href="tabItem.href"
						:data-testid="tabItem.dataTestId"
					>
						<v-icon class="tab-icon mr-sm-3"> {{ tabItem.icon }} </v-icon>
						<span class="d-none d-sm-inline">
							{{ tabItem.label }}
						</span>
					</v-tab>
				</v-tabs>
			</div>
		</template>

		<keep-alive>
			<component
				v-if="getCurrentComponent"
				:is="getCurrentComponent"
				:room-data-object="roomData"
				:role="dashBoardRole"
				@copy-board-element="onCopyBoardElement"
				data-testid="room-content"
			/>
		</keep-alive>

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

		<share-modal type="courses" />

		<copy-result-modal
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@dialog-closed="onCopyResultModalClosed"
		></copy-result-modal>
	</default-wireframe>
</template>

<script>
import BaseQrCode from "@/components/base/BaseQrCode.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal";
import MoreItemMenu from "@/components/molecules/MoreItemMenu";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe";
import RoomDashboard from "@/components/templates/RoomDashboard";
import { useCopy } from "@/composables/copy";
import { useLoadingState } from "@/composables/loadingState";
import {
	ImportUserResponseRoleNamesEnum as Roles,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { authModule, envConfigModule, roomModule } from "@/store";
import { CopyParamsTypeEnum } from "@/store/copy";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	mdiAccountGroupOutline,
	mdiContentCopy,
	mdiEmailPlusOutline,
	mdiFileDocumentOutline,
	mdiFormatListChecks,
	mdiPencilOutline,
	mdiPlus,
	mdiPuzzleOutline,
	mdiShareVariantOutline,
	mdiTrayArrowDown,
	mdiViewListOutline,
} from "@mdi/js";
import { defineComponent } from "vue";
import RoomExternalToolsOverview from "./external-tools/RoomExternalToolsOverview.vue";

export default defineComponent({
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const { isLoadingDialogOpen } = useLoadingState(
			i18n.t("components.molecules.copyResult.title.loading")
		);

		const { copy, backgroundCopyProcesses, isCopyProcessInBackground } =
			useCopy(isLoadingDialogOpen);

		return {
			copy,
			backgroundCopyProcesses,
			isCopyProcessInBackground,
		};
	},
	components: {
		BaseQrCode,
		DefaultWireframe,
		RoomDashboard,
		MoreItemMenu,
		vCustomDialog,
		CopyResultModal,
		ShareModal,
	},
	inject: ["copyModule", "shareModule"],
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
				courseShareToken: "",
			},
			icons: {
				mdiPencilOutline,
				mdiEmailPlusOutline,
				mdiShareVariantOutline,
				mdiContentCopy,
				mdiTrayArrowDown,
			},
			breadcrumbs: [
				{
					text: this.$t("pages.courses.index.title"),
					to: "/rooms-overview",
				},
			],
			courseId: this.$route.params.id,
			isShareModalOpen: false,
			tabIndex: 0,
		};
	},
	computed: {
		getCurrentFabItems() {
			return this.currentTab?.fabItems;
		},
		getCurrentComponent() {
			return this.currentTab?.component;
		},
		tabItems() {
			const ctlToolsTabEnabled = envConfigModule.getCtlToolsTabEnabled;
			const ltiToolsTabEnabled = envConfigModule.getLtiToolsTabEnabled;

			const tabs = [
				{
					name: "learn-content",
					label: this.$t("common.words.learnContent"),
					icon: mdiFileDocumentOutline,
					dataTestId: "learnContent-tab",
					component: RoomDashboard,
					fabItems: this.learnContentFabItems,
				},
			];

			if (ctlToolsTabEnabled) {
				const ctlToolFabItems = {
					icon: mdiPlus,
					title: this.$t("common.actions.add"),
					ariaLabel: this.$t("common.actions.add"),
					testId: "add-tool-button",
				};

				tabs.push({
					name: "tools",
					label: this.$t("pages.rooms.tabLabel.tools"),
					icon: mdiPuzzleOutline,
					dataTestId: "tools-tab",
					component: RoomExternalToolsOverview,
					fabItems: this.canEditTools ? ctlToolFabItems : undefined,
				});
			}

			if (ltiToolsTabEnabled) {
				tabs.push({
					name: "old-tools",
					label: this.$t("pages.rooms.tabLabel.toolsOld"),
					icon: mdiPuzzleOutline,
					dataTestId: "old-tools-tab",
					href: `/courses/${this.roomData.roomId}/?activeTab=tools`,
				});
			}

			tabs.push({
				name: "groups",
				label: this.$t("pages.rooms.tabLabel.groups"),
				icon: mdiAccountGroupOutline,
				href: `/courses/${this.roomData.roomId}/?activeTab=groups`,
				dataTestId: "groups-tab",
			});

			return tabs;
		},
		currentTab() {
			let index = this.tabIndex;
			if (this.tabIndex < 0 || this.tabIndex >= this.tabItems.length) {
				index = 0;
			}

			const currentTab = this.tabItems[index];

			return currentTab;
		},
		learnContentFabItems() {
			const actions = [];
			if (
				authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
				actions.push({
					label: this.$t("pages.rooms.fab.add.task"),
					icon: mdiFormatListChecks,
					href: `/homework/new?course=${this.roomData.roomId}&returnUrl=rooms/${this.roomData.roomId}`,
					dataTestid: "fab_button_add_task",
					ariaLabel: this.$t("pages.rooms.fab.add.task"),
				});
			}
			if (
				envConfigModule.getEnv.FEATURE_TASK_CARD_ENABLED &&
				authModule.getUserPermissions.includes("TASK_CARD_EDIT".toLowerCase())
			) {
				const action = {
					label: this.$t("pages.rooms.fab.add.betatask"),
					icon: mdiFormatListChecks,
					to: {
						name: "rooms-beta-task-new",
						params: { course: this.roomData.roomId },
					},
					dataTestid: "fab_button_add_beta_task",
				};
				actions.push(action);
			}
			if (
				authModule.getUserPermissions.includes("TOPIC_CREATE".toLowerCase())
			) {
				actions.push({
					label: this.$t("pages.rooms.fab.add.lesson"),
					icon: mdiViewListOutline,
					href: `/courses/${this.roomData.roomId}/topics/add?returnUrl=rooms/${this.roomData.roomId}`,
					dataTestid: "fab_button_add_lesson",
					ariaLabel: this.$t("pages.rooms.fab.add.lesson"),
				});
			}

			if (actions.length === 0) {
				return null;
			}
			const items = {
				icon: mdiPlus,
				title: this.$t("common.actions.create"),
				ariaLabel: this.$t("common.actions.create"),
				testId: "add-content-button",
				actions: actions,
			};
			return items;
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
		canEditTools() {
			return !!authModule?.getUserPermissions.includes(
				"CONTEXT_TOOL_ADMIN".toLowerCase()
			);
		},
		headlineMenuItems() {
			if (!this.scopedPermissions.includes("COURSE_EDIT")) return [];
			const items = [
				{
					icon: this.icons.mdiPencilOutline,
					action: () =>
						(window.location.href = `/courses/${this.courseId}/edit`),
					name:
						this.$t("common.actions.edit") +
						"/" +
						this.$t("common.actions.remove"),
					dataTestId: "title-menu-edit-delete",
				},
			];

			if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
				items.push({
					icon: this.icons.mdiContentCopy,
					action: () => this.onCopyRoom(this.roomData.roomId),
					name: this.$t("common.actions.copy"),
					dataTestId: "title-menu-copy",
				});
			}

			if (
				envConfigModule.getEnv.FEATURE_COURSE_SHARE ||
				envConfigModule.getEnv.FEATURE_COURSE_SHARE_NEW
			) {
				items.push({
					icon: this.icons.mdiShareVariantOutline,
					action: () => this.shareCourse(),
					name: this.$t("common.actions.shareCourse"),
					dataTestId: "title-menu-share",
				});
			}
			if (envConfigModule.getEnv.FEATURE_IMSCC_COURSE_EXPORT_ENABLED) {
				items.push({
					icon: this.icons.mdiTrayArrowDown,
					action: async () => await roomModule.downloadImsccCourse(),
					name: this.$t("common.actions.download"),
					dataTestId: "title-menu-imscc-download",
				});
			}
			return items;
		},
		copyResultModalStatus() {
			return this.copyModule.getCopyResult?.status;
		},
		copyResultModalItems() {
			return this.copyModule.getCopyResultFailedItems;
		},
		copyResultRootItemType() {
			return this.copyModule.getCopyResult?.type;
		},
		copyResultError() {
			return this.copyModule.getBusinessError;
		},
		isCopyModalOpen() {
			return this.copyModule.getIsResultModalOpen;
		},
	},
	async created() {
		if (this.$route.query && this.$route.query.tab) {
			this.setActiveTab(this.$route.query.tab);
		}

		await roomModule.fetchContent(this.courseId);
		await roomModule.fetchScopePermission({
			courseId: this.courseId,
			userId: authModule.getUser.id,
		});
	},
	methods: {
		setActiveTab(tabName) {
			const index = this.tabItems.findIndex(
				(tabItem) => tabItem.name === tabName
			);

			this.tabIndex = index >= 0 ? index : 0;
		},
		fabClick() {
			if (this.currentTab.name === "learn-content") {
				this.importDialog.isOpen = true;
			}
		},
		async shareCourse() {
			if (envConfigModule.getEnv.FEATURE_COURSE_SHARE_NEW) {
				this.shareModule.startShareFlow({
					id: this.courseId,
					type: ShareTokenBodyParamsParentTypeEnum.Courses,
				});
			} else if (envConfigModule.getEnv.FEATURE_COURSE_SHARE) {
				await roomModule.createCourseShareToken(this.courseId);
				this.dialog.courseShareToken = roomModule.getCourseShareToken;
				this.dialog.model = "share";
				this.dialog.header = this.$t("pages.room.modal.course.share.header");
				this.dialog.text = this.$t("pages.room.modal.course.share.text");
				this.dialog.inputText = this.dialog.courseShareToken;
				this.dialog.subText = this.$t("pages.room.modal.course.share.subText");
				this.dialog.qrUrl = `${window.location.origin}/courses?import=${this.dialog.courseShareToken}`;
				this.dialog.isOpen = true;
			}
		},
		closeDialog() {
			this.dialog.model = "";
			this.dialog.header = "";
			this.dialog.text = "";
			this.dialog.inputText = "";
			this.dialog.subText = "";
		},
		async onCopyRoom(courseId) {
			const loadingText = this.$t(
				"components.molecules.copyResult.title.loading"
			);

			const copyParams = {
				id: courseId,
				courseId,
				type: CopyParamsTypeEnum.Course,
			};

			await this.copy(copyParams, loadingText);

			const copyResult = this.copyModule.getCopyResult;

			if (copyResult?.id !== undefined) {
				await this.$router.push(
					"/rooms/" + copyResult.id.replace(/[^a-z\d]/g, "")
				);
			} else {
				await this.$router.push("/rooms-overview");
			}
		},
		async onCopyBoardElement(payload) {
			const loadingText = this.$t(
				"components.molecules.copyResult.title.loading"
			);
			await this.copy(payload, loadingText);
			await roomModule.fetchContent(payload.courseId);
		},
		onCopyResultModalClosed() {
			this.copyModule.reset();
		},
	},
	watch: {
		tabIndex(newIndex) {
			if (newIndex >= 0 && newIndex < this.tabItems.length) {
				this.$router.replace({
					query: { ...this.$route.query, tab: this.tabItems[newIndex].name },
				});
			}
		},
	},
	mounted() {
		document.title = `${this.roomData.title} - ${this.$theme.short_name}`;
	},
});
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.course-title {
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
}

.modal-text {
	font-size: var(--space-md);
	color: var(--v-black-base);
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
