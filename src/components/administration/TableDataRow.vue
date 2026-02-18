<template>
	<tr
		:class="{
			table__row: true,
			selected,
			highlight: isHighlighted,
		}"
	>
		<td v-if="selectable">
			<div data-testid="selection-column">
				<VCheckbox v-model="selectionStatus" width="45" :aria-label="`Zeile ${rowindex + 1} auswählen`" hide-details />
			</div>
		</td>
		<td v-for="(fieldData, index) in rowData" :key="index">
			<slot
				:name="`datacolumn-${columnKeys[index].replace(/\./g, '-')}`"
				:data="fieldData"
				:selected="selected"
				:highlighted="isHighlighted"
				:rowindex="rowindex"
			>
				<div class="text-content">
					{{ fieldData }}
				</div>
			</slot>
		</td>
	</tr>
</template>

<script>
import { getValueByPath } from "@/utils/helpers";

export default {
	props: {
		rowindex: {
			type: Number,
			required: true,
		},
		selectable: Boolean,
		selected: Boolean,
		columnKeys: {
			type: Array,
			default: () => [],
		},
		data: {
			type: [Array, Object],
			required: true,
		},
	},
	emits: ["update:selected"],
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		rowData() {
			if (this.data === Array) {
				return this.data;
			}
			if (this.columnKeys.length === 0) {
				throw new Error("the prop columnKeys is required if the passed in data is an object.");
			}
			return this.columnKeys.map((key) => getValueByPath(this.data, key));
		},
		selectionStatus: {
			get() {
				return this.selected;
			},
			set(state) {
				this.$emit("update:selected", state);
			},
		},
		isHighlighted() {
			return Boolean((this.rowindex + 1) % 2);
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.table__row {
	border-top: 1px solid rgba(var(--v-theme-white));
	border-bottom: 1px solid rgba(var(--v-theme-white));

	&.highlight {
		background-color: map.get($grey, lighten-4);
		border-top: 1px solid rgba(var(--v-theme-white));
		border-bottom: 1px solid rgba(var(--v-theme-white));
	}

	&.selected {
		background-color: rgba(var(--v-theme-primary), 0.12);
		border-top: 1px solid rgba(var(--v-theme-white));
		border-bottom: 1px solid rgba(var(--v-theme-white));
	}

	td:not(:first-child) {
		vertical-align: middle;
		white-space: nowrap;
		padding: 0 8px 0 16px;
	}
}
</style>
