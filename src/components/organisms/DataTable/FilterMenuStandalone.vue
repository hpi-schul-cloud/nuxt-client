<template>
	<div>
		<filter-ui :filter="filters" :parser="parser" :query="query" @newQuery="setNewQuery"/>
	</div>
</template>

<script>
import FilterUi from "../FilterUI";
import { parser } from "../FilterUI";

export default {
	components: {
		FilterUi
	},
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		backendFiltering: {
			type: Boolean
		},
		filters: {
			type: Array,
			required: true
		},
		query: {
			type: [Object, String],
			required: true,
		},
	},
	data() {
		return {
			parser: parser.FeathersJS,
			localQuery: undefined,
		};
	},
	computed: {
		filteredData() {
			// ToDo implement data filtering
			if (!this.backendFiltering) {

			}
			return this.data;
		},
		queryProxy: {
			get() {
				return this.localQuery || this.query;
			},
			set(to) {
				this.localQuery = to;
				this.$emit("update:query", to);
				if (!this.backendFiltering) {
					this.$emit("filtered-data", this.filteredData);
				}
			},
		},
	},
	methods: {
		setNewQuery(newQuery) {
			this.queryProxy = newQuery
		}
	}
};
</script>
