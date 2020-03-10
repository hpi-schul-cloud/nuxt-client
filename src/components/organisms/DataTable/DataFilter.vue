<template>
	<div>
		<filter-menu
			v-model="activeFiltersProxy"
			:filters="filters"
			v-on="$listeners"
		/>
	</div>
</template>

<script>
import camelCase from "lodash/camelCase";
import FilterMenu from "./FilterMenu.vue";
import { getValueByPath, getNestedObjectValues } from "@utils/helpers";
import defaultFiltersMixin from "@mixins/defaultFilters";
import { supportedFilterTypes } from "@mixins/defaultFilters";
import { supportedFilterMatchingTypes } from "@mixins/defaultFilters";

export default {
	components: {
		FilterMenu,
	},
	mixins: [defaultFiltersMixin],
	props: {
		filters: {
			type: Array,
			default: () => [],
			validator: function(filters) {
				return filters.every((filter) => {
					const hasValidType =
						!!filter.type && supportedFilterTypes.includes(filter.type);

					var hasValidMatchingType = false;

					if (
						!supportedFilterMatchingTypes[filter.type] &&
						!filter.matchingType
					) {
						hasValidMatchingType = true;
					} else if (
						supportedFilterMatchingTypes[filter.type] &&
						filter.matchingType &&
						supportedFilterMatchingTypes[filter.type][filter.matchingType.value]
					) {
						hasValidMatchingType = true;
					} else if (
						filter.matchingType &&
						filter.matchingType.implementation &&
						filter.matchingType.value &&
						filter.matchingType.label
					) {
						hasValidMatchingType = true;
					}

					const isValidSelectFilter =
						filter.value &&
						Array.isArray(filter.value) &&
						filter.value.length > 0 &&
						filter.value.every((value) => value.value && value.label);

					return (
						filter.label &&
						(filter.attribute || filter.type == "fulltextSearch") &&
						hasValidType &&
						hasValidMatchingType &&
						(isValidSelectFilter || filter.type !== "select")
					);
				});
			},
		},
		activeFilters: {
			type: Array,
			default: () => [],
		},
		data: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			localActiveFilters: undefined,
		};
	},
	computed: {
		activeFiltersProxy: {
			get() {
				return this.localActiveFilters || this.activeFilters;
			},
			set(to) {
				this.localActiveFilters = to;
				this.$emit("update:active-filters", to);
				this.$emit("update:filtered-data", this.filteredData);
			},
		},
		filteredData() {
			return this.data.filter((row) => {
				return this.activeFiltersProxy.every((filter) => {
					if (filter.type === "fulltextSearch") {
						return getNestedObjectValues(row).some((value) =>
							(value.toString() || "").includes(filter.value)
						);
					} else {
						const functionName = camelCase(
							`filter-${filter.type}-${(filter.matchingType || {}).value}`
						);
						const defaultFunctionName = camelCase(
							`filter-${filter.type}-default`
						);
						const filterFunction =
							(filter.matchingType || {}).implementation ||
							this[functionName] ||
							this[defaultFunctionName];
						return filterFunction(
							getValueByPath(row, filter.attribute),
							filter.value
						);
					}
				});
			});
		},
	},
	watch: {
		activeFilters(to) {
			this.localActiveFilters = to;
		},
	},
};
</script>
