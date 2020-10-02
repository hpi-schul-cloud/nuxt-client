<!-- eslint-disable max-lines -->
<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.teachers.index.title") }}
		</h1>

		<base-input
			v-model="searchQuery"
			type="text"
			:placeholder="
				$t('pages.administration.teachers.index.searchbar.placeholder')
			"
			class="search-section"
			label=""
			@update:vmodel="barSearch"
		>
			<template v-slot:icon>
				<base-icon source="material" icon="search"
			/></template>
		</base-input>

		<data-filter
			:filters="filters"
			:backend-filtering="true"
			:active-filters.sync="currentFilterQuery"
		/>

		<backend-data-table
			:actions="filteredActions"
			:columns="editFilteredColumns"
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
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template v-slot:datacolumn-classes="{ data }">
				{{ (data || []).join(", ") }}
			</template>
			<template v-slot:datacolumn-createdAt="{ data }">
				<span class="text-content">{{ dayjs(data).format("DD.MM.YYYY") }}</span>
			</template>
			<template v-slot:datacolumn-consentStatus="{ data: status }">
				<span class="text-content">
					<base-icon
						v-if="status === 'ok'"
						source="material"
						icon="check"
						color="var(--color-success)"
					/>
					<base-icon
						v-else-if="status === 'missing'"
						source="material"
						icon="close"
						color="var(--color-danger)"
					/>
				</span>
			</template>

			<template v-slot:datacolumn-_id="{ data, selected, highlighted }">
				<base-button
					:class="{
						'action-button': true,
						'row-selected': selected,
						'row-highlighted': highlighted,
					}"
					design="text icon"
					size="small"
					:to="`/administration/teachers/${data}/edit`"
				>
					<base-icon source="material" icon="edit" />
				</base-button>
			</template>
		</backend-data-table>
		<admin-table-legend
			:icons="icons"
			:show-external-sync-hint="!schoolInternallyManaged"
		/>
		<fab-floating
			v-if="
				schoolInternallyManaged && this.$_userHasPermission('TEACHER_CREATE')
			"
			position="bottom-right"
			:show-label="true"
			:actions="[
				{
					label: $t('pages.administration.teachers.fab.add'),
					icon: 'person_add',
					'icon-source': 'material',
					to: '/administration/teachers/new',
				},
				{
					label: $t('pages.administration.teachers.fab.import'),
					icon: 'backup',
					'icon-source': 'material',
					href: '/administration/teachers/import',
				},
			]"
		/>
	</section>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
