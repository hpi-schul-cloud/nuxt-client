<template>
	<div>
		<default-wireframe
			:breadcrumbs="breadcrumbs"
			:full-width="true"
			:headline="$t('pages.administration.teachers.index.title')"
			:fab-items="fab"
		>
			<progress-modal
				:active="isDeleting"
				:percent="deletedPercent"
				:title="$t('pages.administration.teachers.index.remove.progress.title')"
				:description="
					$t('pages.administration.teachers.index.remove.progress.description')
				"
				data-testid="progress-modal"
			/>

			<base-input
				v-model="searchQuery"
				type="text"
				:placeholder="
					$t('pages.administration.teachers.index.searchbar.placeholder')
				"
				class="search-section"
				label=""
				data-testid="searchbar"
				@update:vmodel="barSearch"
			>
				<template #icon>
					<v-icon>$mdiMagnify</v-icon>
				</template>
			</base-input>

			<data-filter
				:filters="filters"
				:backend-filtering="true"
				:active-filters.sync="currentFilterQuery"
				data-testid="data_filter"
			/>

			<backend-data-table
				:actions="filteredActions"
				:columns="filteredColumns"
				:current-page.sync="page"
				:data="teachers"
				:paginated="true"
				:total="pagination.total"
				:rows-per-page.sync="limit"
				:rows-selectable="true"
				track-by="_id"
				:selected-row-ids.sync="tableSelection"
				:selection-type.sync="tableSelectionType"
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
						<v-icon
							v-if="status === 'ok'"
							class="material-icon"
							color="var(--v-success-base)"
							>$mdiCheck</v-icon
						>
						<v-icon
							v-else-if="status === 'missing'"
							class="material-icon"
							color="var(--v-error-base)"
							>$mdiClose</v-icon
						>
					</span>
				</template>
				<template #datacolumn-lastLoginSystemChange="{ data }">
					<span v-if="data" class="text-content">{{ printDate(data) }}</span>
				</template>
				<template #datacolumn-outdatedSince="{ data }">
					<span v-if="data" class="text-content">{{ printDate(data) }}</span>
				</template>

				<template #datacolumn-_id="{ data, selected, highlighted }">
					<v-btn
						icon
						:class="{
							'action-button': true,
							'row-selected': selected,
							'row-highlighted': highlighted,
						}"
						:href="`/administration/teachers/${data}/edit?returnUrl=/administration/teachers`"
						data-testid="edit_teacher_button"
					>
						<v-icon size="20">{{ mdiPencilOutline }}</v-icon>
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
/* eslint-disable max-lines */
import {
	authModule,
	envConfigModule,
	notifierModule,
	schoolsModule,
} from "@/store";
import { mapGetters } from "vuex";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import BackendDataTable from "@/components/organisms/DataTable/BackendDataTable";
import AdminTableLegend from "@/components/molecules/AdminTableLegend";
import DataFilter from "@/components/organisms/DataFilter/DataFilter";
import { teacherFilter } from "@/utils/adminFilter";
import print from "@/mixins/print";
import UserHasPermission from "@/mixins/UserHasPermission";
import { printDate } from "@/plugins/datetime";
import ProgressModal from "@/components/molecules/ProgressModal";
import {
	mdiAccountPlus,
	mdiCloudDownload,
	mdiPencilOutline,
	mdiPlus,
} from "@mdi/js";

