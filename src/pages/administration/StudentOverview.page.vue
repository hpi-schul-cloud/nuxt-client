<template>
	<div>
		<default-wireframe
			:headline="$t('pages.administration.students.index.title')"
			:breadcrumbs="breadcrumbs"
			max-width="full"
			:fab-items="fab"
		>
			<progress-modal
				:active="isDeleting"
				:percent="deletedPercent"
				:title="$t('pages.administration.students.index.remove.progress.title')"
				:description="$t('pages.administration.students.index.remove.progress.description')"
				data-testid="progress-modal"
			/>

			<base-input
				v-model="searchQuery"
				type="text"
				:placeholder="$t('pages.administration.students.index.searchbar.placeholder')"
				class="search-section"
				label=""
				data-testid="searchbar"
				@update:model-value="barSearch"
			>
				<template #icon>
					<v-icon :icon="mdiMagnify" />
				</template>
			</base-input>

			<DataFilter filter-for="student" :class-names="classNameList" @update:filter="onUpdateFilter" />

			<backend-data-table
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
						<v-icon v-if="status === 'ok'" color="rgba(var(--v-theme-success))" :icon="mdiCheckAll" />
						<v-icon v-else-if="status === 'parentsAgreed'" color="rgba(var(--v-theme-warning))" :icon="mdiCheck" />
						<v-icon v-else-if="status === 'missing'" color="rgba(var(--v-theme-error))" :icon="mdiClose" />
					</span>
				</template>
				<template #datacolumn-_id="{ data, selected, highlighted }">
					<v-btn
						icon
						variant="text"
						:class="{
							'action-button': true,
							'row-selected': selected,
							'row-highlighted': highlighted,
						}"
						:href="`/administration/students/${data}/edit?returnUrl=/administration/students`"
						:aria-label="$t('pages.administration.students.table.edit.ariaLabel')"
						data-testid="edit_student_button"
					>
						<v-icon size="20" :icon="mdiPencilOutline" />
					</v-btn>
				</template>
			</backend-data-table>
			<admin-table-legend
				:icons="icons"
				:show-icons="showConsent"
				:show-external-sync-hint="schoolIsExternallyManaged"
			/>
		</default-wireframe>
		<base-dialog
			v-if="isConfirmDialogActive"
			:active="isConfirmDialogActive"
			v-bind="confirmDialogProps"
			@update:active="isConfirmDialogActive = false"
		/>
	</div>
</template>

<script>
import AdminTableLegend from "@/components/molecules/AdminTableLegend";
import ProgressModal from "@/components/molecules/ProgressModal";
import DataFilter from "@/components/organisms/DataFilter/DataFilter.vue";
import BackendDataTable from "@/components/organisms/DataTable/BackendDataTable";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import UserHasPermission from "@/mixins/UserHasPermission";
import { printDate } from "@/plugins/datetime";
import { Permission } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { printQrCodes } from "@/utils/qr-code.utils";
import { notifyError, notifyInfo, notifySuccess } from "@data-app";
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
	mdiMagnify,
	mdiPencilOutline,
	mdiPlus,
	mdiQrcode,
} from "@icons/material";
import { reactive } from "vue";
import { mapGetters } from "vuex";

