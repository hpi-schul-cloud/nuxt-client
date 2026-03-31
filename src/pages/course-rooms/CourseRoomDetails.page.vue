<template>
	<CourseRoomLockedPage v-if="isLocked" :title="roomData.title" />
	<DefaultWireframe v-else :fab-items="currentFabItems" :breadcrumbs="breadcrumbs" max-width="short">
		<template #header>
			<div class="d-flex mt-3">
				<h1 class="pb-2 ma-0 course-title" :class="{ 'pr-5': roomData.isArchived }" data-testid="courses-course-title">
					{{ roomData.title }}
				</h1>
				<VChip v-if="roomData.isSynchronized" size="small" class="mt-1 ml-2" data-testid="synced-course-chip">
					{{ t("pages.courseRooms.headerSection.synchronized") }}
				</VChip>
				<VChip v-if="roomData.isArchived" size="small" class="mt-1 ml-2">
					{{ t("pages.courseRooms.headerSection.archived") }}
				</VChip>
				<div class="mx-2">
					<RoomDotMenu
						:menu-items="headlineMenuItems"
						data-testid="room-menu"
						:aria-label="t('pages.courseRooms.headerSection.menu.ariaLabel')"
					/>
				</div>
			</div>
			<div class="mb-5 header-div">
				<div class="btn">
					<VBtn
						class="back-button"
						variant="outlined"
						size="small"
						:href="`/files/courses/${roomData.roomId}`"
						:data-testid="`room-${roomData.roomId}-files`"
					>
						{{ t("pages.courseRooms.headerSection.toCourseFiles") }}
					</VBtn>
				</div>
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<VTabs v-model="tabIndex" :class="{ 'tabs-max-width': mdAndUp }" grow mandatory>
					<template v-for="tabItem in tabItems" :key="tabItem.name">
						<VTab :data-testid="tabItem.dataTestId" :href="tabItem.href" class="no-active">
							<template #default>
								<VIcon size="large" class="mr-sm-3"> {{ tabItem.icon }}</VIcon>
								<span class="d-none d-sm-inline">
									{{ tabItem.label }}
								</span>
							</template>
						</VTab>
					</template>
				</VTabs>
			</div>
		</template>
		<component
			:is="currentTabComponent"
			v-if="!!currentTabComponent"
			:room-data-object="roomData"
			:role="dashBoardRole"
			:room-id="courseId"
			data-testid="room-content"
			@copy-board-element="onCopyBoardElement"
		/>
		<ShareModal :type="ShareTokenBodyParamsParentType.COURSES" />
		<CopyResultModal
			:is-open="isCopyDialogOpen"
			:copy-result-items="copyResultDialogItems"
			:copy-result-root-item-type="copyResultRootItemType"
			@copy-dialog-closed="onCopyResultDialogClose"
		/>
		<CourseCommonCartridgeExportModal v-model:is-open="isExportDialogOpen" />
		<EndCourseSyncDialog
			v-model:is-open="isEndSyncDialogOpen"
			group-name=""
			:course-name="roomData.title"
			:course-id="roomData.roomId"
			@success="refreshRoom"
		/>
		<StartExistingCourseSyncDialog
			v-model:is-open="isStartSyncDialogOpen"
			:course-name="roomData.title"
			:course-id="roomData.roomId"
			@success="refreshRoom"
		/>
		<SelectBoardLayoutDialog v-model="isBoardLayoutDialogOpen" @select="onLayoutSelected" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CourseRoomLockedPage from "./CourseRoomLocked.page.vue";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import CourseCommonCartridgeExportModal from "@/components/course-rooms/CourseCommonCartridgeExportModal.vue";
