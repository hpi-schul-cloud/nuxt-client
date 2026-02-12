<template>
	<DefaultWireframe max-width="full" :headline="$t('pages.administration.teachers.index.title')" :fab-items="fab">
		<ThrInfoBanner />
		<ProgressModal
			v-model="isDeleting"
			:percent="deletedPercent"
			:title="$t('pages.administration.teachers.index.remove.progress.title')"
			:description="$t('pages.administration.teachers.index.remove.progress.description')"
			data-testid="progress-modal"
		/>
		<base-input
			v-model="searchQuery"
			type="text"
			:placeholder="$t('pages.administration.teachers.index.searchbar.placeholder')"
			class="search-section"
			label=""
			data-testid="searchbar"
			@update:model-value="barSearch"
		>
			<template #icon>
				<VIcon :icon="mdiMagnify" />
			</template>
		</base-input>
		<DataFilter filter-for="teacher" :class-names="classNameList" @update:filter="onUpdateFilter" />
		<BackendDataTable
			v-model:current-page="page"
			v-model:rows-per-page="limit"
			v-model:selected-row-ids="tableSelection"
			v-model:selection-type="tableSelectionType"
			:actions="filteredActions"
			:columns="filteredColumns"
			:data="teachers"
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
					<VIcon v-if="status === 'ok'" color="rgba(var(--v-theme-success))" :icon="mdiCheck" />
					<VIcon v-else-if="status === 'missing'" color="rgba(var(--v-theme-error))" :icon="mdiClose" />
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
					:aria-label="$t('pages.administration.teachers.table.edit.ariaLabel')"
					data-testid="edit_teacher_button"
				>
					<VIcon size="20">{{ mdiPencilOutline }}</VIcon>
				</VBtn>
			</template>
		</BackendDataTable>
		<AdminTableLegend :icons="icons" :show-icons="showConsent" :show-external-sync-hint="schoolIsExternallyManaged" />
	</DefaultWireframe>
	<ConfirmationDialog>
		<template #alert>
			<WarningAlert data-testid="warning-alert-teachersdelete">
				{{ $t("pages.administration.teachers.index.remove.confirm.message.warning") }}
			</WarningAlert>
		</template>
	</ConfirmationDialog>
</template>

