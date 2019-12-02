<template>
	<div>
		<floating-fab icon="add" to="/news/new" />
		<section v-if="news && news.length > 0" class="section">
			<news-card
				v-for="article of news"
				:key="article._id"
				:article="article"
				class="mb--md"
			/>
		</section>
	</div>
</template>

<script>
import NewsCard from "@components/molecules/NewsCard";
import FloatingFab from "@components/molecules/FloatingFab";

export default {
	components: {
		NewsCard,
		FloatingFab,
	},
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
