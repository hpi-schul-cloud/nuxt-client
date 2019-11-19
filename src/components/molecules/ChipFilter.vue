<template>
	<div class="container">
		<base-chip
			v-for="(tag, idx) in options"
			:key="tag"
			:selected="setSelected(tag, idx) ? true : false"
			size="medium"
			@click="set(idx)"
			>{{ tag }}</base-chip
		>
	</div>
</template>

<script>
import BaseChip from "@components/base/BaseChip";

export default {
	components: {
		BaseChip,
	},
	props: {
		value: {
			type: [String, Number, Array, Object],
			default: () => [],
		},
		multiple: {
			type: Boolean,
		},
		options: {
			type: [Array, String],
			default: () => [],
		},
	},
	data() {
		return {
			activeFilters: [],
		};
	},
	watch: {
		value(to) {
			this.activeFilters = to;
		},
	},
	created() {
		this.activeFilters = this.value;
	},
	methods: {
		set(idx) {
			switch (this.multiple) {
				case false:
					this.$emit("update:value", this.options[idx]);
					break;
				case true:
					const tagIdx = this.value.indexOf(this.options[idx]);
					this.value.find((tag) => tag === this.options[idx])
						? this.activeFilters.splice(tagIdx, 1)
						: this.activeFilters.push(this.options[idx]);
					this.$emit("update:value", this.activeFilters);
					break;
			}
		},
		setSelected(tag) {
			if (!this.multiple) {
				return this.value === tag;
			} else if (this.multiple) {
				return this.activeFilters.indexOf(tag) >= 0 ? true : false;
			}
		},
	},
};
</script>
