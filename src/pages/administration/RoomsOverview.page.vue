<template>
	<default-wireframe
		:headline="t('pages.administration.rooms.index.title')"
		:breadcrumbs="breadcrumbs"
		max-width="full"
		data-testid="admin-course-title"
	>
		<template #header>
			<h1 class="text-h3 pl-2">
				{{ "pages.administration.rooms.index.title" }}
			</h1>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center">
				<v-tabs class="tabs-max-width" grow v-model="activeTab">
					<v-tab value="current" data-testid="admin-course-current-year-tab">
						<span>{{ "Aktuell" }}</span>
					</v-tab>
					<v-tab value="archive" data-testid="admin-course-previous-years-tab">
						<span>{{ "Archiv" }}</span>
					</v-tab>
				</v-tabs>
			</div>
		</template>
		<v-data-table-server
			:headers="headers"
			:items="courses"
			v-model:items-per-page="pagination.limit"
			:items-length="pagination.total"
			:page="page"
			:items-per-page-text="footerProps.itemsPerPageText"
			:items-per-page-options="footerProps.itemsPerPageOptions"
			:loading="isLoading"
			data-testid="admin-rooms-table"
			class="elevation-1"
			:no-data-text="t('common.nodata')"
			@update:sortBy="onUpdateSortBy"
			@update:itemsPerPage="onUpdateItemsPerPage"
			@update:page="onUpdateCurrentPage"
		>
			<template #[`item.actions`]="{ item }">
				<template v-if="showRoomAction(item)">
					<v-btn
						:title="t('pages.administration.courses.edit')"
						:aria-label="t('pages.administration.courses.edit')"
						data-testid="course-table-edit-btn"
						variant="outlined"
						size="small"
						:href="`/courses/${item.id}/edit`"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiPencilOutline }}</v-icon>
					</v-btn>
					<v-btn
						:title="$t('pages.administration.classes.delete')"
						:aria-label="$t('pages.administration.classes.delete')"
						data-testid="class-table-delete-btn"
						variant="outlined"
						size="small"
						@click="onClickDeleteIcon(item)"
						class="mx-1 px-1"
						min-width="0"
					>
						<v-icon>{{ mdiTrashCanOutline }}</v-icon>
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
						v-if="courseSyncEnabled && item.syncedWithGroup"
						:title="t('feature-course-sync.startRoomSyncDialog.title')"
						:aria-label="t('feature-course-sync.startRoomSyncDialog.title')"
						data-testid="class-table-start-room-sync-btn"
						variant="outlined"
						size="small"
						class="mx-1 px-1"
						min-width="0"
						@click="onClickStartSyncIcon(item)"
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
				<h2 class="text-h4 my-2">
					{{ t("pages.administration.classes.deleteDialog.title") }}
				</h2>
			</template>
			<template #content>
				<RenderHTML
					class="text-md mt-2"
					:html="
						t('pages.administration.classes.deleteDialog.content', {
							itemName: selectedItemName,
						})
					"
					component="p"
				/>
			</template>
		</v-custom-dialog>
		<StartNewCourseSyncDialog v-model:is-open="isCourseSyncDialogOpen" />

		<v-btn
			class="my-5 button-start"
			color="primary"
			variant="flat"
			data-testid="admin-courses-add-button"
			href=""
		>
			{{ t("pages.administration.courses.index.add") }}
		</v-btn>

		<p class="text-muted">
			{{
				t("pages.administration.classes.hint", {
					institute_title: getInstituteTitle,
				})
			}}
		</p>
	</default-wireframe>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { SchoolYearQueryType, SchulcloudTheme } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import { SortOrder } from "@/store/types/sort-order.enum";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { CourseInfo, useCourseList } from "@data-room";
import { StartNewCourseSyncDialog } from "@feature-course-sync";
import { RenderHTML } from "@feature-render-html";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { roomsModule } from "@/store";
import {
	mdiAccountGroupOutline,
	mdiPencilOutline,
	mdiSyncOff,
	mdiTrashCanOutline,
} from "@mdi/js";

type Tab = "current" | "archive";
// vuetify typing: https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VDataTable/composables/sort.ts#L29-L29
export type CourseSortItem = { key: string; order?: boolean | "asc" | "desc" };

