<template>
	<default-wireframe
		ref="main"
		:full-width="true"
		:fab-items="getCurrentFabItems"
		:breadcrumbs="breadcrumbs"
		@fabButtonEvent="fabClick"
	>
		<template #header>
			<div class="d-flex ma-2 mt-3">
				<div
					class="text-h3 pb-2 course-title"
					data-testid="courses-course-title"
				>
					{{ roomData.title }}
				</div>
				<div class="mx-2">
					<room-dot-menu
						:menu-items="headlineMenuItems"
						data-testid="title-menu"
						:aria-label="$t('pages.rooms.headerSection.menu.ariaLabel')"
					/>
				</div>
				<v-chip v-if="roomData.isArchived" label size="small" class="mt-1">
					{{ $t("pages.rooms.headerSection.archived") }}
				</v-chip>
			</div>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						color="secondary"
						class="back-button"
						variant="outlined"
						size="small"
						:href="`/files/courses/${roomData.roomId}`"
						:data-testid="`room-${roomData.roomId}-files`"
						>{{ $t("pages.rooms.headerSection.toCourseFiles") }}
					</v-btn>
				</div>
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs
					v-model="tabIndex"
					color="primary"
					class="tabs-max-width"
					grow
					mandatory
				>
					<template v-for="tabItem in tabItems" :key="tabItem.name">
						<v-tab
							:data-testid="tabItem.dataTestId"
							:href="tabItem.href"
							class="no-active"
						>
							<template #default>
								<v-icon class="tab-icon mr-sm-3"> {{ tabItem.icon }}</v-icon>
								<span class="d-none d-sm-inline">
									{{ tabItem.label }}
								</span>
							</template>
						</v-tab>
					</template>
				</v-tabs>
			</div>
		</template>

		<div style="position: absolute; left: 455px">
			<speed-dial-menu orientation="right" direction="top" :icon="mdiPlus">
				Menu

				<template #actions>
					<speed-dial-menu-action :icon="mdiPlus" @click="console.log('add')"
						>Add</speed-dial-menu-action
					>
					<speed-dial-menu-action
						:icon="mdiPlus"
						:href="'google.de'"
						@click="console.log('link')"
						>Link</speed-dial-menu-action
					>

					<speed-dial-menu-action :icon="mdiPlus" @click="console.log('remove')"
						>Remove</speed-dial-menu-action
					>
				</template>
			</speed-dial-menu>
		</div>

		<div style="position: absolute; left: 225px">
			<speed-dial-menu orientation="left">
				Menu

				<template #actions>
					<speed-dial-menu-action :icon="mdiPlus">Add</speed-dial-menu-action>
					<speed-dial-menu-action :icon="mdiPlus" :href="'google.de'"
						>Link</speed-dial-menu-action
					>

					<speed-dial-menu-action :icon="mdiPlus"
						>Remove</speed-dial-menu-action
					>
				</template>
			</speed-dial-menu>
		</div>

		<component
			v-if="getCurrentComponent"
			:is="getCurrentComponent"
			:room-data-object="roomData"
			:role="dashBoardRole"
			:roomId="courseId"
			@copy-board-element="onCopyBoardElement"
			data-testid="room-content"
		/>

		<v-custom-dialog
			v-model:is-open="dialog.isOpen"
			data-testid="title-dialog"
			has-buttons
			:buttons="['close']"
			@dialog-closed="closeDialog"
		>
			<template #title>
				<div class="dialog-header">
					<h4>{{ dialog.header }}</h4>
				</div>
			</template>
			<template #content>
				<v-divider class="mb-4" />
				<div class="modal-text">
					<p class="text-md mt-2">
						{{ dialog.text }}
					</p>
				</div>
				<div>
					<v-text-field
						:model-value="dialog.inputText"
						variant="outlined"
						density="compact"
						data-testid="modal-input"
					/>
				</div>
				<div class="modal-text modal-sub-text mb-2">
					{{ dialog.subText }}
				</div>
				<div v-if="dialog.model === 'share' && dialog.qrUrl !== ''">
					<base-qr-code :url="dialog.qrUrl" data-testid="modal-qrcode" />
				</div>
				<v-divider />
			</template>
		</v-custom-dialog>

		<share-modal type="courses" />

		<copy-result-modal
			:is-open="isCopyModalOpen"
			:copy-result-items="copyResultModalItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@dialog-closed="onCopyResultModalClosed"
		/>
	</default-wireframe>
