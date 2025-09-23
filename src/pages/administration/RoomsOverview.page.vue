<template>
	<default-wireframe
		:headline="t('pages.administration.rooms.index.title')"
		:breadcrumbs="breadcrumbs"
		max-width="full"
		data-testid="admin-course-title"
	>
		<template #header>
			<h1>
				{{ t("pages.administration.rooms.index.title") }}
			</h1>
			<v-switch
				v-model="withoutTeacher"
				:label="t('pages.administration.courses.withoutTeacher')"
				:true-icon="mdiCheck"
				data-testid="admin-course-without-teacher-checkbox"
				hide-details
				:true-value="true"
				:false-value="false"
				@update:model-value="onUpdateWithoutTeacherFilter"
			/>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs v-model="activeTab" class="tabs-max-width" grow>
					<v-tab value="current" data-testid="admin-course-current-tab">
						<span>{{ t("pages.administration.common.label.active") }}</span>
					</v-tab>
					<v-tab value="archive" data-testid="admin-course-archive-tab">
						<span>{{ t("pages.administration.common.label.archive") }}</span>
					</v-tab>
				</v-tabs>
			</div>
		</template>
		<v-data-table-server
			v-model:items-per-page="pagination.limit"
			:headers="headers"
			:items="courses"
			:items-length="pagination.total"
			:page="page"
			:items-per-page-text="footerProps.itemsPerPageText"
			:items-per-page-options="footerProps.itemsPerPageOptions"
			:loading="isLoading"
			data-testid="admin-rooms-table"
			class="elevation-1"
			:no-data-text="t('common.nodata')"
			@update:sort-by="onUpdateSortBy"
			@update:items-per-page="onUpdateItemsPerPage"
			@update:page="onUpdateCurrentPage"
		>
			<template #[`item.name`]="{ item }">
				<span data-testid="admin-rooms-table-name">
					{{ item.name }}
				</span>
			</template>
			<template #[`item.syncedGroup`]="{ item }">
				<span data-testid="admin-rooms-table-synced-group">
					{{ item.syncedGroup }}
				</span>
			</template>
			<template #[`item.classNames`]="{ item }">
				<span data-testid="admin-rooms-table-class-names">
					{{ joinNamesList(item.classNames) || "" }}
				</span>
			</template>
			<template #[`item.teacherNames`]="{ item }">
				<span
					v-if="item.teacherNames.length > 0"
					data-testid="admin-rooms-table-teacher-names"
				>
					{{ joinNamesList(item.teacherNames) }}
				</span>
				<span v-else data-testid="admin-rooms-table-teacher-names-empty">
					<v-icon color="warning" start>
						{{ mdiAlert }}
					</v-icon>
					{{ t("pages.administration.courses.noTeacher") }}
				</span>
			</template>
			<template #[`item.actions`]="{ item }">
				<template v-if="showRoomAction(item)">
					<v-btn
						:title="t('pages.administration.courses.edit')"
						:aria-label="t('pages.administration.courses.edit')"
						data-testid="course-table-edit-btn"
						variant="outlined"
						size="small"
						:href="`/courses/${item.id}/edit?redirectUrl=/administration/rooms/new`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiPencilOutline }}</v-icon>
					</v-btn>
					<v-btn
						:title="$t('pages.administration.courses.delete')"
						:aria-label="$t('pages.administration.courses.delete')"
						data-testid="course-table-delete-btn"
						variant="outlined"
						size="small"
						class="mx-1 px-1"
						min-width="0"
						@click="onClickDeleteIcon(item)"
					>
						<v-icon>{{ mdiTrashCanOutline }}</v-icon>
					</v-btn>
				</template>
				<template v-if="showSyncAction(item)">
					<v-btn
						v-if="courseSyncEnabled"
						:title="t('feature-course-sync.startRoomSyncDialog.title')"
						:aria-label="t('feature-course-sync.startRoomSyncDialog.title')"
						data-testid="course-table-start-course-sync-btn"
						variant="outlined"
						size="small"
						class="mx-1 px-1"
						min-width="0"
						@click="onClickStartSyncIcon(item)"
					>
						<v-icon>{{ mdiSync }}</v-icon>
					</v-btn>
				</template>
				<template v-if="showEndSyncAction(item)">
					<v-btn
						v-if="courseSyncEnabled"
						:title="t('feature-course-sync.EndCourseSyncDialog.title')"
						:aria-label="t('feature-course-sync.EndCourseSyncDialog.title')"
						data-testid="course-table-end-course-sync-btn"
						variant="outlined"
						size="small"
						class="mx-1 px-1"
						min-width="0"
						@click="onClickEndSyncIcon(item)"
					>
						<v-icon>{{ mdiSyncOff }}</v-icon>
					</v-btn>
				</template>
			</template>
		</v-data-table-server>
		<v-custom-dialog
			:is-open="isDeleteDialogOpen"
			max-width="360"
			data-testid="delete-dialog"
			has-buttons
			:buttons="['cancel', 'confirm']"
			@dialog-closed="onCancelCourseDeletion"
			@dialog-confirmed="onConfirmCourseDeletion"
		>
			<template #title>
				<h2 class="my-2">
					{{ t("pages.administration.courses.delete") }}
				</h2>
			</template>
			<template #content>
				<p>
					{{
						t("pages.administration.courses.deleteDialog.content", {
							itemName: selectedItemName,
						})
					}}
				</p>
			</template>
		</v-custom-dialog>
		<StartExistingCourseSyncDialog
			v-model:is-open="isCourseSyncDialogOpen"
			:course-id="selectedItem?.id"
			:course-name="selectedItem?.name"
			:course-teachers="selectedItem?.teacherNames"
			data-testid="start-sync-dialog"
			@success="onConfirmSynchronizeCourse"
		/>

		<EndCourseSyncDialog
			v-model:is-open="isEndSyncDialogOpen"
			:course-name="selectedItem?.name"
			:group-name="selectedItem?.syncedGroup"
			:course-id="selectedItem?.id"
			@success="loadCourseList"
		/>

		<v-btn
			class="my-5 button-start"
			color="primary"
			variant="flat"
			data-testid="admin-courses-add-button"
			href="/courses/add?redirectUrl=/administration/rooms/new"
		>
			{{ t("pages.administration.courses.index.add") }}
		</v-btn>

		<p class="text-muted">
			{{
				t("pages.administration.common.hint", {
					institute_title: instituteTitle,
				})
			}}
		</p>
	</default-wireframe>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import {
	CourseInfoDataResponse,
	CourseSortProps,
	CourseStatus,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { SortOrder } from "@/store/types/sort-order.enum";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useCourseList } from "@data-room";
