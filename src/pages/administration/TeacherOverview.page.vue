<template>
	<DefaultWireframe max-width="full" :headline="t('pages.administration.teachers.index.title')" :fab-items="fab">
		<ThrInfoBanner />
		<ProgressModal
			v-model="isDeleting"
			:percent="deletedPercent"
			:title="t('pages.administration.teachers.index.remove.progress.title')"
			:description="t('pages.administration.teachers.index.remove.progress.description')"
			data-testid="progress-modal"
		/>
		<SvsSearchField
			:model-value="searchQuery"
			class="mt-10 mb-2"
			:label="t('pages.administration.teachers.index.searchbar.placeholder')"
			data-testid="searchbar"
			:aria-label="t('pages.administration.teachers.index.searchbar.ariaLabel')"
			@update:model-value="onUpdateSearch"
		/>
		<DataFilter :filter-for="User.TEACHER" :class-names="classNameList" @update:filter="onUpdateFilter" />
		<BackendDataTable
			v-model:current-page="page"
			v-model:rows-per-page="limit"
			v-model:selected-row-ids="tableSelection"
			v-model:selection-type="tableSelectionType"
			:actions="filteredActions"
			:columns="filteredColumns"
			:data="userList"
			:paginated="true"
			:total="pagination.total"
			:rows-selectable="true"
			track-by="_id"
			:sort-by="sortBy"
			:sort-order="sortOrder"
			data-testid="teachers_table"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template #datacolumn-classes="{ data }">
				{{ (data || []).join(", ") }}
			</template>
			<template #datacolumn-createdAt="{ data }">
				<span class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-consentStatus="{ data: status }">
				<span class="text-content">
					<VIcon v-if="status === 'ok'" color="success" :icon="mdiCheck" />
					<VIcon v-else-if="status === 'missing'" color="error" :icon="mdiClose" />
				</span>
			</template>
			<template #datacolumn-lastLoginSystemChange="{ data }">
				<span v-if="data" class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-outdatedSince="{ data }">
				<span v-if="data" class="text-content">{{ printDate(data) }}</span>
			</template>

			<template #datacolumn-_id="{ data, selected, highlighted }">
				<VBtn
					icon
					variant="text"
					:class="{
						'action-button': true,
						'row-selected': selected,
						'row-highlighted': highlighted,
					}"
					:href="`/administration/teachers/${data}/edit?returnUrl=/administration/teachers`"
					:aria-label="t('pages.administration.teachers.table.edit.ariaLabel')"
					data-testid="edit_teacher_button"
				>
					<VIcon size="20" :icon="mdiPencilOutline" />
				</VBtn>
			</template>
		</BackendDataTable>
		<AdminTableLegend :icons="icons" :show-icons="showConsent" :show-external-sync-hint="schoolIsExternallyManaged" />
	</DefaultWireframe>
	<DeleteUserDialog
		v-model="isConfirmDialogOpen"
		user-type="teacher"
		:selected-users="selectedTeachers"
		@confirm="onConfirmDelete"
	/>
</template>

