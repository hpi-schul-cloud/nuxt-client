<template>
	<div class="filter-menu">
		<base-icon icon="filter_list" source="material" class="ml--md mr--md" />
		<base-select
			close-on-select
			label="Filter hinzufügen"
			label-hidden
			:value="value"
			:options="filters"
			placeholder="Filter hinzufügen"
			:allow-empty="false"
			:multiple="true"
			:taggable="true"
			track-by="label"
			:tag-placeholder="`Volltextsuche`"
			option-label="label"
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
		filtersSelected: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			editFilterActive: false,
			filterOpened: {},
		};
	},
	methods: {
		setSearch(val) {
			if (this.value.some((f) => f.label === "Volltextsuche")) {
				this.value = this.value.map((f) => {
					if (f.label === "Volltextsuche") {
						f.value = val;
						f.tagLabel = "Volltextsuche nach: " + val;
					}
					return f;
				});
			} else {
				this.setFilter({
					label: "Volltextsuche",
					tagLabel: "Volltextsuche nach: " + val,
					type: "fulltextSearch",
					value: val,
				});
			}
			this.$emit("input", this.value);
		},
		editFilter(filter) {
			this.editFilterActive = true;
			this.filterOpened = filter;
			this.$emit("input", this.value);
		},
		removeFilter(filter) {
			this.value.splice(this.value.indexOf(filter), 1);
			this.$emit("input", this.value);
		},
		selectFilter(filter) {
			this.$set(filter, "selected", true);
			this.filterOpened = filter;
			this.editFilterActive = true;
		},
		setFilter(filterData) {
			const isNewFilter = !this.value.some((f) => f.label === filterData.label);

			const filter = isNewFilter
				? JSON.parse(JSON.stringify(filterData))
				: filterData;

			if (filter.type === "string") {
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
				this.value.push(filter);
			} else {
				this.value = this.value.map((f) => {
					if (f.label === filter.label) {
						f.value = filter.value;
					}
					return f;
				});
			}
			this.filterOpened = {};
			this.editFilterActive = false;
			this.$emit("input", this.value);
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