const props = defineProps({
	tab: {
		type: String as PropType<Tab>,
		default: "current",
	},
});

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule: EnvConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const {
	fetchCourses,
	pagination,
	page,
	isLoading,
	courses,
	setSortBy,
	setSortOrder,
	setCurrentPage,
	setPagination,
} = useCourseList();

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

const breadcrumbs: Ref<Breadcrumb[]> = computed(() => [
	{
		title: t("pages.administration.index.title"),
		href: "/administration/",
	},
	{
		title: t("pages.administration.rooms.index.title"),
		disabled: true,
	},
]);

useTitle(buildPageTitle(t("pages.administration.classes.index.title")));

const schoolYearQueryType: ComputedRef<SchoolYearQueryType> = computed(() => {
	switch (props.tab) {
		case "current":
			return SchoolYearQueryType.CurrentYear;
		case "archive":
			return SchoolYearQueryType.PreviousYears;
		default:
			return SchoolYearQueryType.CurrentYear;
	}
});

//const courses: ComputedRef<CourseInfo[]> = computed(() => {
//  fetchCourses(schoolYearQueryType.value, {key: "name",order: "asc"});
//  }
//);

const hasPermission: ComputedRef<boolean> = computed(() =>
	authModule.getUserPermissions.includes("COURSE_EDIT".toLowerCase())
);

const showRoomAction = (item: CourseInfo) => hasPermission.value && item.id;

const showGroupAction = (item: CourseInfo) =>
	hasPermission.value && item.syncedWithGroup;

const isDeleteDialogOpen: Ref<boolean> = ref(false);

const isStartSyncDialogOpen: Ref<boolean> = ref(false);

const selectedItem: Ref<CourseInfo | undefined> = ref();

const selectedItemName: ComputedRef<string> = computed(
	() => selectedItem.value?.name || "???"
);

const onClickStartSyncIcon = (selectedCourse: CourseInfo) => {
	selectedItem.value = selectedCourse;
	isStartSyncDialogOpen.value = true;
};

const onClickDeleteIcon = (selectedCourse: CourseInfo) => {
	selectedItem.value = selectedCourse;
	isDeleteDialogOpen.value = true;
};

const onCancelCourseDeletion = () => {
	selectedItem.value = undefined;
	isDeleteDialogOpen.value = false;
};

const courseSyncEnabled = computed(
	() => envConfigModule.getEnv.FEATURE_SCHULCONNEX_COURSE_SYNC_ENABLED
);

const headers = computed(() => {
	const headerList: unknown[] = [
		{
			value: "name",
			title: t("common.labels.course"),
			sortable: true,
		},
	];
	headerList.push(
		{
			value: "classes",
			title: t("common.labels.classes"),
			sortable: true,
		},
		{
			key: "teacherNames",
			value: (item: CourseInfo) => item.teacherNames.join(", "),
			title: t("common.labels.teacher"),
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

const onConfirmCourseDeletion = async () => {
	if (selectedItem.value) {
		await roomsModule.delete(selectedItem.value.id);
	}
};

const loadCourseList = async () => {
	await fetchCourses(schoolYearQueryType.value);
};

const onTabsChange = async (tab: string) => {
	await loadCourseList();

	await router.replace({
		query: { ...route.query, tab },
	});
};

const onUpdateSortBy = async (sortBy: CourseSortItem[]) => {
	const fieldToSortBy: CourseSortItem = sortBy[0];
	const key: string | undefined = fieldToSortBy ? fieldToSortBy.key : undefined;
	setSortBy(key);

	const sortOrder =
		fieldToSortBy?.order === "desc" ? SortOrder.DESC : SortOrder.ASC;
	setSortOrder(sortOrder);

	await loadCourseList();
};

const onUpdateCurrentPage = async (currentPage: number) => {
	setCurrentPage(currentPage);
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

const getInstituteTitle: ComputedRef<string> = computed(() => {
	switch (envConfigModule.getTheme) {
		case SchulcloudTheme.N21:
			return "Landesinitiative n-21: Schulen in Niedersachsen online e.V.";
		case SchulcloudTheme.Thr:
			return "Thüringer Institut für Lehrerfortbildung, Lehrplanentwicklung und Medien";
		case SchulcloudTheme.Brb:
			return "Ministerium für Bildung, Jugend und Sport des Landes Brandenburg";
		default:
			return "Dataport";
	}
});

const isCourseSyncDialogOpen: Ref<boolean> = ref(false);
</script>

<style scoped>
.v-tabs {
	margin-bottom: -2px;
}
</style>
