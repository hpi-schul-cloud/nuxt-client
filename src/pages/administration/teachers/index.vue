<!-- eslint-disable max-lines -->
<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.teachers.index.title") }}
		</h1>
		<backend-data-table
			:actions="tableActions"
			:columns="tableColumns"
			:current-page.sync="page"
			:data="teachers"
			:paginated="true"
			:total="pagination.total"
			:rows-per-page.sync="limit"
			:rows-selectable="true"
			track-by="id"
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
				{{ dayjs(data).format("DD.MM.YYYY") }}
			</template>
			<template v-slot:datacolumn-consent="{ data }">
				<span v-if="data && data.consentStatus === 'ok'">
					<base-icon
						source="material"
						icon="check"
						color="var(--color-success)"
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

			<template v-slot:datacolumn-_id="{ data }">
				<base-button
					design="text icon"
					size="small"
					:to="`/administration/teachers/${data}/edit`"
				>
					<base-icon source="material" icon="edit" />
				</base-button>
			</template>
		</backend-data-table>
		<admin-table-legend :icons="icons" :show-external-sync-hint="true" />
		<fab-floating
			v-if="this.$_userHasPermission('TEACHER_CREATE')"
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
					icon: 'arrow_downward',
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
import print from "@mixins/print";
import UserHasPermission from "@/mixins/UserHasPermission";
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");
export default {
	layout: "loggedInFull",
	components: {
		BackendDataTable,
		AdminTableLegend,
		FabFloating,
	},
	mixins: [print, UserHasPermission],
	props: {
		showExternalSyncHint: {
			type: Boolean,
		},
	},

	data() {
		return {
			currentQuery: {}, // if filters are implemented, the current filter query needs to be in this prop, otherwise the actions will not work
			page:
				parseInt(
					localStorage.getItem(
						"pages.administration.teachers.index.currentPage"
					)
				) || 1,
			limit:
				parseInt(
					localStorage.getItem(
						"pages.administration.teachers.index.itemsPerPage"
					)
				) || 10,
			sortBy: "firstName",
			sortOrder: "asc",
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
						"pages.administration.teachers.index.tableActions.consent"
					),
					icon: "check",
					"icon-source": "material",
					action: this.handleBulkConsent,
				},
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
				},
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
		};
	},
	computed: {
		...mapGetters("users", {
			teachers: "list",
		}),
		...mapState("users", {
			pagination: (state) =>
				state.pagination.default || { limit: 10, total: 0 },
		}),
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
			};
			this.$store.dispatch("users/findTeachers", {
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
				"pages.administration.teachers.index.currentPage",
				page
			);
			this.find();
		},
		onUpdateRowsPerPage(limit) {
			this.page = 1;
			this.limit = limit;
			// save user settings in localStorage
			localStorage.setItem(
				"pages.administration.teachers.index.itemsPerPage",
				limit
			);
			this.find();
		},
		dayjs,
		getQueryForSelection(rowIds, selectionType) {
			return {
				...this.currentQuery,
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

		handleBulkDelete(rowIds, selectionType) {
			const onConfirm = async () => {
				try {
					await this.$store.dispatch("users/remove", {
						query: this.getQueryForSelection(rowIds, selectionType),
					});
					this.$toast.success("Ausgewählte Nutzer gelöscht");
				} catch (error) {
					this.$toast.error("Löschen der Nutzer fehlgeschlagen");
				}
			};
			const onCancel = () => {
				this.$set(this, "tableSelection", []);
				this.tableSelectionType = "inclusive";
			};
			let message;
			if (selectionType === "inclusive") {
				message = `Bist du sicher, dass du diese(n) ${rowIds.length} Lehrer:in löschen möchtest?`;
			} else {
				if (rowIds.length) {
					message = `Bist du sicher, dass du alle Lehrer:innen bis auf ${rowIds.length} löschen möchtest?`;
				} else {
					message = `Bist du sicher, dass du alle Lehrer:innen löschen möchtest?`;
				}
			}
			this.$dialog.confirm({
				message,
				confirmText: "Lehrer:in löschen",
				cancelText: "Abbrechen",
				icon: "report_problem",
				iconSource: "material",
				iconColor: "var(--color-danger)",
				actionDesign: "danger",
				onConfirm,
				onCancel,
				invertedDesign: true,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

tr {
	// handle style in a selected table row
	&.selected .is-text {
		color: var(--color-white);

		&:hover {
			background-color: var(--color-tertiary-dark);
			box-shadow: none;
		}
	}
	// handle style in a highlight table row
	&.highlight .is-text:hover {
		background-color: var(--color-white);
		box-shadow: none;
	}
}
</style>
