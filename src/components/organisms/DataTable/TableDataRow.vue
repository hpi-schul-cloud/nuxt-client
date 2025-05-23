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
@use "sass:map";
@use "@/styles/settings.scss" as *;

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
}
</style>
