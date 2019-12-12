<template>
	<component :is="listView ? 'BaseContentContainer' : 'div'">
		<BaseGrid :column-width="listView ? '100%' : '14rem'">
			<news-card
				v-for="article of news"
				:id="article._id"
				:key="article._id"
				:category="article.category"
				:title="article.title"
				:created-at="article.displayAt || article.createdAt"
				:created-by="getNewsAuthor(article)"
				:picture="getFirstImage(article)"
				:event-date="article.eventDate"
				:is-landscape="listView"
				:content="article.content"
			/>
		</BaseGrid>
	</component>
</template>

<script>
import NewsCard from "@components/molecules/NewsCard";

export default {
	components: {
		NewsCard,
	},
	props: {
		news: {
			type: Array,
			required: true,
		},
		listView: {
			type: Boolean,
		},
	},
	methods: {
		getNewsAuthor(article) {
			return article.creator && article.creator.displayName
				? article.creator.displayName
				: `${article.creator.firstName} ${article.creator.lastName}`;
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

.list {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: 1fr;
	grid-gap: var(--space-md);
	width: 100%;
	padding: var(--space-md);
}
</style>