import CourseRoomDashboard from "@/components/course-rooms/CourseRoomDashboard.vue";
import RoomExternalToolsOverview from "@/components/course-rooms/tools/RoomExternalToolsOverview.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { useCopy } from "@/composables/copy";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import CourseRoomDetailsModule from "@/store/course-room-details";
import ShareModule from "@/store/share";
import { COPY_MODULE_KEY, COURSE_ROOM_DETAILS_MODULE_KEY, injectStrict, SHARE_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import {
	BoardLayout,
	BoardParentType,
	ImportUserResponseRoleNames as Roles,
	Permission,
	ShareTokenBodyParamsParentType,
} from "@api-server";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { EndCourseSyncDialog, StartExistingCourseSyncDialog } from "@feature-course-sync";
import {
	mdiAccountGroupOutline,
	mdiContentCopy,
	mdiExport,
	mdiFileDocumentOutline,
	mdiFormatListChecks,
	mdiPencilOutline,
	mdiPlus,
	mdiPuzzleOutline,
	mdiShareVariantOutline,
	mdiSync,
	mdiSyncOff,
	mdiViewGridPlusOutline,
	mdiViewListOutline,
} from "@icons/material";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { RoomDotMenu, SelectBoardLayoutDialog } from "@ui-room-details";
import { FabAction } from "@ui-speed-dial-menu";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { type Component, computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { LocationQueryValue, useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

type TabItem = {
	name: string;
	label: string;
	icon: string;
	dataTestId: string;
	component?: Component;
	fabItems?: FabAction[];
	href?: string;
};

type MenuItem = {
	icon: string;
	action: () => void;
	name: string;
	dataTestId: string;
};

const route = useRoute();
const router = useRouter();

const copyModule: CopyModule = injectStrict(COPY_MODULE_KEY);
const shareModule: ShareModule = injectStrict(SHARE_MODULE_KEY);
const courseRoomDetailsModule: CourseRoomDetailsModule = injectStrict(COURSE_ROOM_DETAILS_MODULE_KEY);

const { t } = useI18n();
const { copy } = useCopy();
const { mdAndUp } = useDisplay();
const { roomVariant } = storeToRefs(useRoomDetailsStore());

const courseId = ref(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);
const tabIndex = ref(0);
const isExportDialogOpen = ref(false);
const isEndSyncDialogOpen = ref(false);
const isStartSyncDialogOpen = ref(false);
const isBoardLayoutDialogOpen = ref(false);

const roomData = computed(() => courseRoomDetailsModule.getRoomData);
const scopedPermissions = computed(() => courseRoomDetailsModule.getPermissionData || []);
const isLocked = computed(() => courseRoomDetailsModule.getIsLocked);
const canEditTools = computed(() => !!useAppStore().userPermissions?.includes(Permission.CONTEXT_TOOL_ADMIN));

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{
		title: t("common.words.courses"),
		to: "/rooms/courses-overview",
		disabled: false,
	},
	{
		title: roomData.value.title,
		disabled: true,
	},
]);

const dashBoardRole = computed(() => {
	if (useAppStore().isTeacher) return Roles.TEACHER;
	if (useAppStore().isStudent) return Roles.STUDENT;
	return undefined;
});

const learnContentFabItems = computed<FabAction[] | undefined>(() => {
	const actions: FabAction[] = [];

	if (useAppStore().userPermissions.includes(Permission.HOMEWORK_CREATE)) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.task"),
			icon: mdiFormatListChecks,
			href: `/homework/new?course=${roomData.value.roomId}&returnUrl=rooms/${roomData.value.roomId}`,
			dataTestId: "fab_button_add_task",
		});
	}

	if (useAppStore().userPermissions.includes(Permission.TOPIC_CREATE)) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.lesson"),
			icon: mdiViewListOutline,
			href: `/courses/${roomData.value.roomId}/topics/add?returnUrl=rooms/${roomData.value.roomId}`,
			dataTestId: "fab_button_add_lesson",
		});
	}

	if (useAppStore().userPermissions.includes(Permission.COURSE_EDIT) && useAppStore().isTeacher) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.board"),
			icon: mdiViewGridPlusOutline,
			dataTestId: "fab_button_add_board",
			clickHandler: onOpenBoardLayoutDialog,
		});
	}

	if (actions.length === 0) {
		return;
	}

	return [
		{
			icon: mdiPlus,
			label: t("pages.courseRoomDetails.fab.add.learnContent"),
			dataTestId: "add-content-button",
		},
		...actions,
	];
});