import AdminTableLegend from "@components/molecules/AdminTableLegend";
import FabFloating from "@components/molecules/FabFloating";
import DataFilter from "@components/organisms/DataFilter/DataFilter";
import BaseInput from "../../../components/base/BaseInput/BaseInput";
import { teacherFilter } from "@utils/adminFilter";
import print from "@mixins/print";
import UserHasPermission from "@/mixins/UserHasPermission";
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");
export default {
	layout: "loggedInFull",
	components: {
		DataFilter,
		BackendDataTable,
		AdminTableLegend,
		FabFloating,
		BaseInput,
	},
	mixins: [print, UserHasPermission],
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},
	meta: {
		requiredPermissions: ["TEACHER_LIST"],
	},
	data() {
		return {
			currentFilterQuery: this.$uiState.get(
				"filter",
				"pages.administration.teachers.index"
			),
			test: this.$uiState,
			page:
				this.$uiState.get("pagination", "pages.administration.teachers.index")
					.page || 1,
			limit:
				this.$uiState.get("pagination", "pages.administration.teachers.index")
					.limit || 25,
			sortBy:
				this.$uiState.get("sorting", "pages.administration.teachers.index")
					.sortBy || "firstName",
			sortOrder:
				this.$uiState.get("sorting", "pages.administration.teachers.index")
					.sortOrder || "asc",
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.teachers.index.title"),
				},
			],

			tableActions: [
				{
					label: this.$t(
						"pages.administration.teachers.index.tableActions.email"
					),
					icon: "mail_outline",
					"icon-source": "material",
					action: this.handleBulkEMail,
				},
				{
					label: this.$t("pages.administration.teachers.index.tableActions.qr"),
					"icon-source": "fa",
					icon: "qrcode",
					action: this.handleBulkQR,
				},
				{
					label: this.$t(
						"pages.administration.teachers.index.tableActions.delete"
					),
					icon: "delete_outline",
					"icon-source": "material",
					action: this.handleBulkDelete,
					permission: "TEACHER_DELETE",
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
					field: "_id",
					label: "",
				},
			],
			icons: [
				{
					icon: "check",
					color: "var(--color-success)",
					label: this.$t("pages.administration.teachers.legend.icon.check"),
				},
				{
					icon: "clear",
					color: "var(--color-danger)",
					label: this.$t("pages.administration.students.legend.icon.danger"),
				},
			],
			filters: teacherFilter(this),
			searchQuery:
				this.$uiState.get("filter", "pages.administration.teachers.index")
					.searchQuery || "",
		};
	},
	computed: {
		...mapGetters("users", {
			teachers: "list",
		}),
		...mapState("auth", {
			school: "school",
			user: "user",
		}),
		...mapState("users", {
			pagination: (state) =>
				state.pagination.default || { limit: 10, total: 0 },
		}),
		...mapState("search", {
			searchResult: "searchResult",
		}),
		permissionFilteredTableActions() {
			return this.tableActions.filter((action) =>
				action.permission ? this.$_userHasPermission(action.permission) : true
			);
		},
		tableData: {
			get() {
				if (this.takeOverTableData) return this.searchData;
				return this.teachers;
			},
		},
		filteredActions() {
			// if user has teacher role, bulkQr action gets filtered
			return this.user.roles.some((role) => role.name === "teacher")
				? this.permissionFilteredTableActions.filter(
						(action) =>
							action.label !==
							this.$t("pages.administration.teachers.index.tableActions.qr")
				  )
				: this.permissionFilteredTableActions;
		},
		editFilteredColumns() {
			// filters out edit column if school is external or if user is a teacher
			return this.school.isExternal ||
				this.user.roles.some((role) => role.name === "teacher")
				? this.tableColumns.filter((col) => col.field !== "_id")
				: this.tableColumns;
		},
		schoolInternallyManaged() {
			return !this.school.isExternal;
		},
	},
	watch: {
		currentFilterQuery: function (query) {
			var temp = this.$uiState.get(
				"filter",
				"pages.administration.teacher.index"
			);

			if (temp.searchQuery) query.searchQuery = temp.searchQuery;

			this.currentFilterQuery = query;
			if (
				JSON.stringify(query) !==
				JSON.stringify(
					this.$uiState.get("filter", "pages.administration.teachers.index")
				)
			) {
				this.onUpdateCurrentPage(1);
			}
			this.$uiState.set("filter", "pages.administration.teachers.index", {
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
			this.$store.dispatch("users/handleUsers", {
				query,
				action: "find",
				userType: "teachers",
			});
		},
		onUpdateSort(sortBy, sortOrder) {
			this.sortBy = sortBy;
			this.sortOrder = sortOrder;
			this.$uiState.set("sorting", "pages.administration.teachers.index", {
				sortBy: this.sortBy,
				sortOrder: this.sortOrder,
			});
			this.onUpdateCurrentPage(1); // implicitly triggers new find
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			this.$uiState.set("pagination", "pages.administration.teachers.index", {
				currentPage: page,
			});
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			// this.page = 1;
			this.limit = limit;
			// save user settings in uiState
			this.$uiState.set("pagination", "pages.administration.teachers.index", {
				itemsPerPage: limit,
				currentPage: this.page,
			});
			this.find();
		},
		dayjs,
		getQueryForSelection(rowIds, selectionType) {
			return {
				...this.currentFilterQuery,
				selectionType,
				_ids: rowIds,
			};
		},
		async handleBulkEMail(rowIds, selectionType) {
			try {
				await this.$store.dispatch("users/sendRegistrationLink", {
					userIds: rowIds,
					selectionType,
				});
				this.$toast.success(
					this.$tc("pages.administration.sendMail.success", rowIds.length)
				);
			} catch (error) {
				this.$toast.error(
					this.$tc("pages.administration.sendMail.error", rowIds.length)
				);
			}
		},
		async handleBulkQR(rowIds, selectionType) {
			try {
				const qrRegistrationLinks = await this.$store.dispatch(
					"users/getQrRegistrationLinks",
					{
						userIds: rowIds,
						selectionType,
					}
				);
				this.$_printQRs(qrRegistrationLinks);
			} catch (error) {
				console.error(error);
				this.$toast.error(
					this.$tc("pages.administration.printQr.error", rowIds.length)
				);
			}
		},
		handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					await this.$store.dispatch("users/handleUsers", {
						query: this.getQueryForSelection(rowIds, selectionType),
						action: "remove",
						userType: "teachers",
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
			this.$dialog.confirm({
				message,
				confirmText: this.$t(
					"pages.administration.teachers.index.remove.confirm.btnText"
				),
				cancelText: this.$t("common.actions.cancel"),
				icon: "report_problem",
				iconSource: "material",
				iconColor: "var(--color-danger)",
				actionDesign: "danger",
				onConfirm,
				onCancel,
				invertedDesign: true,
			});
		},
		barSearch: function (searchText) {
			this.currentFilterQuery.searchQuery = searchText.trim();

			const query = this.currentFilterQuery;

			this.$uiState.set("filter", "pages.administration.teachers.index", {
				query,
			});

			setTimeout(() => {
				this.$store.dispatch("users/handleUsers", {
					query,
					action: "find",
					userType: "teachers",
				});
			}, 400);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

a.action-button {
	&.row-highlighted:hover {
		background-color: var(--color-white);
	}
	&.row-selected {
		color: var(--color-white);
		&:hover {
			background-color: var(--color-tertiary-dark);
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
	box-shadow: 0 0 0 0 var(--color-white), 0 0 0 3px var(--button-background);
}
.search-section {
	max-width: 100%;
	margin-top: var(--space-xs);
	margin-bottom: var(--space-xs);
	margin-left: 0;
}
</style>
