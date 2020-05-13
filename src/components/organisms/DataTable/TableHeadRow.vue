<template>
	<fragment>
		<tr class="row">
			<th v-if="allRowsSelectable">
				<div class="th-wrap select-wrap">
					<base-input
						v-model="selectionStatus"
						type="checkbox"
						label="Alle Zeilen auswählen"
						:label-hidden="true"
						class="select"
						:show-undefined-state="true"
						style="color: var(--color-tertiary);"
					/>
				</div>
			</th>
			<th
				v-for="(column, index) in columns"
				:key="index"
				:class="{
					'is-current-sort': sortBy === column.field,
					'is-sortable': column.sortable,
					'has-second-row': column.secondRow,
				}"
				:style="[
						column.secondRow ? {
						'display': 'grid',
						'grid-template-columns': `repeat(${column.secondRow.length}, auto)`} : '',
				]"
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
						:icon="sortOrder === 'asc' ? 'sort-up' : 'sort-down'"
						source="custom"
					/>
					<base-icon v-else-if="column.sortable" icon="sort" source="custom" />
				</BaseButton>
				<div v-else class="th-wrap">
					<span>{{ column.label }}</span>
				</div>
				<fragment v-if="column.secondRow">
					<div
						v-for="(el, elIndex) in column.secondRow"
						:key="elIndex"
						:class="{
							'is-current-sort': sortBy === el.field,
							'is-sortable': el.sortable,
						}"
					>
						<BaseButton
							v-if="el.sortable"
							design="none"
							class="th-wrap"
							@click.stop="sort(el)"
						>
							<span>{{ el.label }}</span>
							<base-icon
								v-if="sortBy === el.field"
								:icon="sortOrder === 'asc' ? 'sort-up' : 'sort-down'"
								source="custom"
							/>
							<base-icon v-else-if="el.sortable" icon="sort" source="custom" />
						</BaseButton>
						<div v-else class="th-wrap">
							<span>{{ el.label }}</span>
						</div>
					</div>
				</fragment>
			</th>
		</tr>
	</fragment>
</template>

<script>
import BaseButton from "@basecomponents/BaseButton";
import { Fragment } from "vue-fragment";

const selectionStateMap = new Map([
	[true, "all"],
	[undefined, "some"],
	[false, "none"],
	["all", true],
	["some", undefined],
	["none", false],
]);

export default {
	components: { Fragment },
	props: {
		allRowsSelectable: Boolean,
		currentPageSelectionState: {
			type: String,
			required: true,
			validator: (value) => ["all", "some", "none"].includes(value),
		},
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
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		selectionStatus: {
			get() {
				return selectionStateMap.get(this.currentPageSelectionState);
			},
			set(state) {
				this.$emit(
					"update:current-page-selection-state",
					selectionStateMap.get(state)
				);
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
			 * @event update:sort-by
			 * @type {String} contains the field value of the selected column
			 */
			this.$emit("update:sort-by", column.field);
			/**
			 * helper event for the .sync modifier
			 *
			 * @event update:sort-order
			 * @type {String} represent the new desired sort order ("asc" or "desc")
			 */
			this.$emit("update:sort-order", newSortOrder);
		},
	},
};
</script>

<style lang="scss" scoped>
.row {
	font-weight: var(--font-weight-bold);
	border-bottom: calc(2 * var(--border-width)) solid var(--color-tertiary);

	th {
		vertical-align: super;
		&.is-current-sort {
			opacity: 1;
		}
		.th-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: var(--space-xs);
			font-size: var(--text-md);
			font-weight: var(--font-weight-normal);
			svg {
				font-size: calc(1.5 * var(--text-lg));
				color: var(--color-tertiary);
			}
		}
		.select-wrap {
			padding: var(--space-xs);
			.select {
				margin-bottom: 0;
			}
		}
	}
	th.has-second-row {
		.th-wrap {
			grid-column: -1 / 1;
			padding-top: 0;
			padding-bottom: 0;
		}
	}
}
</style>
