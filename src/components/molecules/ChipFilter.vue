<template>
	<div class="container">
		<base-chip
			v-for="(tag, idx) in filterTags"
			:key="tag"
			:background-color="
				findFilterTag(idx) ? 'var(--color-secondary)' : 'var(--color-disabled)'
			"
			size="medium"
			@click="setActiveFilters(idx)"
			>{{ tag }}</base-chip
		>
		<div>
			<base-chip
				v-for="(tag, idx) in toggleTags"
				:key="tag"
				:background-color="
					activeToggle === tag
						? 'var(--color-secondary)'
						: 'var(--color-disabled)'
				"
				size="medium"
				@click="setActiveToggle(idx)"
				>{{ tag }}</base-chip
			>
		</div>
	</div>
</template>

<script>
import BaseChip from "@components/base/BaseChip";

export default {
	components: {
		BaseChip,
	},
	props: {
		toggleTags: {
			type: Array,
			default: () => [],
		},
		filterTags: {
			type: Array,
			default: () => [],
		},
		activeToggle: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			activeFilters: [],
		};
	},
	methods: {
		setActiveFilters(idx) {
			const { activeFilters, filterTags, findFilterTag } = this;
			const activeFiltersIdx = activeFilters.indexOf(filterTags[idx]);

			findFilterTag(idx)
				? activeFilters.splice(activeFiltersIdx, 1)
				: activeFilters.push(filterTags[idx]);
		},
		findFilterTag(idx) {
			return this.activeFilters.find((tag) => tag === this.filterTags[idx]);
		},
		setActiveToggle(idx) {
			this.activeToggle = this.toggleTags[idx];
			this.$emit("update:activeToggle", this.toggleTags[idx]);
		},
	},
};
</script>
