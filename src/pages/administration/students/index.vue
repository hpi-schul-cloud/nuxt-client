<!-- eslint-disable max-lines -->
<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.index.title") }}
		</h1>

		<data-filter
			:filters="filters"
			:backend-filtering="true"
			@update:filter-query="onUpdateFilterQuery"
		/>
		<backend-data-table
			:actions="permissionFilteredTableActions"
			:columns="tableColumns"
			:current-page.sync="page"
			:data="students"
			:paginated="true"
			:rows-per-page.sync="limit"
			:rows-selectable="true"
			:total="pagination.total"
			track-by="id"
			:selected-row-ids.sync="tableSelection"
			:selection-type.sync="tableSelectionType"
			:sort-by="sortBy"
			:sort-order="sortOrder"
			@update:sort="onUpdateSort"
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template v-slot:datacolumn-createdAt="{ data }">
				{{ dayjs(data).format("DD.MM.YYYY") }}
			</template>
			<template v-slot:datacolumn-consent="{ data }">
				<span v-if="data && data.consentStatus === 'ok'">
					<base-icon
						source="custom"
						icon="doublecheck"
						color="var(--color-success)"
					/>
				</span>
				<span v-else-if="data && data.consentStatus === 'parentsAgreed'">
					<base-icon
						source="material"
						icon="check"
						color="var(--color-warning)"
					/>
				</span>
				<span v-else-if="data && data.consentStatus === 'missing'">
					<base-icon
						source="material"
						icon="close"
						color="var(--color-danger)"
					/>
				</span>
				<span v-else />
			</template>
			<template
				v-if="schoolInternallyManaged"
				v-slot:datacolumn-_id="{ data, selected, highlighted }"
			>
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
import { studentFilter } from "@utils/adminFilter";
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
		FabFloating,
		AdminTableLegend,
	},
	mixins: [print, UserHasPermission],
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},
	meta: {
		requiredPermissions: ["STUDENT_LIST"],
	},
	data() {
		return {
			currentFilterQuery: {},
			page:
				parseInt(
					localStorage.getItem(
						"pages.administration.students.index.currentPage"
					)
				) || 1,
			limit:
				parseInt(
					localStorage.getItem(
						"pages.administration.students.index.itemsPerPage"
					)
				) || 10,
			sortBy: "firstName",
			sortOrder: "asc",
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
				// {
				// 	field: "birthday",
				// 	label: this.$t("common.labels.birthday"),
				// },
				{
					field: "consent",
					label: this.$t("common.labels.consent"),
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
		};
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
			return !this.school?.ldapSchoolIdentifier && !this.school?.source;
		},
		permissionFilteredTableActions() {
			return this.tableActions.filter((action) =>
				action.permission ? this.$_userHasPermission(action.permission) : true
			);
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
			this.onUpdateCurrentPage(1); // implicitly triggers new find
		},
		onUpdateCurrentPage(page) {
			this.page = page;
			localStorage.setItem(
				"pages.administration.students.index.currentPage",
				page
			);
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			this.page = 1;
			this.limit = limit;
			// save user settings in localStorage
			localStorage.setItem(
				"pages.administration.students.index.itemsPerPage",
				limit
			);
			this.find();
		},
		dayjs,
		getQueryForSelection(rowIds, selectionType) {
			return {
				...this.currentFilterQuery,
				_id: {
					[selectionType === "inclusive" ? "$in" : "$nin"]: rowIds,
				},
			};
		},
		handleBulkConsent(rowIds, selectionType) {
			this.$toast.error(
				`handleBulkConsent([${rowIds.join(
					", "
				)}], "${selectionType}") needs implementation`,
				{ duration: 5000 }
			);
		},
		handleBulkEMail(rowIds, selectionType) {
			this.$toast.error(
				`handleBulkEMail([${rowIds.join(
					", "
				)}], "${selectionType}") needs implementation`,
				{ duration: 5000 }
			);
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
			this.$toast.error(
				`handleBulkQR([${rowIds.join(
					", "
				)}], "${selectionType}") needs implementation`,
				{ duration: 5000 }
			);
		},
		handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					await this.$store.dispatch("users/remove", {
						query: this.getQueryForSelection(rowIds, selectionType),
					});
					this.$toast.success(this.$t("pages.administration.remove.success"));
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
		onUpdateFilterQuery(query) {
			this.currentFilterQuery = query;
			this.onUpdateCurrentPage(1);
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
</style>
