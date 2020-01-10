<template>
	<div class="filter-menu">
		<base-icon icon="filter_list" source="material" class="ml--md mr--md" />
		<base-select
			:allow-empty="false"
			close-on-select
			label="Filter hinzufügen"
			:multiple="true"
			placeholder="Filter hinzufügen"
			:options="filters"
			option-label="label"
			:taggable="true"
			:tag-placeholder="`Volltextsuche`"
			track-by="label"
			:value="selectedFilters"
			@select="selectFilter"
			@tag="setSearch"
		>
			<template v-slot:tag="slotProps">
				<span class="multiselect__tag">
					<span @mousedown.prevent="editFilter(slotProps.option)">
						{{ slotProps.option.tagLabel }}
					</span>
					<i
						aria-hidden="true"
						tabindex="0"
						class="multiselect__tag-icon"
						@keypress.enter.prevent="removeFilter(slotProps.option)"
						@mousedown.prevent="removeFilter(slotProps.option)"
					></i>
				</span>
			</template>
		</base-select>

		<filter-modal
			:active="editFilterActive"
			:filter-opened="filterOpened"
			@set-filter="setFilter"
		/>
	</div>
</template>

<script>
import FilterModal from "./FilterModal.vue";
export default {
	components: {
		FilterModal,
	},
	props: {
		filters: {
			type: Array,
			default: () => [],
		},
		value: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			editFilterActive: false,
			filterOpened: {},
			selectedFilters: this.value,
		};
	},
	watch: {
		value() {
			this.selectedFilters = this.value;
		},
	},
	methods: {
		setSearch(searchString) {
			const fulltextSearchQuery = this.selectedFilters.find(
				(filter) => filter.label === "Volltextsuche"
			);
			if (fulltextSearchQuery) {
				fulltextSearchQuery.value = searchString;
				fulltextSearchQuery.tagLabel = `Volltextsuche nach: ${searchString}`;
			} else {
				this.setFilter({
					label: "Volltextsuche",
					tagLabel: `Volltextsuche nach: ${searchString}`,
					type: "fulltextSearch",
					value: searchString,
				});
			}
			this.$emit("input", this.selectedFilters);
		},
		editFilter(filter) {
			this.editFilterActive = true;
			this.filterOpened = filter;
			this.$emit("input", this.selectedFilters);
		},
		removeFilter(filter) {
			this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
			this.$emit("input", this.selectedFilters);
		},
		selectFilter(filter) {
			this.$set(filter, "selected", true);
			this.filterOpened = filter;
			this.editFilterActive = true;
		},
		setFilter(filterData) {
			const isNewFilter = !this.selectedFilters.some(
				(f) => f.label === filterData.label
			);
			const filter = isNewFilter
				? JSON.parse(JSON.stringify(filterData))
				: filterData;

			if (["date", "number", "text"].includes(filter.type)) {
				filter.tagLabel = `${filter.label} ${filter.matchingType.label} ${filter.value}`;
			} else if (filter.type === "fulltextSearch") {
				filter.tagLabel = `${filter.label} nach: ${filter.value}`;
			} else if (filter.type === "select") {
				filter.tagLabel = filter.label + ": ";
				if (filter.multiple) {
					let activeOptions = filter.value.filter((f) => f.checked);
					activeOptions = activeOptions.map((f) => f.label);
					filter.tagLabel += activeOptions.join(", ");
				}
			}

			if (isNewFilter) {
				this.selectedFilters.push(filter);
			} else {
				this.selectedFilters = this.selectedFilters.map((f) => {
					if (f.label === filter.label) {
						f.value = filter.value;
					}
					return f;
				});
			}
			this.filterOpened = {};
			this.editFilterActive = false;
			this.$emit("input", this.selectedFilters);
		},
	},
};
</script>

<style lang="scss" scoped>
.filter-menu {
	display: flex;
	flex-flow: row;
	align-items: center;
	.wrapper {
		margin-bottom: 0;
	}
}
</style>
