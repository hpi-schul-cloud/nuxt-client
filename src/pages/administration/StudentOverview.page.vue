<template>
	<default-wireframe
		:headline="$t('pages.administration.students.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		:fab-items="fab"
	>
		<progress-modal
			:active="isDeleting"
			:percent="deletedPercent"
			:title="$t('pages.administration.students.index.remove.progress.title')"
			:description="
				$t('pages.administration.students.index.remove.progress.description')
			"
			data-testid="progress-modal"
		/>

		<base-input
			v-model="searchQuery"
			type="text"
			:placeholder="
				$t('pages.administration.students.index.searchbar.placeholder')
			"
			class="search-section"
			label=""
			data-testid="searchbar"
			@update:vmodel="barSearch"
		>
			<template #icon> <base-icon source="material" icon="search" /></template>
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
			:data="students"
			:paginated="true"
			:rows-per-page.sync="limit"
			:rows-selectable="true"
			:total="pagination.total"
			track-by="_id"
			:selected-row-ids.sync="tableSelection"
			:selection-type.sync="tableSelectionType"
			:sort-by="sortBy"
			:sort-order="sortOrder"
			:show-external-text="schoolIsExternallyManaged"
			data-testid="students_table"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template #datacolumn-birthday="{ data }">
				<span class="text-content">{{ printDateFromDeUTC(data) }}</span>
			</template>
			<template #datacolumn-classes="{ data }">
				{{ (data || []).join(", ") }}
			</template>
			<template #headcolumn-consent> </template>
			<template #columnlabel-consent></template>
			<template #datacolumn-createdAt="{ data }">
				<span class="text-content">{{ printDate(data) }}</span>
			</template>
			<template #datacolumn-consentStatus="{ data: status }">
				<span class="text-content">
					<base-icon
						v-if="status === 'ok'"
						source="custom"
						icon="doublecheck"
						color="var(--v-success-base)"
					/>

					<base-icon
						v-else-if="status === 'parentsAgreed'"
						source="material"
						icon="check"
						color="var(--v-warning-base)"
					/>
					<base-icon
						v-else-if="status === 'missing'"
						source="material"
						icon="close"
						color="var(--v-error-base)"
					/>
				</span>
			</template>
			<template #datacolumn-_id="{ data, selected, highlighted }">
				<base-button
					:class="{
						'action-button': true,
						'row-selected': selected,
						'row-highlighted': highlighted,
					}"
					design="text icon"
					size="small"
					:to="`/administration/students/${data}/edit`"
					data-testid="edit_student_button"
				>
					<base-icon source="material" icon="edit" />
				</base-button>
			</template>
		</backend-data-table>
		<admin-table-legend
			:icons="icons"
			:show-icons="showConsent"
			:show-external-sync-hint="schoolIsExternallyManaged"
		/>
	</default-wireframe>
</template>