import {
	EndCourseSyncDialog,
	StartExistingCourseSyncDialog,
} from "@feature-course-sync";
import {
	mdiAlert,
	mdiCheck,
	mdiPencilOutline,
	mdiSync,
	mdiSyncOff,
	mdiTrashCanOutline,
} from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import type { DataTableHeader } from "vuetify";
import { useEnvConfig, useEnvStore } from "@data-env";
import { storeToRefs } from "pinia";

type Tab = "current" | "archive";

export type CourseSortItem = {
	key: CourseSortProps;
	order?: boolean | "asc" | "desc";
};

const props = defineProps({
	tab: {
		type: String as PropType<Tab>,
		default: "current",
	},
});

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

const route = useRoute();
const router = useRouter();

const { t } = useI18n();
useTitle(buildPageTitle(t("pages.administration.rooms.index.title")));

const {
	fetchCourses,
	pagination,
	page,
	isLoading,
	courses,
	withoutTeacher,
	setSortBy,
	setSortOrder,
	setPage,
	setPagination,
	deleteCourse,
} = useCourseList();

const activeTab = computed({
	get() {
		return props.tab;
	},
	set(newTab: string) {
		onTabsChange(newTab);
	},
});

const onUpdateWithoutTeacherFilter = async () => {
	await loadCourseList();
};

const footerProps = {
	itemsPerPageText: t("components.organisms.Pagination.recordsPerPage"),
	itemsPerPageOptions: [5, 10, 25, 50, 100],
};

const breadcrumbs: Ref<Breadcrumb[]> = computed(() => [
	{
		title: t("pages.administration.index.title"),
		disabled: true,
	},
	{
		title: t("pages.administration.rooms.index.title"),
		disabled: true,
	},
]);

const courseStatus: ComputedRef<CourseStatus> = computed(() => {
	switch (props.tab) {
		case "current":
			return CourseStatus.Current;
		case "archive":
			return CourseStatus.Archive;
		default:
			return CourseStatus.Current;
	}
});

