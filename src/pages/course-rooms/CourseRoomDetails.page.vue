<template>
	<CourseRoomLockedPage v-if="isLocked" :title="roomData.title" />
	<DefaultWireframe v-else ref="main" :fab-items="getCurrentFabItems" :breadcrumbs="breadcrumbs" max-width="short">
		<template #header>
			<div class="d-flex mt-3">
				<h1 class="pb-2 ma-0 course-title" :class="{ 'pr-5': roomData.isArchived }" data-testid="courses-course-title">
					{{ roomData.title }}
				</h1>
				<VChip v-if="roomData.isSynchronized" size="small" class="mt-1 ml-2" data-testid="synced-course-chip">
					{{ $t("pages.courseRooms.headerSection.synchronized") }}
				</VChip>
				<VChip v-if="roomData.isArchived" size="small" class="mt-1 ml-2">
					{{ $t("pages.courseRooms.headerSection.archived") }}
				</VChip>
				<div class="mx-2">
					<room-dot-menu
						:menu-items="headlineMenuItems"
						data-testid="room-menu"
						:aria-label="$t('pages.courseRooms.headerSection.menu.ariaLabel')"
					/>
				</div>
			</div>
			<div class="mb-5 header-div">
				<div class="btn">
					<v-btn
						class="back-button"
						variant="outlined"
						size="small"
						:href="`/files/courses/${roomData.roomId}`"
						:data-testid="`room-${roomData.roomId}-files`"
					>
						{{ $t("pages.courseRooms.headerSection.toCourseFiles") }}
					</v-btn>
				</div>
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs v-model="tabIndex" :class="{ 'tabs-max-width': mdAndUp }" grow mandatory>
					<template v-for="tabItem in tabItems" :key="tabItem.name">
						<v-tab :data-testid="tabItem.dataTestId" :href="tabItem.href" class="no-active">
							<template #default>
								<v-icon size="large" class="mr-sm-3"> {{ tabItem.icon }}</v-icon>
								<span class="d-none d-sm-inline">
									{{ tabItem.label }}
								</span>
							</template>
						</v-tab>
					</template>
				</v-tabs>
			</div>
		</template>
		<component
			:is="getCurrentComponent"
			v-if="getCurrentComponent"
			:room-data-object="roomData"
			:role="dashBoardRole"
			:room-id="courseId"
			data-testid="room-content"
			@copy-board-element="onCopyRequested"
		/>
		<ShareModal :type="ShareTokenBodyParamsParentType.COURSES" />
		<CopyDialog
			:is-open="isCopyDialogOpen"
			:copy-item-type="copyItemType"
			@confirm="onConfirmCopy"
			@cancel="onCancelCopy"
		/>
		<CourseCommonCartridgeExportModal />
		<end-course-sync-dialog
			v-model:is-open="isEndSyncDialogOpen"
			group-name=""
			:course-name="roomData.title"
			:course-id="roomData.roomId"
			@success="refreshCourseRoom"
		/>
		<start-existing-course-sync-dialog
			v-model:is-open="isStartSyncDialogOpen"
			:course-name="roomData.title"
			:course-id="roomData.roomId"
			@success="refreshCourseRoom"
		/>
		<SelectBoardLayoutDialog v-model="boardLayoutDialogIsOpen" @select="onLayoutSelected" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import CourseRoomLockedPage from "./CourseRoomLocked.page.vue";