export default {
	components: {
		DataFilter,
		DefaultWireframe,
		BackendDataTable,
		AdminTableLegend,
		ProgressModal,
	},
	mixins: [print, UserHasPermission],
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},
	data() {
		return {
			mdiPlus,
			mdiAccountPlus,
			mdiCloudDownload,
			mdiPencilOutline,
			currentFilterQuery: this.getUiState(
				"filter",
				"pages.administration.teachers.index"
			),
			// test: this.$uiState,
			page:
				(this.getUiState("pagination", "pages.administration.teachers.index") &&
					this.getUiState("pagination", "pages.administration.teachers.index")
						.page) ||
				1,
			limit:
				(this.getUiState("pagination", "pages.administration.teachers.index") &&
					this.getUiState("pagination", "pages.administration.teachers.index")
						.limit) ||
				25,
			sortBy:
				(this.getUiState("sorting", "pages.administration.teachers.index") &&
					this.getUiState("sorting", "pages.administration.teachers.index")
						.sortBy) ||
				"firstName",
			sortOrder:
				(this.getUiState("sorting", "pages.administration.teachers.index") &&
					this.getUiState("sorting", "pages.administration.teachers.index")
						.sortOrder) ||
				"asc",
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					text: this.$t("pages.administration.teachers.index.title"),
					disabled: true,
				},
			],

			tableActions: [
				{
					label: this.$t(
						"pages.administration.teachers.index.tableActions.email"
					),
					icon: "$mdiEmailOutline",
					action: this.handleBulkEMail,
					dataTestId: "registration_link",
				},
				{
					label: this.$t("pages.administration.teachers.index.tableActions.qr"),
					icon: "$mdiQrcode",
					action: this.handleBulkQR,
					dataTestId: "qr_code",
				},
				{
					label: this.$t(
						"pages.administration.teachers.index.tableActions.delete"
					),
					icon: "$mdiDeleteOutline",
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
					icon: "$mdiCheck",
					color: "var(--v-success-base)",
					label: this.$t("pages.administration.students.legend.icon.success"),
				},
				{
					icon: "$mdiClose",
					color: "var(--v-error-base)",
					label: this.$t("utils.adminFilter.consent.label.missing"),
				},
			],
			filters: teacherFilter(this),
			searchQuery:
				(this.getUiState("filter", "pages.administration.teachers.index") &&
					this.getUiState("filter", "pages.administration.teachers.index")
						.searchQuery) ||
				"",
			confirmDialogProps: {},
			isConfirmDialogActive: false,
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
		user() {
			return authModule.getUser;
		},
		schoolIsExternallyManaged() {
			return schoolsModule.schoolIsExternallyManaged;
		},
		getFeatureSchoolSanisUserMigrationEnabled() {
			return envConfigModule.getFeatureSchoolSanisUserMigrationEnabled;
		},
		env() {
			return envConfigModule.getEnv;
		},
		tableData: {
			get() {
				if (this.takeOverTableData) return this.searchData;
				return this.teachers;
			},
		},
		showConsent() {
			return this.env && this.env.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN;
		},
		filteredActions() {
			let editedActions = this.tableActions;

			// filter actions by permissions
			editedActions = this.tableActions.filter((action) =>
				action.permission ? this.$_userHasPermission(action.permission) : true
			);

			// filters out the QR bulk action is user is not an admin
			if (!this.user?.roles?.some((role) => role.name === "administrator")) {
				editedActions = editedActions.filter(
					(action) =>
						action.label !==
						this.$t("pages.administration.teachers.index.tableActions.qr")
				);
			}

			// filter the delete action if school is external
			if (this.schoolIsExternallyManaged) {
				editedActions = editedActions.filter(
					(action) =>
						action.label !==
						this.$t("pages.administration.teachers.index.tableActions.delete")
				);
			}

			return editedActions;
		},
		filteredColumns() {
			let editedColumns = this.tableColumns;
			// filters out edit column if school is external or if user is not an admin
			if (
				this.schoolIsExternallyManaged ||
				!this.user?.roles?.some((role) => role.name === "administrator")
			) {
				editedColumns = this.tableColumns.filter(
					// _id field sets the edit column
					(col) => col.field !== "_id"
				);
			}

			// filters out the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN env is disabled
			if (!this.showConsent) {
				editedColumns = editedColumns.filter(
					(col) => col.field !== "consentStatus"
				);
			}

			if (!this.getFeatureSchoolSanisUserMigrationEnabled) {
				editedColumns = editedColumns
					.filter((col) => col.field !== "lastLoginSystemChange")
					.filter((col) => col.field !== "outdatedSince");
			}

			return editedColumns;
		},
		fab() {
			if (
				this.schoolIsExternallyManaged ||
				!this.$_userHasPermission("TEACHER_CREATE")
			) {
				return null;
			}

			return {
				icon: mdiPlus,
				title: this.$t("common.actions.create"),
				testId: "fab_button_teachers_table",
				ariaLabel: this.$t("common.actions.create"),
				actions: [
					{
						label: this.$t("pages.administration.teachers.fab.add"),
						icon: mdiAccountPlus,
						to: "/administration/teachers/new",
						dataTestid: "fab_button_add_teachers",
						ariaLabel: this.$t("pages.administration.teachers.fab.add"),
					},
					{
						label: this.$t("pages.administration.teachers.fab.import"),
						icon: mdiCloudDownload,
						href: "/administration/teachers/import",
						dataTestid: "fab_button_import_teachers",
						ariaLabel: this.$t("pages.administration.teachers.fab.import"),
					},
				],
			};
		},
	},
	watch: {
		currentFilterQuery: function (query) {
			const temp = this.getUiState(
				"filter",
				"pages.administration.teacher.index"
			);

			if (temp && temp.searchQuery) query.searchQuery = temp.searchQuery;

			this.currentFilterQuery = query;
			if (
				JSON.stringify(query) !==
				JSON.stringify(
					this.getUiState("filter", "pages.administration.teachers.index")
				)
			) {
				this.onUpdateCurrentPage(1);
			}
			this.setUiState("filter", "pages.administration.teachers.index", {
				query,
			});
		},
	},
	created() {
		this.find();
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
			this.$store.dispatch("users/findTeachers", {
				query,
			});
		},
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy;
			this.sortOrder = sortOrder;
			this.setUiState("sorting", "pages.administration.teachers.index", {
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
			});
			this.onUpdateCurrentPage(1); // implicitly triggers new find
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			this.setUiState("pagination", "pages.administration.teachers.index", {
				currentPage: page,
			});
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			// this.page = 1;
			this.limit = limit;
			// save user settings in uiState
			this.setUiState("pagination", "pages.administration.teachers.index", {
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
		async handleBulkEMail(rowIds, selectionType) {
			try {
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("users/sendRegistrationLink", {
					userIds: rowIds,
					selectionType,
				});
				notifierModule.show({
					text: this.$tc(
						"pages.administration.sendMail.success",
						rowIds.length
					),
					status: "success",
					timeout: 10000,
				});
			} catch (error) {
				notifierModule.show({
					text: this.$tc("pages.administration.sendMail.error", rowIds.length),
					status: "error",
					timeout: 10000,
				});
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
					this.$_printQRs(this.qrLinks);
				} else {
					notifierModule.show({
						text: this.$tc("pages.administration.printQr.emptyUser"),
						status: "info",
						timeout: 10000,
					});
				}
			} catch (error) {
				notifierModule.show({
					text: this.$tc("pages.administration.printQr.error", rowIds.length),
					status: "error",
					timeout: 10000,
				});
			}
		},
		handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					await this.$store.dispatch("users/deleteUsers", {
						ids: rowIds,
						userType: "teacher",
					});
					notifierModule.show({
						text: this.$t("pages.administration.remove.success"),
						status: "success",
						timeout: 10000,
					});
					this.find();
				} catch (error) {
					notifierModule.show({
						text: this.$t("pages.administration.remove.error"),
						status: "error",
						timeout: 10000,
					});
				}
			};
			const onCancel = () => {
				this.$set(this, "tableSelection", []);
				this.tableSelectionType = "inclusive";
			};
			let message;
			if (selectionType === "inclusive") {
				message = this.$tc(
					"pages.administration.teachers.index.remove.confirm.message.some",
					rowIds.length,
					{ number: rowIds.length }
				);
			} else {
				if (rowIds.length) {
					message = this.$t(
						"pages.administration.teachers.index.remove.confirm.message.many",
						{ number: rowIds.length }
					);
				} else {
					message = this.$t(
						"pages.administration.teachers.index.remove.confirm.message.all"
					);
				}
			}
			this.dialogConfirm({
				message,
				confirmText: this.$t(
					"pages.administration.teachers.index.remove.confirm.btnText"
				),
				cancelText: this.$t("common.actions.cancel"),
				icon: "$mdiAlert",
				iconSource: "material",
				iconColor: "var(--v-error-base)",
				actionDesign: "danger",
				onConfirm,
				onCancel,
				invertedDesign: true,
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

					this.setUiState("filter", "pages.administration.teachers.index", {
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
	},
	mounted() {
		document.title = `${this.$t(
			"pages.administration.teachers.index.title"
		)} - ${this.$theme.short_name}`;
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

::v-deep .row-highlighted.theme--light.v-btn:hover::before {
	opacity: 0;
}

a.action-button {
	&.row-highlighted:hover {
		background-color: var(--v-white-base);
	}

	&.row-selected {
		color: var(--v-white-base);

		&:hover {
			background-color: var(--v-secondary-darken1);
			box-shadow: none;
		}
	}
}

span {
	font-weight: var(--font-weight-normal);
}

.content {
	max-height: 35vh;
	overflow-y: scroll;
	font-weight: var(--font-weight-normal);
}

.list {
	padding: var(--space-lg);
}

.th-slot {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.info-box {
	position: absolute;
	right: 0%;
	z-index: calc(var(--layer-fab) + 1);
	max-width: 100%;
	margin-top: var(--space-md);
	margin-right: var(--space-lg);
	margin-left: var(--space-lg);

	@include breakpoint(tablet) {
		min-width: 450px;
		max-width: 50%;
		margin-right: var(--space-xl);
	}
}

button:not(.is-none):focus {
	z-index: var(--layer-fab);
	outline: none;
	box-shadow: 0 0 0 0 var(--v-white-base), 0 0 0 3px var(--button-background);
}

.search-section {
	max-width: 100%;
	margin-top: var(--space-xs);
	margin-bottom: var(--space-xs);
	margin-left: 0;
}
</style>
