<template>
	<div>
		<base-button
			class="is-primary"
			@click="$router.push({ name: 'news-create' })"
			>Artikel anlegen</base-button
		>
		<section v-if="news && news.length > 0" class="section">
			<news-card
				v-for="article of newsColored"
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
import _ from "lodash";

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
		newsColored() {
			const colors = [
				"#F44336",
				"#E91E63",
				"#3F51B5",
				"#2196F3",
				"#03A9F4",
				"#00BCD4",
				"#009688",
				"#4CAF50",
				"#CDDC39",
				"#FFC107",
				"#FF9800",
				"#FF5722",
			];

			return this.news.map((article) => {
				article.color = colors[_.random(0, colors.length - 1)];
				return article;
			});
		},
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