</template>

<script>
import BaseQrCode from "@/components/base/BaseQrCode.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal";
import RoomDotMenu from "@/components/molecules/RoomDotMenu";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe";
import RoomDashboard from "@/components/templates/RoomDashboard";
import SpeedDialMenu from "@/components/ui-speed-dial-menu/SpeedDialMenu";
import SpeedDialMenuAction from "@/components/ui-speed-dial-menu/SpeedDialMenuAction";
import { useCopy } from "@/composables/copy";
import { useLoadingState } from "@/composables/loadingState";
import {
	ImportUserResponseRoleNamesEnum as Roles,
	ShareTokenBodyParamsParentTypeEnum,
} from "@/serverApi/v3";
import { authModule, envConfigModule, roomModule } from "@/store";
import { CopyParamsTypeEnum } from "@/store/copy";
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
import RoomExternalToolsOverview from "./tools/RoomExternalToolsOverview.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useI18n } from "vue-i18n";

export default defineComponent({
	setup() {
		const { t } = useI18n();
		const { isLoadingDialogOpen } = useLoadingState(
			t("components.molecules.copyResult.title.loading")
		);

		const { copy, backgroundCopyProcesses, isCopyProcessInBackground } =
			useCopy(isLoadingDialogOpen);

		return {
			mdiPlus,
			copy,
			backgroundCopyProcesses,
			isCopyProcessInBackground,
		};
	},
	components: {
		BaseQrCode,
		DefaultWireframe,
		RoomDashboard,
		RoomDotMenu,
		vCustomDialog,
		CopyResultModal,
		ShareModal,
		SpeedDialMenu,
		SpeedDialMenuAction,
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
					title: this.$t("common.words.courses"),
					to: "/rooms-overview",
					disabled: false,
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
					href: `/tools/context/tool-configuration?contextId=${this.courseId}&contextType=course`,
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
					action: async () => await roomModule.downloadImsccCourse("1.1.0"),
					name: this.$t("common.actions.download.v1.1"),
					dataTestId: "title-menu-imscc-download-v1.1",
				});
			}

			if (envConfigModule.getEnv.FEATURE_IMSCC_COURSE_EXPORT_ENABLED) {
				items.push({
					icon: this.icons.mdiTrayArrowDown,
					action: async () => await roomModule.downloadImsccCourse("1.3.0"),
					name: this.$t("common.actions.download.v1.3"),
					dataTestId: "title-menu-imscc-download-v1.3",
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
		if (this.$route.query?.tab) {
			this.setActiveTab(this.$route.query.tab);
		}

		await roomModule.fetchContent(this.courseId);
		await roomModule.fetchScopePermission({
			courseId: this.courseId,
			userId: authModule.getUser.id,
		});

		document.title = buildPageTitle(this.roomData.title);
	},
	mounted() {
		window.addEventListener("pageshow", this.setActiveTabIfPageCached);
	},
	beforeUnmount() {
		window.removeEventListener("pageshow", this.setActiveTabIfPageCached);
	},
	methods: {
		setActiveTabIfPageCached(event) {
			if (event.persisted) {
				if (this.$route.query?.tab) {
					this.setActiveTab(this.$route.query.tab);
				} else {
					this.setActiveTab("learn-content");
				}
			}
		},
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
				this.$router.push({
					query: { ...this.$route.query, tab: this.tabItems[newIndex].name },
				});
			}
		},
	},
});
</script>

<style lang="scss" scoped>
@import "~vuetify/settings";

.course-title {
	overflow: hidden;
	white-space: nowrap;
}

:deep(.theme--light.v-chip:hover::before) {
	opacity: 0;
}

.modal-text {
	font-size: var(--space-md);
	color: rgba(var(--v-theme-black));
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
}

:deep(.v-slide-group__prev),
:deep(.v-slide-group__next) {
	display: none !important;
}

.border-bottom {
	margin-right: calc(-1 * var(--space-lg));
	margin-left: calc(-1 * var(--space-lg));
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