const tabItems = computed<TabItem[]>(() => {
	const tabs: TabItem[] = [
		{
			name: "learn-content",
			label: t("common.words.learnContent"),
			icon: mdiFileDocumentOutline,
			dataTestId: "learnContent-tab",
			component: CourseRoomDashboard,
			fabItems: learnContentFabItems.value,
		},
	];

	const ctlToolFabItems: FabAction[] = [
		{
			icon: mdiPlus,
			label: t("pages.courseRoomDetails.fab.add.tool"),
			dataTestId: "add-tool-button",
			href: `/tools/context/tool-configuration?contextId=${courseId.value}&contextType=course`,
		},
	];

	tabs.push({
		name: "tools",
		label: t("pages.courseRooms.tabLabel.tools"),
		icon: mdiPuzzleOutline,
		dataTestId: "tools-tab",
		component: RoomExternalToolsOverview,
		fabItems: canEditTools.value ? ctlToolFabItems : undefined,
	});

	tabs.push({
		name: "groups",
		label: t("pages.courseRooms.tabLabel.groups"),
		icon: mdiAccountGroupOutline,
		href: `/courses/${roomData.value.roomId}/?activeTab=groups`,
		dataTestId: "groups-tab",
	});

	return tabs;
});

const currentTab = computed(() => {
	let index = tabIndex.value;
	if (tabIndex.value < 0 || tabIndex.value >= tabItems.value.length) {
		index = 0;
	}
	return tabItems.value[index];
});

const currentFabItems = computed(() => currentTab.value?.fabItems);
const currentTabComponent = computed(() => currentTab.value?.component);

const headlineMenuItems = computed<MenuItem[]>(() => {
	if (!scopedPermissions.value.includes("COURSE_EDIT")) return [];

	const items: MenuItem[] = [
		{
			icon: mdiPencilOutline,
			action: () => onEditCourse(),
			name: `${t("common.actions.edit")}/${t("common.actions.delete")}`,
			dataTestId: "room-menu-edit-delete",
		},
	];

	if (useEnvConfig().value.FEATURE_COPY_SERVICE_ENABLED) {
		items.push({
			icon: mdiContentCopy,
			action: () => onCopyRoom(roomData.value.roomId),
			name: t("common.actions.duplicate"),
			dataTestId: "room-menu-copy",
		});
	}

	if (useEnvConfig().value.FEATURE_COURSE_SHARE) {
		items.push({
			icon: mdiShareVariantOutline,
			action: () => onShareCourse(),
			name: t("common.actions.shareCopy"),
			dataTestId: "room-menu-share",
		});
	}

	if (useEnvConfig().value.FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED) {
		items.push({
			icon: mdiExport,
			action: () => onOpenExportDialog(),
			name: t("common.actions.export"),
			dataTestId: "room-menu-common-cartridge-download",
		});
	}

	if (roomData.value.isSynchronized) {
		items.push({
			icon: mdiSyncOff,
			action: () => onOpenEndSyncDialog(),
			name: t("pages.courseRooms.menuItems.endSync"),
			dataTestId: "title-menu-end-sync",
		});
	} else if (useEnvConfig().value.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED) {
		items.push({
			icon: mdiSync,
			action: () => onOpenStartSyncDialog(),
			name: t("pages.rooms.menuItems.startSync"),
			dataTestId: "title-menu-start-sync",
		});
	}

	return items;
});

const copyResultDialogItems = computed(() => copyModule.getCopyResultFailedItems);
const copyResultRootItemType = computed(() => copyModule.getCopyResult?.type);
const isCopyDialogOpen = computed(() => copyModule.getIsResultModalOpen);

const setActiveTab = (tabName: string) => {
	const index = tabItems.value.findIndex((tabItem) => tabItem.name === tabName);
	tabIndex.value = index >= 0 ? index : 0;
};