import CourseCommonCartridgeExportModal from "@/components/course-rooms/CourseCommonCartridgeExportModal.vue";
import CourseRoomDashboard from "@/components/course-rooms/CourseRoomDashboard.vue";
import RoomExternalToolsOverview from "@/components/course-rooms/tools/RoomExternalToolsOverview.vue";
import ShareModal from "@/components/share/ShareModal.vue";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
	injectStrict,
	SHARE_MODULE_KEY,
} from "@/utils/inject";
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
import { CopyDialog, useCopyFlow } from "@feature-copy";
import { EndCourseSyncDialog, StartExistingCourseSyncDialog } from "@feature-course-sync";
import {
	mdiAccountGroupOutline,
	mdiContentCopy,
	mdiEmailPlusOutline,
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
import { DefaultWireframe } from "@ui-layout";
import { type MenuItem, RoomDotMenu, SelectBoardLayoutDialog } from "@ui-room-details";
import { type FabAction } from "@ui-speed-dial-menu";
import { storeToRefs } from "pinia";
import { type Component, computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

interface FabItem {
	icon: string;
	label: string;
	href?: string;
	dataTestId: string;
	clickHandler?: () => void;
}

interface TabItem {
	name: string;
	label: string;
	icon: string;
	dataTestId: string;
	component?: Component;
	fabItems?: FabItem[] | null;
	href?: string;
}

// Composables
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { mdAndUp } = useDisplay();
const { roomVariant } = storeToRefs(useRoomDetailsStore());

// Injections
const shareModule = injectStrict(SHARE_MODULE_KEY);
const commonCartridgeExportModule = injectStrict(COMMON_CARTRIDGE_EXPORT_MODULE_KEY);
const courseRoomDetailsModule = injectStrict(COURSE_ROOM_DETAILS_MODULE_KEY);

// Icons
const icons = {
	mdiPencilOutline,
	mdiEmailPlusOutline,
	mdiShareVariantOutline,
	mdiContentCopy,
	mdiExport,
	mdiSyncOff,
	mdiSync,
	mdiViewGridPlusOutline,
};

// Reactive state
const courseId = ref(route.params.id as string);
const isEndSyncDialogOpen = ref(false);
const isStartSyncDialogOpen = ref(false);
const tabIndex = ref(0);
const boardLayoutDialogIsOpen = ref(false);

// Computed
const roomData = computed(() => courseRoomDetailsModule.getRoomData);

const scopedPermissions = computed(() => courseRoomDetailsModule.getPermissionData || []);

const breadcrumbs = computed(() => [
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

const canEditTools = computed(() => useAppStore().hasPermission(Permission.CONTEXT_TOOL_ADMIN));

const learnContentFabItems = computed((): FabItem[] | null => {
	const actions: FabItem[] = [];

	if (useAppStore().hasPermission(Permission.HOMEWORK_CREATE)) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.task"),
			icon: mdiFormatListChecks,
			href: `/homework/new?course=${roomData.value.roomId}&returnUrl=rooms/${roomData.value.roomId}`,
			dataTestId: "fab_button_add_task",
		});
	}

	if (useAppStore().hasPermission(Permission.TOPIC_CREATE)) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.lesson"),
			icon: mdiViewListOutline,
			href: `/courses/${roomData.value.roomId}/topics/add?returnUrl=rooms/${roomData.value.roomId}`,
			dataTestId: "fab_button_add_lesson",
		});
	}

	if (useAppStore().hasPermission(Permission.COURSE_EDIT) && useAppStore().isTeacher) {
		actions.push({
			label: t("pages.courseRoomDetails.fab.add.board"),
			icon: mdiViewGridPlusOutline,
			dataTestId: "fab_button_add_board",
			clickHandler: fabItemClickHandler,
		});
	}

	if (actions.length === 0) {
		return null;
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

	const ctlToolFabItems: FabItem[] = [
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
		fabItems: canEditTools.value ? ctlToolFabItems : null,
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

const getCurrentFabItems = computed((): FabAction[] | undefined => currentTab.value?.fabItems ?? undefined);

const getCurrentComponent = computed(() => currentTab.value?.component);

const headlineMenuItems = computed((): MenuItem[] => {
	if (!scopedPermissions.value.includes("COURSE_EDIT")) return [];

	const items: MenuItem[] = [
		{
			icon: icons.mdiPencilOutline,
			action: () => {
				window.location.href = `/courses/${courseId.value}/edit`;
			},
			name: t("common.actions.edit") + "/" + t("common.actions.delete"),
			dataTestId: "room-menu-edit-delete",
		},
	];

	if (useEnvConfig().value.FEATURE_COPY_SERVICE_ENABLED) {
		items.push({
			icon: icons.mdiContentCopy,
			action: () => {
				onCopyRequested({ id: courseId.value, type: ContentItemTypeEnum.Course });
			},
			name: t("common.actions.duplicate"),
			dataTestId: "room-menu-copy",
		});
	}

	if (useEnvConfig().value.FEATURE_COURSE_SHARE) {
		items.push({
			icon: icons.mdiShareVariantOutline,
			action: () => {
				shareCourse();
			},
			name: t("common.actions.shareCopy"),
			dataTestId: "room-menu-share",
		});
	}

	if (useEnvConfig().value.FEATURE_COMMON_CARTRIDGE_COURSE_EXPORT_ENABLED) {
		items.push({
			icon: icons.mdiExport,
			action: () => {
				onExport();
			},
			name: t("common.actions.export"),
			dataTestId: "room-menu-common-cartridge-download",
		});
	}

	if (roomData.value.isSynchronized) {
		items.push({
			icon: icons.mdiSyncOff,
			action: () => {
				isEndSyncDialogOpen.value = true;
			},
			name: t("pages.courseRooms.menuItems.endSync"),
			dataTestId: "title-menu-end-sync",
		});
	}

	if (useEnvConfig().value.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED && !roomData.value.isSynchronized) {
		items.push({
			icon: icons.mdiSync,
			action: () => {
				isStartSyncDialogOpen.value = true;
			},
			name: t("pages.rooms.menuItems.startSync"),
			dataTestId: "title-menu-start-sync",
		});
	}

	return items;
});

const isLocked = computed(() => courseRoomDetailsModule.getIsLocked);

const initialize = async (id: string, activeTab: string | number = 0) => {
	setActiveTab(activeTab);
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

	document.title = buildPageTitle(roomData.value.title, t("common.words.courses"));
};

const setActiveTab = (tabName: string | number) => {
	const index = tabItems.value.findIndex((tabItem) => tabItem.name === tabName);
	tabIndex.value = index >= 0 ? index : 0;
};

const setActiveTabIfPageCached = (event: PageTransitionEvent) => {
	if (event.persisted) {
		if (route.query?.tab) {
			setActiveTab(route.query.tab as string);
		} else {
			setActiveTab("learn-content");
		}
	}
};

const fabItemClickHandler = () => {
	boardLayoutDialogIsOpen.value = true;
};

const onLayoutSelected = (layout: BoardLayout) => {
	onCreateBoard(roomData.value.roomId, layout);
};

const shareCourse = async () => {
	if (useEnvConfig().value.FEATURE_COURSE_SHARE) {
		shareModule.startShareFlow({
			id: courseId.value,
			type: ShareTokenBodyParamsParentType.COURSES,
		});
	}
};

const onExport = () => {
	commonCartridgeExportModule.startExportFlow();
};

const refreshCourseRoom = async () => {
	await courseRoomDetailsModule.fetchContent(courseId.value);
};

const copyFlow = useCopyFlow();
const { isDialogOpen: isCopyDialogOpen, copyItemType, onConfirm: onConfirmCopy, onCancel: onCancelCopy } = copyFlow;

const onCopyRequested = async ({ id, type }: { id: string; type: ContentItemTypeEnum }) => {
	switch (type) {
		case ContentItemTypeEnum.Course: {
			const { copyResult } = await copyFlow.executeCopyCourse(id);
			if (copyResult?.id) {
				await router.replace(`/rooms/${copyResult.id}`);
				await initialize(copyResult.id);
			}
			break;
		}
		case ContentItemTypeEnum.Task: {
			const { copyResult } = await copyFlow.executeCopyTask(id, courseId.value);
			if (copyResult?.id) {
				await courseRoomDetailsModule.fetchContent(courseId.value);
			}
			break;
		}
		case ContentItemTypeEnum.Lesson: {
			const { copyResult } = await copyFlow.executeCopyLesson(id, courseId.value);
			if (copyResult?.id) {
				await courseRoomDetailsModule.fetchContent(courseId.value);
			}
			break;
		}
		case ContentItemTypeEnum.ColumnBoard: {
			const { copyResult } = await copyFlow.executeCopyBoard(id);
			if (copyResult?.id) {
				await courseRoomDetailsModule.fetchContent(courseId.value);
			}
			break;
		}
	}
};

const onCreateBoard = async (id: string, layout: BoardLayout) => {
	const params = {
		title: t("pages.room.boardCard.label.courseBoard").toString(),
		parentType: BoardParentType.COURSE,
		parentId: id,
		layout,
	};
	const board = await courseRoomDetailsModule.createBoard(params);
	if (board) {
		await router.push(`/boards/${board.id}`);
	}
};

// Watchers
watch(tabIndex, (newIndex) => {
	if (newIndex >= 0 && newIndex < tabItems.value.length) {
		router.push({
			query: { ...route.query, tab: tabItems.value[newIndex].name },
		});
	}
});

// Lifecycle hooks
onMounted(() => {
	window.addEventListener("pageshow", setActiveTabIfPageCached);
});

onBeforeUnmount(() => {
	window.removeEventListener("pageshow", setActiveTabIfPageCached);
});

// Initialize on component creation
initialize(courseId.value, route.query?.tab as string);
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
