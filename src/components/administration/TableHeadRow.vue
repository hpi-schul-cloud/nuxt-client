<template>
	<tr class="table__row">
		<th v-if="allRowsSelectable">
			<div class="th-wrap select-wrap">
				<base-input
					v-model="selectionStatus"
					type="checkbox"
					label="Alle Zeilen auswählen"
					:label-hidden="true"
					class="select"
					:show-undefined-state="true"
				/>
			</div>
		</th>
		<th v-for="(column, index) in columns" :key="index" class="th-slot" cellspacing="0" :data-testid="column.field">
			<slot
				:name="`headcolumn-${columns[index].field.replace(/\./g, '-')}`"
				:label="column.label"
				:sortable="column.sortable"
				:sort-by="sortBy"
				:sort-order="sortOrder"
			>
				<RegistrationInfo v-if="column.infobox" class="info-slot" />
				<v-btn
					v-if="column.sortable"
					variant="text"
					:ripple="false"
					:class="{
						'is-current-sort': sortBy === column.field,
						'is-sortable': column.sortable,
					}"
					class="th-wrap"
					:aria-label="ariaLabel(column)"
					@click.stop="sort(column)"
				>
					<div class="tooltip">
						<span>
							{{ column.label }}
						</span>
						<span v-if="column.tooltipText" class="tooltiptext">{{ column.tooltipText }}</span>
					</div>
					<v-icon v-if="sortBy === column.field">
						{{ sortOrder === "asc" ? mdiMenuUpOutline : mdiMenuDownOutline }}
					</v-icon>
					<v-icon v-else-if="column.sortable" :icon="mdiMenuSwapOutline" />
				</v-btn>
				<div v-else class="th-wrap">
					<span>{{ column.label }}</span>
				</div>
			</slot>
		</th>
	</tr>
</template>

<script>
import RegistrationInfo from "@/components/administration/RegistrationInfo.vue";
import { useEnvConfig } from "@data-env";
import { mdiAlert, mdiInformation, mdiMenuDownOutline, mdiMenuSwapOutline, mdiMenuUpOutline } from "@icons/material";

const selectionStateMap = new Map([
	[true, "all"],
	[undefined, "some"],
	[false, "none"],
	["all", true],
	["some", undefined],
	["none", false],
]);

export default {
	components: {
		RegistrationInfo,
	},
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
		showExternalText: {
			type: Boolean,
		},
	},
	emits: ["update:current-page-selection-state", "update:sort", "update:sort-by", "update:sort-order"],
	data() {
		return {
			mdiAlert,
			mdiMenuDownOutline,
			mdiInformation,
			mdiMenuSwapOutline,
			mdiMenuUpOutline,
		};
	},
	computed: {
		selectionStatus: {
			get() {
				return selectionStateMap.get(this.currentPageSelectionState);
			},
			set(state) {
				this.$emit("update:current-page-selection-state", selectionStateMap.get(state));
			},
		},
		isConsentNecessary() {
			return useEnvConfig().value.FEATURE_CONSENT_NECESSARY;
		},
	},
	methods: {
		ariaLabel(column) {
			const sortOrderText =
				this.sortOrder === "asc"
					? `, ${this.$t("components.organisms.DataTable.TableHeadRow.ariaLabel.sortOrder.asc")}`
					: `, ${this.$t("components.organisms.DataTable.TableHeadRow.ariaLabel.sortOrder.desc")}`;

			const sortableText = column.sortable
				? `, ${this.$t("components.organisms.DataTable.TableHeadRow.ariaLabel.changeSorting")}`
				: "";
			return column.label + sortOrderText + sortableText;
		},
		invertSortOrder(currentOrder) {
			return currentOrder === "desc" ? "asc" : "desc";
		},
		sort(column) {
			// invert sort order if clicked again
			const newSortOrder = column.field === this.sortBy ? this.invertSortOrder(this.sortOrder) : "asc";
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
@use "sass:map";
@use "@/styles/settings" as *;

.table__row {
	font-weight: bold;

	th {
		border-bottom: 2px solid;

		.th-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding: 8px;
			font-size: var(--text-md);
			font-weight: normal;
		}

		.select-wrap {
			padding: 8px;

			.select {
				margin-bottom: 0;
			}
		}
	}
}

.th-slot {
	position: relative;
}

.tooltip {
	position: relative;
	display: inline-block;
}

.tooltip .tooltiptext {
	visibility: hidden;
	background-color: map.get($grey, darken-3);
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 5px 10px;
	position: absolute;
	z-index: 1;
	top: 140%;
	right: 0;
	white-space: nowrap;
}

.tooltip:hover .tooltiptext {
	visibility: visible;
}
</style>
