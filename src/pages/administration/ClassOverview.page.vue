<template>
	<default-wireframe
		:headline="t('pages.administration.classes.index.title')"
		max-width="full"
		data-testid="admin-class-title"
	>
		<template #header>
			<h1>
				{{ t("pages.administration.classes.index.title") }}
			</h1>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs v-model="activeTab" class="tabs-max-width" grow>
					<v-tab value="next" data-testid="admin-class-next-year-tab">
						<span>{{ nextYear }}</span>
					</v-tab>
					<v-tab value="current" data-testid="admin-class-current-year-tab">
						<span>{{ currentYear }}</span>
					</v-tab>
					<v-tab value="archive" data-testid="admin-class-previous-years-tab">
						<span>{{ t("pages.administration.common.label.archive") }}</span>
					</v-tab>
				</v-tabs>
			</div>
		</template>
		<v-data-table-server
			v-model:items-per-page="pagination.limit"
			:headers="headers"
			:items="classes"
			:items-length="pagination.total"
			:page="page"
			:items-per-page-text="footerProps.itemsPerPageText"
			:items-per-page-options="footerProps.itemsPerPageOptions"
			:loading="isLoading"
			data-testid="admin-class-table"
			class="elevation-1"
			:no-data-text="t('common.nodata')"
			@update:sort-by="onUpdateSortBy"
			@update:items-per-page="onUpdateItemsPerPage"
			@update:page="onUpdateCurrentPage"
		>
			<template #[`item.name`]="{ item }">
				<span data-testid="class-table-name">
					{{ item.name }}
				</span>
			</template>
			<template #[`item.synchronizedCourses`]="{ item }">
				<span data-testid="class-table-synced-courses">
					{{
						(item.synchronizedCourses || [])
							.map((course: CourseInfo) => course.name)
							.join(", ") || ""
					}}
				</span>
			</template>
			<template #[`item.externalSourceName`]="{ item }">
				<span data-testid="class-table-source">
					{{ item.externalSourceName }}
				</span>
			</template>
			<template #[`item.teacherNames`]="{ item }">
				<span data-testid="class-table-teachers">
					{{ item.teacherNames?.join(", ") || "" }}
				</span>
			</template>
			<template #[`item.studentCount`]="{ item }">
				<span data-testid="class-table-student-count">
					{{ item.studentCount }}
				</span>
			</template>
			<template #[`item.actions`]="{ item }">
				<template v-if="showClassAction(item)">
					<v-btn
						:title="t('pages.administration.classes.manage')"
						:aria-label="t('pages.administration.classes.manage')"
						data-testid="legacy-class-table-manage-btn"
						variant="outlined"
						size="small"
						:href="`/administration/classes/${item.id}/manage`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiAccountGroupOutline }}</v-icon>
					</v-btn>
					<v-btn
						:title="t('pages.administration.classes.edit')"
						:aria-label="t('pages.administration.classes.edit')"
						data-testid="class-table-edit-btn"
						variant="outlined"
						size="small"
						:href="`/administration/classes/${item.id}/edit`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiPencilOutline }}</v-icon>
					</v-btn>
					<v-btn
						:title="t('pages.administration.classes.delete')"
						:aria-label="t('pages.administration.classes.delete')"
						data-testid="class-table-delete-btn"
						variant="outlined"
						size="small"
						class="mx-1 px-1"
						min-width="0"
						@click="onClickDeleteIcon(item)"
					>
						<v-icon>{{ mdiTrashCanOutline }}</v-icon>
					</v-btn>
					<v-btn
						:disabled="!item.isUpgradable"
						:aria-label="t('pages.administration.classes.createSuccessor')"
						:title="t('pages.administration.classes.createSuccessor')"
						data-testid="class-table-successor-btn"
						variant="outlined"
						size="small"
						:href="`/administration/classes/${item.id}/createSuccessor`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiArrowUp }}</v-icon>
					</v-btn>
				</template>
				<template v-else-if="showGroupAction(item)">
					<v-btn
						:title="t('pages.administration.classes.manage')"
						:aria-label="t('pages.administration.classes.manage')"
						data-testid="class-table-members-manage-btn"
						variant="outlined"
						size="small"
						:to="{
							name: 'administration-groups-classes-members',
							params: { groupId: item.id },
						}"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiAccountGroupOutline }}</v-icon>
					</v-btn>
					<v-btn
						v-if="item.synchronizedCourses && item.synchronizedCourses.length"
						:title="t('feature-course-sync.EndCourseSyncDialog.title')"
						:aria-label="t('feature-course-sync.EndCourseSyncDialog.title')"
						data-testid="class-table-end-course-sync-btn"
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
			confirm-btn-title-key="common.actions.delete"
			:buttons="['cancel', 'confirm']"
			@dialog-closed="onCancelClassDeletion"
			@dialog-confirmed="onConfirmClassDeletion"
		>
			<template #title>
				<h2 class="my-2">
					{{ t("pages.administration.classes.deleteDialog.title") }}
				</h2>
			</template>
			<template #content>
				<p>
					{{
						t("pages.administration.classes.deleteDialog.content", {
							itemName: selectedItemName,
						})
					}}
				</p>
			</template>
		</v-custom-dialog>
		<end-course-sync-dialog
			v-model:is-open="isEndSyncDialogOpen"
			data-testid="end-course-sync-dialog"
			:course-name="selectedItemForSync.courseName"
			:group-name="selectedItemForSync.groupName"
			:course-id="selectedItemForSync.courseId"
			@success="loadClassList"
		/>

		<v-btn
			v-if="hasCreatePermission"
			class="my-5 button-start"
			color="primary"
			variant="flat"
			data-testid="admin-class-add-button"
			href="/administration/classes/create"
		>
			{{ t("pages.administration.classes.index.add") }}
		</v-btn>

		<InfoAlert
			v-if="!hasCreatePermission"
			class="mb-4"
			:class="{ 'mt-4': !hasCreatePermission }"
			data-testid="admin-class-info-alert"
			alert-title="pages.administration.classes.thr.hint.title"
		>
			{{ t("pages.administration.classes.thr.hint.text") }}
		</InfoAlert>

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
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import {
	ClassSortQueryType,
	Permission,
	SchoolYearQueryType,
} from "@/serverApi/v3";
import GroupModule from "@/store/group";
import SchoolsModule from "@/store/schools";
import { ClassInfo, ClassRootType, CourseInfo } from "@/store/types/class-info";
import { Pagination } from "@/store/types/commons";
import { SortOrder } from "@/store/types/sort-order.enum";
import {
	GROUP_MODULE_KEY,
	injectStrict,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { EndCourseSyncDialog } from "@feature-course-sync";
import {
	mdiAccountGroupOutline,
	mdiArrowUp,
	mdiPencilOutline,
	mdiSyncOff,
	mdiTrashCanOutline,
} from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { InfoAlert } from "@ui-alert";
import { useRoute, useRouter } from "vue-router";
import { DataTableHeader } from "vuetify";
import { useEnvConfig, useEnvStore } from "@data-env";
import { storeToRefs } from "pinia";
import { useAppStore } from "@data-app";

type Tab = "current" | "next" | "archive";
// vuetify typing: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VDataTable/composables/sort.ts#L29-L29
type ClassSortItem = {
	key: ClassSortQueryType;
	order?: boolean | "asc" | "desc";
};

const props = defineProps({
	tab: {
		type: String as PropType<Tab>,
		default: "current",
	},
});

const { hasPermission } = useAppStore();
const groupModule: GroupModule = injectStrict(GROUP_MODULE_KEY);
const schoolsModule: SchoolsModule = injectStrict(SCHOOLS_MODULE_KEY);

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const activeTab = computed({
	get() {
		return props.tab;
	},
	set(newTab: string) {
		onTabsChange(newTab);
	},
});

const footerProps = {
	itemsPerPageText: t("components.organisms.Pagination.recordsPerPage"),
	itemsPerPageOptions: [5, 10, 25, 50, 100],
};

useTitle(buildPageTitle(t("pages.administration.classes.index.title")));

const schoolYearQueryType: ComputedRef<SchoolYearQueryType> = computed(() => {
	switch (props.tab) {
		case "next":
			return SchoolYearQueryType.NextYear;
		case "current":
			return SchoolYearQueryType.CurrentYear;
		case "archive":
			return SchoolYearQueryType.PreviousYears;
		default:
			return SchoolYearQueryType.CurrentYear;
	}
});

const nextYear = computed(() => schoolsModule.getSchool.years.nextYear.name);

const currentYear = computed(
	() => schoolsModule.getSchool.years.activeYear.name
);

const classes = computed(() => groupModule.getClasses);

const showSourceHeader = computed(() =>
	classes.value.some((classItem) => classItem.externalSourceName !== undefined)
);

const isLoading = computed(() => groupModule.getLoading);

const hasEditPermission = hasPermission(Permission.ClassEdit);
const hasCreatePermission = hasPermission(Permission.ClassCreate);

const showClassAction = (item: ClassInfo) =>
	hasEditPermission.value && item.type === ClassRootType.Class;

const showGroupAction = (item: ClassInfo) =>
	hasEditPermission.value && item.type === ClassRootType.Group;

const isDeleteDialogOpen = ref(false);

const isEndSyncDialogOpen = ref(false);

const selectedItem: Ref<ClassInfo | undefined> = ref();

const selectedItemName = computed(() => selectedItem.value?.name || "???");

const selectedItemForSync: ComputedRef<{
	courseName: string;
	groupName: string;
	courseId?: string;
}> = computed(() => {
	const synchronizedCourse: CourseInfo | undefined =
		selectedItem.value?.synchronizedCourse;

	return {
		courseId: synchronizedCourse?.id,
		courseName: synchronizedCourse?.name ?? "",
		groupName: selectedItem.value?.name ?? "",
	};
});

const onClickEndSyncIcon = (selectedClass: ClassInfo) => {
	selectedItem.value = selectedClass;
	isEndSyncDialogOpen.value = true;
};

const onClickDeleteIcon = (selectedClass: ClassInfo) => {
	selectedItem.value = selectedClass;
	isDeleteDialogOpen.value = true;
};

const onCancelClassDeletion = () => {
	selectedItem.value = undefined;
	isDeleteDialogOpen.value = false;
};

const pagination: ComputedRef<Pagination> = computed(
	() => groupModule.getPagination
);

const page: ComputedRef<number> = computed(() => groupModule.getPage);

const courseSyncEnabled = computed(
	() => useEnvConfig().value.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED
);

const headers = computed(() => {
	const headerList: DataTableHeader<ClassInfo>[] = [
		{
			value: "name",
			title: t("common.labels.classes"),
			sortable: true,
		},
	];
	if (courseSyncEnabled.value) {
		headerList.push({
			key: "synchronizedCourses",
			value: (item: ClassInfo) =>
				item.synchronizedCourses
					?.map((course: CourseInfo): string => course.name)
					.join(", "),
			title: t("pages.administration.classes.header.sync"),
			sortable: true,
		});
	}
	if (showSourceHeader.value) {
		headerList.push({
			value: "externalSourceName",
			title: t("common.labels.externalsource"),
			sortable: true,
		});
	}
	headerList.push(
		{
			key: "teacherNames",
			value: (item: ClassInfo) => item.teacherNames.join(", "),
			title: t("common.labels.teacher"),
			sortable: true,
		},
		{
			value: "studentCount",
			title: t("common.labels.students"),
			sortable: true,
		},
		{
			value: "actions",
			title: "",
			sortable: false,
		}
	);

	return headerList;
});

const onConfirmClassDeletion = async () => {
	if (selectedItem.value) {
		await groupModule.deleteClass({
			classId: selectedItem.value.id,
			query: schoolYearQueryType.value,
		});
	}
};

const loadClassList = async () => {
	await groupModule.loadClassesForSchool({
		schoolYearQuery: schoolYearQueryType.value,
	});
};

const onTabsChange = async (tab: string) => {
	await router.replace({
		query: { ...route.query, tab },
	});
	await loadClassList();
};

const onUpdateSortBy = async (sortBy: ClassSortItem[]) => {
	const fieldToSortBy: ClassSortItem = sortBy[0];
	const key: ClassSortQueryType | undefined = fieldToSortBy
		? fieldToSortBy.key
		: undefined;
	groupModule.setSortBy(key);

	const sortOrder =
		fieldToSortBy?.order === "desc" ? SortOrder.DESC : SortOrder.ASC;
	groupModule.setSortOrder(sortOrder);

	await loadClassList();
};

const onUpdateCurrentPage = async (currentPage: number) => {
	groupModule.setPage(currentPage);
	const skip = (currentPage - 1) * groupModule.getPagination.limit;
	groupModule.setPagination({ ...pagination.value, skip });

	await loadClassList();
};
const onUpdateItemsPerPage = async (itemsPerPage: number) => {
	groupModule.setPagination({ ...pagination.value, limit: itemsPerPage });

	await loadClassList();
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