<script>
import AdminTableLegend from "@/components/administration/AdminTableLegend.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import { useFilterLocalStorage } from "@/components/administration/data-filter/composables/filterLocalStorage.composable";
import DataFilter from "@/components/administration/data-filter/DataFilter.vue";
import ProgressModal from "@/components/administration/ProgressModal.vue";
import ThrInfoBanner from "@/pages/administration/ThrInfoBanner.vue";
import { printDate } from "@/plugins/datetime";
import { Permission, RoleName } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifyError, notifyInfo, notifySuccess, useAppStore } from "@data-app";
import { useClasses } from "@data-classes";
import { useEnvConfig } from "@data-env";
import {
	mdiAccountPlus,
	mdiAlert,
	mdiCheck,
	mdiClose,
	mdiCloudDownload,
	mdiDeleteOutline,
	mdiEmailOutline,
	mdiMagnify,
	mdiPencilOutline,
	mdiPlus,
	mdiQrcode,
} from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { DefaultWireframe } from "@ui-layout";
import { printQrCodes } from "@util-browser";
import { defineComponent } from "vue";
import { reactive } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
	components: {
		DefaultWireframe,
		BackendDataTable,
		AdminTableLegend,
		ProgressModal,
		DataFilter,
		ConfirmationDialog,
		ThrInfoBanner,
		WarningAlert,
	},
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},
	setup() {
		const { getPaginationState, setPaginationState, getSortingState, setSortingState, getFilterState, setFilterState } =
			useFilterLocalStorage(RoleName.Teacher);
		const { askConfirmation } = useConfirmationDialog();
		const { fetchClasses, list } = useClasses();

		return {
			getPaginationState,
			setPaginationState,
			getSortingState,
			setSortingState,
			getFilterState,
			setFilterState,
			askConfirmation,
			fetchClasses,
			list,
		};
	},
	data() {
		return {
			mdiAccountPlus,
			mdiAlert,
			mdiCheck,
			mdiClose,
			mdiCloudDownload,
			mdiDeleteOutline,
			mdiEmailOutline,
			mdiMagnify,
			mdiPencilOutline,
			mdiPlus,
			mdiQrcode,
			currentFilterQuery: this.getFilterState(),
			page: this.getPaginationState()?.page || 1,
			limit: this.getPaginationState()?.limit || 25,
			sortBy: this.getSortingState()?.sortBy || "firstName",
			sortOrder: this.getSortingState()?.sortOrder || "asc",
			tableActions: [
				{
					label: this.$t("pages.administration.teachers.index.tableActions.email"),
					icon: mdiEmailOutline,
					action: this.handleBulkEMail,
					dataTestId: "registration_link",
				},
				{
					label: this.$t("pages.administration.teachers.index.tableActions.qr"),
					icon: mdiQrcode,
					action: this.handleBulkQR,
					dataTestId: "qr_code",
				},
				{
					label: this.$t("pages.administration.teachers.index.tableActions.delete"),
					icon: mdiDeleteOutline,
					action: this.handleBulkDelete,
					permission: "TEACHER_DELETE",
					dataTestId: "delete_action",
				},
			],
			tableSelection: [],
			tableSelectionType: "inclusive",
			tableColumns: [
				{
					field: "firstName",
					label: this.$t("common.labels.firstName"),
					sortable: true,
				},
				{
					field: "lastName",
					label: this.$t("common.labels.lastName"),
					sortable: true,
				},
				{
					field: "email",
					label: this.$t("common.labels.email"),
					sortable: true,
				},
				{
					field: "classes",
					label: this.$t("common.labels.classes"),
					sortable: true,
				},
				{
					field: "consentStatus",
					label: this.$t("common.labels.registration"),
					sortable: true,
				},
				{
					field: "createdAt",
					label: this.$t("common.labels.createdAt"),
					sortable: true,
				},
				{
					field: "lastLoginSystemChange",
					label: this.$t("common.labels.migrated"),
					sortable: true,
					tooltipText: this.$t("common.labels.migrated.tooltip"),
				},
				{
					field: "outdatedSince",
					label: this.$t("common.labels.outdated"),
					sortable: true,
					tooltipText: this.$t("common.labels.outdated.tooltip"),
				},
				{
					// edit column
					field: "_id",
					label: "",
				},
			],
			icons: [
				{
					icon: mdiCheck,
					color: "rgba(var(--v-theme-success))",
					label: this.$t("pages.administration.students.legend.icon.success"),
				},
				{
					icon: mdiClose,
					color: "rgba(var(--v-theme-error))",
					label: this.$t("utils.adminFilter.consent.label.missing"),
				},
			],
			searchQuery: this.getFilterState()?.searchQuery || "",
			confirmDialogProps: {},
			isConfirmDialogActive: false,
			classNameList: [],
		};
	},
	computed: {
		...mapGetters("users", {
			teachers: "getList",
			pagination: "getPagination",
			isDeleting: "getActive",
			deletedPercent: "getPercent",
			qrLinks: "getQrLinks",
		}),
		schoolIsExternallyManaged() {
			return schoolsModule.schoolIsExternallyManaged;
		},
		getFeatureUserLoginMigrationEnabled() {
			return useEnvConfig().value.FEATURE_USER_LOGIN_MIGRATION_ENABLED;
		},
		tableData: {
			get() {
				if (this.takeOverTableData) return this.searchData;
				return this.teachers;
			},
		},
		showConsent() {
			return useEnvConfig().value.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN;
		},
		userPermissions() {
			return useAppStore().userPermissions;
		},
		filteredActions() {
			let editedActions = this.tableActions;

			// filter actions by permissions
			editedActions = this.tableActions.filter((action) =>
				action.permission ? this.userHasPermission(action.permission) : true
			);

			// filters out the QR bulk action is user is not an admin
			if (!useAppStore().userRoles.some((name) => name === RoleName.Administrator)) {
				editedActions = editedActions.filter(
					(action) => action.label !== this.$t("pages.administration.teachers.index.tableActions.qr")
				);
			}

			// filter the delete action if school is external
			if (this.schoolIsExternallyManaged) {
				editedActions = editedActions.filter(
					(action) => action.label !== this.$t("pages.administration.teachers.index.tableActions.delete")
				);
			}

			return editedActions;
		},
		filteredColumns() {
			let editedColumns = this.tableColumns;
			// filters out edit column if school is external or if user is not an admin
			if (this.schoolIsExternallyManaged || !useAppStore().userRoles.some((name) => name === RoleName.Administrator)) {
				editedColumns = this.tableColumns.filter(
					// _id field sets the edit column
					(col) => col.field !== "_id"
				);
			}

			// filters out the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN env is disabled
			if (!this.showConsent) {
				editedColumns = editedColumns.filter((col) => col.field !== "consentStatus");
			}

			if (!this.getFeatureUserLoginMigrationEnabled) {
				editedColumns = editedColumns
					.filter((col) => col.field !== "lastLoginSystemChange")
					.filter((col) => col.field !== "outdatedSince");
			}

			return editedColumns;
		},
		fab() {
			if (this.schoolIsExternallyManaged || !this.userHasPermission(Permission.TeacherCreate)) {
				return;
			}

			return [
				{
					icon: mdiPlus,
					label: this.$t("pages.administration.teachers.fab.add"),
					dataTestId: "fab_button_teachers_table",
				},
				{
					label: this.$t("pages.administration.teachers.fab.add"),
					icon: mdiAccountPlus,
					to: "/administration/teachers/new",
					dataTestId: "fab_button_add_teachers",
				},
				{
					label: this.$t("pages.administration.teachers.fab.import"),
					icon: mdiCloudDownload,
					href: "/administration/teachers/import",
					dataTestId: "fab_button_import_teachers",
				},
			];
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
		document.title = buildPageTitle(this.$t("pages.administration.teachers.index.title"));
	},
	methods: {
		userHasPermission(permission) {
			if (!permission) {
				throw new Error("parameter permission is missing");
			}
			return typeof permission === "string"
				? !permission || this.userPermissions.includes(permission)
				: !permission() || permission(this.userPermissions);
		},
		find() {
			const query = {
				$limit: this.limit,
				$skip: (this.page - 1) * this.limit,
				$sort: {
					[this.sortBy]: this.sortOrder === "asc" ? 1 : -1,
				},
				...this.currentFilterQuery,
			};
			this.$store.dispatch("users/findTeachers", {
				query,
			});
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
		async handleBulkEMail(rowIds, selectionType) {
			try {
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("users/sendRegistrationLink", {
					userIds: rowIds,
					selectionType,
				});
				notifySuccess(this.$t("pages.administration.sendMail.success", rowIds.length));
			} catch {
				notifyError(this.$t("pages.administration.sendMail.error", rowIds.length));
			}
		},
		async handleBulkQR(rowIds, selectionType) {
			try {
				await this.$store.dispatch("users/getQrRegistrationLinks", {
					userIds: rowIds,
					selectionType,
					roleName: "teacher",
				});
				if (this.qrLinks.length) {
					printQrCodes(this.qrLinks, {
						printPageTitleKey: "pages.administration.printQr.printPageTitle",
					});
				} else {
					notifyInfo(this.$t("pages.administration.printQr.emptyUser"));
				}
			} catch {
				notifyError(this.$t("pages.administration.printQr.error", rowIds.length));
			}
		},
		async handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					await this.$store.dispatch("users/deleteUsers", {
						ids: rowIds,
						userType: "teacher",
					});
					notifySuccess(this.$t("pages.administration.remove.success"));
					this.find();
				} catch {
					notifyError(this.$t("pages.administration.remove.error"));
				}
			};
			const onCancel = () => {
				this.tableSelection = reactive([]);
				this.tableSelectionType = "inclusive";
			};
			let message;
			if (selectionType === "inclusive") {
				message = this.$t("pages.administration.teachers.index.remove.confirm.message.some", rowIds.length, {
					number: rowIds.length,
				});
			} else {
				if (rowIds.length) {
					message = this.$t("pages.administration.teachers.index.remove.confirm.message.many", {
						number: rowIds.length,
					});
				} else {
					message = this.$t("pages.administration.teachers.index.remove.confirm.message.all");
				}
			}

			const shouldDelete = await this.askConfirmation({
				message,
				confirmActionLangKey: "pages.administration.teachers.index.remove.confirm.btnText",
			});

			if (shouldDelete) {
				await onConfirm();
			} else {
				onCancel();
			}
		},
		barSearch: function (searchText) {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}

			this.timer = setTimeout(() => {
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

			await this.fetchClasses({
				$limit: 1000,
				year: currentYear?.id || "",
			});
			this.classNameList = this.list.reduce(
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

.search-section {
	max-width: 100%;
	margin-top: 8px;
	margin-bottom: 8px;
	margin-left: 0;
}
</style>