<script setup lang="ts">
import AdminTableLegend from "@/components/administration/AdminTableLegend.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import { useFilterLocalStorage } from "@/components/administration/data-filter/composables/filterLocalStorage.composable";
import DataFilter from "@/components/administration/data-filter/DataFilter.vue";
import { FilterQuery, User } from "@/components/administration/data-filter/types";
import DeleteUserDialog from "@/components/administration/DeleteUserDialog.vue";
import ProgressModal from "@/components/administration/ProgressModal.vue";
import ThrInfoBanner from "@/pages/administration/ThrInfoBanner.vue";
import { printDate } from "@/plugins/datetime";
import { Permission, RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifyInfo, notifySuccess, useAppStore } from "@data-app";
import { useClasses } from "@data-classes";
import { useEnvConfig } from "@data-env";
import { useUsersStore } from "@data-users";
import {
	mdiAccountPlus,
	mdiCheck,
	mdiClose,
	mdiCloudDownload,
	mdiDeleteOutline,
	mdiEmailOutline,
	mdiPencilOutline,
	mdiPlus,
	mdiQrcode,
} from "@icons/material";
import { SvsSearchField } from "@ui-controls";
import { DefaultWireframe } from "@ui-layout";
import { printQrCodes } from "@util-browser";
import { useDebounceFn, useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { currentFilterQuery, sortBy, sortOrder, page, limit, searchQuery } = useFilterLocalStorage(User.TEACHER);
const { fetchClasses, classNameList } = useClasses();

const usersStore = useUsersStore();
usersStore.init(RoleName.Teacher);
const { deletingProgress, userList, qrLinks, pagination } = storeToRefs(usersStore);
const { deleteUsers, fetchUsers, sendRegistrationLink, getQrRegistrationLinks } = usersStore;

const { t } = useI18n();

const isConfirmDialogOpen = ref(false);

const handleBulkEMail = async (rowIds: string[], selectionType: string) => {
	await sendRegistrationLink({
		...currentFilterQuery.value,
		selectionType,
		userIds: rowIds,
	});
};

const handleBulkQR = async (rowIds: string[], selectionType: string) => {
	await getQrRegistrationLinks({
		userIds: rowIds,
		selectionType,
	});

	if (qrLinks.value.length) {
		printQrCodes(qrLinks.value, {
			printPageTitleKey: "pages.administration.printQr.printPageTitle",
		});
	} else {
		notifyInfo(t("pages.administration.printQr.emptyUser"));
	}
};

const openDeleteDialog = () => {
	isConfirmDialogOpen.value = true;
};
const tableActions = [
	{
		label: t("pages.administration.teachers.index.tableActions.email"),
		icon: mdiEmailOutline,
		action: handleBulkEMail,
		dataTestId: "registration_link",
	},
	{
		label: t("pages.administration.teachers.index.tableActions.qr"),
		icon: mdiQrcode,
		action: handleBulkQR,
		dataTestId: "qr_code",
	},
	{
		label: t("pages.administration.teachers.index.tableActions.delete"),
		icon: mdiDeleteOutline,
		action: openDeleteDialog,
		permission: Permission.TeacherDelete,
		dataTestId: "delete_action",
	},
];

const tableSelection = ref<string[]>([]);
const tableSelectionType = ref("inclusive");
const tableColumns = [
	{
		field: "firstName",
		label: t("common.labels.firstName"),
		sortable: true,
	},
	{
		field: "lastName",
		label: t("common.labels.lastName"),
		sortable: true,
	},
	{
		field: "email",
		label: t("common.labels.email"),
		sortable: true,
	},
	{
		field: "classes",
		label: t("common.labels.classes"),
		sortable: true,
	},
	{
		field: "consentStatus",
		label: t("common.labels.registration"),
		sortable: true,
	},
	{
		field: "createdAt",
		label: t("common.labels.createdAt"),
		sortable: true,
	},
	{
		field: "lastLoginSystemChange",
		label: t("common.labels.migrated"),
		sortable: true,
		tooltipText: t("common.labels.migrated.tooltip"),
	},
	{
		field: "outdatedSince",
		label: t("common.labels.outdated"),
		sortable: true,
		tooltipText: t("common.labels.outdated.tooltip"),
	},
	{
		// edit column
		field: "_id",
		label: "",
	},
];
const icons = [
	{
		icon: mdiCheck,
		color: "success",
		label: t("pages.administration.students.legend.icon.success"),
	},
	{
		icon: mdiClose,
		color: "error",
		label: t("utils.adminFilter.consent.label.missing"),
	},
];

const isDeleting = computed(() => deletingProgress.value.active);
const deletedPercent = computed(() => deletingProgress.value.percent);
const schoolIsExternallyManaged = computed(() => schoolsModule.schoolIsExternallyManaged);
const getFeatureUserLoginMigrationEnabled = computed(() => useEnvConfig().value.FEATURE_USER_LOGIN_MIGRATION_ENABLED);

const showConsent = computed(() => useEnvConfig().value.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN);

const userPermissions = computed(() => useAppStore().userPermissions);
const filteredActions = computed(() => {
	let editedActions;

	// filter actions by permissions
	editedActions = tableActions.filter((action) => (action.permission ? userHasPermission(action.permission) : true));

	// filters out the QR bulk action is user is not an admin
	if (!useAppStore().userRoles.some((name) => name === RoleName.Administrator)) {
		editedActions = editedActions.filter(
			(action) => action.label !== t("pages.administration.teachers.index.tableActions.qr")
		);
	}

	// filter the delete action if school is external
	if (schoolIsExternallyManaged.value) {
		editedActions = editedActions.filter(
			(action) => action.label !== t("pages.administration.teachers.index.tableActions.delete")
		);
	}

	return editedActions;
});

const filteredColumns = computed(() => {
	let editedColumns = tableColumns;
	// filters out edit column if school is external or if user is not an admin
	if (schoolIsExternallyManaged.value || !useAppStore().userRoles.some((name) => name === RoleName.Administrator)) {
		editedColumns = tableColumns.filter(
			// _id field sets the edit column
			(col) => col.field !== "_id"
		);
	}

	// filters out the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN env is disabled
	if (!showConsent.value) {
		editedColumns = editedColumns.filter((col) => col.field !== "consentStatus");
	}

	if (!getFeatureUserLoginMigrationEnabled.value) {
		editedColumns = editedColumns
			.filter((col) => col.field !== "lastLoginSystemChange")
			.filter((col) => col.field !== "outdatedSince");
	}

	return editedColumns;
});

const fab = computed(() => {
	if (schoolIsExternallyManaged.value || !userHasPermission(Permission.TeacherCreate)) {
		return;
	}

	return [
		{
			icon: mdiPlus,
			label: t("pages.administration.teachers.fab.add"),
			dataTestId: "fab_button_teachers_table",
		},
		{
			label: t("pages.administration.teachers.fab.add"),
			icon: mdiAccountPlus,
			to: "/administration/teachers/new",
			dataTestId: "fab_button_add_teachers",
		},
		{
			label: t("pages.administration.teachers.fab.import"),
			icon: mdiCloudDownload,
			href: "/administration/teachers/import",
			dataTestId: "fab_button_import_teachers",
		},
	];
});

const selectedTeachers = computed(() => userList.value.filter((teacher) => tableSelection.value.includes(teacher._id)));

useTitle(buildPageTitle(t("pages.administration.teachers.index.title")));

onMounted(() => {
	fetchFilteredTeachers();
	getClassNameList();
});

const userHasPermission = (permission: Permission | ((permissions?: Permission[]) => boolean)) => {
	if (!permission) {
		throw new Error("parameter permission is missing");
	}
	return typeof permission === "string"
		? !permission || userPermissions.value.includes(permission)
		: !permission() || permission(userPermissions.value);
};

const fetchFilteredTeachers = async () => {
	const query = {
		$limit: limit.value,
		$skip: (page.value - 1) * limit.value,
		$sort: {
			[sortBy.value]: sortOrder.value === "asc" ? 1 : -1,
		},
		searchQuery: searchQuery.value,
		...currentFilterQuery.value,
	};

	await fetchUsers(query);
};

const onUpdateSort = (newSortBy: string, newSortOrder: "asc" | "desc") => {
	sortBy.value = newSortBy;
	sortOrder.value = newSortOrder;
	onUpdateCurrentPage(1);
};

const onUpdateCurrentPage = (newPage: number) => {
	page.value = newPage;
	fetchFilteredTeachers();
};

const onUpdateRowsPerPage = (newLimit: number) => {
	limit.value = newLimit;
	onUpdateCurrentPage(1);
};

const onConfirmDelete = async () => {
	try {
		await deleteUsers(tableSelection.value);
		notifySuccess(t("pages.administration.remove.success"));
		fetchFilteredTeachers();
	} catch {
		notifyError(t("pages.administration.remove.error"));
	} finally {
		tableSelection.value = [];
		tableSelectionType.value = "inclusive";
	}
};

const debouncedFetchTeachers = useDebounceFn(fetchFilteredTeachers, 400);

const onUpdateSearch = (searchText: string | null) => {
	const newSearchQuery = searchText ?? "";
	const shouldFetch = newSearchQuery.trim() !== searchQuery.value.trim();
	searchQuery.value = newSearchQuery;
	if (shouldFetch) {
		debouncedFetchTeachers();
	}
};

const onUpdateFilter = (query: FilterQuery) => {
	currentFilterQuery.value = query;
	if (JSON.stringify(query) !== JSON.stringify(currentFilterQuery.value)) {
		onUpdateCurrentPage(1);
	}
	fetchFilteredTeachers();
};

const getClassNameList = async () => {
	const currentYear = schoolsModule.getCurrentYear;

	await fetchClasses({
		$limit: 1000,
		year: currentYear?.id || "",
	});
};
</script>

<style scoped>
:deep(.row-highlighted.theme--light.v-btn:hover::before) {
	opacity: 0;
}

span {
	font-weight: normal;
}

button:not(.is-none):focus {
	z-index: 100;
	outline: none;
	box-shadow:
		0 0 0 0 rgba(var(--v-theme-white)),
		0 0 0 3px var(--button-background);
}
</style>
