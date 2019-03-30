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
						{{ row.userId[column.field] }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
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
};
</script>

<style lang="scss" scoped>
@import "@variables";
.table {
	thead {
		font-weight: bolder;
		tr {
			td {
				padding: 8px;
				padding: none;
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
		}
	}
}
</style>
