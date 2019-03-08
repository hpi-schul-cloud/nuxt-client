<template>
	<div>
		<!-- TODO redo without bulma -->
		<p>News</p>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	head() {
		return {
			title: "News",
		};
	},
	computed: {
		...mapGetters("news", {
			news: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("news/find");
		},
	},
};
</script>
