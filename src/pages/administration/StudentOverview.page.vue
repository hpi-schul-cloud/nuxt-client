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
			v-model="searchQuery"
			class="mt-10 mb-2"
			:label="t('pages.administration.students.index.searchbar.placeholder')"
			data-testid="searchbar"
			:aria-label="t('pages.administration.students.index.searchbar.ariaLabel')"
			@update:model-value="barSearch"
		/>

		<DataFilter filter-for="student" :class-names="classNameList" @update:filter="onUpdateFilter" />
		<BackendDataTable
			v-model:current-page="page"
			v-model:rows-per-page="limit"
			v-model:selected-row-ids="tableSelection"
			v-model:selection-type="tableSelectionType"
			:actions="filteredActions"
			:columns="filteredColumns"
			:data="students"
			:paginated="true"
			:rows-selectable="true"
			:total="pagination.total"
			track-by="_id"
			:sort-by="sortBy"
			:sort-order="sortOrder"
			:show-external-text="schoolIsExternallyManaged"
			data-testid="students_table"
			:rows-per-page="limit"
			:current-page="page"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template #datacolumn-birthday="{ data }">
				<span class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-classes="{ data }">
				{{ (data || []).join(", ") }}
			</template>
			<template #headcolumn-consent />
			<template #columnlabel-consent />
			<template #datacolumn-createdAt="{ data }">
				<span class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-lastLoginSystemChange="{ data }">
				<span v-if="data" class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-outdatedSince="{ data }">
				<span v-if="data" class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-consentStatus="{ data: status }">
				<span class="text-content">
					<VIcon v-if="status === 'ok'" color="rgba(var(--v-theme-success))" :icon="mdiCheckAll" />
					<VIcon v-else-if="status === 'parentsAgreed'" color="rgba(var(--v-theme-warning))" :icon="mdiCheck" />
					<VIcon v-else-if="status === 'missing'" color="rgba(var(--v-theme-error))" :icon="mdiClose" />
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
		v-model:is-dialog-open="isConfirmDialogOpen"
		:user-type="'student'"
		:selected-users="selectedStudents"
		@confirm="onConfirmDelete"
	/>
</template>

