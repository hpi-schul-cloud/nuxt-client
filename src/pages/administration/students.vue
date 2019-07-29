<script>
import { mapGetters, mapState } from "vuex";

export default {
	data: () => ({
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
				label: "E-Mail versenden, um Einverständniserklärung einholen",
			},
			{
				label: "Link-Druckbogen erstellen",
			},
		],
	}),
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
	},
	created() {
		this.find();
	},
	methods: {
		find() {
			const query = {
				$limit: this.perPage,
				$skip: this.currentPage * this.perPage - this.perPage,
				$sort: {},
				// $skip: 25 * (this.pagination.currentPage - 1),
			};

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

			this.$store.dispatch("users/findAdmin", {
				query,
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

<template>
	<section class="section">
		<h1>Schüler Verwaltung</h1>
		<base-table
			v-if="pagination"
			v-slot:default="slotProps"
			:filters="filters"
			:filters-selected.sync="filtersSelected"
			:data="students"
			:per-page="perPage"
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
			<base-icon
				source="material"
				icon="delete"
				class="cursor-pointer"
				@click.native="deleteTeam(slotProps._id)"
			/>
		</base-table>
	</section>
</template>
