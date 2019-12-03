<template>
	<div>
		<floating-fab icon="add" to="/news/new" />
		<grid-news :news="published" :list-view="isList" />
	</div>
</template>

<script>
import FloatingFab from "@components/molecules/FloatingFab";
import GridNews from "@components/molecules/GridNews";

export default {
	components: {
		FloatingFab,
		GridNews,
	},
	layout: "loggedInFull",
	async asyncData({ store }) {
		return {
			published: (await store.dispatch("news/find", {
				query: {
					sort: "-displayAt",
					$populate: ["createdBy"],
				},
			})).data,
			unpublished: (await store.dispatch("news/find", {
				query: {
					sort: "-displayAt",
					unpublished: true,
				},
			})).data,
		};
	},
	data: function() {
		return {
			isList: false,
		};
	},
	methods: {
		toDisplayStyle(newStyle) {
			this.isList = newStyle === "list";
		},
	},
	head() {
		return {
			title: "News",
		};
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";

.view-toggles {
	display: none;

	@include breakpoint(tablet) {
		display: inline;
		float: right;
	}
}

.create-news-btn {
	margin-left: var(--space-md);
}
</style>
