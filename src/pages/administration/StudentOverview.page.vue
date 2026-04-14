<template>
	<DefaultWireframe :headline="t('pages.administration.students.index.title')" max-width="full" :fab-items="fab">
		<ThrInfoBanner />
		<ProgressModal
			v-model="isDeleting"
			:percent="deletedPercent"
			:title="t('pages.administration.students.index.remove.progress.title')"
			:description="t('pages.administration.students.index.remove.progress.description')"
			data-testid="progress-modal"
		/>

		<SvsSearchField
			:model-value="searchQuery"
			class="mt-10 mb-2"
			:label="t('pages.administration.students.index.searchbar.placeholder')"
			data-testid="searchbar"
			:aria-label="t('pages.administration.students.index.searchbar.ariaLabel')"
			@update:model-value="onUpdateSearch"
		/>

		<DataFilter :filter-for="User.STUDENT" :class-names="classNameList" @update:filter="onUpdateFilter" />
		<BackendDataTable
			v-model:current-page="page"
			v-model:rows-per-page="limit"
			v-model:selected-row-ids="selectedIds"
			v-model:selection-type="tableSelectionType"
			:actions="filteredActions"
			:columns="filteredColumns"
			:data="userList"
			:paginated="true"
			:rows-selectable="true"
			:total="pagination.total"
			track-by="_id"
			:sort-by="sortBy"
			:sort-order="sortOrder"
			:show-external-text="schoolIsExternallyManaged"
			data-testid="students_table"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template #datacolumn-birthday="{ data }">
				<span class="text-content">
					{{ formatUtc(data, "date") }}
				</span>
			</template>
			<template #datacolumn-classes="{ data }">
				{{ (data || []).join(", ") }}
			</template>
			<template #headcolumn-consent />
			<template #columnlabel-consent />
			<template #datacolumn-createdAt="{ data }">
				<span class="text-content">{{ formatUtc(data, "date") }}</span>
			</template>
			<template #datacolumn-lastLoginSystemChange="{ data }">
				<span v-if="data" class="text-content">{{ formatUtc(data, "date") }}</span>
			</template>
			<template #datacolumn-outdatedSince="{ data }">
				<span v-if="data" class="text-content">{{ formatUtc(data, "date") }}</span>
			</template>
			<template #datacolumn-consentStatus="{ data: status }">
				<span class="text-content">
					<VIcon v-if="status === 'ok'" color="success" :icon="mdiCheckAll" />
					<VIcon v-else-if="status === 'parentsAgreed'" color="warning" :icon="mdiCheck" />
					<VIcon v-else-if="status === 'missing'" color="error" :icon="mdiClose" />
				</span>
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
					:href="`/administration/students/${data}/edit?returnUrl=/administration/students`"
					:aria-label="t('pages.administration.students.table.edit.ariaLabel')"
					data-testid="edit_student_button"
				>
					<VIcon size="20" :icon="mdiPencilOutline" />
				</VBtn>
			</template>
		</BackendDataTable>
		<AdminTableLegend :icons="icons" :show-icons="showConsent" :show-external-sync-hint="schoolIsExternallyManaged" />
	</DefaultWireframe>
	<DeleteUserDialog
		v-model="isConfirmDialogOpen"
		user-type="student"
		:selected-users="selectedStudents"
		@confirm="onConfirmDelete"
	/>
</template>

