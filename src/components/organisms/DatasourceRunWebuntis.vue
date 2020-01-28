<template>
	<ul>
		<base-table :columns="columns" :data="webuntisMetadata" track-by="_id">
		</base-table>

		<li>Should fetch data from run using webuntis metadata service</li>
		<li>the store to fetch this data does not exist yet</li>
		<li>Should show list of courses (table)</li>
		<li>Should show import button if dry run</li>
		<li>
			Should show number of elements to import/number of imported elements
		</li>
		<li>Button to import should trigger run with selection</li>
	</ul>
</template>
<script>
import BaseTable from "@components/base/BaseTable/BaseTable";
import { mapGetters } from "vuex";
export default {
	components: {
		BaseTable,
	},
	props: {
		datasource: {
			type: Object,
			required: true,
		},
	},
	data: function() {
		return {
			columns: [
				{
					field: "class",
					label: "Name",
					sortable: true,
				},
				{
					field: "teacher",
					label: "Lehrer",
				},
				{
					field: "room",
					label: "Raum",
				},
			],
			rowsPerPage: 5,
			showRowSelection: true,
			data: {
				_id: "",
				datasourceRunId: "",
				teacher: "",
				class: "",
				subject: "",
				Raum: "",
			},
		};
	},
	computed: {
		...mapGetters("webuntis-course-metadata", {
			webuntisMetadata: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			try {
				this.$store.dispatch("webuntis-course-metadata/find");
			} catch (error) {
				console.error(error);
				this.$toast.error(this.$t("error.load"));
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
