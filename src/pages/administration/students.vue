<!-- eslint-disable max-lines -->
<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.index.title") }}
		</h1>
		<backend-data-table
			:actions="tableActions"
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
			@update:current-page="onUpdateCurrentPage"
			@update:rows-per-page="onUpdateRowsPerPage"
		>
			<template v-slot:datacolumn-createdAt="{ data }">
				{{ dayjs(data).format("DD.MM.YYYY") }}
			</template>
			<template v-slot:datacolumn-consent-consentStatus="{ data }">
				<span v-if="data === 'ok'">
					<base-icon
						source="material"
						icon="check"
						color="var(--color-success)"
					/>
					<base-icon
						style="position: relative; left: -17.5px"
						source="material"
						icon="check"
						color="var(--color-success)"
					/>
				</span>
				<span v-else-if="data === 'parentsAgreed'">
					<base-icon
						source="material"
						icon="check"
						color="var(--color-warning)"
					/>
				</span>
				<span v-else-if="data === 'missing'">
					<base-icon
						source="material"
						icon="close"
						color="var(--color-danger)"
					/>
				</span>
			</template>
			<template v-slot:datacolumn-_id="{ data }">
				<base-button
					design="text icon"
					size="small"
					:to="`/administration/students/${data}/edit`"
				>
					<base-icon source="material" icon="edit" />
				</base-button>
			</template>
		</backend-data-table>
		<styled-footer />
		<fab-floating
			position="bottom-right"
			:show-label="true"
			:actions="[
				{
					label: $t('pages.administration.students.fab.add'),
					icon: 'person_add',
					'icon-source': 'material',
					href: '/administration/students/new',
				},
				{
					label: $t('pages.administration.students.fab.import'),
					icon: 'arrow_downward',
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
import StyledFooter from "@components/organisms/Administration/StyledFooter";
import print from "@mixins/print";
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	layout: "loggedInFull",
	components: {
		BackendDataTable,
		FabFloating,
		StyledFooter,
	},
	mixins: [print],
	data() {
		return {
			currentQuery: {}, // if filters are implemented, the current filter query needs to be in this prop, otherwise the actions will not work
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
			tableColumns: [
				{
					field: "firstName",
					label: this.$t("common.labels.firstName"),
					sortable: true,
				},
				{
					field: "lastName",
					label: this.$t("common.labels.lastName"),
				},
				{
					field: "email",
					label: this.$t("common.labels.email"),
				},
				// {
				// 	field: "birthday",
				// 	label: this.$t("common.labels.birthday"),
				// },
				{
					field: "consent.consentStatus",
					label: this.$t("common.labels.consent"),
				},
				{
					field: "createdAt",
					label: this.$t("common.labels.createdAt"),
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
				},
			],
			tableSelection: [],
			tableSelectionType: "inclusive",
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t("pages.administration.students.index.title"),
				},
			],
		};
	},
	computed: {
		...mapGetters("users", {
			students: "list",
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
			};

			this.$store.dispatch("users/findStudents", {
				query,
			});
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
				message = `Bist du sicher, dass du diese(n) ${rowIds.length} Schüler löschen möchtest?`;
			} else {
				if (rowIds.length) {
					message = `Bist du sicher, dass du alle Schüler bis auf ${rowIds.length} löschen möchtest?`;
				} else {
					message = `Bist du sicher, dass du alle Schüler löschen möchtest?`;
				}
			}
			this.$dialog.confirm({
				message,
				confirmText: "Schüler löschen",
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
