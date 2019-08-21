<!-- eslint-disable max-lines -->

<template>
	<section class="section">
		<h1>Schüler Verwaltung</h1>
		<base-table
			v-if="pagination"
			:filters="filters"
			:filters-selected.sync="filtersSelected"
			:data="students"
			:per-page.sync="perPage"
			:actions="actions"
			:current-page.sync="currentPage"
			:total="pagination.total"
			:columns="columns"
			paginated
			filterable
			checkable
			backend-sorting
			backend-pagination
			@sort="onSort"
			@update:skip="onPageChange"
		>
			<template v-slot:column="{ row, column }">
				<span v-if="column.field === 'classes'">
					{{ row.classes.join(", ") }}
				</span>
				<span v-else-if="column.field === 'createdAt'">
					{{ dayjs(row.createdAt).format("DD.MM.YYYY") }}
				</span>
				<div v-else-if="column.field === 'consent.consentStatus'">
					<span v-if="row.consent.consentStatus === 'ok'">
						<base-icon source="material" icon="check" />
						<base-icon
							style="position: relative; left: -10px"
							source="material"
							icon="check"
						/>
					</span>
					<span v-else-if="row.consent.consentStatus === 'parentsAgreed'">
						<base-icon source="material" icon="check" />
					</span>
					<span v-else-if="row.consent.consentStatus === 'missing'">
						<base-icon source="material" icon="close" />
					</span>
				</div>
				<span v-else>
					{{ getValueByPath(row, column.field) }}
				</span>
			</template>
			<template v-slot:extra-column="{ row }">
				<base-icon
					source="material"
					icon="delete"
					class="cursor-pointer"
					@click.native="deleteEntity(row._id)"
				/>
			</template>
		</base-table>
	</section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getValueByPath } from "@utils/helpers";
import dayjs from "dayjs";
import "dayjs/locale/de";
dayjs.locale("de");

export default {
	layout: "full-width",
	data() {
		return {
			total: 0,
			loading: false,
			currentPage: 1,
			perPage: 10,
			sortField: "firstName",
			sortOrder: "asc",
			defaultSortOrder: "asc",
			filtersSelected: [],
			filters: [
				{
					label: "Vorname",
					type: "string",
					property: "firstName",
					matchingType: {
						value: "contains",
						label: "enthält",
					},
					value: "",
				},
				{
					label: "Einverständniserklärung Status",
					type: "select",
					property: "consentStatus",
					multiple: true,
					options: [
						{
							label: "Alle Zustimmungen vorhanden",
							value: "ok",
							checked: false,
						},
						{
							label: "Keine Einverständniserklärung vorhanden",
							value: "missing",
							checked: false,
						},
						{
							label: "Eltern haben zugestimmt (oder Schüler ist über 16)",
							value: "parentsAgreed",
							checked: false,
						},
					],
				},
			],
			columns: [
				{
					field: "firstName",
					label: "Vorname",
					sortable: true,
				},
				{
					field: "lastName",
					label: "Nachname",
					sortable: true,
				},
				{
					field: "email",
					label: "E-Mail-Adresse",
					sortable: true,
				},
				{
					field: "classes",
					label: "Klasse(n)",
				},
				{
					field: "consent.consentStatus",
					label: "Einwilligung",
				},
				{
					field: "createdAt",
					label: "Erstellt am",
					sortable: true,
				},
			],
			actions: [
				{
					label: "Löschen",
					action: this.deleteMany,
				},
			],
		};
	},
	computed: {
		...mapState("users", {
			pagination: (state) => state.pagination.default,
		}),
		...mapGetters("users", {
			students: "list",
		}),
	},
	watch: {
		filtersSelected() {
			this.find();
		},
		currentPage() {
			this.find();
		},
		perPage() {
			this.find();
		},
	},
	created() {
		this.find();
	},
	methods: {
		dayjs,
		getValueByPath,
		find() {
			const query = {
				$skip: this.currentPage * this.perPage - this.perPage,
				$sort: {},
			};

			query.$limit = this.perPage;

			if (this.filtersSelected && this.filtersSelected.length > 0) {
				for (const filter of this.filtersSelected) {
					if (filter.type === "string") {
						if (filter.matchingType.value === "equals") {
							query[filter.property] = filter.value;
						} else if (filter.matchingType.value === "contains") {
							query[filter.property] = {
								$search: filter.value,
							};
						}
					} else if (filter.type === "regex") {
						query.$or = [
							{ email: { $search: filter.value } },
							{ firstName: { $search: filter.value } },
							{ lastName: { $search: filter.value } },
						];
					} else if (filter.type === "select") {
						if (filter.multiple) {
							let activeOptions = filter.options.filter((f) => f.checked);
							activeOptions = activeOptions.map((f) => f.value);
							query[filter.property] = {
								$in: activeOptions,
							};
						}
					}
				}
			}

			if (this.sortField) {
				query.$sort[this.sortField] = this.sortOrder === "asc" ? 1 : -1;
			}

			this.$store.dispatch("users/adminFind", {
				query,
			});
		},
		deleteEntity(id) {
			this.$dialog.confirm({
				title: "User löschen",
				message: "Möchtest du diesen User wirklich löschen?",
				confirmText: "User löschen",
				onConfirm: async () => {
					try {
						await this.$store.dispatch("users/remove", id);
						this.$toast.success("User erfolgreich gelöscht!");
						this.find();
					} catch (e) {
						this.$toast.error("Fehler beim Löschen des Users.");
					}
				},
			});
		},
		deleteMany(rows) {
			const ids = rows.map((r) => r._id);
			this.$dialog.confirm({
				title: "User löschen",
				message: "Möchtest du diese User wirklich löschen?",
				confirmText: "User löschen",
				onConfirm: async () => {
					try {
						for (const id of ids) {
							await this.$store.dispatch("users/remove", id);
						}
						this.$toast.success("Ausgewählte User erfolgreich gelöscht!");
						this.find();
					} catch (e) {
						this.$toast.error("Fehler beim Löschen der User.");
					}
				},
			});
		},
		onPageChange(skip) {
			this.skip = skip;
			this.find();
		},
		onSort(field, order) {
			this.sortField = field;
			this.sortOrder = order;
			this.find();
		},
	},
};
</script>
