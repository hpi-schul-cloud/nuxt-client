<template>
	<div>
		<filter-ui
			:filter="filters"
			:active-filters.sync="activeFiltersProxy"
			:parser="parser"
			:query="query"
			@newQuery="setNewQuery"
		/>
	</div>
</template>

<script>
import FilterUi from "../FilterUI";
import { parser } from "../FilterUI";

export default {
	components: {
		FilterUi,
	},
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		backendFiltering: {
			type: Boolean,
		},
		filters: {
			type: Array,
			required: true,
		},
		query: {
			type: [Object, String],
			required: true,
		},
		activeFilters: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			parser: parser.FeathersJS,
			localQuery: undefined,
			localActiveFilters: undefined,
		};
	},
	computed: {
		filteredData() {
			// ToDo implement data filtering correctly
			if (!this.backendFiltering) {
				return this.data.filter((row) =>
					this.activeFiltersProxy.every((filter) => {
						switch (filter.operator) {
							case "<": {
								if (filter.applyNegated) {
									return row[filter.attribute] >= filter.value;
								}
								return row[filter.attribute] < filter.value;
							}
							case "<=": {
								if (filter.applyNegated) {
									return row[filter.attribute] > filter.value;
								}
								return row[filter.attribute] <= filter.value;
							}
							case "includes": {
								if (filter.applyNegated) {
									return !row[filter.attribute]
										.toString()
										.includes(filter.value);
								}
								return row[filter.attribute].toString().includes(filter.value);
							}
							default: {
								if (filter.applyNegated) {
									return row[filter.attribute] !== filter.value;
								}
								return row[filter.attribute] === filter.value;
							}
						}
					})
				);
			}
			return this.data;
		},
		queryProxy: {
			get() {
				return this.localQuery || this.query;
			},
			set(to) {
				this.localQuery = to;
				this.$emit("update:query", to);
				if (!this.backendFiltering) {
					this.$emit("update:filtered-data", this.filteredData);
				}
			},
		},
		activeFiltersProxy: {
			get() {
				return this.localActiveFilters || this.activeFilters;
			},
			set(to) {
				this.localActiveFilters = to;
				this.$emit("update:active-filters", to);
				if (!this.backendFiltering) {
					this.$emit("update:filtered-data", this.filteredData);
				}
			},
		},
	},
	watch: {
		activeFilters(to) {
			this.activeFiltersProxy = to;
		},
	},
	methods: {
		setNewQuery(newQuery) {
			this.queryProxy = newQuery;
		},
	},
};
</script>
