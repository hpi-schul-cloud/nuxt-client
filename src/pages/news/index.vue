<template>
	<div>
		<base-button
			class="create-news-btn"
			design="primary"
			@click="$router.push({ name: 'news-new' })"
		>
			Artikel anlegen
		</base-button>

		<div class="view-toggles">
			<!-- TODO: Find correct Icons! and show correct one on active -->
			<base-button
				:design="isList ? 'icon text' : 'icon'"
				@click="toDisplayStyle('grid')"
			>
				<base-icon source="material" icon="view_column" />
			</base-button>
			<base-button
				:design="isList ? 'icon' : 'icon text'"
				@click="toDisplayStyle('list')"
			>
				<base-icon source="material" icon="view_list" />
			</base-button>
		</div>
		<section :class="{ 'grid-container': !isList, list: isList }">
			<news-card
				v-for="article of news"
				:id="article._id"
				:key="article._id"
				:category="article.category"
				:title="article.title"
				:created-at="article.createdAt"
				:created-by="getNewsAuthor(article)"
				:picture="getFirstImage(article)"
				:event-date="article.eventDate"
				:is-landscape="isList"
				:content="article.content | striphtml"
			/>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsCard from "@components/molecules/NewsCard";

export default {
	head() {
		return {
			title: "News",
		};
	},
	components: {
		NewsCard,
	},
	data: function() {
		return {
			isList: false,
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
		async find() {
			await this.$store.dispatch("news/find", {
				query: {
					sort: "-createdAt",
				},
			});
		},
		toDisplayStyle(newStyle) {
			if (newStyle == "list") {
				this.isList = true;
			}
			if (newStyle == "grid") {
				this.isList = false;
			}
		},
		getNewsAuthor(article) {
			return article.creator && article.creator.displayName
				? article.creator.displayName
				: "";
		},
		getFirstImage(article) {
			var renderer = document.createElement("div");
			renderer.innerHTML = article.content;
			const image = renderer.querySelector("img");
			return image ? image.getAttribute("src") : undefined;
		},
	},
};
</script>
<style lang="scss" scoped>
@import "@styles";
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	grid-gap: var(--space-lg);
	width: 100%;
	padding: var(--space-md);
}
.view-toggles {
	display: none;

	@include breakpoint(tablet) {
		display: inline;
		float: right;
	}
}
.list {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: 1fr;
	grid-gap: var(--space-md);
	width: 100%;
	padding: var(--space-md);
}
.create-news-btn {
	margin-left: var(--space-md);
}
</style>
