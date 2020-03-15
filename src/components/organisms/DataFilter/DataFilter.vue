<template>
	<div>
		<vue-filter-ui
			:filter="filters"
			:parser="parser"
			:query="activeFiltersProxy"
			@newQuery="setActiveFilters"
		/>
	</div>
</template>

<script>
import VueFilterUi, { parser } from "vue-filter-ui";
import feathersQueryGenerator from "./feathersQueryGenerator";
import defaultFilters from "./defaultFilters";
import { unescape } from "lodash";

export default {
	components: {
		VueFilterUi,
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
		activeFilters: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			parser: parser.Default,
			localQuery: undefined,
			localActiveFilters: undefined,
		};
	},
	computed: {
		filteredData() {
			// ToDo implement filtering for other data types than strings
			if (!this.backendFiltering) {
				return this.data.filter((row) =>
					this.activeFiltersProxy.every((filter) => {
						if (filter.applyNegated) {
							return !defaultFilters["text"][
								unescape(filter.operator) || "default"
							](row[filter.attribute].toString(), filter.value.toString());
						}
						return defaultFilters["text"][
							unescape(filter.operator) || "default"
						](row[filter.attribute].toString(), filter.value.toString());
					})
				);
			}
			return this.data;
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
				} else {
					const feathersQuery = feathersQueryGenerator.generator(
						this.activeFilters
					);
					this.$emit("update:filter-query", feathersQuery);
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
		setActiveFilters(newQuery) {
			this.activeFiltersProxy = newQuery;
		},
	},
};
</script>