const hasPermission: ComputedRef<boolean> = computed(() =>
	authModule.getUserPermissions.includes("COURSE_ADMINISTRATION".toLowerCase())
);

const showRoomAction = (item: CourseInfoDataResponse) =>
	hasPermission.value && item.id;

const showSyncAction = (item: CourseInfoDataResponse) =>
	hasPermission.value && !item.syncedGroup;

const showEndSyncAction = (item: CourseInfoDataResponse) =>
	hasPermission.value && item.syncedGroup;

const isDeleteDialogOpen: Ref<boolean> = ref(false);

const isStartSyncDialogOpen: Ref<boolean> = ref(false);

const isCourseSyncDialogOpen: Ref<boolean> = ref(false);

const isEndSyncDialogOpen: Ref<boolean> = ref(false);

const selectedItem: Ref<CourseInfoDataResponse | undefined> = ref();

const selectedItemName: ComputedRef<string> = computed(
	() => selectedItem.value?.name || "???"
);

const joinNamesList = (names: string[]) => {
	if (names.length === 0) return;
	return names.join(", ");
};

const onClickStartSyncIcon = (selectedCourse: CourseInfoDataResponse) => {
	selectedItem.value = selectedCourse;
	isStartSyncDialogOpen.value = true;
	isCourseSyncDialogOpen.value = true;
};

const onClickEndSyncIcon = (selectedCourse: CourseInfoDataResponse) => {
	selectedItem.value = selectedCourse;
	isEndSyncDialogOpen.value = true;
};

const onClickDeleteIcon = (selectedCourse: CourseInfoDataResponse) => {
	selectedItem.value = selectedCourse;
	isDeleteDialogOpen.value = true;
};

const onCancelCourseDeletion = () => {
	selectedItem.value = undefined;
	isDeleteDialogOpen.value = false;
};

const courseSyncEnabled = computed(
	() => useEnvConfig().value.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED
);

const headers = computed(() => {
	const headerList: DataTableHeader<CourseInfoDataResponse>[] = [
		{
			value: "name",
			title: t("common.labels.course"),
			sortable: true,
		},
	];

	if (courseSyncEnabled.value) {
		headerList.push({
			key: "syncedGroup",
			title: t("pages.administration.classes.header.sync"),
			sortable: false,
		});
	}

	headerList.push(
		{
			key: "classNames",
			value: (item: CourseInfoDataResponse) => item.classNames?.join(", "),
			title: t("common.labels.classes"),
			sortable: false,
		},
		{
			key: "teacherNames",
			value: (item: CourseInfoDataResponse) => item.teacherNames?.join(", "),
			title: t("common.labels.teacher"),
			sortable: false,
		},
		{
			value: "actions",
			title: "",
			sortable: false,
		}
	);

	return headerList;
});

const onConfirmSynchronizeCourse = async () => {
	await loadCourseList();
};

const onConfirmCourseDeletion = async () => {
	if (selectedItem.value) {
		await deleteCourse(selectedItem.value.id);
	}
	await loadCourseList();
};

const loadCourseList = async () => {
	await fetchCourses(courseStatus.value);
};

const onTabsChange = async (tab: string) => {
	await router.replace({
		query: { ...route.query, tab },
	});

	await loadCourseList();
};

const onUpdateSortBy = async (sortBy: CourseSortItem[]) => {
	const fieldToSortBy: CourseSortItem = sortBy[0];
	const key: CourseSortProps | undefined = fieldToSortBy
		? fieldToSortBy.key
		: undefined;
	setSortBy(key);

	const sortOrder =
		fieldToSortBy?.order === "desc" ? SortOrder.DESC : SortOrder.ASC;
	setSortOrder(sortOrder);

	await loadCourseList();
};

const onUpdateCurrentPage = async (currentPage: number) => {
	setPage(currentPage);
	const skip = (currentPage - 1) * pagination.value.limit;
	setPagination({ ...pagination.value, skip });

	await loadCourseList();
};
const onUpdateItemsPerPage = async (itemsPerPage: number) => {
	setPagination({ ...pagination.value, limit: itemsPerPage });

	await loadCourseList();
};

onMounted(() => {
	onTabsChange(activeTab.value);
});

const { instituteTitle } = storeToRefs(useEnvStore());
</script>

<style scoped>
.v-tabs {
	margin-bottom: -2px;
}
</style>
