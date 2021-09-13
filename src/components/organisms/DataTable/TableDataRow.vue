<template>
	<tr
		:class="{
			table__row: true,
			selected,
			highlight: isHighlighted,
		}"
	>
		<td v-if="selectable">
			<div class="text-content selection-column">
				<base-input
					v-model="selectionStatus"
					type="checkbox"
					:label="`Zeile ${rowindex + 1} auswählen`"
					:label-hidden="true"
					class="select"
					:color="selected ? 'currentColor' : undefined"
				/>
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
import { getValueByPath } from "@utils/helpers";

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
				throw new Error(
					"the prop columnKeys is required if the passed in data is an object."
				);
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
.table__row {
	background-color: var(--color-white);
	border-top: 1px solid var(--color-white);
	border-bottom: 1px solid var(--color-white);

	&.highlight {
		background-color: var(--color-gray-light);
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
	}
	&.selected {
		color: var(--color-on-tertiary-light);
		background-color: var(--color-secondary-light);
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
	}

	td {
		padding: 0;
		vertical-align: middle;
		.text-content {
			max-width: 200px;
			padding: var(--space-xs);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.select {
			margin-bottom: 0;
		}
	}
	a.is-text {
		color: var(--color-secondary);
	}
}
</style>
