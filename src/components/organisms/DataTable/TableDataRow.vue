<template>
	<tr
		:class="{
			row: true,
			selected,
			highlight: Boolean((rowindex + 1) % 2),
		}"
	>
		<td v-if="selectable">
			<base-input
				v-model="selectionStatus"
				type="checkbox"
				:label="`Zeile ${rowindex + 1} auswählen`"
				:label-hidden="true"
				class="select"
			/>
		</td>
		<td v-for="(fieldData, index) in rowData" :key="index">
			<slot :name="`column-${index}`" :data="fieldData">
				{{ fieldData }}
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
	},
};
</script>

<style lang="scss" scoped>
.row {
	background-color: var(--color-white);
	&.selected {
		background-color: var(--color-info-light);
	}
	&.highlight {
		background-color: var(--color-gray-light);
	}

	td {
		padding: var(--space-xs);
		.select {
			margin-bottom: 0;
		}
	}
}
</style>
