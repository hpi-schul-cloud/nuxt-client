<template>
	<tr class="row">
		<th v-if="allRowsSelectable">
			<base-input
				v-model="selectionStatus"
				type="checkbox"
				label="Alle Zeilen auswählen"
				:label-hidden="true"
				class="select"
			/>
		</th>
		<th
			v-for="(column, index) in columns"
			:key="index"
			:class="{
				'is-current-sort': sortBy === column.field,
				'is-sortable': column.sortable,
			}"
			cellspacing="0"
		>
			<BaseButton
				v-if="column.sortable"
				design="none"
				class="th-wrap"
				@click.stop="sort(column)"
			>
				<span>{{ column.label }}</span>
				<base-icon
					v-if="sortBy === column.field"
					:icon="sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'"
					source="material"
				/>
			</BaseButton>
			<div v-else class="th-wrap">
				<span>{{ column.label }}</span>
			</div>
		</th>
	</tr>
</template>

<script>
import BaseButton from "@basecomponents/BaseButton";

export default {
	props: {
		allRowsSelectable: Boolean,
		allRowsSelected: Boolean,
		columns: {
			type: Array,
			default: () => [],
		},
		sortBy: {
			type: String,
			default: "",
		},
		sortOrder: {
			type: String,
			default: "asc",
			validator: (val) => ["asc", "desc"].includes(val),
		},
	},
	computed: {
		selectionStatus: {
			get() {
				return this.allRowsSelected;
			},
			set(state) {
				this.$emit("update:allRowsSelected", state);
			},
		},
	},
	methods: {
		getColumnWrapperComponent(column) {
			return column.sortable ? BaseButton : "div";
		},
		invertSortOrder(currentOrder) {
			return currentOrder === "desc" ? "asc" : "desc";
		},
		sort(column) {
			// invert sort order if clicked again
			const newSortOrder =
				column.field === this.sortBy
					? this.invertSortOrder(this.sortOrder)
					: "asc";
			/**
			 * will toggle if a new sort is requested by the user
			 *
			 * @event update:sort
			 * @type {String} contains the field value of the selected column
			 * @type {String} represent the new desired sort order ("asc" or "desc")
			 */
			this.$emit("update:sort", column.field, newSortOrder);
			/**
			 * helper event for the .sync modifier
			 *
			 * @event update:sortBy
			 * @type {String} contains the field value of the selected column
			 */
			this.$emit("update:sortBy", column.field);
			/**
			 * helper event for the .sync modifier
			 *
			 * @event update:sortOrder
			 * @type {String} represent the new desired sort order ("asc" or "desc")
			 */
			this.$emit("update:sortOrder", newSortOrder);
		},
	},
};
</script>

<style lang="scss" scoped>
.row {
	font-weight: var(--font-weight-bold);
	th {
		border-bottom: calc(2 * var(--border-width)) solid var(--color-gray);
		opacity: 0.75;
		&.is-current-sort {
			opacity: 1;
		}
		.th-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: var(--space-sm);
			font-weight: var(--font-weight-bold);
		}

		.select {
			margin-bottom: 0;
		}
	}
}
</style>
