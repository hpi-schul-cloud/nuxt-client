<template>
	<div>
		<vue-filter-ui
			:label-add="$t('components.organisms.DataFilter.add')"
			:label-apply="$t('common.actions.add')"
			:label-remove="$t('common.actions.remove')"
			:label-cancel="$t('common.actions.cancel')"
			:filter="filters"
			:parser="parser"
			:query="activeFiltersProxy"
			:component-modal="DataFilterModal"
			:component-chips="DataFilterChips"
			:component-select="DataFilterSelect"
			:component-layout="DataFilterLayout"
			@newQuery="setActiveFilters"
		/>
	</div>
</template>

<script>
import VueFilterUi, { parser } from "vue-filter-ui";
import {
	defaultFilters,
	supportedFilterTypes,
	supportedOperators,
} from "./defaultFilters";
import { unescape } from "lodash";
import DataFilterModal from "./DataFilterModal";
import DataFilterLayout from "./DataFilterLayout";
import DataFilterChips from "./DataFilterChips";
import DataFilterSelect from "./DataFilterSelect";

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
			type: [Array, Object],
			default: () => [],
		},
	},
	data() {
		return {
			DataFilterModal,
			DataFilterChips,
			DataFilterSelect,
			DataFilterLayout,
			localQuery: undefined,
			localActiveFilters: undefined,
		};
	},
	computed: {
		parser() {
			return this.backendFiltering ? parser.FeathersJS : parser.Default;
		},
		filteredData() {
			// ToDo implement filtering for other data types than strings
			if (!this.backendFiltering) {
				return this.data.filter((row) =>
					this.activeFiltersProxy.every((filter) => {
						if (!filter.type || !supportedFilterTypes.includes(filter.type)) {
							// comment in this line when different filter types are supported
							// return true;
						}
						if (
							filter.operator &&
							// replace this line when other filter types than text are supported
							// !supportedOperators[filter.type].includes(filter.operator)
							!supportedOperators["text"].includes(filter.operator)
						) {
							return true;
						}
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
					this.$emit("update:filter-query", to);
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
<style lang="scss">
.layout {
	// this fixes some vuetify global styles side-effect in the filterUI
	display: block;
}
</style>