<script setup lang="ts">
import ThrInfoBanner from "./ThrInfoBanner.vue";
import AdminTableLegend from "@/components/administration/AdminTableLegend.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import { useFilterLocalStorage } from "@/components/administration/data-filter/composables/filterLocalStorage.composable";
import DataFilter from "@/components/administration/data-filter/DataFilter.vue";
import { FilterQuery, User } from "@/components/administration/data-filter/types";
import DeleteUserDialog from "@/components/administration/DeleteUserDialog.vue";
import ProgressModal from "@/components/administration/ProgressModal.vue";
import { schoolsModule } from "@/store";
import { formatUtc } from "@/utils/date-time.utils";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission, RoleName } from "@api-server";
import { notifyError, notifyInfo, notifySuccess, useAppStore } from "@data-app";
import { useClasses } from "@data-classes";
import { useEnvConfig } from "@data-env";
import { useUsersStore } from "@data-users";
import {
	mdiAccountPlus,
	mdiCheck,
	mdiCheckAll,
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
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const { currentFilterQuery, sortBy, sortOrder, page, limit, searchQuery } = useFilterLocalStorage(User.STUDENT);
const { fetchClasses, classNameList } = useClasses();

const usersStore = useUsersStore();
usersStore.init(RoleName.STUDENT);
const { deletingProgress, userList, qrLinks, pagination, selectedIds } = storeToRefs(usersStore);
const { deleteUsers, fetchUsers, sendRegistrationLink, getQrRegistrationLinks } = usersStore;

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
		field: "birthday",
		label: t("common.labels.birthday"),
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
		infobox: true,
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

const tableSelectionType = ref("inclusive");
const isConfirmDialogOpen = ref(false);

const isDeleting = computed(() => deletingProgress.value.active);
const deletedPercent = computed(() => deletingProgress.value.percent);
const getFeatureUserLoginMigrationEnabled = computed(() => useEnvConfig().value.FEATURE_USER_LOGIN_MIGRATION_ENABLED);
const schoolIsExternallyManaged = computed(() => schoolsModule.schoolIsExternallyManaged);
const showConsent = computed(() => useEnvConfig().value.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN);

const filteredActions = computed(() => {
	let editedActions;

	// filter actions by permissions
	editedActions = tableActions.value.filter((action) =>
		action.permission ? useAppStore().userPermissions.includes(action.permission) : true
	);

	// filter the delete action if school is external
	if (schoolIsExternallyManaged.value) {
		editedActions = editedActions.filter(
			(action) => action.label !== t("pages.administration.students.index.tableActions.delete")
		);
	}

	return editedActions;
});

const filteredColumns = computed(() => {
	let editedColumns = tableColumns;
	// filters out edit column if school is external
	if (schoolIsExternallyManaged.value) {
		editedColumns = tableColumns.filter(
			//_id field sets the edit column
			(col) => col.field !== "_id"
		);
	}

	// filters out the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN env is disabled
	if (!showConsent.value) {
		editedColumns = editedColumns.filter((col) => col.field !== "consentStatus");
	}

	// filters out the lastLoginSystemChange and outdatedSince columns if FEATURE_USER_LOGIN_MIGRATION_ENABLED env is disabled
	if (!getFeatureUserLoginMigrationEnabled.value) {
		editedColumns = editedColumns
			.filter((col) => col.field !== "lastLoginSystemChange")
			.filter((col) => col.field !== "outdatedSince");
	}

	return editedColumns;
});

const icons = computed(() => {
	const instanceBasedIcons = [];

	instanceBasedIcons.push({
		icon: mdiCheckAll,
		color: "success",
		label: t("pages.administration.students.legend.icon.success"),
	});

	if (isConsentNecessary.value) {
		instanceBasedIcons.push({
			icon: mdiCheck,
			color: "warning",
			label: t("utils.adminFilter.consent.label.parentsAgreementMissing"),
		});
	}

	instanceBasedIcons.push({
		icon: mdiClose,
		color: "error",
		label: t("utils.adminFilter.consent.label.missing"),
	});

	return instanceBasedIcons;
});

const fab = computed(() => {
	if (schoolIsExternallyManaged.value || !userHasPermission(Permission.STUDENT_CREATE)) {
		return;
	}

	return [
		{
			icon: mdiPlus,
			label: t("pages.administration.students.fab.add"),
			dataTestId: "fab_button_students_table",
		},
		{
			label: t("pages.administration.students.fab.add"),
			icon: mdiAccountPlus,
			to: "/administration/students/new",
			dataTestId: "fab_button_add_students",
		},
		{
			label: t("pages.administration.students.fab.import"),
			icon: mdiCloudDownload,
			href: "/administration/students/import",
			dataTestId: "fab_button_import_students",
		},
	];
});

const selectedStudents = computed(
	() => userList?.value.filter((student) => selectedIds.value.includes(student._id)) || []
);

useTitle(buildPageTitle(t("pages.administration.students.index.title")));

onMounted(() => {
	fetchFilteredStudents();
	getClassNameList();
});

const fetchFilteredStudents = async () => {
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

const userHasPermission = (permission: Permission | ((permissions?: Permission[]) => boolean)) => {
	if (!permission) {
		throw new Error("parameter permission is missing");
	}
	return typeof permission === "string"
		? !permission || useAppStore().userPermissions.includes(permission)
		: !permission() || permission(useAppStore().userPermissions);
};

const onUpdateSort = (newSortBy: string, newSortOrder: "asc" | "desc") => {
	sortBy.value = newSortBy;
	sortOrder.value = newSortOrder;
	onUpdateCurrentPage(1);
};

const onUpdateCurrentPage = (newPage: number) => {
	page.value = newPage;
	fetchFilteredStudents();
};

const onUpdateRowsPerPage = (newLimit: number) => {
	limit.value = newLimit;
	onUpdateCurrentPage(1);
};

const handleBulkConsent = () => {
	router.push({
		path: "/administration/students/consent",
	});
};

const handleBulkEMail = async (rowIds: string[], selectionType: string) => {
	await sendRegistrationLink({
		userIds: rowIds,
		selectionType,
	});
};

const handleBulkQR = async (rowIds: string[], selectionType: string) => {
	await getQrRegistrationLinks({
		userIds: rowIds,
		selectionType,
	});

	if (qrLinks?.value.length) {
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

const onConfirmDelete = async () => {
	try {
		await deleteUsers(selectedIds.value);
		notifySuccess(t("pages.administration.remove.success"));
		fetchFilteredStudents();
	} catch {
		notifyError(t("pages.administration.remove.error"));
	} finally {
		selectedIds.value = reactive([]);
		tableSelectionType.value = "inclusive";
	}
};

const isConsentNecessary = computed(() => useEnvConfig().value.FEATURE_CONSENT_NECESSARY);

const tableActions = computed(() => [
	{
		label: isConsentNecessary.value
			? t("pages.administration.students.index.tableActions.consent")
			: t("pages.administration.students.index.tableActions.registration"),
		icon: mdiCheck,
		action: handleBulkConsent,
		dataTestId: "consent_action",
	},
	{
		label: t("pages.administration.students.index.tableActions.email"),
		icon: mdiEmailOutline,
		action: handleBulkEMail,
		dataTestId: "registration_link",
	},
	{
		label: t("pages.administration.students.index.tableActions.qr"),
		icon: mdiQrcode,
		action: handleBulkQR,
		dataTestId: "qr_code",
	},
	{
		label: t("pages.administration.students.index.tableActions.delete"),
		icon: mdiDeleteOutline,
		action: openDeleteDialog,
		permission: Permission.STUDENT_DELETE,
		dataTestId: "delete_action",
	},
]);

const debouncedFetchStudents = useDebounceFn(fetchFilteredStudents, 400);

const onUpdateSearch = (searchText: string | null) => {
	const newSearchQuery = searchText ?? "";
	const shouldFetch = newSearchQuery.trim() !== searchQuery.value.trim();
	searchQuery.value = newSearchQuery;
	if (shouldFetch) {
		debouncedFetchStudents();
	}
};

const onUpdateFilter = (query: FilterQuery) => {
	currentFilterQuery.value = query;
	fetchFilteredStudents();
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

button:not(.is-none):focus {
	z-index: 40;
	outline: none;
	box-shadow:
		0 0 0 0 rgba(var(--v-theme-white)),
		0 0 0 3px var(--button-background);
}
</style>
