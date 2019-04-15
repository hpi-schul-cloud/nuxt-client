<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<th
						v-for="(column, index) in columns"
						:key="index"
						:class="{
							'is-current-sort': currentSortColumn === column,
							'is-sortable': column.sortable,
						}"
						cellspacing="0"
						@click.stop="sort(column)"
					>
						<span>{{ column.label }}</span>
						<div
							v-if="column.sortable"
							:class="{ 'is-desc': !isAsc && currentSortColumn === column }"
							class="arrow"
						></div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in visibleData" :key="index">
					<td v-for="(column, index2) in columns" :key="index2">
						{{ getValueByPath(row, column.field) }}
					</td>
					<td>
						<slot :row="row"></slot>
					</td>
				</tr>
			</tbody>
		</table>

		<pagination
			:value="skip"
			:state="paginationState"
			@update="$emit('update:skip', $event)"
		/>
	</div>
</template>
<script>
import { getValueByPath } from "@/utils/helpers";
import Pagination from "@components/Pagination.vue";

export default {
	components: {
		Pagination,
	},
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		columns: {
			type: Array,
			default: () => [],
		},
		paginated: {
			type: Boolean,
		},
		paginationState: {
			type: Object,
			default: () => {
				return {
					limit: 10,
					skip: 0,
					total: 0,
				};
			},
		},
		skip: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			getValueByPath,
			currentSortColumn: "",
			newData: this.data,
			isAsc: false,
		};
	},
	computed: {
		visibleData() {
			if (!this.paginated) return this.newData;

			return this.newData.slice(
				this.skip,
				this.paginationState.limit + this.skip
			);
		},
	},
	watch: {
		data(data) {
			this.newData = data;
		},
	},
	methods: {
		sort(column) {
			if (!column || !column.sortable) return;

			this.isAsc = column === this.currentSortColumn ? !this.isAsc : "desc";

			this.newData = this.sortBy(this.newData, column.field, this.isAsc);

			this.currentSortColumn = column;
		},
		sortBy(array, key, isAsc) {
			let sorted = [];
			// Sorting without mutating original data
			sorted = [...array].sort((a, b) => {
				// Get nested values from objects
				let newA = getValueByPath(a, key);
				let newB = getValueByPath(b, key);
				// sort boolean type
				if (typeof newA === "boolean" && typeof newB === "boolean") {
					return isAsc ? newA - newB : newB - newA;
				}
				if (!newA && newA !== 0) return 1;
				if (!newB && newB !== 0) return -1;
				if (newA === newB) return 0;
				newA = typeof newA === "string" ? newA.toUpperCase() : newA;
				newB = typeof newB === "string" ? newB.toUpperCase() : newB;
				return isAsc ? (newA > newB ? 1 : -1) : newA > newB ? -1 : 1;
			});
			return sorted;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
.table {
	width: 100%;
	thead {
		font-weight: bolder;
		tr {
			th {
				padding: 8px;
				cursor: pointer;
				border-bottom: 2px solid grey;
				opacity: 0.66;
				&.is-current-sort {
					opacity: 1;
				}
				.arrow {
					display: inline-block;
					width: 0;
					height: 0;
					margin-left: 5px;
					vertical-align: middle;
					border-right: 4px solid transparent;
					border-bottom: 4px solid grey;
					border-left: 4px solid transparent;
					&.is-desc {
						border-top: 4px solid grey;
						border-right: 4px solid transparent;
						border-bottom: 0;
						border-left: 4px solid transparent;
					}
				}
			}
		}
	}
	tbody {
		tr {
			&:nth-child(odd) {
				background-color: #fff;
			}
			&:nth-child(even) {
				background-color: #eee;
			}
			td {
				padding: 8px;
			}
		}
	}
}
</style>