export default {
	components: {
		DefaultWireframe,
		BackendDataTable,
		AdminTableLegend,
		ProgressModal,
		DataFilter,
	},
	mixins: [UserHasPermission],
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
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
			mdiMagnify,
			mdiPencilOutline,
			mdiPlus,
			mdiQrcode,
			currentFilterQuery: this.getUiState("filter", "pages.administration.students.index"),
			page:
				(this.getUiState("pagination", "pages.administration.students.index") &&
					this.getUiState("pagination", "pages.administration.students.index").page) ||
				1,
			limit:
				(this.getUiState("pagination", "pages.administration.students.index") &&
					this.getUiState("pagination", "pages.administration.students.index").limit) ||
				25,
			sortBy:
				(this.getUiState("sorting", "pages.administration.students.index") &&
					this.getUiState("sorting", "pages.administration.students.index").sortBy) ||
				"firstName",
			sortOrder:
				(this.getUiState("sorting", "pages.administration.students.index") &&
					this.getUiState("sorting", "pages.administration.students.index").sortOrder) ||
				"asc",
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
					field: "birthday",
					label: this.$t("common.labels.birthday"),
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
					infobox: true,
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
			tableSelection: [],
			tableSelectionType: "inclusive",
			breadcrumbs: [
				{
					title: this.$t("pages.administration.index.title"),
					disabled: true,
				},
				{
					title: this.$t("pages.administration.students.index.title"),
					disabled: true,
				},
			],
			active: false,
			searchQuery:
				(this.getUiState("filter", "pages.administration.students.index") &&
					this.getUiState("filter", "pages.administration.students.index").searchQuery) ||
				"",
			confirmDialogProps: {},
			isConfirmDialogActive: false,
			classNameList: [],
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
						? this.$t("pages.administration.students.index.tableActions.consent")
						: this.$t("pages.administration.students.index.tableActions.registration"),
					icon: mdiCheck,
					action: this.handleBulkConsent,
					dataTestId: "consent_action",
				},
				{
					label: this.$t("pages.administration.students.index.tableActions.email"),
					icon: mdiEmailOutline,
					action: this.handleBulkEMail,
					dataTestId: "registration_link",
				},
				{
					label: this.$t("pages.administration.students.index.tableActions.qr"),
					icon: mdiQrcode,
					action: this.handleBulkQR,
					dataTestId: "qr_code",
				},
				{
					label: this.$t("pages.administration.students.index.tableActions.delete"),
					icon: mdiDeleteOutline,
					action: this.handleBulkDelete,
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
			let editedActions = this.tableActions;

			// filter actions by permissions
			editedActions = this.tableActions.filter((action) =>
				action.permission ? this.$_userHasPermission(action.permission) : true
			);

			// filter the delete action if school is external
			if (this.schoolIsExternallyManaged) {
				editedActions = editedActions.filter(
					(action) => action.label !== this.$t("pages.administration.students.index.tableActions.delete")
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
				label: this.$t("pages.administration.students.legend.icon.success"),
			});

			if (this.isConsentNecessary) {
				instanceBasedIcons.push({
					icon: mdiCheck,
					color: "rgba(var(--v-theme-warning))",
					label: this.$t("utils.adminFilter.consent.label.parentsAgreementMissing"),
				});
			}

			instanceBasedIcons.push({
				icon: mdiClose,
				color: "rgba(var(--v-theme-error))",
				label: this.$t("utils.adminFilter.consent.label.missing"),
			});

			return instanceBasedIcons;
		},
		fab() {
			if (this.schoolIsExternallyManaged || !this.$_userHasPermission(Permission.StudentCreate)) {
				return null;
			}

			return {
				icon: mdiPlus,
				title: this.$t("common.actions.create"),
				dataTestId: "fab_button_students_table",
				ariaLabel: this.$t("common.actions.create"),
				actions: [
					{
						label: this.$t("pages.administration.students.fab.add"),
						icon: mdiAccountPlus,
						to: "/administration/students/new",
						dataTestId: "fab_button_add_students",
						ariaLabel: this.$t("pages.administration.students.fab.add"),
					},
					{
						label: this.$t("pages.administration.students.fab.import"),
						icon: mdiCloudDownload,
						href: "/administration/students/import",
						dataTestId: "fab_button_import_students",
						ariaLabel: this.$t("pages.administration.students.fab.import"),
					},
				],
			};
		},
	},
	watch: {
		currentFilterQuery: function (query) {
			const uiState = this.getUiState("filter", "pages.administration.students.index");

			if (uiState && uiState.searchQuery) query.searchQuery = uiState.searchQuery;

			this.currentFilterQuery = query;
			if (JSON.stringify(query) !== JSON.stringify(this.getUiState("filter", "pages.administration.students.index"))) {
				this.onUpdateCurrentPage(1);
			}
			this.setUiState("filter", "pages.administration.students.index", {
				query,
			});
		},
	},
	created() {
		this.find();
		this.getClassNameList();
	},
	mounted() {
		document.title = buildPageTitle(this.$t("pages.administration.students.index.title"));
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
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy;
			this.sortOrder = sortOrder;
			this.setUiState("sorting", "pages.administration.students.index", {
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
			});
			this.onUpdateCurrentPage(1); // implicitly triggers new find
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			this.setUiState("pagination", "pages.administration.students.index", {
				currentPage: page,
			});
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			//this.page = 1;
			this.limit = limit;
			// save user settings in uiState
			this.setUiState("pagination", "pages.administration.students.index", {
				itemsPerPage: limit,
				currentPage: this.page,
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
					notifySuccess(this.$t("pages.administration.sendMail.success", rowIds.length));
				} else {
					notifyInfo(this.$t("pages.administration.sendMail.alreadyRegistered"));
				}
			} catch {
				notifyError(this.$t("pages.administration.sendMail.error", rowIds.length));
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
					printQrCodes(this.qrLinks, this.$t("pages.administration.printQr.printPageTitle"));
				} else {
					notifyInfo(this.$t("pages.administration.printQr.emptyUser"));
				}
			} catch {
				notifyError(this.$t("pages.administration.printQr.error", rowIds.length));
			}
		},
		handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					await this.$store.dispatch("users/deleteUsers", {
						ids: rowIds,
						userType: "student",
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
				message = this.$t("pages.administration.students.index.remove.confirm.message.some", rowIds.length, {
					number: rowIds.length,
				});
			} else {
				if (rowIds.length) {
					message = this.$t("pages.administration.students.index.remove.confirm.message.many", {
						number: rowIds.length,
					});
				} else {
					message = this.$t("pages.administration.students.index.remove.confirm.message.all");
				}
			}
			this.dialogConfirm({
				message,
				confirmText: this.$t("pages.administration.students.index.remove.confirm.btnText"),
				cancelText: this.$t("common.actions.cancel"),
				icon: mdiAlert,
				iconColor: "rgba(var(--v-theme-error))",
				onConfirm,
				onCancel,
			});
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

					this.setUiState("filter", "pages.administration.students.index", {
						query,
					});
				}
			}, 400);
		},
		setUiState(key, identifier, data) {
			this.$store?.commit("uiState/set", {
				key,
				identifier,
				object: data,
			});
		},
		getUiState(key, identifier) {
			return this.$store?.getters["uiState/get"]({ key, identifier });
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
};
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

.search-section {
	max-width: 100%;
	margin-top: 8px;
	margin-bottom: 8px;
	margin-left: 0;
}
</style>