const initialize = async (id: string, activeTab?: LocationQueryValue | LocationQueryValue[]) => {
	const tabName = Array.isArray(activeTab) ? activeTab[0] : activeTab;
	setActiveTab(tabName ?? "learn-content");
	courseId.value = id;

	await courseRoomDetailsModule.fetchContent(id);

	if (roomData.value.roomId) {
		roomVariant.value = RoomVariant.COURSE_ROOM;
	}

	const userId = useAppStore().user?.id;
	if (userId) {
		await courseRoomDetailsModule.fetchScopePermission({
			courseId: id,
			userId,
		});
	}

	useTitle(buildPageTitle(roomData.value.title, t("common.words.courses")));
};

const setActiveTabIfPageCached = (event: PageTransitionEvent) => {
	if (event.persisted) {
		const activeTab = Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab;
		setActiveTab(activeTab ?? "learn-content");
	}
};

const onShareCourse = () => {
	if (useEnvConfig().value.FEATURE_COURSE_SHARE) {
		shareModule.startShareFlow({
			id: courseId.value,
			type: ShareTokenBodyParamsParentType.COURSES,
		});
	}
};

const refreshRoom = async () => {
	await courseRoomDetailsModule.fetchContent(courseId.value);
};

const onCopyRoom = async (roomId: string) => {
	const copyParams = {
		id: roomId,
		courseId: roomId,
		type: CopyParamsTypeEnum.Course,
	};

	await copy(copyParams);

	const copyResult = copyModule.getCopyResult;

	if (copyResult?.id !== undefined) {
		const copyId = copyResult.id.replace(/[^a-z\d]/g, "");
		await router.push({ path: `/rooms/${copyId}`, replace: true });
		await initialize(copyId);
	} else {
		await router.push("/rooms/courses-overview");
	}
};

const onCopyBoardElement = async (payload: CopyParams) => {
	await copy(payload);
	if (payload.courseId) {
		await courseRoomDetailsModule.fetchContent(payload.courseId);
	}
};

const onCopyResultDialogClose = () => {
	copyModule.reset();
};

const onCreateBoard = async (roomId: string, layout: BoardLayout) => {
	const params = {
		title: t("pages.room.boardCard.label.courseBoard").toString(),
		parentType: BoardParentType.COURSE,
		parentId: roomId,
		layout,
	};
	const board = await courseRoomDetailsModule.createBoard(params);
	if (board?.id) {
		await router.push(`/boards/${board.id}`);
	}
};

const onEditCourse = () => {
	router.push(`/courses/${courseId.value}/edit`);
};

const onLayoutSelected = (layout: BoardLayout) => {
	onCreateBoard(roomData.value.roomId, layout);
};

const onOpenBoardLayoutDialog = () => {
	isBoardLayoutDialogOpen.value = true;
};

const onOpenStartSyncDialog = () => {
	isStartSyncDialogOpen.value = true;
};

const onOpenEndSyncDialog = () => {
	isEndSyncDialogOpen.value = true;
};

const onOpenExportDialog = () => {
	isExportDialogOpen.value = true;
};

watch(tabIndex, (newIndex) => {
	if (newIndex >= 0 && newIndex < tabItems.value.length) {
		router.push({
			query: { ...route.query, tab: tabItems.value[newIndex].name },
		});
	}
});

onMounted(() => {
	window.addEventListener("pageshow", setActiveTabIfPageCached);
});

onBeforeUnmount(() => {
	window.removeEventListener("pageshow", setActiveTabIfPageCached);
});

initialize(courseId.value, route.query?.tab);
</script>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.course-title {
	overflow: hidden;
	white-space: nowrap;
}

:deep(.theme--light.v-chip:hover::before) {
	opacity: 0;
}

.tabs-max-width {
	max-width: var(--content-max-width);
}

// even out border
.v-tabs {
	margin-bottom: -2px;
}

:deep(.v-slide-group__prev),
:deep(.v-slide-group__next) {
	display: none !important;
}

.border-bottom {
	margin-right: -24px;
	margin-left: -24px;
	border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}
</style>
