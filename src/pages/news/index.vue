<template>
	<div>
		<floating-fab
			icon="add"
			to="/news/new"
			:aria-label="$t('pages.news.new.title')"
		/>
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
import { mapGetters } from "vuex";
import NewsCard from "@components/molecules/NewsCard";
import FloatingFab from "@components/molecules/FloatingFab";

export default {
	components: {
		NewsCard,
		FloatingFab,
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
	head() {
		return {
			title: this.$t("pages.news.title"),
		};
	},
};
</script>
