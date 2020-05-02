<template>
	<tr
		:class="{
			row: true,
			selected,
			highlight: isHighlighted,
			mobile: $mq === 'mobile',
		}"
	>
		<td v-if="selectable && $mq !== 'mobile'">
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
		<template v-if="$mq === 'mobile'">
			<component :is="componentTableCard" :key="index" :field-data="rowData" />
		</template>
		<template v-else>
			<td v-for="(fieldData, index) in rowData" :key="index">
				<slot
					:name="`datacolumn-${columnKeys[index].replace(/\./g, '-')}`"
					:data="fieldData"
					:selected="selected"
					:highlighted="isHighlighted"
				>
					<div class="text-content">
						{{ fieldData }}
					</div>
				</slot>
			</td>
		</template>
	</tr>
</template>

<script>
import { getValueByPath } from "@utils/helpers";
import TableCard from "@components/organisms/DataTable/TableCard";

export default {
	components: {},
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
		componentTableCard: {
			type: Object,
			default: () => TableCard,
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
.row {
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
		background-color: var(--color-tertiary-light);
		border-top: 1px solid var(--color-white);
		border-bottom: 1px solid var(--color-white);
	}
	&.mobile {
		border-collapse: separate;
		border: 1rem solid white;
	}

	td {
		padding: 0;
		vertical-align: middle;

		.text-content {
			padding: var(--space-xs);
		}

		.select {
			margin-bottom: 0;
		}
	}
}
</style>
