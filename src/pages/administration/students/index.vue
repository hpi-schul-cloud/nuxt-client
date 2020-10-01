<!-- eslint-disable max-lines -->
<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.index.title") }}
		</h1>

		<base-input
			v-model="searchQuery"
			type="text"
			:placeholder="
				$t('pages.administration.students.index.searchbar.placeholder')
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
			:actions="permissionFilteredTableActions"
			:columns="editFilteredColumns"
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
			:show-external-text="!schoolInternallyManaged"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template v-slot:datacolumn-classes="{ data }">
				{{ (data || []).join(", ") }}
			</template>
			<template v-slot:headcolumn-consent> </template>
			<template v-slot:columnlabel-consent></template>
			<template v-slot:datacolumn-createdAt="{ data }">
				<span class="text-content">{{ dayjs(data).format("DD.MM.YYYY") }}</span>
			</template>
			<template v-slot:datacolumn-consentStatus="{ data: status }">
				<span class="text-content">
					<base-icon
						v-if="status === 'ok'"
						source="custom"
						icon="doublecheck"
						color="var(--color-success)"
					/>

					<base-icon
						v-else-if="status === 'parentsAgreed'"
						source="material"
						icon="check"
						color="var(--color-warning)"
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
					:to="`/administration/students/${data}/edit`"
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
				schoolInternallyManaged && this.$_userHasPermission('STUDENT_CREATE')
			"
			position="bottom-right"
			:show-label="true"
			:actions="[
				{
					label: $t('pages.administration.students.fab.add'),
					icon: 'person_add',
					'icon-source': 'material',
					to: '/administration/students/new',
				},
				{
					label: $t('pages.administration.students.fab.import'),
					icon: 'backup',
					'icon-source': 'material',
					href: '/administration/students/import',
				},
			]"
		/>
	</section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import BackendDataTable from "@components/organisms/DataTable/BackendDataTable";
import FabFloating from "@components/molecules/FabFloating";
import DataFilter from "@components/organisms/DataFilter/DataFilter";
import AdminTableLegend from "@components/molecules/AdminTableLegend";
import BaseInput from "../../../components/base/BaseInput/BaseInput";
import { studentFilter } from "@utils/adminFilter";
import print from "@mixins/print";
import UserHasPermission from "@/mixins/UserHasPermission";
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	components: {
		DataFilter,
		BackendDataTable,
		FabFloating,
		AdminTableLegend,
		BaseInput,
	},
	mixins: [print, UserHasPermission],
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},

	data() {
		return {
			something: [],
			currentFilterQuery: this.$uiState.get(
				"filter",
				"pages.administration.students.index"
			),
			page:
				this.$uiState.get("pagination", "pages.administration.students.index")
					.page || 1,
			limit:
				this.$uiState.get("pagination", "pages.administration.students.index")
					.limit || 25,
			sortBy:
				this.$uiState.get("sorting", "pages.administration.students.index")
					.sortBy || "firstName",
			sortOrder:
				this.$uiState.get("sorting", "pages.administration.students.index")
					.sortOrder || "asc",
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
					field: "_id",
					label: "",
				},
			],
			tableActions: [
				{
					label: this.$t(
						"pages.administration.students.index.tableActions.consent"
					),
					icon: "check",
					"icon-source": "material",
					action: this.handleBulkConsent,
				},
				{
					label: this.$t(
						"pages.administration.students.index.tableActions.email"
					),
					icon: "mail_outline",
					"icon-source": "material",
					action: this.handleBulkEMail,
				},
				{
					label: this.$t("pages.administration.students.index.tableActions.qr"),
					"icon-source": "fa",
					icon: "qrcode",
					action: this.handleBulkQR,
				},
				{
					label: this.$t(
						"pages.administration.students.index.tableActions.delete"
					),
					icon: "delete_outline",
					"icon-source": "material",
					action: this.handleBulkDelete,
					permission: "STUDENT_DELETE",
				},
			],
			tableSelection: [],
			tableSelectionType: "inclusive",
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.students.index.title"),
				},
			],
			icons: [
				{
					icon: "doublecheck",
					color: "var(--color-success)",
					style: "margin: -3px 3px",
					label: this.$t("pages.administration.students.legend.icon.success"),
				},
				{
					icon: "check",
					color: "var(--color-warning)",
					label: this.$t("pages.administration.students.legend.icon.warning"),
				},
				{
					icon: "clear",
					color: "var(--color-danger)",
					label: this.$t("pages.administration.students.legend.icon.danger"),
				},
			],
			filters: studentFilter(this),
			active: false,
			searchQuery:
				this.$uiState.get("filter", "pages.administration.students.index")
					.searchQuery || "",
		};
	},

	layout: "loggedInFull",
	meta: {
		requiredPermissions: ["STUDENT_LIST"],
	},
	computed: {
		...mapState("auth", {
			school: "school",
		}),
		...mapGetters("users", {
			students: "list",
		}),
		...mapState("users", {
			pagination: (state) =>
				state.pagination.default || { limit: 10, total: 0 },
		}),
		schoolInternallyManaged() {
			return !this.school.isExternal;
		},
		permissionFilteredTableActions() {
			return this.tableActions.filter((action) =>
				action.permission ? this.$_userHasPermission(action.permission) : true
			);
		},
		editFilteredColumns() {
			// filters edit column if school is external
			return this.school.isExternal
				? this.tableColumns.filter((col) => col.field !== "_id")
				: this.tableColumns;
		},
	},
	watch: {
		currentFilterQuery: function (query) {
			const temp = this.$uiState.get(
				"filter",
				"pages.administration.students.index"
			);

			if (temp.searchQuery) query.searchQuery = temp.searchQuery;

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
			this.$store.dispatch("users/handleUsers", {
				query,
				action: "find",
				userType: "students",
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
			this.page = 1;
			this.limit = limit;
			// save user settings in uiState
			this.$uiState.set("pagination", "pages.administration.students.index", {
				itemsPerPage: limit,
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
			// TODO: request registrationsLinks fom backend
			// route needs to be implemented!

			// const users = await this.$store.dispatch("users/find", {
			// 	qid: "qr-print",
			// 	query: this.getQueryForSelection(rowIds, selectionType),
			// });
			// this.$_printQRs(
			// 	usersWithoutConsents.map((user) => ({
			// 		qrContent: user.registrationLink.shortLink,
			// 		title: user.fullName || `${user.firstName} ${user.lastName}`,
			// 		description: "Zum Registrieren bitte den Link öffnen.",
			// 	}))
			// );

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
						userType: "students",
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

			this.$uiState.set("filter", "pages.administration.students.index", {
				query,
			});

			setTimeout(() => {
				this.$store.dispatch("users/handleUsers", {
					query,
					action: "find",
					userType: "students",
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
