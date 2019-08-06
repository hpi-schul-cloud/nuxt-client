<template>
	<div>
		<base-button design="primary" @click="$router.push({ name: 'news-new' })"
			>Artikel anlegen</base-button
		>
		<section v-if="news && news.length > 0" class="section">
			<news-card
				category="Test"
				headline="headline"
				created-at="2019-02-03"
				created-by="Mona Weizenberg"
				picture="https://source.unsplash.com/random"
				event-date=""
				is-landscape="false"
				>News news news</news-card
			>
			<news-card
				category="Test"
				headline="headline"
				created-at="2019-02-03"
				created-by="Mona Weizenberg"
				picture="https://source.unsplash.com/random"
				event-date=""
				is-landscape="false"
				>News news news</news-card
			>
			<news-card
				category="Test"
				headline="headline"
				created-at="2019-02-03"
				created-by="Mona Weizenberg"
				picture="https://source.unsplash.com/random"
				event-date=""
				is-landscape="false"
				>News news news</news-card
			>
			<news-card
				category="Test"
				headline="headline"
				created-at="2019-02-03"
				created-by="Mona Weizenberg"
				picture="https://source.unsplash.com/random"
				event-date=""
				is-landscape="false"
				>News news news</news-card
			>
			<!-- <news-card
				v-for="article of news"
				:key="article._id"
				:article="article"
				class="mb--md"
			/> -->
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import NewsCard from "@components/NewsCard";

export default {
	head() {
		return {
			title: "News",
		};
	},
	components: {
		NewsCard,
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
			this.$store.dispatch("news/find", {
				query: {
					$sort: {
						createdAt: -1,
					},
				},
			});
		},
	},
};
</script>
<style lang="scss" scoped>
.section {
	display: flex;
	overflow: wrap;
}
</style>