<script>
/* eslint-disable max-lines */
import { mapGetters } from "vuex";
import { envConfigModule, schoolsModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import BackendDataTable from "@/components/organisms/DataTable/BackendDataTable";
import DataFilter from "@/components/organisms/DataFilter/DataFilter";
import AdminTableLegend from "@/components/molecules/AdminTableLegend";
import { studentFilter } from "@/utils/adminFilter";
import print from "@/mixins/print";
import UserHasPermission from "@/mixins/UserHasPermission";
import { printDateFromDeUTC, printDate } from "@/plugins/datetime";
import ProgressModal from "@/components/molecules/ProgressModal";
import { mdiPlus, mdiAccountPlus, mdiCloudDownload } from "@mdi/js";

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
			something: [],
			currentFilterQuery: this.$uiState.get(
				"filter",
				"pages.administration.students.index"
			),
			page:
				(this.$uiState.get(
					"pagination",
					"pages.administration.students.index"
				) &&
					this.$uiState.get("pagination", "pages.administration.students.index")
						.page) ||
				1,
			limit:
				(this.$uiState.get(
					"pagination",
					"pages.administration.students.index"
				) &&
					this.$uiState.get("pagination", "pages.administration.students.index")
						.limit) ||
				25,
			sortBy:
				(this.$uiState.get("sorting", "pages.administration.students.index") &&
					this.$uiState.get("sorting", "pages.administration.students.index")
						.sortBy) ||
				"firstName",
			sortOrder:
				(this.$uiState.get("sorting", "pages.administration.students.index") &&
					this.$uiState.get("sorting", "pages.administration.students.index")
						.sortOrder) ||
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
					// edit column
					field: "_id",
					label: "",
				},
			],
			tableSelection: [],
			tableSelectionType: "inclusive",
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
				},
				{
					text: this.$t("pages.administration.students.index.title"),
					disabled: true,
				},
			],
			filters: studentFilter(this),
			active: false,
			searchQuery:
				(this.$uiState.get("filter", "pages.administration.students.index") &&
					this.$uiState.get("filter", "pages.administration.students.index")
						.searchQuery) ||
				"",
		};
	},
	meta: {
		requiredPermissions: ["STUDENT_LIST"],
	},
	computed: {
		...mapGetters("users", {
			students: "getList",
			pagination: "getPagination",
			isDeleting: "getActive",
			deletedPercent: "getPercent",
			qrLinks: "getQrLinks",
		}),
		schoolIsExternallyManaged() {
			return schoolsModule.schoolIsExternallyManaged;
		},
		tableActions() {
			return [
				{
					label: this.isConsentNecessary
						? this.$t(
								"pages.administration.students.index.tableActions.consent"
						  )
						: this.$t(
								"pages.administration.students.index.tableActions.registration"
						  ),
					icon: "check",
					"icon-source": "material",
					action: this.handleBulkConsent,
					dataTestId: "consent_action",
				},
				{
					label: this.$t(
						"pages.administration.students.index.tableActions.email"
					),
					icon: "mail_outline",
					"icon-source": "material",
					action: this.handleBulkEMail,
					dataTestId: "registration_link",
				},
				{
					label: this.$t("pages.administration.students.index.tableActions.qr"),
					"icon-source": "fa",
					icon: "qrcode",
					action: this.handleBulkQR,
					dataTestId: "qr_code",
				},
				{
					label: this.$t(
						"pages.administration.students.index.tableActions.delete"
					),
					icon: "delete_outline",
					"icon-source": "material",
					action: this.handleBulkDelete,
					permission: "STUDENT_DELETE",
					dataTestId: "delete_action",
				},
			];
		},
		isConsentNecessary() {
			return (
				envConfigModule.getEnv &&
				envConfigModule.getEnv.FEATURE_CONSENT_NECESSARY
			);
		},
		showConsent() {
			return (
				envConfigModule.getEnv &&
				envConfigModule.getEnv.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN
			);
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
					(action) =>
						action.label !==
						this.$t("pages.administration.students.index.tableActions.delete")
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
				editedColumns = editedColumns.filter(
					(col) => col.field !== "consentStatus"
				);
			}

			return editedColumns;
		},
		icons() {
			const instanceBasedIcons = [];

			instanceBasedIcons.push({
				icon: "doublecheck",
				color: "var(--v-success-base)",
				style: "margin: -3px 3px",
				label: this.$t("pages.administration.students.legend.icon.success"),
			});

			if (this.isConsentNecessary) {
				instanceBasedIcons.push({
					icon: "check",
					color: "var(--v-warning-base)",
					label: this.$t(
						"utils.adminFilter.consent.label.parentsAgreementMissing"
					),
				});
			}

			instanceBasedIcons.push({
				icon: "clear",
				color: "var(--v-error-base)",
				label: this.$t("utils.adminFilter.consent.label.missing"),
			});

			return instanceBasedIcons;
		},
		fab() {
			if (
				this.schoolIsExternallyManaged ||
				!this.$_userHasPermission("STUDENT_CREATE")
			) {
				return null;
			}

			return {
				icon: mdiPlus,
				title: this.$t("common.actions.create"),
				testId: "fab_button_students_table",
				ariaLabel: this.$t("common.actions.create"),
				actions: [
					{
						label: this.$t("pages.administration.students.fab.add"),
						icon: mdiAccountPlus,
						to: "/administration/students/new",
						dataTestid: "fab_button_add_students",
						ariaLabel: this.$t("pages.administration.students.fab.add"),
					},
					{
						label: this.$t("pages.administration.students.fab.import"),
						icon: mdiCloudDownload,
						href: "/administration/students/import",
						dataTestid: "fab_button_import_students",
						ariaLabel: this.$t("pages.administration.students.fab.import"),
					},
				],
			};
		},
	},
	watch: {
		currentFilterQuery: function (query) {
			const uiState = this.$uiState.get(
				"filter",
				"pages.administration.students.index"
			);

			if (uiState && uiState.searchQuery)
				query.searchQuery = uiState.searchQuery;

			this.currentFilterQuery = query;
			if (
				JSON.stringify(query) !==
				JSON.stringify(
					this.$uiState.get("filter", "pages.administration.students.index")
				)
			) {
				this.onUpdateCurrentPage(1);
			}
			this.$uiState.set("filter", "pages.administration.students.index", {
				query,
			});
		},
	},
	created(ctx) {
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
			this.$store.dispatch("users/findStudents", {
				query,
			});
		},
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy;
			this.sortOrder = sortOrder;
			this.$uiState.set("sorting", "pages.administration.students.index", {
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
			});
			this.onUpdateCurrentPage(1); // implicitly triggers new find
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			this.$uiState.set("pagination", "pages.administration.students.index", {
				currentPage: page,
			});
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			//this.page = 1;
			this.limit = limit;
			// save user settings in uiState
			this.$uiState.set("pagination", "pages.administration.students.index", {
				itemsPerPage: limit,
				currentPage: this.page,
			});
			this.find();
		},
		printDate,
		printDateFromDeUTC,
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
				// TODO wrong use of store (not so bad)
				await this.$store.dispatch("users/sendRegistrationLink", {
					userIds: rowIds,
					selectionType,
				});
				this.$toast.success(
					this.$tc("pages.administration.sendMail.success", rowIds.length)
				);
			} catch (error) {
				console.error(error);
				this.$toast.error(
					this.$tc("pages.administration.sendMail.error", rowIds.length)
				);
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
					this.$_printQRs(this.qrLinks);
				} else {
					this.$toast.info(this.$tc("pages.administration.printQr.emptyUser"));
				}
			} catch (error) {
				this.$toast.error(
					this.$tc("pages.administration.printQr.error", rowIds.length)
				);
			}
		},
		handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					// TODO wrong use of store (not so bad)
					await this.$store.dispatch("users/deleteUsers", {
						ids: rowIds,
						userType: "student",
					});
					this.$toast.success(this.$t("pages.administration.remove.success"));
					this.find();
				} catch (error) {
					this.$toast.error(this.$t("pages.administration.remove.error"));
				}
			};
			const onCancel = () => {
				this.$set(this, "tableSelection", []);
				this.tableSelectionType = "inclusive";
			};
			let message;
			if (selectionType === "inclusive") {
				message = this.$tc(
					"pages.administration.students.index.remove.confirm.message.some",
					rowIds.length,
					{ number: rowIds.length }
				);
			} else {
				if (rowIds.length) {
					message = this.$t(
						"pages.administration.students.index.remove.confirm.message.many",
						{ number: rowIds.length }
					);
				} else {
					message = this.$t(
						"pages.administration.students.index.remove.confirm.message.all"
					);
				}
			}
			this.$dialog.confirm({
				message,
				confirmText: this.$t(
					"pages.administration.students.index.remove.confirm.btnText"
				),
				cancelText: this.$t("common.actions.cancel"),
				icon: "report_problem",
				iconSource: "material",
				iconColor: "var(--v-error-base)",
				actionDesign: "danger",
				onConfirm,
				onCancel,
				invertedDesign: true,
			});
		},
		barSearch: function (searchText) {
			this.currentFilterQuery.searchQuery = searchText.trim();

			const query = this.currentFilterQuery;

			this.$uiState.set("filter", "pages.administration.students.index", {
				query,
			});

			setTimeout(() => {
				this.$store.dispatch("users/findStudents", {
					query,
					action: "find",
				});
			}, 400);
		},
	},
	head() {
		return {
			title: `${this.$t("pages.administration.students.index.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

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
