<template>
	<div>
		<table class="table">
			<thead>
				<tr>
					<td v-for="(column, index) in columns" :key="index" cellspacing="0">{{
						column.label
					}}</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in data" :key="index">
					<td v-for="(column, index2) in columns" :key="index2">
						{{ getValueByPath(row, column.field) }}
					</td>
					<td>
						<slot :row="row"></slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import { getValueByPath } from "@/utils/helpers";

export default {
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		columns: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			getValueByPath,
		};
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
			td {
				padding: 8px;
				border-bottom: 2px solid grey;
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