<script>
import DeleteUserDialog from "./DeleteUserDialog.vue";
import ThrInfoBanner from "./ThrInfoBanner.vue";
import AdminTableLegend from "@/components/administration/AdminTableLegend.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import { useFilterLocalStorage } from "@/components/administration/data-filter/composables/filterLocalStorage.composable";
import DataFilter from "@/components/administration/data-filter/DataFilter.vue";
import ProgressModal from "@/components/administration/ProgressModal.vue";
import { printDate } from "@/plugins/datetime";
import { Permission, RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifyInfo, notifySuccess, useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";
import {
	mdiAccountPlus,
	mdiAlert,
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
import { defineComponent, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { mapGetters } from "vuex";

export default defineComponent({
	components: {
		DefaultWireframe,
		BackendDataTable,
		AdminTableLegend,
		ProgressModal,
		DataFilter,
		ThrInfoBanner,
		SvsSearchField,
		DeleteUserDialog,
	},
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},
	setup() {
		const { getPaginationState, setPaginationState, getSortingState, setSortingState, getFilterState, setFilterState } =
			useFilterLocalStorage(RoleName.Student);

		const { t } = useI18n();

		return {
			getPaginationState,
			setPaginationState,
			getSortingState,
			setSortingState,
			getFilterState,
			setFilterState,
			t,
		};
	},
	data() {
		return {
			mdiAccountPlus,
			mdiAlert,
			mdiCheck,
			mdiCheckAll,
			mdiClose,
			mdiCloudDownload,
			mdiDeleteOutline,
			mdiEmailOutline,
			mdiPencilOutline,
			mdiPlus,
			mdiQrcode,
			currentFilterQuery: this.getFilterState(),
			page: this.getPaginationState()?.page || 1,
			limit: this.getPaginationState()?.limit || 25,
			sortBy: this.getSortingState()?.sortBy || "firstName",
			sortOrder: this.getSortingState()?.sortOrder || "asc",
			tableColumns: [
				{
					field: "firstName",
					label: this.t("common.labels.firstName"),
					sortable: true,
				},
				{
					field: "lastName",
					label: this.t("common.labels.lastName"),
					sortable: true,
				},
				{
					field: "birthday",
					label: this.t("common.labels.birthday"),
					sortable: true,
				},
				{
					field: "email",
					label: this.t("common.labels.email"),
					sortable: true,
				},
				{
					field: "classes",
					label: this.t("common.labels.classes"),
					sortable: true,
				},
				{
					field: "consentStatus",
					label: this.t("common.labels.registration"),
					sortable: true,
					infobox: true,
				},
				{
					field: "createdAt",
					label: this.t("common.labels.createdAt"),
					sortable: true,
				},
				{
					field: "lastLoginSystemChange",
					label: this.t("common.labels.migrated"),
					sortable: true,
					tooltipText: this.t("common.labels.migrated.tooltip"),
				},
				{
					field: "outdatedSince",
					label: this.t("common.labels.outdated"),
					sortable: true,
					tooltipText: this.t("common.labels.outdated.tooltip"),
				},
				{
					// edit column
					field: "_id",
					label: "",
				},
			],
			tableSelection: [],
			tableSelectionType: "inclusive",
			active: false,
			searchQuery: this.getFilterState()?.searchQuery || "",
			confirmDialogProps: {},
			isConfirmDialogActive: false,
			classNameList: [],
			isConfirmDialogOpen: false,
		};
	},
	computed: {
		...mapGetters("users", {
			students: "getList",
			pagination: "getPagination",
			isDeleting: "getActive",
			deletedPercent: "getPercent",
			qrLinks: "getQrLinks",
			registrationLinks: "getRegistrationLinks",
		}),
		getFeatureUserLoginMigrationEnabled() {
			return useEnvConfig().value.FEATURE_USER_LOGIN_MIGRATION_ENABLED;
		},
		schoolIsExternallyManaged() {
			return schoolsModule.schoolIsExternallyManaged;
		},
		tableActions() {
			return [
				{
					label: this.isConsentNecessary
						? this.t("pages.administration.students.index.tableActions.consent")
						: this.t("pages.administration.students.index.tableActions.registration"),
					icon: mdiCheck,
					action: this.handleBulkConsent,
					dataTestId: "consent_action",
				},
				{
					label: this.t("pages.administration.students.index.tableActions.email"),
					icon: mdiEmailOutline,
					action: this.handleBulkEMail,
					dataTestId: "registration_link",
				},
				{
					label: this.t("pages.administration.students.index.tableActions.qr"),
					icon: mdiQrcode,
					action: this.handleBulkQR,
					dataTestId: "qr_code",
				},
				{
					label: this.t("pages.administration.students.index.tableActions.delete"),
					icon: mdiDeleteOutline,
					//action: this.handleBulkDelete,
					action: this.openDeleteDialog,
					permission: Permission.StudentDelete,
					dataTestId: "delete_action",
				},
			];
		},
		isConsentNecessary() {
			return useEnvConfig().value.FEATURE_CONSENT_NECESSARY;
		},
		showConsent() {
			return useEnvConfig().value.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN;
		},
		filteredActions() {
			let editedActions;

			// filter actions by permissions
			editedActions = this.tableActions.filter((action) =>
				action.permission ? this.userHasPermission(action.permission) : true
			);

			// filter the delete action if school is external
			if (this.schoolIsExternallyManaged) {
				editedActions = editedActions.filter(
					(action) => action.label !== this.t("pages.administration.students.index.tableActions.delete")
				);
			}

			return editedActions;
		},
		filteredColumns() {
			let editedColumns = this.tableColumns;
			// filters out edit column if school is external
			if (this.schoolIsExternallyManaged) {
				editedColumns = this.tableColumns.filter(
					//_id field sets the edit column
					(col) => col.field !== "_id"
				);
			}

			// filters out the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN env is disabled
			if (!this.showConsent) {
				editedColumns = editedColumns.filter((col) => col.field !== "consentStatus");
			}

			// filters out the lastLoginSystemChange and outdatedSince columns if FEATURE_USER_LOGIN_MIGRATION_ENABLED env is disabled
			if (!this.getFeatureUserLoginMigrationEnabled) {
				editedColumns = editedColumns
					.filter((col) => col.field !== "lastLoginSystemChange")
					.filter((col) => col.field !== "outdatedSince");
			}

			return editedColumns;
		},
		icons() {
			const instanceBasedIcons = [];

			instanceBasedIcons.push({
				icon: mdiCheckAll,
				color: "rgba(var(--v-theme-success))",
				label: this.t("pages.administration.students.legend.icon.success"),
			});

			if (this.isConsentNecessary) {
				instanceBasedIcons.push({
					icon: mdiCheck,
					color: "rgba(var(--v-theme-warning))",
					label: this.t("utils.adminFilter.consent.label.parentsAgreementMissing"),
				});
			}

			instanceBasedIcons.push({
				icon: mdiClose,
				color: "rgba(var(--v-theme-error))",
				label: this.t("utils.adminFilter.consent.label.missing"),
			});

			return instanceBasedIcons;
		},
		fab() {
			if (this.schoolIsExternallyManaged || !this.userHasPermission(Permission.StudentCreate)) {
				return;
			}

			return [
				{
					icon: mdiPlus,
					label: this.t("pages.administration.students.fab.add"),
					dataTestId: "fab_button_students_table",
				},
				{
					label: this.t("pages.administration.students.fab.add"),
					icon: mdiAccountPlus,
					to: "/administration/students/new",
					dataTestId: "fab_button_add_students",
				},
				{
					label: this.t("pages.administration.students.fab.import"),
					icon: mdiCloudDownload,
					href: "/administration/students/import",
					dataTestId: "fab_button_import_students",
				},
			];
		},
		selectedStudents() {
			const selectedStudents = this.students.filter((student) => this.tableSelection.includes(student._id));
			return selectedStudents;
		},
	},
	watch: {
		currentFilterQuery: function (query) {
			const temp = this.getFilterState();

			if (temp && temp.searchQuery) query.searchQuery = temp.searchQuery;

			this.currentFilterQuery = query;
			if (JSON.stringify(query) !== JSON.stringify(this.getFilterState())) {
				this.onUpdateCurrentPage(1);
			}
			this.setFilterState(query);
		},
	},
	created() {
		this.find();
		this.getClassNameList();
	},
	mounted() {
		document.title = buildPageTitle(this.t("pages.administration.students.index.title"));
	},
	methods: {
		find() {
			const query = {
				$limit: this.limit,
				$skip: (this.page - 1) * this.limit,
				$sort: {
					[this.sortBy]: this.sortOrder === "asc" ? 1 : -1,
				},
				...this.currentFilterQuery,
			};
			this.$store.dispatch("users/findStudents", {
				query,
			});
		},
		userHasPermission(permission) {
			if (!permission) {
				throw new Error("parameter permission is missing");
			}
			return typeof permission === "string"
				? !permission || useAppStore().userPermissions.includes(permission)
				: !permission() || permission(useAppStore().userPermissions);
		},
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy;
			this.sortOrder = sortOrder;
			this.setSortingState({
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
			});
			this.onUpdateCurrentPage(1); // implicitly triggers new find
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			this.setPaginationState({
				limit: this.limit,
				page: this.page,
			});
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			this.limit = limit;

			this.setPaginationState({
				limit: this.limit,
				page: this.page,
			});
			this.find();
		},
		printDate,
		getQueryForSelection(rowIds, selectionType) {
			return {
				...this.currentFilterQuery,
				selectionType,
				_ids: rowIds,
			};
		},
		handleBulkConsent(rowIds, selectionType) {
			this.$store.commit("bulkConsent/setSelectedStudents", {
				students: this.tableSelection,
				selectionType: selectionType,
			});

			this.$router.push({
				path: "/administration/students/consent",
			});
		},
		async handleBulkEMail(rowIds, selectionType) {
			try {
				await this.$store.dispatch("users/sendRegistrationLink", {
					userIds: rowIds,
					selectionType,
				});
				if (this.registrationLinks.totalMailsSend === rowIds.length) {
					notifySuccess(this.t("pages.administration.sendMail.success", rowIds.length));
				} else {
					notifyInfo(this.t("pages.administration.sendMail.alreadyRegistered"));
				}
			} catch {
				notifyError(this.t("pages.administration.sendMail.error", rowIds.length));
			}
		},
		async handleBulkQR(rowIds, selectionType) {
			try {
				await this.$store.dispatch("users/getQrRegistrationLinks", {
					userIds: rowIds,
					selectionType,
					roleName: "student",
				});
				if (this.qrLinks.length) {
					printQrCodes(this.qrLinks, {
						printPageTitleKey: "pages.administration.printQr.printPageTitle",
					});
				} else {
					notifyInfo(this.t("pages.administration.printQr.emptyUser"));
				}
			} catch {
				notifyError(this.t("pages.administration.printQr.error", rowIds.length));
			}
		},
		openDeleteDialog() {
			this.isConfirmDialogOpen = true;
		},
		async onConfirmDelete() {
			try {
				await this.$store.dispatch("users/deleteUsers", {
					ids: this.tableSelection,
					userType: "student",
				});
				notifySuccess(this.t("pages.administration.remove.success"));
				this.find();
			} catch {
				notifyError(this.t("pages.administration.remove.error"));
			} finally {
				this.tableSelection = reactive([]);
				this.tableSelectionType = "inclusive";
			}
		},

		barSearch: function (searchText) {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}

			this.timer = setTimeout(() => {
				if (!searchText) searchText = "";
				if (this.currentFilterQuery.searchQuery !== searchText.trim()) {
					this.currentFilterQuery.searchQuery = searchText.trim();

					const query = this.currentFilterQuery;

					this.find();
					this.setFilterState(query);
				}
			}, 400);
		},
		dialogConfirm(confirmDialogProps) {
			this.confirmDialogProps = confirmDialogProps;
			this.isConfirmDialogActive = true;
		},
		onUpdateFilter(query) {
			this.currentFilterQuery = query;
			this.find();
		},
		async getClassNameList() {
			const currentYear = schoolsModule.getCurrentYear;
			await this.$store.dispatch("classes/find", {
				query: {
					$limit: 1000,
					year: currentYear?.id,
				},
			});
			this.classNameList = this.$store.state["classes"].list.reduce(
				(acc, item) =>
					acc.concat({
						label: item.displayName,
						value: item.displayName,
					}),
				[]
			);
		},
	},
});
</script>

<style scoped>
:deep(.row-highlighted.theme--light.v-btn:hover::before) {
	opacity: 0;
}

button:not(.is-none):focus {
	z-index: 100;
	outline: none;
	box-shadow:
		0 0 0 0 rgba(var(--v-theme-white)),
		0 0 0 3px var(--button-background);
}
</style>
