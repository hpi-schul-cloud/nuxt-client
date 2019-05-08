<template>
	<div>
		<base-button
			class="is-primary"
			@click="$router.push({ name: 'news-create' })"
			>Artikel anlegen</base-button
		>
		<section v-if="news && news.length > 0" class="section">
			<news-card
				v-for="article of news"
				:key="article._id"
				:article="article"
				class="mb-2"
			/>
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
